import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import BackgroundStars from './BackgroundStars';
import WarpStars from './WarpStars';
import CountdownNumber from './CountdownNumber';
import TransitionMessage from './TransitionMessage';
import HorizontalRay from './HorizontalRay';

const SpaceTransition = ({ isActive, destination = '/components', onTransitionComplete }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(0);
  
  // Contador regresivo animado
  useEffect(() => {
    if (!isActive) return;
    
    // Inicia en 3 y cuenta hacia abajo
    const countInterval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount > 1) return prevCount - 1;
        clearInterval(countInterval);
        return prevCount;
      });
    }, 1000);
    
    // Limpiar el intervalo si el componente se desmonta
    return () => clearInterval(countInterval);
  }, [isActive]);
  
  // Navegación controlada después de finalizar todas las animaciones
  useEffect(() => {
    if (isActive) {
      const navigateTimeout = setTimeout(() => {
        navigate(destination);
        if (onTransitionComplete) onTransitionComplete();
      }, 3800);
      
      return () => clearTimeout(navigateTimeout);
    }
  }, [isActive, navigate, destination, onTransitionComplete]);
  
  // Animación de frame usando requestAnimationFrame para movimiento más fluido
  const animate = time => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    // Solo continúa si la transición está activa
    if (isActive) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      previousTimeRef.current = undefined;
    }
  };
  
  // Configurar y limpiar la animación de frame
  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [isActive]);
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Fondo de estrellas estáticas */}
          <BackgroundStars />
          
          {/* Estrellas en movimiento con efecto de aceleración */}
          <WarpStars count={count} />
          
          {/* Conteo regresivo con efectos visuales */}
          <CountdownNumber count={count} />
          
          {/* Mensaje de transición */}
          <TransitionMessage />
          
          {/* Rayo horizontal cuando el contador llega a 1 */}
          {count === 1 && <HorizontalRay />}
          
          {/* Efecto de velocidad de la luz - se intensifica con cada segundo */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: count === 1 
                ? `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, rgba(168, 85, 247, 0.2) 40%, rgba(0, 0, 0, 0) 70%)`
                : `radial-gradient(circle at center, rgba(147, 51, 234, ${0.2 + (3 - count) * 0.1}) 0%, rgba(0, 0, 0, 0) ${70 - (3 - count) * 20}%)`,
            }}
            animate={{
              opacity: count === 1 ? [0.7, 0.9] : [0.7, 0.9]
            }}
            transition={{
              duration: 1,
              ease: "linear"
            }}
          />
          
          {/* Destello final */}
          {count === 1 && (
            <motion.div
              className="absolute inset-0 bg-white z-30"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0, 0, 0.5, 0]
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.6, 0.7, 0.8, 1],
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpaceTransition;