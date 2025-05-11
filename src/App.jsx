import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import routes from './routes';

function App() {
  const routing = useRoutes(routes);
  
  return (
    <AnimatePresence mode="wait">
      {routing}
    </AnimatePresence>
  );
}

export default App;