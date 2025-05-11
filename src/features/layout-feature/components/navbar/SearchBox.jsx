import React from 'react';
import { motion } from 'framer-motion';
import { searchIconVariants, searchInputVariants } from './utils/animations';

const SearchBox = ({ placeholder = "Buscar componentes..." }) => {
  return (
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <motion.svg 
          className="h-5 w-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          variants={searchIconVariants}
          whileHover="hover"
          animate="animate"
        >
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </motion.svg>
      </div>
      <motion.input 
        type="text" 
        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-full bg-gray-800 focus:ring-purple-500 focus:border-purple-500 text-sm text-gray-300" 
        placeholder={placeholder}
        variants={searchInputVariants}
        whileFocus="focus"
      />
    </motion.div>
  );
};

export default SearchBox;