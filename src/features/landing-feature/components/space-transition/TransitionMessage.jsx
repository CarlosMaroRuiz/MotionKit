import React from 'react';
import { motion } from 'framer-motion';

const TransitionMessage = ({ message = "Preparando viaje a la plataforma" }) => {
  return (
    <motion.div
      className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-poppins text-xl sm:text-3xl md:text-4xl text-center z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [-20, 0, 0, -20]
      }}
      transition={{
        duration: 3,
        times: [0, 0.2, 0.8, 1]
      }}
    >
      <span className="gradient-text">{message}</span>
    </motion.div>
  );
};

export default TransitionMessage;