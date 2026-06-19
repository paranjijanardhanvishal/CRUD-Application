import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme.css';
import { NetworkProvider } from './context/NetworkContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NetworkProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </NetworkProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
