import React, { useState, useEffect } from "react";
import { connectWallet, safeMint, getMessages } from "./services/Web3Service";
import SetupTutorial from "./services/setupTutorial";
import Footer from "./services/Footer";
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider 
} from "@mui/material";

interface Message {
  from: string;
  author: string;
  content: string;
  tokenId: number;
  timestamp: number;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#0a1929',
      paper: '#0d2137',
    },
  },
});

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (isConnected) {
      fetchMessages();
    }

    // Add event listener for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [isConnected]);

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
      setAuthor("");
      setContent("");
      fetchMessages();
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      alert("Failed to mint NFT. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #0a1929 0%, #0d2137 100%)'
        }}
      >
        <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ color: 'primary.light' }}>
            Welcome to the Random Orca NFT Minter!
          </Typography>
          {isConnected ? (
            <Box sx={{ mt: 4 }}>
              <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'background.paper' }}>
                <Typography variant="body1" paragraph>
                  This Dapp allows you to share your thoughts, compliments, or
                  suggestions with me as I continue to develop my blockchain
                  projects. Simply write a message, and as a token of appreciation,
                  you will receive a unique and playful Orca NFT directly to your
                  wallet!
                </Typography>
                <Typography variant="body1" paragraph>
                  Whether you'd like to give feedback on my work or just say hello,
                  your message matters. Once submitted, your NFT will be minted to
                  commemorate your contribution.
                </Typography>
                <Typography variant="body1">
                  Connect your wallet, send me a message, and claim your very own
                  Orca NFT—it's easy, fun, and completely free on the testnet!
                </Typography>
              </Paper>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Connected Account: <Box component="span" sx={{ fontFamily: 'monospace' }}>{account}</Box>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
                <TextField
                  fullWidth
                  label="Your name"
                  variant="outlined"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Your message"
                  variant="outlined"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMint}
                  sx={{ minWidth: '120px' }}
                >
                  Mint NFT
                </Button>
              </Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Messages
              </Typography>
              <Paper elevation={3} sx={{ p: 2, backgroundColor: 'background.paper' }}>
                <List>
                  {messages.slice().reverse().map((message, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <Divider />}
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={`Author: ${message.author}`}
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.primary">
                                Content: {message.content}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2">
                                Address: {message.from}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2">
                                Token ID: {message.tokenId.toString()}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2">
                                Timestamp: {new Date(message.timestamp * 1000).toLocaleString()}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SetupTutorial />
              <Button
                variant="contained"
                color="primary"
                onClick={handleConnect}
                sx={{ mt: 4 }}
              >
                Connect Wallet
              </Button>
            </Box>
          )}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );

};

export default App;
