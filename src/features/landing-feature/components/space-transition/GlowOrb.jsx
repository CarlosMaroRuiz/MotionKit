import React from 'react';
import { motion } from 'framer-motion';

const GlowOrb = () => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 rounded-full bg-white z-28"
      style={{
        translateX: "-50%",
        translateY: "-50%"
      }}
      initial={{ width: 0, height: 0, opacity: 0 }}
      animate={{
        width: [0, 50, 20, 0],
        height: [0, 50, 20, 0],
        opacity: [0, 1, 0.8, 0],
        boxShadow: [
          "0 0 0px rgba(255, 255, 255, 0)",
          "0 0 40px rgba(255, 255, 255, 1), 0 0 80px rgba(168, 85, 247, 0.8)",
          "0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(168, 85, 247, 0.7)",
          "0 0 0px rgba(255, 255, 255, 0)"
        ]
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 1]
      }}
    />
  );
};

export default GlowOrb;