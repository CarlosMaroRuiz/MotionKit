import React from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from './hooks/useTypingEffect';

const AnimatedText = ({ 
  text, 
  className = "", 
  delay = 0, 
  typingSpeed = 120, 
  cursorColor = "bg-purple-500", 
  glowColor = "rgba(168, 85, 247, 0.7)" 
}) => {
  const typingText = useTypingEffect(text, delay, typingSpeed);
  
  return (
    <motion.span 
      className={className}
      animate={{
        textShadow: [
          `0 0 7px ${glowColor}`,
          `0 0 15px ${glowColor.replace('0.7', '0.5')}`,
          `0 0 7px ${glowColor}`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {typingText}
      <motion.span 
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className={`inline-block ml-1 ${cursorColor} w-2 h-8 align-middle`}
      />
    </motion.span>
  );
};

export default AnimatedText;
