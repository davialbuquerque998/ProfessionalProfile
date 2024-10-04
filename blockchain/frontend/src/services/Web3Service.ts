import {Contract, ethers} from "ethers";
import RANDOM_ORCA_ABI from "./abis/abi.json";

export const RANDOM_ORCA_ADDRESS:string = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;
const CHAIN_ID:number = parseInt(`${process.env.REACT_APP_CHAIN_ID}`);

const HOLESKY_NETWORK_PARAMS = {
  chainId: ethers.toBeHex(17000),
  chainName: "Holesky",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://ethereum-holesky.publicnode.com"],
  blockExplorerUrls: ["https://holesky.etherscan.io"],
};

export async function connectWallet(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask in your browser");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  try {
    // Request account access
    const accounts: string[] = await provider.send("eth_requestAccounts", []);

    if (!accounts || !accounts.length) {
      throw new Error("Permission denied!");
    }

    // Check if we're on the correct network
    const network = await provider.getNetwork();
    if (network.chainId !== BigInt(CHAIN_ID)) {
      try {
        // Try to switch to the Holesky network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.toBeHex(CHAIN_ID) }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            // Add the Holesky network to MetaMask
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [HOLESKY_NETWORK_PARAMS],
            });
          } catch (addError) {
            throw new Error("Failed to add the Holesky network to MetaMask");
          }
        } else {
          throw new Error("Failed to switch to the Holesky network");
        }
      }
    }

    // Refresh the provider after network change
    const updatedProvider = new ethers.BrowserProvider(window.ethereum);
    const updatedAccounts = await updatedProvider.listAccounts();

    return updatedAccounts[0].address;
  } catch (error) {
    console.error("Error in connectWallet:", error);
    throw error;
  }
}
export async function safeMint(author:string, content:string): Promise<{ hash: string, imageId: number }> {
  if(!window.ethereum){
      throw new Error("Please, install your wallet in your browser");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);

  const contract = new ethers.Contract(RANDOM_ORCA_ADDRESS, RANDOM_ORCA_ABI, provider);

  const signer = await provider.getSigner();

  const instance = contract.connect(signer) as Contract;

  const tx = await instance.safeMint(author, content);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();

  // Find the MessagePosted event in the transaction receipt
  const event = receipt.logs.find(
    (log: any) => log.topics[0] === ethers.id("MessagePosted(address,string,string,uint256,uint256,uint256)")
  );

  if (!event) {
    throw new Error("MessagePosted event not found in transaction receipt");
  }

  // Decode the event data
  const decodedEvent = contract.interface.parseLog({ topics: event.topics, data: event.data });

  // Extract the imageId from the event
  const imageId = decodedEvent?.args?.imageId;

  return { hash: tx.hash, imageId: Number(imageId) };
}

export const getMessages = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RANDOM_ORCA_ADDRESS, RANDOM_ORCA_ABI, provider);
  
    try {
      const messages = await contract.getMessages();
      return messages.map((msg: any) => ({
        from: `${msg.from.slice(0, 9)}...`,
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