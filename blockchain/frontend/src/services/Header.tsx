import React from 'react';
import { AppBar, Toolbar, Typography, Link, Box } from '@mui/material';

const Header: React.FC = () => {
  const handleWelcomeClick = () => {
    window.location.reload();
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(13, 33, 55, 0.8)',
        backdropFilter: 'blur(5px)', // This adds a blur effect to the background
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            color="inherit"
            underline="none"
            onClick={handleWelcomeClick}
            sx={{ cursor: 'pointer' }}
          >
            Welcome
          </Link>
        </Typography>
        <Box>
          <Link
            color="inherit"
            href="https://davialbuquerque998.github.io/ProfessionalProfile/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Contact
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;