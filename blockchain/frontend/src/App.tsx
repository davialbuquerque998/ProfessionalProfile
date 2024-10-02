import React, { useState, useEffect } from 'react';
import { connectWallet, safeMint, isConnected } from "./services/Web3Service";

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    checkConnection();

    // Add event listener for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setIsConnected(true);
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Failed to check connection:", error);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setIsConnected(false);
      setAccount(null);
    } else {
      // User switched to a different account
      setIsConnected(true);
      setAccount(accounts[0]);
    }
  };

  const handleConnect = async () => {
    try {
      const connectedAccount = await connectWallet();
      if (connectedAccount) {
        setIsConnected(true);
        setAccount(connectedAccount);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleMint = async () => {
    if (!author || !content) {
      alert("Please enter both author and content.");
      return;
    }
    try {
      await safeMint(author, content);
      alert("NFT minted successfully!");
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      alert("Failed to mint NFT. Please try again.");
    }
  };

  return (
    <div>
      <h1>Random Orca NFT Minter</h1>
      {isConnected ? (
        <div>
          <p>Connected Account: {account}</p>
          <div>
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleMint}>
              Mint NFT
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handleConnect}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default App;