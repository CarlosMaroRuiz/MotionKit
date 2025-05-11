import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Planet from './Planet';
import PlanetRings from './PlanetRings';
import NearbyStars from './NearbyStars';
import Moon from './Moon';

const PlanetSystem = () => {
  // Variantes de animación para el planeta - entrada desde arriba
  const planetVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: -100 // Comienza arriba de su posición final
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,   // Llega a su posición final
      transition: {
        delay: 0.9,
        duration: 1.5,
        type: "spring",
        stiffness: 70, // Más suave
        damping: 17,  // Más amortiguación para un movimiento más elegante
        mass: 1.2    // Añade un poco más de peso para un movimiento más elegante
      }
    }
  };

  // Configuración de las lunas
  const moons = [
    {
      id: 1,
      size: 24,
      baseDistance: 230,
      varianceX: 1.0,
      varianceY: 0.8,
      speed: 20,
      delay: 0,
      color: 'radial-gradient(circle at 30% 30%, rgba(248, 250, 252, 0.95), rgba(226, 232, 240, 0.85))'
    },
    {
      id: 2,
      size: 40,
      baseDistance: 275,
      varianceX: 1.1,
      varianceY: 0.75,
      speed: 17.5,
      delay: 3,
      color: 'radial-gradient(circle at 30% 30%, rgba(240, 240, 245, 0.95), rgba(203, 213, 225, 0.85))'
    },
    {
      id: 3,
      size: 56,
      baseDistance: 320,
      varianceX: 1.2,
      varianceY: 0.7,
      speed: 15,
      delay: 6,
      color: 'radial-gradient(circle at 25% 25%, rgba(238, 240, 255, 0.95), rgba(200, 215, 235, 0.85))'
    }
  ];

  return (
    <motion.div 
      className="w-full md:w-1/2 relative h-96 md:h-[620px] perspective-1000"
      variants={planetVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sistema planetario */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
        {/* Planeta central */}
        <Planet />

        {/* Anillos del planeta */}
        <PlanetRings />

        {/* Lunas */}
        {moons.map((moon) => (
          <Moon 
            key={moon.id}
            size={moon.size}
            baseDistance={moon.baseDistance}
            varianceX={moon.varianceX}
            varianceY={moon.varianceY}
            speed={moon.speed}
            delay={moon.delay}
            color={moon.color}
          />
        ))}

        {/* Estrellas cercanas */}
        <NearbyStars count={35} />
      </div>
    </motion.div>
  );
};

export default PlanetSystem;