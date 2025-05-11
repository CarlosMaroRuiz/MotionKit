import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const BackgroundEffects = () => {
  // Controles de animación
  const gridControls = useAnimation();
  const glowControls = useAnimation();
  
  // Animaciones al cargar
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
  
  return (
    <>
      {/* Fondo espacial con gradiente fijo */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          background: [
            `radial-gradient(circle at 50% 50%, rgba(88, 28, 135, 0.2), rgba(15, 3, 26, 0.05))`,
            `radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.15), rgba(10, 1, 24, 0.1))`,
            `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1), rgba(15, 3, 26, 0.05))`,
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
      
      {/* Grid background animado */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={gridControls}
        style={{
          backgroundSize: "30px 30px",
          backgroundImage: `linear-gradient(to right, rgba(138, 43, 226, 0.05) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(138, 43, 226, 0.05) 1px, transparent 1px)`
        }}
      />
      
      {/* Brillo central fijo */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15), transparent 70%)`,
          opacity: 0.7
        }}
        animate={glowControls}
      />
    </>
  );
};

export default BackgroundEffects;