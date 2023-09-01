require("dotenv").config();
const { MNEMONIC, PROJECT_ID } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
   
    // development: {
    //   host: "127.0.0.1", // Localhost (default: none)
    //   port: 8545, // Standard Ethereum port (default: none)
    //   network_id: "*", // Any network (default: none)
    // },
    linea_goerli: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://linea-goerli.infura.io/v3/${PROJECT_ID}`
        ),
      network_id: 59140, // Linea Goerli's id
    },
    optimism: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://optimism-goerli.infura.io/v3/${PROJECT_ID}`
        ),
      network_id: 420, // Optimism's id
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9", // Fetch the exact version from solc-bin (default: truffle's version)
    },
  },
};