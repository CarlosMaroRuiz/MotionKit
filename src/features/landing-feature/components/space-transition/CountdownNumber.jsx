import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownNumber = ({ count }) => {
  // Variantes para la animación del texto del contador
  const counterVariants = {
    initial: { 
      scale: 0, 
      opacity: 0,
      filter: "blur(10px)"
    },
    animate: { 
      scale: [0, 1.2, 1], 
      opacity: [0, 1, 1], 
      filter: ["blur(10px)", "blur(2px)", "blur(0px)"],
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    },
    exit: { 
      scale: [1, 1.2, 0], 
      opacity: [1, 1, 0],
      filter: ["blur(0px)", "blur(2px)", "blur(20px)"],
      transition: { 
        duration: 0.4,
        ease: "easeIn" 
      }
    }
  };

  // Calcular el brillo del número según la cuenta regresiva
  const getTextShadow = () => {
    return count === 1 
      ? "0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(168, 85, 247, 0.8)" 
      : "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)";
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`counter-${count}`}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        variants={counterVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <span 
          className="text-8xl md:text-9xl font-bold text-white font-poppins"
          style={{
            textShadow: getTextShadow()
          }}
        >
          {count}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountdownNumber;