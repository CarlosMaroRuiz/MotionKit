import React from 'react';
import { motion } from 'framer-motion';

const Moon = ({ 
  size = 24, 
  baseDistance = 230, 
  varianceX = 1.0, 
  varianceY = 0.8, 
  speed = 20, 
  delay = 0,
  color = 'radial-gradient(circle at 30% 30%, rgba(248, 250, 252, 0.95), rgba(226, 232, 240, 0.85))'
}) => {
  const glowIntensity = 0.7 + (size / 80); // La intensidad del brillo aumenta con el tamaño
  const craterCount = Math.floor(size / 6) + 2; // Más cráteres para lunas más grandes
  
  return (
    <>
      {/* Estela de la luna - Sutil efecto de rastro */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: size * 0.8,
          height: size * 0.8,
          marginTop: -size * 0.4,
          marginLeft: -size * 0.4,
          background: 'rgba(255, 255, 255, 0.15)',
          filter: 'blur(6px)'
        }}
        animate={{
          x: [0, baseDistance * varianceX, 0, -baseDistance * varianceX, 0],
          y: [baseDistance * varianceY, 0, -baseDistance * varianceY, 0, baseDistance * varianceY],
          opacity: [0.1, 0.25, 0.1, 0.25, 0.1]
        }}
        transition={{
          x: {
            duration: speed * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          },
          y: {
            duration: speed * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          },
          opacity: {
            duration: speed / 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: delay + 0.2
          }
        }}
      />
      
      {/* Luna principal con movimiento mejorado */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: size,
          height: size,
          marginTop: -size / 2,
          marginLeft: -size / 2,
          background: color,
          boxShadow: `0 0 20px rgba(255, 255, 255, ${glowIntensity * 0.6}), inset 0 0 8px rgba(0, 0, 0, 0.5)`
        }}
        animate={{
          x: [0, baseDistance * varianceX, 0, -baseDistance * varianceX, 0],
          y: [baseDistance * varianceY, 0, -baseDistance * varianceY, 0, baseDistance * varianceY],
          boxShadow: [
            `0 0 20px rgba(255, 255, 255, ${glowIntensity * 0.6}), inset 0 0 8px rgba(0, 0, 0, 0.5)`,
            `0 0 30px rgba(255, 255, 255, ${glowIntensity * 0.9}), inset 0 0 8px rgba(0, 0, 0, 0.5)`,
            `0 0 20px rgba(255, 255, 255, ${glowIntensity * 0.6}), inset 0 0 8px rgba(0, 0, 0, 0.5)`
          ]
        }}
        transition={{
          x: {
            duration: speed * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay
          },
          y: {
            duration: speed * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay
          },
          boxShadow: {
            duration: speed / 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay
          }
        }}
      >
        {/* Sombra en la superficie de la luna */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.45) 100%)",
            transform: "rotate(45deg)"
          }}
        />
        
        {/* Brillo en la luna */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7), transparent 60%)",
            mixBlendMode: "overlay"
          }}
        />
        
        {/* Cráteres en las lunas */}
        {Array.from({ length: craterCount }).map((_, j) => {
          const craterSize = 1.5 + Math.random() * (size / 3);
          return (
            <div
              key={`moon-crater-${j}`}
              className="absolute rounded-full"
              style={{
                width: craterSize,
                height: craterSize,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle at 40% 40%, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.3))`,
                boxShadow: 'inset -1px -1px 2px rgba(0, 0, 0, 0.6), inset 1px 1px 2px rgba(255, 255, 255, 0.2)'
              }}
            />
          );
        })}
      </motion.div>
    </>
  );
};

export default Moon;