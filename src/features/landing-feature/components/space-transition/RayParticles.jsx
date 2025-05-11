import React from 'react';
import { motion } from 'framer-motion';
import { generateRayParticles } from './utils/randomUtils';

const RayParticles = ({ count = 20 }) => {
  const particles = generateRayParticles(count);
  
  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={`ray-particle-${i}`}
          className="absolute bg-white rounded-full z-27"
          style={{
            width: particle.size,
            height: particle.size,
            top: `calc(50% + ${particle.yOffset}px)`,
            left: "50%",
            filter: particle.size > 1.5 ? "blur(1px)" : "none"
          }}
          animate={{
            x: [0, particle.targetX],
            y: [0, particle.targetY],
            opacity: [0, 1, 0],
            boxShadow: particle.size > 1.5 ? [
              "0 0 0px rgba(255, 255, 255, 0)",
              "0 0 8px rgba(255, 255, 255, 0.8)",
              "0 0 0px rgba(255, 255, 255, 0)"
            ] : []
          }}
          transition={{
            duration: 0.8 * particle.speed,
            ease: "easeOut",
            delay: 0.05 + particle.delay
          }}
        />
      ))}
    </>
  );
};

export default RayParticles;