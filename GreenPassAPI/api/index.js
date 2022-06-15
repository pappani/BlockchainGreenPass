// 298223

import Web3 from 'web3'
import greenPassContract from './contract.js'
import { sha256 } from 'js-sha256';
import 'dotenv/config'
import express from 'express'
import bodyparser from 'body-parser'
const app = express()

let contract
let web3

const initializeWeb3 = async () => {
    try {
        web3 = new Web3(process.env.INFURA_API_URL)
        contract = greenPassContract(web3)
      } catch(err) {
        console.log(err.message)
      }
}

const verifyCertificateHandler = async (id, content) => {
    var hashedId = sha256(id).substring(0, 32)
    hashedId = web3.utils.asciiToHex(hashedId)
    const receivedCertificate = await contract.methods.getCertificate(hashedId).call()
    console.log("Blockchain: " + receivedCertificate)
    console.log("QR: " + sha256(content))
    if (receivedCertificate == sha256(content)) {
        console.log("Certificate is valid")
        return true
    } else {
        console.log("Certificate is NOT valid")
        return false
    }
}

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.post('/api', async (req, res) => {
    const data = req.body
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    if ((data.hasOwnProperty('id')) && (data.hasOwnProperty('content'))) 
    { 
        initializeWeb3()
        var isValid = await verifyCertificateHandler(data.id, data.content)
        if (isValid) { console.log("ok!"); res.send('{"res":"YES"}') }
        else { console.log("no!"); res.send('{"res":"NO"}') } 
    }
    else { console.log("na!"); res.send('{"res":"NA"}') }
})

app.get('/api', async (req, res) => {
    res.send('{"res":"OK"}')
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Running`)
}) 

//export default app