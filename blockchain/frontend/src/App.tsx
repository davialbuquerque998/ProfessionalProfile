import React, { useState, useEffect } from "react";
import { connectWallet, safeMint, getMessages } from "./services/Web3Service";
import SetupTutorial from "./services/setupTutorial";
import Header from "./services/Header"; // Add this import
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
  Divider,
  Backdrop,
  CircularProgress,
  Fade,
  Alert,
  AlertTitle,
  useScrollTrigger,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SnackbarProvider, useSnackbar } from "notistack";

interface Message {
  from: string;
  author: string;
  content: string;
  tokenId: number;
  timestamp: number;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#0a1929",
      paper: "#0d2137",
    },
  },
});

const ParallaxBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundImage: "url(/orca-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: trigger ? `translateY(${window.scrollY * 0.5}px)` : "none",
        transition: "transform 0.3s ease-out",
        zIndex: -1,
      }}
    >
      {children}
    </Box>
  );
};

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isConnected) {
      fetchMessages();
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

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
      enqueueSnackbar("Failed to fetch messages. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setIsConnected(false);
      setAccount(null);
      enqueueSnackbar("Wallet disconnected", { variant: "info" });
    } else {
      setIsConnected(true);
      setAccount(accounts[0]);
      enqueueSnackbar("Wallet connected", { variant: "success" });
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const connectedAccount = await connectWallet();
      if (connectedAccount) {
        setIsConnected(true);
        setAccount(connectedAccount);
        enqueueSnackbar("Wallet connected successfully!", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      enqueueSnackbar("Failed to connect wallet. Please try again.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMint = async () => {
    if (!author || !content) {
      enqueueSnackbar("Please enter both author and content.", {
        variant: "warning",
      });
      return;
    }
    setIsLoading(true);
    try {
      await safeMint(author, content);
      setAlertType("success");
      setAlertMessage(
        "Please be patient as the blockchain confirms the transaction."
      );
      setShowAlert(true);
      setAuthor("");
      setContent("");
      fetchMessages();
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      setAlertType("error");
      setAlertMessage("Failed to mint NFT. Please try again.");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ParallaxBackground>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(10, 25, 41, 0.7)", // Darkens the background image
          }}
        />
      </ParallaxBackground>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative", // Ensures content is above the background
          zIndex: 1,
        }}
      >
        <Header />
        <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Fade in={true} timeout={1000}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              align="center"
              sx={{ color: "primary.light" }}
            >
              Welcome to the Random Orca NFT Minter!
            </Typography>
          </Fade>
          {isConnected ? (
            <Box sx={{ mt: 4 }}>
              <Paper
                elevation={0} // Remove any shadow to make it completely flat
                sx={{ p: 3, mb: 4, backgroundColor: "transparent" }} // Make the background transparent
              >
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }} // Set bold font weight and new font
                >
                  This Dapp allows you to share your thoughts, compliments, or
                  suggestions with me as I continue to develop my blockchain
                  projects. Simply write a message, and as a token of
                  appreciation, you will receive a unique and playful Orca NFT
                  directly to your wallet!
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }} // Apply the same style to all paragraphs
                >
                  Whether you'd like to give feedback on my work or just say
                  hello, your message matters. Once submitted, your NFT will be
                  minted to commemorate your contribution.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }} // Apply the same style here
                >
                  Connect your wallet, send me a message, and claim your very
                  own Orca NFT—it’s easy, fun, and completely free on the
                  testnet!
                </Typography>
              </Paper>

              <Typography variant="h6" sx={{ mb: 2 }}>
                Connected Account:{" "}
                <Box component="span" sx={{ fontFamily: "monospace" }}>
                  {`${account?.slice(0, 12)}...`}
                </Box>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  mb: 4,
                }}
              >
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
                <LoadingButton
                  variant="contained"
                  color="primary"
                  onClick={handleMint}
                  loading={isLoading}
                  sx={{ minWidth: "120px" }}
                >
                  Mint NFT
                </LoadingButton>
              </Box>
              {showAlert && (
                <Fade in={showAlert}>
                  <Alert
                    severity={alertType}
                    onClose={() => setShowAlert(false)}
                    sx={{ mb: 2 }}
                  >
                    <AlertTitle>
                      {alertType === "success" ? "Success" : "Error"}
                    </AlertTitle>
                    {alertMessage}
                  </Alert>
                </Fade>
              )}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Messages
                </Typography>
                <Paper
                  elevation={0}
                  sx={{ p: 2, backgroundColor: "transparent" }}
                >
                  {" "}
                  {/* Transparent Paper */}
                  <List>
                    {messages
                      .slice()
                      .reverse()
                      .map((message, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && (
                            <Divider sx={{ backgroundColor: "transparent" }} />
                          )}{" "}
                          {/* Transparent Divider */}
                          <ListItem
                            alignItems="flex-start"
                            sx={{
                              backgroundColor: "transparent",
                              transition:
                                "background-color 0.3s, transform 0.3s", // Smooth transition for background color and transform
                              "&:hover": {
                                backgroundColor: "rgba(144, 202, 249, 0.2)", // Light blue background on hover
                                transform: "scale(1.02)", // Slightly scale the item on hover
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Add a subtle shadow on hover
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  sx={{ fontWeight: "bold" }}
                                >
                                  Author: {message.author}
                                </Typography>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    Content: {message.content}
                                  </Typography>
                                  <br />
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    Address: {message.from}
                                  </Typography>
                                  <br />
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    Token ID: {message.tokenId.toString()}
                                  </Typography>
                                  <br />
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    Timestamp:{" "}
                                    {new Date(
                                      message.timestamp * 1000
                                    ).toLocaleString()}
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
            </Box>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Paper
                elevation={3}
                sx={{ p: 3, mb: 4, backgroundColor: "rgba(13, 33, 55, 0.8)" }}
              >
                <SetupTutorial />
              </Paper>
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={handleConnect}
                loading={isLoading}
                sx={{ mt: 4 }}
              >
                Connect Wallet
              </LoadingButton>
            </Box>
          )}
        </Container>
        <Footer />
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
};

const AppWrapper: React.FC = () => (
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);

export default AppWrapper;
