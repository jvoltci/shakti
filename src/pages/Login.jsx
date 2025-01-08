import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  styled,
} from '@mui/material';
import { Grid } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  maxWidth: 420,
  margin: 'auto',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
  },
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loggedInUser = await login({ username, password });
      if (loggedInUser) {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        alignItems="flext-start"
        style={{ minHeight: '100vh', paddingTop: 32 }}
      >
        <Grid item="true" xs={12} sm={8} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Please log in to continue.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={3}>
                <Grid item="true" xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                    InputLabelProps={{
                      style: { fontWeight: 'bold' },
                    }}
                  />
                </Grid>
                <Grid item="true" xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputLabelProps={{
                      style: { fontWeight: 'bold' },
                    }}
                  />
                </Grid>
                {error && (
                  <Grid item="true" xs={12}>
                    <Typography color="error" variant="body2">
                      {error}
                    </Typography>
                  </Grid>
                )}
                <Grid
                  item="true"
                  xs={12}
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{
                      padding: '12px',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      boxShadow: 2,
                      '&:hover': {
                        boxShadow: 6,
                        backgroundColor: '#1976d2',
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="secondary" /> : 'Login'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
