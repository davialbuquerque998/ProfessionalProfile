import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-3 bg-dark text-white text-center">
      <div className="container">
        <p>&copy; {currentYear} Davi Arruda Navarro Albuquerque. All rights reserved.</p>
        <p>Random Orca NFT Minter | <a href="https://davialbuquerque998.github.io/ProfessionalProfile/" target='_blank'>Davi Albuquerque</a></p>
      </div>
    </footer>
  );
};

export default Footer;