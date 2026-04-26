import React from 'react';
import { motion } from 'framer-motion';
import { useAnimatedCounter } from './hooks/useAnimatedCounter';

const AnimatedCounter = ({ 
  value, 
  label, 
  index = 0, 
  animationDelay = 0.2,
  prefix = "",
  suffix = "+" 
}) => {
  const count = useAnimatedCounter(value);
  
  const statItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: {
        delay: 1.2 + (index * animationDelay),
        duration: 0.7, type: "spring", stiffness: 200, damping: 15
      }
    }
  };
  
  return (
    <motion.div 
      className="text-center relative"
      variants={statItemVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-5xl font-bold font-poppins text-white">
        {prefix}{count}
        {suffix && (
          <motion.span
            animate={{ opacity: [1, 0.7, 1], y: [0, -5, 0] }}
            transition={{ duration: 2 + (index * 0.2), repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: index * 0.3 }}
            className="ml-1 inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          >
            {suffix}
          </motion.span>
        )}
      </p>
      <motion.div
        whileHover={{ scale: 1.1, y: -2, color: "rgb(216, 180, 254)", transition: { duration: 0.2 } }}
      >
        <p className="text-sm text-gray-400 font-inter mt-1">{label}</p>
      </motion.div>
      <motion.div 
        className="absolute -inset-1 rounded-lg pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 3 + (index * 0.5), repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: index * 0.2 }}
        style={{ background: "radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent 70%)", zIndex: -1 }}
      />
    </motion.div>
  );
};

export default AnimatedCounter;
