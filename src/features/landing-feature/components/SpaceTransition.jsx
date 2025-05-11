import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SpaceTransition = ({ isActive, destination = '/components', onTransitionComplete }) => {
  const navigate = useNavigate();
  const [stars, setStars] = useState([]);
  
  // Generar estrellas para la animación de warp speed
  useEffect(() => {
    if (isActive) {
      const newStars = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        size: 1 + Math.random() * 2,
        x: Math.random() * 100 - 50, // Posición X centrada (entre -50% y 50%)
        y: Math.random() * 100 - 50, // Posición Y centrada (entre -50% y 50%)
        z: Math.random() * 10, // Profundidad para el efecto 3D
        opacity: 0.1 + Math.random() * 0.7,
        delay: Math.random() * 0.2
      }));
      
      setStars(newStars);
      
      // Navegar después de que termine la animación
      const timer = setTimeout(() => {
        navigate(destination);
        if (onTransitionComplete) onTransitionComplete();
      }, 3000); // Duración de la animación
      
      return () => clearTimeout(timer);
    }
  }, [isActive, navigate, destination, onTransitionComplete]);
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Estrellas iniciales que se convierten en líneas de velocidad */}
          {stars.map(star => (
            <motion.div
              key={`warp-star-${star.id}`}
              className="absolute rounded-full bg-white"
              style={{
                width: star.size,
                height: star.size,
                left: `calc(50% + ${star.x}%)`,
                top: `calc(50% + ${star.y}%)`,
                opacity: star.opacity,
                zIndex: Math.floor(star.z)
              }}
              animate={{
                width: [star.size, star.size, star.size * (50 + star.z * 10)],
                height: [star.size, star.size, star.size],
                opacity: [0, star.opacity, 0],
                x: [0, 0, star.x * 20],
                y: [0, 0, star.y * 20],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                delay: star.delay,
                times: [0, 0.2, 1]
              }}
            />
          ))}
          
          {/* Brillo central */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ 
              width: [0, 100, 5000],
              height: [0, 100, 5000],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.2, 1]
            }}
            style={{
              boxShadow: "0 0 100px rgba(168, 85, 247, 0.8), 0 0 200px rgba(168, 85, 247, 0.4)",
              filter: "blur(5px)"
            }}
          />
          
          {/* Texto de "Viaje espacial" que aparece durante la transición */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-poppins text-xl sm:text-3xl md:text-4xl text-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.8, 1, 1.2]
            }}
            transition={{
              duration: 3,
              times: [0, 0.3, 0.9]
            }}
          >
            <span className="gradient-text">Iniciando viaje a la plataforma...</span>
          </motion.div>
          
          {/* Efecto de velocidad de la luz */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
            }}
            animate={{
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.4, 1]
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpaceTransition;