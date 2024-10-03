import React, { useState } from 'react';
import { 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Link 
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
        Before you can start minting NFTs, you'll need to set up MetaMask and connect to the Holesky Ethereum testnet.
      </Typography>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">1. Install MetaMask</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>Visit the <Link href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">MetaMask website</Link>.</li>
            <li>Click on "Install MetaMask for [Your Browser]".</li>
            <li>Follow the installation prompts in your browser.</li>
            <li>Once installed, click on the MetaMask extension icon and follow the setup wizard to create a new wallet.</li>
          </ol>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">2. Add Holesky Testnet to MetaMask</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>Open MetaMask and click on the network dropdown at the top of the extension.</li>
            <li>Scroll down and click on "Add network".</li>
            <li>In the "Add a network manually" section, enter the following details:
              <ul>
                <li>Network Name: Holesky</li>
                <li>New RPC URL: https://ethereum-holesky.publicnode.com</li>
                <li>Chain ID: 17000</li>
                <li>Currency Symbol: ETH</li>
                <li>Block Explorer URL: https://holesky.etherscan.io</li>
              </ul>
            </li>
            <li>Click "Save".</li>
          </ol>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">3. Get Holesky Testnet ETH</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>Ensure you're connected to the Holesky network in MetaMask.</li>
            <li>Copy your wallet address by clicking on your account name in MetaMask.</li>
            <li>Visit the <Link href="https://cloud.google.com/application/web3/faucet/ethereum/holesky" target="_blank" rel="noopener noreferrer">Holesky Faucet</Link>.</li>
            <li>Paste your wallet address into the faucet and complete any verification steps.</li>
            <li>Click "Send me ETH" to receive testnet ETH.</li>
          </ol>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">4. Connect to the Dapp</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>Return to our Dapp page.</li>
            <li>Click the "Connect Wallet" button.</li>
            <li>Select your MetaMask account when prompted.</li>
            <li>You're now connected and ready to mint NFTs!</li>
          </ol>
        </AccordionDetails>
      </Accordion>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Remember, testnet ETH has no real value and is only for testing purposes. Happy minting!
      </Typography>
    </div>
  );
};

export default SetupTutorial;