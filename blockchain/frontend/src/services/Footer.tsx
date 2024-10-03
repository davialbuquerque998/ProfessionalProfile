import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.2)',  // Semi-transparent background
        py: 3, 
        mt: 'auto' 
      }}
    >
      <Typography 
        variant="body2" 
        color="text.secondary" 
        align="center" 
        sx={{ fontWeight: 'bold' }}  // Bolder text
      >
        &copy; {currentYear} Davi Arruda Navarro Albuquerque. All rights reserved.
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        align="center" 
        sx={{ fontWeight: 'bold' }}  // Bolder text
      >
        Random Orca NFT Minter | {' '}
        <Link 
          color="inherit" 
          href="https://davialbuquerque998.github.io/ProfessionalProfile/" 
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontWeight: 'bold' }}  // Bold link
        >
          Davi Albuquerque
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
