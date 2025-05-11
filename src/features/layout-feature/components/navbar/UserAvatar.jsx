import React from 'react';
import { motion } from 'framer-motion';
import { buttonVariants } from './utils/animations';

const UserAvatar = ({ 
  text = "MK", 
  size = "small",
  className = ""
}) => {
  // Determinar tamaño según prop
  let sizeClasses = "";
  switch (size) {
    case "small":
      sizeClasses = "h-8 w-8 text-sm";
      break;
    case "medium":
      sizeClasses = "h-10 w-10 text-base";
      break;
    case "large":
      sizeClasses = "h-12 w-12 text-lg";
      break;
    default:
      sizeClasses = "h-8 w-8 text-sm";
  }

  return (
    <motion.div 
      className={`relative ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.button 
        className={`${sizeClasses} rounded-full bg-purple-700 flex items-center justify-center text-white font-medium border border-purple-500 hover:bg-purple-600 transition-colors duration-300`}
        whileHover={{
          boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)"
        }}
      >
        {text}
      </motion.button>
    </motion.div>
  );
};

export default UserAvatar;