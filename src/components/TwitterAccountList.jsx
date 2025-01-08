import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, List, ListItem, ListItemText, Switch, Typography, Skeleton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchAccounts, deleteAccount, deactivateAccount } from '../redux/features/accountSlice';

const TwitterAccountList = () => {
  const dispatch = useDispatch();
  const { accounts, loading, accountLoading } = useSelector((state) => state.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleDelete = (username) => {
    dispatch(deleteAccount(username));
  };

  const handleDeactivate = (username) => {
    dispatch(deactivateAccount(username));
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
              <ListItem
                key={account.username}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'nowrap',
                }}
              >
                {/* Left Section: Username and Status */}
                <ListItemText
                  primary={
                    <Typography
                      noWrap
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      @{account.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      noWrap
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {account.active ? 'Active' : 'Inactive'}
                    </Typography>
                  }
                  sx={{ flex: 1, minWidth: 0 }}
                />

                {/* Middle Section: Switch */}
                <Switch
                  checked={account.active}
                  onChange={() => handleDeactivate(account.username)}
                  size="small"
                  disabled={!!accountLoading[account.username]}
                  sx={{ ml: 2 }}
                />

                {/* Right Section: Delete Icon */}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDelete(account.username)}
                  disabled={!!accountLoading[account.username]}
                  sx={{ ml: 2 }}
                >
                  {accountLoading[account.username] ? (
                    <CircularProgress size={24} />
                  ) : (
                    <DeleteIcon />
                  )}
                </IconButton>
              </ListItem>
            ))}
      </List>
    </Box>
  );
};

export default TwitterAccountList;
