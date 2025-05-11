import React from 'react';
import { motion } from 'framer-motion';

const SecondaryButton = ({ 
  children, 
  href, 
  className = "",
  delay = 1,
  shadow = "shadow-indigo-900/30"
}) => {
  
  const button2Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: delay,
        duration: 0.5,
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)",
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 500
      }
    },
    tap: {
      scale: 0.97,
      y: 0,
      boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)",
    }
  };
  
  return (
    <motion.a
      href={href} 
      className={`w-full sm:w-auto px-8 py-4 bg-gray-800/70 rounded-full text-gray-300 font-medium border border-purple-900/20 font-inter backdrop-blur-sm ${className} flex justify-center items-center`}
      variants={button2Variants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <span className="relative z-10">
        {children}
      </span>
    </motion.a>
  );
};

export default SecondaryButton;