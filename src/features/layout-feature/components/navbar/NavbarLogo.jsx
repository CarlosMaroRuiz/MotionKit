import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logoVariants, logoContainerVariants, logoTextVariants } from './utils/animations';

const NavbarLogo = () => {
  return (
    <motion.div 
      className="flex-shrink-0"
      variants={logoVariants}
      initial="initial"
      whileHover="hover"
    >
      <div className="flex items-center">
        <motion.div 
          className="h-9 w-9 bg-purple-600 rounded-lg flex items-center justify-center mr-2 purple-glow"
          variants={logoContainerVariants}
          whileHover="hover"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.div>
        <NavLink to="/" className="text-xl font-bold text-white hover:text-purple-300 transition-colors duration-300">
          <motion.span 
            variants={logoTextVariants}
            whileHover="hover"
          >
            Motion Kit
          </motion.span>
        </NavLink>
      </div>
    </motion.div>
  );
};

export default NavbarLogo;