import React from 'react';
import AddTwitterAccount from '../components/AddTwitterAccount';
import TwitterAccountList from '../components/TwitterAccountList';
import { Box, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { Grid } from '@mui/system';

const HomePage = () => {
  const { logout } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pb: 4 }}>
      {/* Logout Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={logout}
          color="error"
          sx={{
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
              bgcolor: 'error.main',
              color: 'white',
            },
          }}
        >
          <LogoutIcon fontSize="small" />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            Logout
          </Typography>
        </IconButton>
      </Box>

      {/* Main Content */}
      <Grid
        container
        spacing={2}
        sx={{
          mt: 8,
          px: { xs: 2, md: 4 },
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        {/* Add Twitter Account Section */}
        <Grid
          item="true"
          xs={12}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            minHeight: { xs: 'auto', md: '300px' },
            py: { xs: 2, md: 4 },
          }}
        >
          <AddTwitterAccount />
        </Grid>

        {/* Twitter Account List Section */}
        <Grid
          item="true"
          xs={12}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            minHeight: { xs: 'auto', md: '300px' },
            py: { xs: 2, md: 4 },
          }}
        >
          <TwitterAccountList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
