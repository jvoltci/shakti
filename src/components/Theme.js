import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DA1F2',
    },
    secondary: {
      main: '#8899A6',
    },
    error: {
      main: '#E0245E',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8899A6',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '1.6rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      color: '#E1E8ED',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#8899A6',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});

export default theme;
