import React from 'react';
import { motion } from 'framer-motion';
import DustParticle from './DustParticle';

const PlanetRings = ({ ringCount = 5, dustCount = 45 }) => {
  // Generar configuración para los anillos
  const rings = Array.from({ length: ringCount }).map((_, i) => {
    const baseSize = 390 + i * 26;
    
    return {
      id: i,
      size: baseSize,
      borderWidth: 3 - i * 0.4,
      colorR: 168 - i * 15,
      colorG: 85 - i * 8,
      colorB: 247 - i * 15,
      opacity: 0.35 - i * 0.05,
      glowOpacity: 0.25 - i * 0.03,
      rotationDuration: 100 - i * 10,
      rotationOffset: i * 4
    };
  });

  // Generar partículas de polvo
  const dustParticles = Array.from({ length: dustCount }).map((_, i) => {
    const size = 1 + Math.random() * 2.5;
    const angle = Math.random() * 360;
    const radius = 195 + Math.random() * 95;
    const speed = 40 + Math.random() * 70;
    const opacity = 0.4 + Math.random() * 0.4;
    
    return {
      id: i,
      size,
      angle,
      radius,
      speed,
      opacity
    };
  });

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] planet-ring">
      {/* Anillos del planeta */}
      {rings.map((ring) => (
        <motion.div
          key={`ring-${ring.id}`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full"
          style={{
            width: ring.size,
            height: ring.size,
            borderWidth: ring.borderWidth,
            borderColor: `rgba(${ring.colorR}, ${ring.colorG}, ${ring.colorB}, ${ring.opacity})`,
            boxShadow: `0 0 15px rgba(${ring.colorR}, ${ring.colorG}, ${ring.colorB}, ${ring.glowOpacity})`,
            transform: `translate(-50%, -50%) rotateX(75deg) rotateZ(${ring.rotationOffset}deg)`
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.02, 1],
            opacity: [ring.opacity, ring.opacity + 0.1, ring.opacity]
          }}
          transition={{
            rotate: {
              duration: ring.rotationDuration,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 6 + ring.id,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            opacity: {
              duration: 5 + ring.id,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        />
      ))}

      {/* Partículas de polvo */}
      {dustParticles.map((particle) => (
        <DustParticle 
          key={`dust-${particle.id}`}
          size={particle.size}
          angle={particle.angle} 
          radius={particle.radius} 
          speed={particle.speed}
          opacity={particle.opacity}
        />
      ))}
    </div>
  );
};

export default PlanetRings;