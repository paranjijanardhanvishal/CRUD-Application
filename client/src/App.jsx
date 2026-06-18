import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NetworkProvider } from './context/NetworkContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <NetworkProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </NetworkProvider>
  );
}

export default App;
