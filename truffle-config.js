module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    ganache: {
      host: "172.29.16.1",
      port: 7545,
      network_id: "*",
    }
  },
  compilers: {
    solc: {
      version: "0.8.4",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
}
