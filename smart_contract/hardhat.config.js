// https://polygon-mumbai.g.alchemy.com/v2/28qvWvuSYYTiW_f8NINWEtKN1BPtDOnS
require("@nomiclabs/hardhat-waffle");

const alchemyApiKey = "28qvWvuSYYTiW_f8NINWEtKN1BPtDOnS"
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();

const infuraKey = "7aeab4859fc14ef89ec21d2dac3376b7";
const account = fs.readFileSync(".secret").toString().trim();

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: [privateKey],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraKey}`,
      accounts: [account],
    },
  },
};
