import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonVariants, menuIconVariants, hamburgerIconVariants } from './utils/animations';

const MobileMenuButton = ({ isOpen, onClick }) => {
  return (
    <motion.button 
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.svg 
            key="close"
            className="h-6 w-6" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
            initial={{ rotate: 0, opacity: 0 }}
            animate={menuIconVariants.open}
            exit={menuIconVariants.closed}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </motion.svg>
        ) : (
          <motion.svg 
            key="menu"
            className="h-6 w-6" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
            initial={{ rotate: 0, opacity: 0 }}
            animate={hamburgerIconVariants.closed}
            exit={hamburgerIconVariants.open}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MobileMenuButton;