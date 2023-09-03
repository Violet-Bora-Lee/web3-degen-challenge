# Web3 Degen Challenge

## Introduction

## How to develop
Install [nodejs](https://nodejs.org/en/download/). Run `node -v` to check your installation.

Support Node.js version 16.x and 18.x

1. Clone this repo:

```bash
git clone https://github.com/Violet-Bora-Lee/web3-degen-challenge.git
```

2. Install dependencies:

```bash
npm install
```

3. Compile smart contracts:

3-1. Install truffle globally:
```bash
npm i -g truffle
```

3-2. Initialize a new truffle project with the default configuration and run test
```bash
truffle init
truffle test
```

3-3. Compile smart contracts:
```bash
trufle compile
```

4. `env` file setup:

- Create a new `.env` file inside the truffle folder and add the following code to the file:
```
MNEMONIC=your mnemonic
PROJECT_ID=your infura project id
```
> Note: You can get your mnemonic from your Metamask wallet and your Infura project id from [Infura](https://infura.io/)

5. Deploy smart contracts:

- Run `truffle migrate --network goerli` to deploy the contract to the Linea Goerli testnet

> Note::Go to [Axelar Documentation](https://docs.axelar.dev/resources/testnet) to get the addresses for the Gateway Contract and Gas Service Contract for the each testnet.

## Step 5
- Create a new file called `1_deploy_contracts.js` in the `migrations` folder
In this step, we will deploy the contract to the Linea Goerli testnet and Optimism Goerli testnet.

Go to [Axelar Documentation](https://docs.axelar.dev/resources/testnet) to get the addresses for the Linea Gateway Contract and Gas Service Contract for the Linea Goerli testnet and Optimism Goerli testnet.

- Save the contract address for the Linea Goerli testnet for the frontend project

6. frontend setup:
- In the root directory, create a new file called `.env.local` and add the following:
```
NEXT_PUBLIC_LINEA_RPC_URL=https://linea-goerli.infura.io/v3/<your-infura-project-id>
NEXT_PUBLIC_LINEA_SEND_MESSAGE_CONTRACT_ADDRESS=
NEXT_PUBLIC_LINEA_CHALLENGE_CONTRACT_ADDRESS=
NEXT_PUBLIC_LINEA_CHALLENGE_MANAGER_CONTRACT_ADDRESS=
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://optimism-goerli.infura.io/v3/<your-infura-project-id>
NEXT_PUBLIC_OPTIMISM_NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS=
```
- Run `npm run dev` to start the frontend project

