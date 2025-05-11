import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { generateRandomCraters, generateRandomTerrains, generateRandomClouds } from './utils/randomUtils';

const Planet = () => {
  // Controles de animación para el planeta
  const planetControls = useAnimation();
  
  // Animación de rotación del planeta (más lenta)
  useEffect(() => {
    planetControls.start({
      rotateY: 360,
      transition: {
        duration: 120, // Duración aumentada para una rotación más lenta
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [planetControls]);

  // Generamos elementos aleatorios
  const craters = generateRandomCraters(20);
  const terrains = generateRandomTerrains(8);
  const clouds = generateRandomClouds(12);

  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full overflow-hidden"
      animate={planetControls}
      style={{ 
        transformStyle: "preserve-3d",
        boxShadow: "0 0 80px rgba(147, 51, 234, 0.6)",
        filter: "drop-shadow(0 0 30px rgba(147, 51, 234, 0.5))"
      }}
      whileHover={{
        boxShadow: "0 0 100px rgba(147, 51, 234, 0.8)",
      }}
    >
      {/* Base esférica del planeta */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(214, 160, 255, 1) 5%, rgba(191, 128, 252, 0.9) 20%, rgba(88, 28, 135, 0.9) 60%, rgba(76, 29, 149, 1) 90%)",
          boxShadow: "inset -20px -20px 60px rgba(0, 0, 0, 0.5), inset 20px 20px 60px rgba(255, 255, 255, 0.25)"
        }}
      />

      {/* Capa de superficie con gradiente dinámico */}
      <motion.div 
        className="absolute inset-0 rounded-full opacity-85"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(188, 153, 255, 0.6) 0%, rgba(67, 56, 202, 0.7) 50%, rgba(55, 48, 163, 0.9) 75%, rgba(49, 40, 95, 0.95) 95%)",
            "radial-gradient(circle at 35% 35%, rgba(178, 147, 252, 0.6) 0%, rgba(79, 70, 229, 0.7) 50%, rgba(67, 56, 202, 0.9) 75%, rgba(49, 40, 95, 0.95) 95%)",
            "radial-gradient(circle at 40% 25%, rgba(168, 138, 245, 0.6) 0%, rgba(79, 70, 229, 0.7) 50%, rgba(88, 28, 135, 0.9) 75%, rgba(49, 40, 95, 0.95) 95%)",
            "radial-gradient(circle at 30% 30%, rgba(188, 153, 255, 0.6) 0%, rgba(67, 56, 202, 0.7) 50%, rgba(55, 48, 163, 0.9) 75%, rgba(49, 40, 95, 0.95) 95%)"
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
      />

      {/* Efecto de brillo esférico para simular iluminación */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.2) 25%, transparent 50%)",
          mixBlendMode: "soft-light"
        }}
      />

      {/* Capa de brillo atmosférico externo */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 80% 80%, transparent 60%, rgba(168, 85, 247, 0.3) 95%)",
          mixBlendMode: "screen"
        }}
        animate={{
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Sombra dinámica para simular rotación */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(120deg, transparent 30%, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0.7) 95%)"
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Textura del planeta - Cráteres */}
      {craters.map((crater, i) => (
        <motion.div
          key={`crater-${i}`}
          className="absolute rounded-full"
          style={{
            width: crater.size,
            height: crater.size,
            left: `${crater.posX}%`,
            top: `${crater.posY}%`,
            background: `radial-gradient(circle, rgba(${crater.colorR}, ${crater.colorG}, ${crater.colorB}, ${crater.opacity}), rgba(${crater.colorDarkR}, ${crater.colorDarkG}, ${crater.colorDarkB}, ${crater.opacity * 1.2}))`,
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.7), inset 2px 2px 5px rgba(255, 255, 255, 0.15)'
          }}
        />
      ))}

      {/* Patrón de terreno del planeta */}
      {terrains.map((terrain, i) => (
        <motion.div
          key={`terrain-${i}`}
          className="absolute rounded-full opacity-20"
          style={{
            width: terrain.width,
            height: terrain.height,
            left: `${terrain.posX}%`,
            top: `${terrain.posY}%`,
            transform: `rotate(${terrain.rotation}deg)`,
            background: `radial-gradient(ellipse, rgba(${terrain.colorR}, ${terrain.colorG}, ${terrain.colorB}, 0.4), transparent 70%)`,
          }}
        />
      ))}

      {/* Nubes/Atmósfera */}
      {clouds.map((cloud, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute rounded-full"
          style={{
            width: cloud.width,
            height: cloud.height,
            left: `${cloud.posX}%`,
            top: `${cloud.posY}%`,
            transform: `rotate(${cloud.rotation}deg)`,
            background: 'rgba(255, 255, 255, 0.2)',
            filter: `blur(${cloud.blur}px)`,
            opacity: cloud.opacity
          }}
          animate={{
            opacity: [cloud.opacity - 0.05, cloud.opacity + 0.1, cloud.opacity - 0.05],
            x: [0, cloud.width * 0.08, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

export default Planet;