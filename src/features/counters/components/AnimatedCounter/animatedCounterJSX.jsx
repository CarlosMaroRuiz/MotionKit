export const animatedCounterJSX = `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter = () => {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState([]);

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
    },
    tap: { scale: 0.95 }
  };

  const createParticles = (isIncrement) => {
    const newParticles = [
      { id: 1, text: isIncrement ? '+1' : '-1', color: isIncrement ? '#10b981' : '#ef4444' },
      { id: 2, text: isIncrement ? '+1' : '-1', color: isIncrement ? '#10b981' : '#ef4444' },
      { id: 3, text: isIncrement ? '+1' : '-1', color: isIncrement ? '#10b981' : '#ef4444' }
    ];
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 600);
  };

  const increment = () => {
    setCount(prev => prev + 1);
    createParticles(true);
  };

  const decrement = () => {
    setCount(prev => Math.max(0, prev - 1));
    createParticles(false);
  };

  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 relative">
      
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute text-sm font-bold pointer-events-none"
          style={{ 
            color: particle.color,
            left: \`\${45 + index * 5}%\`,
            top: '35%'
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          {particle.text}
        </motion.div>
      ))}

      <motion.div 
        className="text-6xl font-bold text-white mb-8 font-mono"
        key={count}
        initial={{ scale: 0.8 }}
        animate={{ 
          scale: 1,
          textShadow: "0 0 20px rgba(255,255,255,0.6)"
        }}
        transition={{ duration: 0.2 }}
      >
        {count}
      </motion.div>

      <div className="flex gap-4">
        <motion.button
          onClick={decrement}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={count === 0}
        >
          Decrementar
        </motion.button>

        <motion.button
          onClick={reset}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Reset
        </motion.button>

        <motion.button
          onClick={increment}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Incrementar
        </motion.button>
      </div>
    </div>
  );
};

export default AnimatedCounter;`;