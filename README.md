# BlockchainGreenPass

Blockchain-based Covid-19 Certification System  
Project for Bachelor's Thesis

Technologies used: ReactJS, NodeJS, ExpressJS, Web3JS, React Native (Expo), QR Codes, Blockchain, Solidity (Ethereum)

The complete pubblication can be found [here](https://www.tesionline.it/default/tesi.asp?idt=57161&forceCom=y)

## Summary
This thesis deals with the design, development and implementation of a blockchain-based Covid-19 certificate management and verification system. The system allows one or more authorized entities to create Covid-19 certificates for vaccinations, disease recoveries and swab negativity. The certificates are then issued to patients in the form of a QR code, which can be scanned by a special smartphone app that verifies their authenticity. All data relating to the system (certificates and authorized entities) are saved within a blockchain network, in this case an Ethereum testnet. The system consists of the following components: a smart contract, a web administration platform, a REST API, a smartphone app. The smart contract handles data management within the blockchain and data transactions to be exchanged with the various users of the system. The smart contract is created by the administrator, who has permission to authorize and revoke certification bodies. The latter can in turn create Covid-19 certificates, but not authorize other entities. The administrator can also revoke any malicious or invalid certificates. The web administration platform provides the certifying body or the administrator with the functions necessary for a quick and easy use of the system. The user authenticates with the platform through a browser plugin, and through cryptocurrency transactions, registers certificates within the blockchain. To verify the validity of the certificates, a smartphone application was created that reads QR codes via camera and queries a special REST API, which returns the result of the verification to the application. The REST API runs on a NodeJS server and is developed using the ExpressJS library. The administration platform is developed with the ReactJS framework, and interfaces with the smart contract through the Web3JS library, which manages every aspect related to the blockchain. The smartphone app is written in React Native, and distributed through the Expo suite. The deployment of the smart contract took place on the Rinkeby network, with Ethereum technology, while the hosting of the administration platform and the API are managed respectively by Vercel and Heroku. The system is easy to use, functional and fast, being scalable in terms of users and traffic, as well as future-proofed from the point of view of functionality. The entire system implements strategies to ensure the security of the data processed and preserve the privacy of citizens, such as the anonymization of saved data, end-to-end encrypted communications, and privacy-oriented implementation measures. The system is very fast, taking about a second to verify a certificate, and about ten seconds to create a new certificate, based on the current network usage.
