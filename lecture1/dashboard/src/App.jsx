import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardPage />
    </ThemeProvider>
  );
}

export default App;
