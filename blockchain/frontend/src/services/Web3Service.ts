import {ethers} from "ethers";
import RANDOM_ORCA_ABI from "./abis/abi.json";

const RANDOM_ORCA_ADDRESS:string = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;
const CHAIN_ID:number = parseInt(`${process.env.REACT_APP_CHAIN_ID}`);

export async function connectWallet() {
    if(!window.ethereum){
        throw new Error("Please, install your wallet in your browser");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);

    const accounts:string[] = await provider.send("eth_requestAccounts", []);

    if(!accounts || !accounts.length){
        throw new Error("Permission denied!");
    }

    await provider.send("wallet_switchEthereumChain", [{
        chainId:ethers.toBeHex(CHAIN_ID)
    }]);

    return accounts[0];
}

