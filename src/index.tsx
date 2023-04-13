import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import { UIProvider } from 'app/context/ui';
import AlertManager from 'app/context/ui/alert/AlertManager';
import DrawerManager from 'app/context/ui/drawer/DrawerManager';
import ModalManager from 'app/context/ui/modal/ModalManager';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './app/context/auth';
import './app/languages';
import App from './app/layout/App';
import theme from './app/utils/theme';
import './index.css';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <UIProvider>
              <AuthProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <App />
                </Suspense>

                <ModalManager />
                <DrawerManager />
                <AlertManager />
              </AuthProvider>
            </UIProvider>
          </LocalizationProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
