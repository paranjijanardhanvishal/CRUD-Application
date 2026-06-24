import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme.css';
import { NetworkProvider } from './context/NetworkContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <NetworkProvider>
        <BrowserRouter>
          <LoadingProvider>
            <AppRoutes />
          </LoadingProvider>
        </BrowserRouter>
      </NetworkProvider>
    </AuthProvider>
  );
}

export default App;
