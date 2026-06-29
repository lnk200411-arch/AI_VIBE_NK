import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#72E040',
      light: '#A8F07A',
      dark: '#50B828',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E84228',
      dark: '#C43020',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#888888',
    },
    background: {
      default: '#FFFAF5',
      paper: '#FFFFFF',
    },
    divider: '#D4C4B0',
  },
  typography: {
    fontFamily: '"Inter", "Noto Sans KR", sans-serif',
    h1: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 },
    h2: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.4 },
    h3: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.6 },
    caption: { fontSize: '0.6875rem', fontWeight: 500, lineHeight: 1.4 },
  },
  spacing: 8,
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: '24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontSize: '0.6875rem',
          fontWeight: 600,
          height: '20px',
        },
      },
    },
  },
});

export default theme;
