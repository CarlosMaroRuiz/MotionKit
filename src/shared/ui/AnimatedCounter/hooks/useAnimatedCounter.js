import { useState, useEffect } from 'react';
import { animate } from '../utils/animationUtils';

export const useAnimatedCounter = (value) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const animation = animate(0, value, {
      duration: 3,
      onUpdate: (val) => setCount(Math.round(val)),
      ease: [0.2, 0.65, 0.3, 0.9]
    });
    
    return () => animation.stop();
  }, [value]);

  return count;
};
