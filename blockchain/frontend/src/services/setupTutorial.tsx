import React, { useState, ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  name: string;
}

const SetupTutorial: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string): void => {
    setOpenSection(openSection === section ? null : section);
  };

  const Section: React.FC<SectionProps> = ({ title, children, name }) => (
    <div>
      <button onClick={() => toggleSection(name)}>
        <span>{title}</span>
        {openSection === name ? '▲' : '▼'}
      </button>
      {openSection === name && (
        <div>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2>MetaMask and Holesky Testnet Setup Guide</h2>
      
      <div>
        <p>Before you can start minting NFTs, you'll need to set up MetaMask and connect to the Holesky Ethereum testnet.</p>
      </div>

      <Section title="1. Install MetaMask" name="install">
        <ol>
          <li>Visit the <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">MetaMask website</a>.</li>
          <li>Click on "Install MetaMask for [Your Browser]".</li>
          <li>Follow the installation prompts in your browser.</li>
          <li>Once installed, click on the MetaMask extension icon and follow the setup wizard to create a new wallet.</li>
        </ol>
      </Section>

      <Section title="2. Add Holesky Testnet to MetaMask" name="add-network">
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
      </Section>

      <Section title="3. Get Holesky Testnet ETH" name="get-eth">
        <ol>
          <li>Ensure you're connected to the Holesky network in MetaMask.</li>
          <li>Copy your wallet address by clicking on your account name in MetaMask.</li>
          <li>Visit the <a href="https://cloud.google.com/application/web3/faucet/ethereum/holesky" target="_blank" rel="noopener noreferrer">Holesky Faucet</a>.</li>
          <li>Paste your wallet address into the faucet and complete any verification steps.</li>
          <li>Click "Send me ETH" to receive testnet ETH.</li>
        </ol>
      </Section>

      <Section title="4. Connect to the Dapp" name="connect">
        <ol>
          <li>Return to our Dapp page.</li>
          <li>Click the "Connect Wallet" button.</li>
          <li>Select your MetaMask account when prompted.</li>
          <li>You're now connected and ready to mint NFTs!</li>
        </ol>
      </Section>

      <p>
        Remember, testnet ETH has no real value and is only for testing purposes. Happy minting!
      </p>
    </div>
  );
};

export default SetupTutorial;