import React from 'react';
import { motion } from 'framer-motion';

const DustParticle = ({ size, angle, radius, speed, opacity }) => {
  const angleRad = (angle * Math.PI) / 180;
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 rounded-full bg-purple-200"
      style={{
        width: size,
        height: size,
        transform: `translate(-50%, -50%) rotateX(75deg)`,
        boxShadow: size > 1.3 ? `0 0 ${size * 3}px rgba(216, 180, 254, ${opacity})` : 'none',
        opacity
      }}
      animate={{
        rotate: 360
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear"
      }}
      initial={{
        left: `calc(50% + ${radius * Math.cos(angleRad)}px)`,
        top: `calc(50% + ${radius * Math.sin(angleRad) * 0.3}px)`
      }}
    />
  );
};

export default DustParticle;