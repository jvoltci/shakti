import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from '../services/api';

const AddTwitterAccount = () => {
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleAddAccount = async () => {
    try {
      const response = await axios.post('/x/account', { username });
      setFeedback({ type: 'success', message: response.data.message });
      setUsername('');
    } catch (error) {
      setFeedback({ type: 'error', message: error.response?.data?.message || 'Error adding account' });
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: 400 },
        bgcolor: 'background.paper',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: '#c9c0bf' }}>
        Add Twitter Account
      </Typography>

      <TextField
        fullWidth
        label="Twitter Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
      {feedback && <Alert severity={feedback.type}>{feedback.message}</Alert>}
      <Button variant="contained" fullWidth onClick={handleAddAccount}>
        Add Account
      </Button>
    </Box>
  );
};

export default AddTwitterAccount;
