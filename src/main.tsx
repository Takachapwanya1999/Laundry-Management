
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { blue, lightBlue } from '@mui/material/colors';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BranchProvider } from './context/BranchContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[700],
      light: blue[500],
      dark: blue[800],
      contrastText: '#fff',
    },
    secondary: {
      main: lightBlue[600],
      light: lightBlue[400],
      dark: lightBlue[800],
      contrastText: '#fff',
    },
    background: {
      default: '#f6f9ff',
      paper: '#ffffff',
    },
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <BranchProvider>
            <App />
          </BranchProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
