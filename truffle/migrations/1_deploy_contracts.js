const SendMessage = artifacts.require("SendMessage");

const gatewayAddress = "0xe432150cce91c13a887f7D836923d5597adD8E31"; // Linea Gateway Contract address

// Gas Service Contract address
const gasService = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";

module.exports = function (deployer) {
  // Arguments
  deployer.deploy(SendMessage, gatewayAddress, gasService);
};

// Linea Goerli contract: 0x4087C2CB3cdcc7d8eC86aDf97D65211D34E7eDb0
// Optimism Goerli contract: 0x4087C2CB3cdcc7d8eC86aDf97D65211D34E7eDb0