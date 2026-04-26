import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

export const useBackgroundAnimations = () => {
  const gridControls = useAnimation();
  const glowControls = useAnimation();
  
  useEffect(() => {
    // Animar fondo
    gridControls.start({
      opacity: [0, 0.1],
      scale: [0.97, 1.02, 1],
      transition: { duration: 30, ease: "easeOut" }
    });
    
    // Animar glow
    glowControls.start({
      opacity: [0, 0.3, 0.1, 0.3],
      scale: [0.9, 1.1, 1],
      transition: { 
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse"
      }
    });
  }, [gridControls, glowControls]);

  return { gridControls, glowControls };
};
