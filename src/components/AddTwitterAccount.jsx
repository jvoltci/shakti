import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addAccount } from '../redux/features/accountSlice';

const AddTwitterAccount = () => {
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleAddAccount = async () => {
    try {
      setLoading(true);
      const result = await dispatch(addAccount(username)).unwrap();
      setFeedback({ type: 'success', message: `Account @${result.username} added successfully.` });
      setUsername('');
      setTimeout(() => {
        setFeedback(null);
      }, 3000);
    } catch (error) {
      setFeedback({ type: 'error', message: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 400 }, bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#c9c0bf' }}>Add Twitter Account</Typography>
      <TextField fullWidth label="Twitter Username" variant="outlined" disabled={loading} value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2 }} />
      {feedback && <Alert severity={feedback.type}>{feedback.message}</Alert>}
      <Button variant="contained" fullWidth onClick={handleAddAccount}> {loading ? <CircularProgress color='white' size={24} /> : 'Add Account'}</Button>
    </Box>
  );
};

export default AddTwitterAccount;
