import React from 'react';
import { motion } from 'framer-motion';

const EnergyWaves = ({ count = 3 }) => {
  // Genera un array con la cantidad especificada de elementos
  const waves = Array.from({ length: count }).map((_, i) => ({
    id: i,
    height: 2 + i * 4,
    marginTop: -1 - i * 2,
    color: i === 1 ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.8)",
    width: 3000 + i * 500,
    duration: 1 + i * 0.2,
    delay: i * 0.15
  }));
  
  return (
    <>
      {waves.map(wave => (
        <motion.div
          key={`wave-${wave.id}`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t-2 border-white z-20"
          style={{
            height: wave.height,
            borderTopColor: wave.color,
            marginTop: wave.marginTop
          }}
          animate={{
            width: [0, wave.width],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: wave.duration,
            ease: "easeOut",
            delay: wave.delay
          }}
        />
      ))}
    </>
  );
};

export default EnergyWaves;