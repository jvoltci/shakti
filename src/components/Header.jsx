import React from 'react';
import { useMediaQuery, Box, Typography } from '@mui/material';

const Header = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          p: 2,
          background: 'linear-gradient(135deg, #000000, #1DA1F2)',
          color: '#FFFFFF',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
          borderRadius: 2,
          display: 'inline-block',
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h3'}
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #FBB03B, #E0245E, #1DA1F2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
          }}
        >
          Panchayat
        </Typography>
        <Typography
          variant={isMobile ? 'subtitle1' : 'h5'}
          sx={{
            fontWeight: 500,
            color: '#FFFFFF',
            mt: 1,
          }}
        >
          X Pilot
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
