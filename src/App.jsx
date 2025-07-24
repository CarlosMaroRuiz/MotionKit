import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './core/context/AuthContext';
import routes from './routes';

function App() {
  const routing = useRoutes(routes);
  
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        {routing}
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;