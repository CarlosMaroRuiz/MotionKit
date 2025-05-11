import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GradientButton = ({ 
  children, 
  href, 
  onClick,
  className = "",
  from = "from-purple-700", 
  via = "via-purple-600", 
  to = "to-purple-700",
  shadow = "shadow-purple-900/30",
  starEffect = true
}) => {
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 0 35px rgba(147, 51, 234, 0.7)",
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 500
      }
    },
    tap: {
      scale: 0.97,
      y: 0,
      boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)",
    }
  };
  
  return (
    <motion.a
      href={href} 
      onClick={onClick}
      className={`w-full sm:w-auto px-8 py-4 bg-gradient-to-r ${from} ${via} ${to} rounded-full text-white font-medium shadow-lg ${shadow} font-inter relative overflow-hidden ${className} flex justify-center items-center`}
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Estrellas en hover del botón */}
      {starEffect && (
        <AnimatePresence>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/80"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0 }}
              exit={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                x: [(i % 2 === 0 ? 10 : -10) * Math.random() * 3, (i % 2 === 0 ? 30 : -30) * Math.random() * 3],
                y: [-5, -20 * Math.random() * 3],
              }}
              transition={{ duration: 0.8 + Math.random() * 0.5 }}
              style={{
                left: `${35 + i * 5}%`,
                top: '80%'
              }}
            />
          ))}
        </AnimatePresence>
      )}
      
      {/* Glow effect on hover */}
      <motion.span 
        className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/30 to-purple-600/0"
        initial={{ opacity: 0, scale: 0.85 }}
        whileHover={{ 
          opacity: 1, 
          scale: 1.05,
          x: ["0%", "100%"]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity 
        }}
      />
      
      <span className="relative z-10">
        {children}
      </span>
    </motion.a>
  );
};

export default GradientButton;