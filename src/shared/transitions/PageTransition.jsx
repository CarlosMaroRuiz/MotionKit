import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SpaceTransition = ({ isActive, destination = '/components', onTransitionComplete }) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('idle');
  
  useEffect(() => {
    if (!isActive) return;
    
    const sequence = async () => {
      setPhase('eclipsing'); // Comienza el eclipse
      
      setTimeout(() => setPhase('totality'), 700); // Oscuridad total
      
      setTimeout(() => {
        navigate(destination);
        if (onTransitionComplete) onTransitionComplete();
      }, 1100);
    };
    
    sequence();
  }, [isActive, navigate, destination, onTransitionComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden pointer-events-none flex items-center justify-center bg-transparent"
          initial={{ backgroundColor: 'rgba(5, 0, 10, 0)' }}
          animate={{ backgroundColor: phase === 'totality' ? 'rgba(5, 0, 10, 1)' : 'rgba(5, 0, 10, 0.6)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* El resplandor de la corona estelar (Fondo del eclipse) */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '100vh',
              height: '100vh',
              background: 'radial-gradient(circle, rgba(216, 180, 254, 1) 0%, rgba(147, 51, 234, 0.7) 20%, rgba(88, 28, 135, 0.3) 50%, transparent 70%)',
              filter: 'blur(30px)',
              willChange: 'transform, opacity'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: phase === 'totality' ? 4 : 1.2, 
              opacity: phase === 'totality' ? 0 : 1 
            }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />

          {/* Anillo de luz de alto contraste (Efecto anillo de diamantes) */}
          <motion.div
            className="absolute rounded-full border border-purple-200"
            style={{
              width: '100vh',
              height: '100vh',
              boxShadow: '0 0 50px rgba(216, 180, 254, 0.8), inset 0 0 30px rgba(168, 85, 247, 0.5)',
              willChange: 'transform, opacity'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: phase === 'totality' ? 4 : 1,
              opacity: phase === 'totality' ? 0 : 0.9 
            }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* El cuerpo eclipsante (Planeta/Luna negra) que crece hasta cubrir la pantalla */}
          <motion.div
            className="absolute rounded-full bg-[#05000a]" // Casi negro puro para devorar la pantalla
            style={{
              width: '100vh',
              height: '100vh',
              willChange: 'transform'
            }}
            initial={{ scale: 0, y: '30%' }}
            animate={{ 
              scale: phase === 'totality' ? 4 : 1,
              y: '0%' 
            }}
            transition={{ 
              duration: 1, 
              ease: [0.65, 0, 0.35, 1] // Easing muy elegante y cinematográfico
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpaceTransition;