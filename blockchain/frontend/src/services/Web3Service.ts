import {Contract, ethers} from "ethers";
import RANDOM_ORCA_ABI from "./abis/abi.json";

const RANDOM_ORCA_ADDRESS:string = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;
const CHAIN_ID:number = parseInt(`${process.env.REACT_APP_CHAIN_ID}`);

export async function connectWallet(): Promise<string> {
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

export async function isConnected():Promise<boolean> {
    const accountZero = await connectWallet();
    return accountZero.length > 0;
}

export async function safeMint(author:string, content:string) : Promise<string | null>{
    if(!window.ethereum){
        throw new Error("Please, install your wallet in your browser");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);

    const contract = new ethers.Contract(RANDOM_ORCA_ADDRESS, RANDOM_ORCA_ABI, provider);

    const signer = await provider.getSigner();

    const instance = contract.connect(signer) as Contract;

    const tx = await instance.safeMint(author, content);

    return tx.hash;
}

export const getMessages = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RANDOM_ORCA_ADDRESS, RANDOM_ORCA_ABI, provider);
  
    try {
      const messages = await contract.getMessages();
      return messages.map((msg: any) => ({
        from: msg.from,
        author: msg.author,
        content: msg.content,
        tokenId: Number(msg.tokenId),
        timestamp: Number(msg.timestamp)
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };