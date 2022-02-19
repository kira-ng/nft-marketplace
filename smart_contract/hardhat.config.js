// https://polygon-mumbai.g.alchemy.com/v2/28qvWvuSYYTiW_f8NINWEtKN1BPtDOnS
require("@nomiclabs/hardhat-waffle");

const alchemyApiKey = "28qvWvuSYYTiW_f8NINWEtKN1BPtDOnS"
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();

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
  },
};
