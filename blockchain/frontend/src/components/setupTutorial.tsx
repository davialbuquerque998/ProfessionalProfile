import React, { useState } from 'react';
import { 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Link,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SetupTutorial: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ color: 'primary.light' }}>
        MetaMask and Holesky Testnet Setup Guide
      </Typography>
      
      <Typography variant="body1" paragraph>
        Before you can start minting NFTs, you will need to set up MetaMask and connect to the Holesky Ethereum testnet.
      </Typography>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">1. Install MetaMask</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText primary="Visit the MetaMask website." secondary={
                <Link href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
                  https://metamask.io/download/
                </Link>
              } />
            </ListItem>
            <ListItem>
              <ListItemText primary='Click on "Install MetaMask for [Your Browser]".' />
            </ListItem>
            <ListItem>
              <ListItemText primary="Follow the installation prompts in your browser." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Once installed, click on the MetaMask extension icon and follow the setup wizard to create a new wallet." />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">2. Add Holesky Testnet to MetaMask</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText primary="Open MetaMask and click on the network dropdown at the top of the extension." />
            </ListItem>
            <ListItem>
              <ListItemText primary='Scroll down and click on "Add network".' />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary='In the "Add a network manually" section, enter the following details:'
                secondary={
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Network Name: Holesky" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="New RPC URL: https://ethereum-holesky.publicnode.com" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Chain ID: 17000" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Currency Symbol: ETH" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Block Explorer URL: https://holesky.etherscan.io" />
                    </ListItem>
                  </List>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary='Click "Save".' />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">3. Get Holesky Testnet ETH</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText primary="Ensure you're connected to the Holesky network in MetaMask." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Copy your wallet address by clicking on your account name in MetaMask." />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Visit the Holesky Faucet." 
                secondary={
                  <Link href="https://cloud.google.com/application/web3/faucet/ethereum/holesky" target="_blank" rel="noopener noreferrer">
                    https://cloud.google.com/application/web3/faucet/ethereum/holesky
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Paste your wallet address into the faucet and complete any verification steps." />
            </ListItem>
            <ListItem>
              <ListItemText primary='Click "Send me ETH" to receive testnet ETH.' />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">4. Connect to the Dapp</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText primary="Return to our Dapp page." />
            </ListItem>
            <ListItem>
              <ListItemText primary='Click the "Connect Wallet" button.' />
            </ListItem>
            <ListItem>
              <ListItemText primary="Select your MetaMask account when prompted." />
            </ListItem>
            <ListItem>
              <ListItemText primary="You're now connected and ready to mint NFTs!" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Remember, testnet ETH has no real value and is only for testing purposes!
      </Typography>
    </div>
  );
};

export default SetupTutorial;
