import React from 'react';
import { motion } from 'framer-motion';

const NearbyStars = ({ count = 35 }) => {
  // Generar estrellas
  const stars = Array.from({ length: count }).map((_, i) => {
    const size = 1 + Math.random() * 2.5;
    const distance = 290 + Math.random() * 130;
    const angle = Math.random() * 360;
    const angleRad = (angle * Math.PI) / 180;
    const x = Math.cos(angleRad) * distance;
    const y = Math.sin(angleRad) * distance;
    const pulseSpeed = 1 + Math.random() * 2;
    
    return {
      id: i,
      size,
      x,
      y,
      pulseSpeed,
      hasShadow: size > 1.5,
      delay: Math.random() * 2
    };
  });

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={`nearby-star-${star.id}`}
          className="absolute top-1/2 left-1/2 rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            transform: `translate(-50%, -50%) translate(${star.x}px, ${star.y}px)`,
            boxShadow: star.hasShadow ? `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8)` : 'none'
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: star.pulseSpeed,
            repeat: Infinity,
            repeatType: "reverse",
            delay: star.delay
          }}
        />
      ))}
    </>
  );
};

export default NearbyStars;