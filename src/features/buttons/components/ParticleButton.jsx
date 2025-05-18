import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ParticleButton = () => {
  const [isExploding, setIsExploding] = useState(false);
  
  // Función para manejar el clic y activar la explosión
  const handleClick = () => {
    if (!isExploding) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 700);
    }
  };
  
  // Generar partículas aleatorias
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 6) + 3,
    color: ['#c084fc', '#8b5cf6', '#ec4899', '#f43f5e'][Math.floor(Math.random() * 4)],
    angle: (i / 20) * 360,
    distance: Math.random() * 100 + 50,
    duration: Math.random() * 0.8 + 0.4
  }));

  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full text-white font-medium shadow-lg border border-purple-500/30"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 25px rgba(168, 85, 247, 0.6)",
        }}
        whileTap={{ 
          scale: 0.95,
        }}
        onClick={handleClick}
        initial={{ boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)" }}
      >
        <motion.span 
          initial={{ opacity: 1 }}
          animate={isExploding ? { 
            scale: [1, 1.2, 1], 
            opacity: [1, 0.8, 1] 
          } : {}}
          transition={{ duration: 0.3 }}
        >
          Explosión de Partículas
        </motion.span>
      </motion.button>
      
      {/* Partículas que aparecen cuando se hace clic */}
      {isExploding && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full"
              style={{ 
                width: particle.size, 
                height: particle.size,
                backgroundColor: particle.color,
                top: 0,
                left: 0,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [1, 0.8, 0],
                x: Math.cos(particle.angle * (Math.PI / 180)) * particle.distance,
                y: Math.sin(particle.angle * (Math.PI / 180)) * particle.distance
              }}
              transition={{ duration: particle.duration, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
      
      {/* Anillo de onda expansiva */}
      {isExploding && (
        <motion.div
          className="absolute rounded-full border-2 border-purple-400 pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.7 }}
          animate={{ 
            width: [0, 160], 
            height: [0, 160],
            opacity: [0.7, 0],
            borderWidth: [3, 0]
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      )}
    </div>
  );
};

// Código JSX para mostrar en la card
export const particleButtonJSX = `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ParticleButton = () => {
  const [isExploding, setIsExploding] = useState(false);
  
  const handleClick = () => {
    if (!isExploding) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 700);
    }
  };
  
  // Generar partículas aleatorias
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 6) + 3,
    color: ['#c084fc', '#8b5cf6', '#ec4899', '#f43f5e'][Math.floor(Math.random() * 4)],
    angle: (i / 20) * 360,
    distance: Math.random() * 100 + 50,
    duration: Math.random() * 0.8 + 0.4
  }));

  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full text-white font-medium shadow-lg"
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168, 85, 247, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <motion.span 
          animate={isExploding ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          Explosión de Partículas
        </motion.span>
      </motion.button>
      
      {/* Partículas y onda expansiva (código truncado para simplicidad) */}
      {isExploding && (
        <>
          {/* Código para las partículas y la onda expansiva */}
        </>
      )}
    </div>
  );
};`;

// Código JS de animación para mostrar
export const particleButtonJS = `// Configuración de las partículas
const createParticles = (count = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 6) + 3,
    color: ['#c084fc', '#8b5cf6', '#ec4899', '#f43f5e'][Math.floor(Math.random() * 4)],
    angle: (i / 20) * 360,
    distance: Math.random() * 100 + 50,
    duration: Math.random() * 0.8 + 0.4
  }));
};

// Animación de la partícula individual
const particleAnimation = (particle) => ({
  initial: { scale: 0, x: 0, y: 0, opacity: 1 },
  animate: { 
    scale: [0, 1.5, 0],
    opacity: [1, 0.8, 0],
    x: Math.cos(particle.angle * (Math.PI / 180)) * particle.distance,
    y: Math.sin(particle.angle * (Math.PI / 180)) * particle.distance,
    transition: { duration: particle.duration, ease: "easeOut" }
  }
});

// Animación de la onda expansiva
const waveAnimation = {
  initial: { width: 0, height: 0, opacity: 0.7 },
  animate: { 
    width: [0, 160], 
    height: [0, 160],
    opacity: [0.7, 0],
    borderWidth: [3, 0],
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Animación del texto del botón al explotar
const buttonTextAnimation = {
  initial: { opacity: 1 },
  animate: { 
    scale: [1, 1.2, 1], 
    opacity: [1, 0.8, 1],
    transition: { duration: 0.3 }
  }
};`;

export default ParticleButton;
