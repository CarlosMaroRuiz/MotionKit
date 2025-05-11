import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedTypingText = ({ text, className, delay = 0, typingSpeed = 120, cursorColor = "bg-purple-500" }) => {
  const [typingText, setTypingText] = useState("");
  
  useEffect(() => {
    let currentIndex = 0;
    // Add delay before starting typing
    const delayTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setTypingText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);
      
      return () => clearInterval(typingInterval);
    }, delay);
    
    return () => clearTimeout(delayTimeout);
  }, [text, delay, typingSpeed]);
  
  return (
    <motion.span 
      className={className}
      animate={{
        textShadow: [
          "0 0 7px rgba(168, 85, 247, 0.7)",
          "0 0 15px rgba(168, 85, 247, 0.5)",
          "0 0 7px rgba(168, 85, 247, 0.7)"
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
        className={`inline-block ml-1 ${cursorColor} w-2 h-8`}
      />
    </motion.span>
  );
};

export default AnimatedTypingText;