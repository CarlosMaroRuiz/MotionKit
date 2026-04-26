import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import routes from './routes';
import SearchModal from './core/search/components/SearchModal';

function App() {
  const routing = useRoutes(routes);
  
  return (
    <>
      <SearchModal />
      <AnimatePresence mode="wait">
        {routing}
      </AnimatePresence>
    </>
  );
}

export default App;