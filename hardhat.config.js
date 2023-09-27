require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const projectId = process.env.PROJECT_ID;
const apiKeyForEtherscan = process.env.ETHERSCAN_API_KEY;
const privateKey = process.env.PRIVATEKEY;
const optimizerEnabled = true;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 1,
          },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 1,
          },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 1,
          },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 1,
          },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 1,
          },
          evmVersion: "berlin",
        },
      },
    ],
  },
  abiExporter: {
    path: "./abis",
    clear: true,
    flat: true,
  },
  etherscan: {
    apiKey: apiKeyForEtherscan,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
  },
  mocha: {
    timeout: 30000,
  },
  networks: {
    hardhat: {
      chainId: 97, //bsctestnet
      allowUnlimitedContractSize: true,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    polygonmainnet: {
      url: `https://speedy-nodes-nyc.moralis.io/${projectId}/polygon/mainnet`,
      accounts: [privateKey],
    },
    mumbai: {
      url: `https://speedy-nodes-nyc.moralis.io/${projectId}/polygon/mumbai`,
      accounts: [privateKey],
    },
    ethermainnet: {
      url: `https://rpc.mevblocker.io`,
      accounts: [privateKey],
    },
    kovan: {
      url: `https://speedy-nodes-nyc.moralis.io/${projectId}/eth/kovan`,
      accounts: [privateKey],
    },
    rinkeby: {
      url: `https://speedy-nodes-nyc.moralis.io/${projectId}/eth/rinkeby`,
      accounts: [privateKey],
    },
    sepolia: {
      url: `https://eth-sepolia.public.blastapi.io`,
      accounts: [privateKey],
    },
    bscmainnet: {
      url: `https://bsc-dataseed2.ninicoin.io`,
      accounts: [privateKey],
    },
    fantom: {
      url: "https://rpc.ftm.tools/",
      accounts: [privateKey],
    },
    fantomtestnet: {
      url: "https://rpc.testnet.fantom.network",
      accounts: [privateKey],
    },
    bsctestnet: {
      url: `https://data-seed-prebsc-1-s3.binance.org:8545`,
      accounts: [privateKey],
    },
  },
};
