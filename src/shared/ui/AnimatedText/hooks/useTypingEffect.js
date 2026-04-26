import { useState, useEffect } from 'react';

export const useTypingEffect = (text, delay = 0, typingSpeed = 120) => {
  const [typingText, setTypingText] = useState("");
  
  useEffect(() => {
    let currentIndex = 0;
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

  return typingText;
};
