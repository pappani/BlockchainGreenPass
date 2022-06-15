import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react'
import Web3 from 'web3'
import greenPassContract from '../blockchain/contract'
import 'bulma/css/bulma.css'
import styles from '../styles/Home.module.css'
import { sha256 } from 'js-sha256';
import {Base64} from 'js-base64';
import ReactDOM from "react-dom";
import QRCode from "qrcode.react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const GreenPass1 = () => {
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [received, setReceived] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [id, setId] = useState(0)
    const [salt, setSalt] = useState('')
    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [dob, setDob] = useState(new Date())
    const [targetDisease, setTargetDisease] = useState('')
    const [vaccine, setVaccine] = useState('')
    const [testName, setTestName] = useState('')
    const [expiration, setExpiration] = useState('')
    const [testResult, setTestResult] = useState('')
    const [dose, setDose] = useState(0)
    const [date, setDate] = useState(new Date())
    const [country, setCountry] = useState('')
    const [issuerCode, setIssuerCode] = useState('')
    const [content, setContent] = useState('')
    const [address, setAddress] = useState(null)
    const [contract, setContract] = useState(null)
    const [web3, setWeb3] = useState(null)
    const [isQr, setIsQr] = useState(false)
    const [isToolOpen, setIsToolOpen] = useState(false)
    const [adminTextField, setAdminTextField] = useState('')
    const [isCertOpen, setIsCertOpen] = useState(false)

    useEffect(() => {
      initializeWeb3()
      if (address == '0x7e0420709428FbBD3d32218E238bF8920C7cbd34') setIsAdmin(true)
    }, [address, isAdmin])

    const verifyCertificateHandler = async () => {
      var hashedId = sha256(id).substring(0, 32)
      const receivedCertificate = await contract.methods.getCertificate(web3.utils.asciiToHex(hashedId)).call()
      setReceived(receivedCertificate)
      console.log("Content: " + receivedCertificate)
      if (receivedCertificate == sha256(content)) {
        setErrorMsg('')
        setSuccessMsg("Certificate " + id + " is valid!")
        const timer = setTimeout(() => setSuccessMsg(''), 5000)
        return () => clearTimeout(timer)
      } else {
        setSuccessMsg('')
        setErrorMsg("Certificate " + id + " is NOT valid!")
        const timer = setTimeout(() => setErrorMsg(''), 5000)
        return () => clearTimeout(timer)
      }
    }

    const updateReaderDataName = event => {
       setName(event.target.value)
    }

    const updateReaderDataSurname = event => {
      setSurname(event.target.value)
    }

    const updateReaderDataType = event => {
      setType(event.target.value)
    }

    const updateReaderDataDob = value => {
      setDob(value)
    }

    const updateReaderDataTargetDisease = event => {
      setTargetDisease(event.target.value)
    }

    const updateReaderDataVaccine = event => {
      setVaccine(event.target.value)
    }

    const updateReaderDataTestName = event => {
      setTestName(event.target.value)
    }

    const updateReaderDataExpiration = event => {
      setExpiration(event.target.value)
    }

    const updateReaderDataTestResult = event => {
      setTestResult(event.target.value)
    }

    const updateReaderDataDose = event => {
      setDose(event.target.value)
    }

    const updateReaderDataDate = value => {
      setDate(value)
    }

    const updateReaderDataCountry = event => {
      setCountry(event.target.value)
    }
 
    const updateReaderDataAdminTextField = event => {
      setAdminTextField(event.target.value)
    }

   const downloadQRCode = () => {
    const canvas = document.getElementById("qrcode")
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
    let downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = `qr.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  };

    const issueCertificateHandler = async () => {
      try {
        setIsQr(false)
        setSuccessMsg('Loading...')
        salt = Math.floor(Math.random() * 1000000)
        id = name + ',' + surname + ',' + salt
        console.log(id)
        var hashedId = sha256(id).substring(0, 32)
        // can be replaced with a for loop of an array of fields
        content = name + ',' + surname + ',' + hashedId + ',' + type + ',' + dob + ',' + targetDisease + ',' + vaccine + ',' + testName + ',' + expiration + ',' + testResult + ',' + dose + ',' + date + ',' + country + ',' + issuerCode
        console.log(content)
        content = Base64.encode(content)
        await contract.methods.issueCertificate(web3.utils.asciiToHex(hashedId), sha256(content)).send({
          from: address,
        })
        setSuccessMsg("Certificate issued successfully!")
        const s = '{ "id":"' + id + '", "content":"' + content + '"}'
        setIsQr(true)
        ReactDOM.render(<div style={{flex: 1, flexDirection:"column", justifyContent: "center", alignItems: "center"}}><QRCode id="qrcode" value={s} size={300} level={"H"} includeMargin={true}/><br/>
        <button className="button is-primary" onClick={downloadQRCode}>Download QR Code</button></div>, document.getElementById("qr_container"));
      } catch(err) {
        setErrorMsg(err.message)
        setSuccessMsg('')
        const timer = setTimeout(() => setErrorMsg(''), 5000)
        return () => clearTimeout(timer)
      }
    }

    const initializeWeb3 = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          const web3 = new Web3(window.ethereum)
          setWeb3(web3)
          const c = greenPassContract(web3)
          setContract(c)
        } catch(err) {
          setErrorMsg(err.message)
        }
    } else {
        console.log("Please install MetaMask")
      }
    }
    
    const connectWalletHandler = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
            const accounts = await web3.eth.getAccounts()
            setAddress(accounts[0])
            setIssuerCode(accounts[0])
            if (address == '0x7e0420709428FbBD3d32218E238bF8920C7cbd34') setIsAdmin(true)
            setIsConnected(true)
          } catch(err) {
            setError(err.message)
          }
      } else {
          console.log("Error")
      }
    }

    const addIssuer = async () => {
      try {
        setSuccessMsg('Loading...')
        web3.utils.isAddress(adminTextField)
        await contract.methods.addNewIssuer(adminTextField).send({
          from: address,
        })
        setSuccessMsg("Issuer added successfully!")
      } catch(err) {
        setErrorMsg(err.message)
        setSuccessMsg('')
        const timer = setTimeout(() => setErrorMsg(''), 5000)
        return () => clearTimeout(timer)
      }
    }

    const deleteIssuer = async () => {
      try {
        setSuccessMsg('Loading...')
        web3.utils.isAddress(adminTextField)
        await contract.methods.removeIssuer(adminTextField).send({
          from: address,
        })
        setSuccessMsg("Issuer removed successfully!")
      } catch(err) {
        setErrorMsg(err.message)
        setSuccessMsg('')
        const timer = setTimeout(() => setErrorMsg(''), 5000)
        return () => clearTimeout(timer)
      }
    }

    const revokeCertificate = async () => {
      try {
        setSuccessMsg('Loading...')
        var hashedId = sha256(adminTextField).substring(0, 32)
        await contract.methods.revokeCertificate(web3.utils.asciiToHex(hashedId)).send({
          from: address,
        })
        setSuccessMsg("Certificate revoked successfully!")
      } catch(err) {
        setErrorMsg(err.message)
        setSuccessMsg('')
        const timer = setTimeout(() => setErrorMsg(''), 5000)
        return () => clearTimeout(timer)
      }
    }

    const openTools = () => {
      setIsToolOpen(!isToolOpen)  // toggle admin tools panel
    }

    const openCert = () => {
      setIsCertOpen(!isCertOpen)  // toggle certification panel
    }

    return (
        <div className={styles.main}>
          <Head>
            <title>Green Pass on Blockchain</title>
            <meta name="description" content="Green Pass on Blockchain" />
          </Head>
          <nav className="navbar mt-4 mb-4">
            <div className="container">
                <div>
                <h1>Green Pass on Blockchain</h1>
                <h1>Certification Issuing Form</h1>
                </div>
            </div>
          </nav>
          {!isConnected && <section>
                <div>
                    <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
                </div>
          </section>}
          {isConnected && <div className='has-text-centered'>
            <div>
            <label>Issuer is connected.</label>
            </div>
            <div className='mt-5'>
            {!isCertOpen && <button onClick={openCert} className="button is-danger">Issue New Certificate</button>}
            {isCertOpen && <button onClick={openCert} className="button is-danger">Cancel</button>}
            </div>
            </div>}
          {isConnected && isCertOpen && <section className="mt-5">
                <div>
                <div className="field has-text-centered is-half rows">
                  <label className="label row">Insert Green Pass Data</label>
                  <label className='label mt-5'>Name</label>
                  <div className="control">
                    <input onChange={updateReaderDataName} className="input" type="type" placeholder="Enter Name" />
                  </div>
                  <label className='label mt-3'>Surname</label>
                  <input onChange={updateReaderDataSurname} className="input" type="type" placeholder="Enter Surname" />
                  <label className='label mt-3'>Certificate Type</label>
                    <div className="select">
                      <select onChange={updateReaderDataType}>
                        <option> </option>
                        <option>Vaccine</option>
                        <option>Test</option>
                        <option>Recovery</option>
                      </select>
                    </div>
                  <label className='label mt-3'>Date of Birth</label>
                  <DatePicker selected={dob} dateFormat="dd/MM/yyyy" onChange={(date) => updateReaderDataDob(date)} />
                  <label className='label mt-3'>Target Disease</label>
                    <div className="select">
                      <select onChange={updateReaderDataTargetDisease}>
                        <option> </option>
                        <option>Covid-19</option>
                      </select>
                    </div>
                    <label className='label mt-3'>Vaccine Name</label>
                    <div className="select">
                      <select onChange={updateReaderDataVaccine}>
                        <option> </option>
                        <option>Pfizer</option>
                        <option>Moderna</option>
                        <option>AstraZeneca</option>
                        <option>Johnson &amp; Johnson</option>
                        <option>Novavax</option>
                        <option>Astrazeneca</option>
                      </select>
                    </div>
                    <label className='label mt-3'>Test Name</label>
                    <input onChange={updateReaderDataTestName} className="input" type="type" placeholder="Enter Test Name" />
                    <label className='label mt-3'>Expiration</label>
                    <div className="select">
                      <select onChange={updateReaderDataExpiration}>
                        <option> </option>
                        <option>48h</option>
                        <option>72h</option>
                      </select>
                    </div>
                    <label className='label mt-3'>Test Result</label>
                    <div className="select">
                      <select onChange={updateReaderDataTestResult}>
                        <option> </option>
                        <option>Positive</option>
                        <option>Negative</option>
                      </select>
                    </div>
                    <label className='label mt-3'>Dose</label>
                    <div className="select">
                      <select onChange={updateReaderDataDose}>
                        <option> </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                    <label className='label mt-3'>Date</label>
                    <DatePicker selected={date} dateFormat="dd/MM/yyyy" onChange={(date) => updateReaderDataDate(date)} />
                    <label className='label mt-3'>Country</label>
                    <input onChange={updateReaderDataCountry} className="input" type="type" placeholder="Enter Country" />
                    <label className='label mt-3'>Issuer Code</label>
                    <label className='label mt-3'>{issuerCode}</label>
                  </div>
                  </div>
                </section>}
          
          { /* <button 
                    onClick={verifyCertificateHandler} 
                    className="button is-primary mt-2"
                    >Verify Green Pass</button> */ }
          {isConnected && isCertOpen && <section className='container mt-6'>
                <button onClick={issueCertificateHandler} className="button is-danger">Confirm</button>
          </section>}
          <br/><br/>
          <section>
            {isAdmin && !isToolOpen && <div id="toggle_admin_tools">
              <button onClick={openTools} className="button is-warning mt-6">Open Admin Tools</button>
            </div>}
            {isAdmin && isToolOpen && <div className='has-text-centered' id="admin_tools">
              <button onClick={openTools} className="button is-warning mt-6">Close Admin Tools</button>
            <section className="mt-5">
              <div className="container">
                <div className="field">
                  <label className="label has-text-centered">Manage Issuers and Certificates</label>
                  <div className="control">
                    <input onChange={updateReaderDataAdminTextField} className="input" type="type" placeholder="Enter Issuer/Certificate ID" />
                  </div>
                </div>
                <button onClick={addIssuer} className="button is-warning">Add New Issuer</button>
                <button onClick={deleteIssuer} className="button is-warning ml-2">Delete Issuer</button>
                <button onClick={revokeCertificate} className="button is-warning ml-2">Revoke Certificate</button>
              </div>
          </section>
            </div>}
          </section>
          <section>
              {isQr && <div id="qr_container"></div>}
          </section>
          <section>
              <div className="container has-text-danger has-text-centered">
                  <h1>{errorMsg}</h1>
              </div>
          </section>
          <section>
              <div className="container has-text-success has-text-centered">
                  <h1>{successMsg}</h1>
              </div>
          </section>
          </div>
    )
}

export default GreenPass1