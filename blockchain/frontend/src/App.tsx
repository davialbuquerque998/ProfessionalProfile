import React, { useState, useEffect } from 'react';
import { connectWallet, safeMint, isConnected, getMessages } from "./services/Web3Service";
import SetupTutorial from './services/setupTutorial';
import Footer from './services/Footer';

interface Message {
  from: string;
  author: string;
  content: string;
  tokenId: number;
  timestamp: number;
}

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    checkConnection();
    fetchMessages();

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

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
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
      fetchMessages();
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      alert("Failed to mint NFT. Please try again.");
    }
  };

  return (
    <>
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
          <div>
          <h2>Messages</h2>
          <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
            {messages.slice().reverse().map((message, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <p><strong>Address:</strong> {message.from}</p>
                <p><strong>Author:</strong> {message.author}</p>
                <p><strong>Content:</strong> {message.content}</p>
                <p><strong>Token ID:</strong> {message.tokenId.toString()}</p>
                <p><strong>Timestamp:</strong> {new Date(message.timestamp * 1000).toLocaleString()}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
        </div>
      ) : (
        <>
          <SetupTutorial/>
          <button onClick={handleConnect}>
            Connect Wallet
          </button>
        </>
      )}
    </div>
    
    <Footer/>
    </>
    
  );
};

export default App;