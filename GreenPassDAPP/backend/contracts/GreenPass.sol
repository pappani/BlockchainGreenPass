// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract GreenPass {
    string certificate_content;

    address public admin;
    mapping (bytes32 => string) public certificates;
    mapping (address => bool) public issuers;

    constructor() {
        admin = msg.sender;
    }

    function addNewIssuer(address _address) public{
        require(msg.sender == admin, "You are not authorized.");
        issuers[_address]=true;
    }

    function removeIssuer(address _address) public{
        require(msg.sender == admin, "You are not authorized.");
        issuers[_address]=false;
    }

    function isIssuer(address _address) private view returns (bool){
        return issuers[_address];
    }

    function issueCertificate(bytes32 _id, string memory input) public {
        require(isIssuer(msg.sender), "You are not authorized.");
        certificates[_id] = input;
    }

    function getCertificate(bytes32 _id) public view returns (string memory) {
        return certificates[_id];
    }

    function revokeCertificate(bytes32 _id) public {
        require(msg.sender == admin, "You are not authorized.");
        certificates[_id] = "revoked";
    }
}