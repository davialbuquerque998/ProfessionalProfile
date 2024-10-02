import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const MNEMONIC:string = `${process.env.MNEMONIC}`;
const SEPOLIA_RPC_URL:string = `${process.env.SEPOLIA_RPC_URL}`;
const HOLESKY_RPC_URL:string = `${process.env.HOLESKY_RPC_URL}`;
const ETHERSCAN_API_KEY:string = `${process.env.ETHERSCAN_API_KEY}`;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545"
    },
    sepolia:{
      accounts:{
        mnemonic:MNEMONIC
      },
      url:SEPOLIA_RPC_URL
    },

    holesky:{
      accounts:{
        mnemonic:MNEMONIC
      },
      url:HOLESKY_RPC_URL,
      chainId: 17000
    }
  },
  etherscan:{
    apiKey:ETHERSCAN_API_KEY
  },
  

};

export default config;
