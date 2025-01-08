import React, { useEffect, useState } from 'react';
import { Box, IconButton, List, ListItem, ListItemText, Switch, Typography, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
import axios from '../services/api';

const TwitterAccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/x/account');
        setAccounts(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleDelete = async (username) => {
    try {
      await axios.delete(`/x/account/${username}`);
      setAccounts((prev) => prev.filter((account) => account.username !== username));
    } catch (error) {
      console.error(`Failed to delete account @${username}:`, error.message);
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
        Twitter Accounts
      </Typography>
      <List>
        {loading
          ? Array.from(new Array(5)).map((_, index) => (
              <ListItem key={index}>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="rectangular" width={40} height={24} sx={{ ml: 2 }} />
              </ListItem>
            ))
          : accounts.map((account) => (
              <ListItem key={account.username} secondaryAction={
                <>
                  <Switch
                    checked={account.active}
                    onChange={async () => {
                      await axios.get(`/x/account/${account.username}/active`);
                      setAccounts((prev) =>
                        prev.map((acc) =>
                          acc.username === account.username
                            ? { ...acc, active: !acc.active }
                            : acc
                        )
                      );
                    }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(account.username)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText
                  primary={`@${account.username}`}
                  secondary={account.active ? 'Active' : 'Inactive'}
                />
              </ListItem>
            ))}
      </List>
    </Box>
  );
};

export default TwitterAccountList;
