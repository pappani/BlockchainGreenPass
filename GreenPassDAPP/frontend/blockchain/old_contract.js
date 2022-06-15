const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"certificates","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getCertificate","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"input","type":"string"}],"name":"issueCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"issuer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"revokeCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const greenPass1Contract = web3 => {
   return new web3.eth.Contract(abi, "0xb97115106dCBDad1880CD8364278E80393D27CFf")
}

export default greenPass1Contract