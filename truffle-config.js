const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require("fs");
const memonicPhrase = fs.readFileSync(".secret").toString().trim();
const alchemyProjectId = fs.readFileSync(".alchemy").toString().trim();
const etherscanKey = fs.readFileSync(".etherscan").toString().trim();

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    ganache: {
      host: "192.168.240.1",
      port: 7545,
      network_id: "*",
    },
    sepolia: {
      provider: () => new HDWalletProvider(memonicPhrase, `https://eth-sepolia.g.alchemy.com/v2/${alchemyProjectId}`),
      network_id: 11155111,       // Sepolia's id
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: "0.8.4",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
}


//contract address: 0xAaaB8a42FEA41bbA75C75eFe36fc91D3c8567624