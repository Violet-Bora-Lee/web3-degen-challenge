require("dotenv").config();
const { MNEMONIC, PROJECT_ID } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    linea_goerli: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://linea-goerli.infura.io/v3/${PROJECT_ID}`
        ),
      network_id: 59140,
    },
    polygon_mumbai: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://polygon-mumbai.infura.io/v3/${PROJECT_ID}`
        ),
      network_id: 80001,
    },
    optimism_goerli: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://optimism-goerli.infura.io/v3/${PROJECT_ID}`
        ),
      network_id: 420,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19", // Fetch the exact version from solc-bin (default: truffle's version)
    },
  },
};

// linea goerli contract: 0xa9500C9F058fe26879932a9F6095398020f6f7EB
