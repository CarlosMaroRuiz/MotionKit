import React from 'react';
import { motion } from 'framer-motion';
import { searchIconVariants, searchInputVariants } from './utils/animations';
import { useSearchStore } from '../../../../store/useSearchStore';

const SearchBox = ({ placeholder = "Buscar componentes..." }) => {
  const { openSearch } = useSearchStore();
  
  return (
    <motion.button 
      className="relative flex items-center w-64 pl-3 pr-3 py-2 border border-gray-700/50 hover:border-purple-500/50 rounded-full bg-gray-800/80 text-sm text-gray-400 focus:outline-none transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={openSearch}
    >
      <motion.svg 
        className="h-4 w-4 text-purple-400 mr-2" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor"
        variants={searchIconVariants}
        whileHover="hover"
        animate="animate"
      >
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
      </motion.svg>
      
      <span className="flex-1 text-left opacity-70">{placeholder}</span>
      
      {/* Indicador de atajo de teclado */}
      <span className="hidden lg:flex items-center justify-center px-2 py-0.5 ml-2 text-[10px] font-semibold text-gray-400 bg-gray-900 border border-gray-700 rounded shadow-sm">
        Ctrl K
      </span>
    </motion.button>
  );
};

export default SearchBox;