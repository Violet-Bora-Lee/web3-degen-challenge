const SendMessage = artifacts.require("SendMessage");
const Challenge = artifacts.require("Challenge");
const ChallengeManager = artifacts.require("ChallengeManager");

// https://docs.axelar.dev/resources/mainnet
const gatewayAddress = "0xe432150cce91c13a887f7D836923d5597adD8E31"; // Linea Gateway Contract address

// Linea Gas Service Contract address
const gasService = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";

const sampleChallengeDuration = 21; // 21 days
const sampleChallengeDepositAmount = web3.utils.toWei("0.03", "ether"); // 0.03 ETH

module.exports = function (deployer) {
  // Arguments
  // deployer.deploy(SendMessage, gatewayAddress, gasService);
  deployer.deploy(Challenge, sampleChallengeDuration, sampleChallengeDepositAmount);
  // deployer.deploy(ChallengeManager);
};

// Linea Goerli contracts:
// 1. SendMessage: 0xa9500C9F058fe26879932a9F6095398020f6f7EB
// 2. Challenge: 0x08F07db122a163DbFa2dcA5F6AfC099928D83C91
// 3. ChallengeManager: 0xB3555A90256f858Cf01C2db4479d23F26A3E92B0

