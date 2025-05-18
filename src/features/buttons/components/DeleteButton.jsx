import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteButton = () => {
  const [stage, setStage] = useState('initial'); // 'initial', 'confirm', 'deleting', 'deleted'
  const [isHovered, setIsHovered] = useState(false);
  
  // Partículas para el efecto de desintegración
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    color: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#f87171' : '#fca5a5',
    originX: 50 + (Math.random() * 30 - 15),
    originY: 50 + (Math.random() * 30 - 15),
    angle: Math.random() * 360,
    distance: 50 + Math.random() * 100,
    duration: 0.6 + Math.random() * 0.8
  }));

  // Manejar clic en el botón
  const handleClick = () => {
    if (stage === 'initial') {
      setStage('confirm');
    } else if (stage === 'confirm') {
      setStage('deleting');
      setTimeout(() => {
        setStage('deleted');
      }, 1500);
    } else if (stage === 'deleted') {
      setStage('initial');
    }
  };

  // Efecto de temblor para el estado confirm
  const shakeAnimation = {
    x: [0, -3, 3, -2, 2, 0],
    transition: { 
      duration: 0.4,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };
  
  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        {/* ESTADO INICIAL */}
        {stage === 'initial' && (
          <motion.button
            key="initial"
            className="relative flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-medium rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icono Trash */}
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>Eliminar</span>
            
            {/* Efecto de brillo hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-white/30 to-red-500/0"
              initial={{ opacity: 0, x: '-100%' }}
              animate={isHovered ? { opacity: 1, x: '100%' } : { opacity: 0, x: '-100%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ zIndex: -1 }}
            />
          </motion.button>
        )}
        
        {/* ESTADO DE CONFIRMACIÓN */}
        {stage === 'confirm' && (
          <motion.button
            key="confirm"
            className="group relative flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg overflow-hidden border-2 border-red-400"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={[
              { opacity: 1, scale: 1 },
              shakeAnimation
            ]}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleClick}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icono de advertencia */}
            <svg 
              className="w-5 h-5 animate-pulse" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>¿Confirmar?</span>
            
            {/* Contador de tiempo */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-red-800/40"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
              style={{ zIndex: -1 }}
            />
            
            {/* Puntos pulsantes de advertencia */}
            <motion.div
              className="absolute h-2 w-2 rounded-full bg-yellow-300 right-1 top-1"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute h-2 w-2 rounded-full bg-yellow-300 left-1 top-1"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                repeatType: "reverse",
                delay: 0.4
              }}
            />
          </motion.button>
        )}
        
        {/* ESTADO DE ELIMINACIÓN EN PROCESO */}
        {stage === 'deleting' && (
          <motion.div
            key="deleting"
            className="relative"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Botón base que se desintegra */}
            <motion.button
              className="relative flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg overflow-hidden"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: 0,
                transition: { delay: 0.7, duration: 0.3 }
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Eliminando...</span>
            </motion.button>
            
            {/* Círculo de explosión */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/20"
              initial={{ width: 0, height: 0 }}
              animate={{ 
                width: 200,
                height: 200,
                opacity: [1, 0]
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            />
            
            {/* Partículas que salen disparadas */}
            {particles.map(particle => (
              <motion.div
                key={`particle-${particle.id}`}
                className="absolute top-1/2 left-1/2 rounded-full w-1 h-1"
                style={{ 
                  backgroundColor: particle.color,
                  width: particle.size,
                  height: particle.size,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                }}
                initial={{ 
                  x: 0, 
                  y: 0,
                  opacity: 1,
                  scale: 1
                }}
                animate={{ 
                  x: Math.cos(particle.angle * (Math.PI/180)) * particle.distance,
                  y: Math.sin(particle.angle * (Math.PI/180)) * particle.distance,
                  opacity: 0,
                  scale: 0
                }}
                transition={{ 
                  duration: particle.duration,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Ondas de eliminación */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-400"
                initial={{ width: 20, height: 20, opacity: 0.7 }}
                animate={{ 
                  width: [20, 120 + i * 30],
                  height: [20, 120 + i * 30],
                  opacity: [0.7, 0],
                  borderWidth: [3, 1]
                }}
                transition={{ 
                  duration: 1 + i * 0.2,
                  delay: i * 0.15,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
        
        {/* ESTADO DE ELIMINADO COMPLETAMENTE */}
        {stage === 'deleted' && (
          <motion.button
            key="deleted"
            className="relative flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-medium rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icono Check */}
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>¡Eliminado!</span>
            
            {/* Destellos de confirmación */}
            <motion.div
              className="absolute -inset-1 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.1, 0.9],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{ 
                background: "radial-gradient(circle, rgba(34, 197, 94, 0.4), transparent 70%)",
                zIndex: -1
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// Código JSX para mostrar en la card
export const deleteButtonJSX = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteButton = () => {
  const [stage, setStage] = useState('initial'); 
  // 'initial', 'confirm', 'deleting', 'deleted'
  const [isHovered, setIsHovered] = useState(false);
  
  // Partículas para el efecto de desintegración
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    color: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#f87171' : '#fca5a5',
    angle: Math.random() * 360,
    distance: 50 + Math.random() * 100,
    duration: 0.6 + Math.random() * 0.8
  }));

  // Manejar clic en el botón
  const handleClick = () => {
    if (stage === 'initial') {
      setStage('confirm');
    } else if (stage === 'confirm') {
      setStage('deleting');
      setTimeout(() => {
        setStage('deleted');
      }, 1500);
    } else if (stage === 'deleted') {
      setStage('initial');
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        {/* ESTADO INICIAL */}
        {stage === 'initial' && (
          <motion.button
            key="initial"
            className="relative flex items-center gap-2 px-6 py-3 
                       bg-red-500 text-white font-medium rounded-lg"
            onClick={handleClick}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)"
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              {/* Icono Trash SVG aquí */}
            </svg>
            <span>Eliminar</span>
            
            {/* Efecto de brillo hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r 
                         from-red-500/0 via-white/30 to-red-500/0"
              initial={{ opacity: 0, x: '-100%' }}
              animate={isHovered ? { opacity: 1, x: '100%' } : { opacity: 0 }}
            />
          </motion.button>
        )}
        
        {/* Otros estados: 'confirm', 'deleting', 'deleted' */}
        {/* Código truncado para mayor claridad */}
      </AnimatePresence>
    </div>
  );
};`;

// Código JS de animación para mostrar
export const deleteButtonJS = `// Variables de configuración y helpers
const PARTICLE_COUNT = 30;
const DELETE_ANIMATION_DURATION = 1500; // ms

// Generar partículas para el efecto de explosión
const generateParticles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    // Alternar entre diferentes tonos de rojo
    color: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#f87171' : '#fca5a5',
    angle: Math.random() * 360,
    distance: 50 + Math.random() * 100,
    duration: 0.6 + Math.random() * 0.8
  }));
};

// Animaciones para cada estado del botón
const buttonAnimations = {
  // Estado inicial
  initial: {
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)"
    },
    tap: { scale: 0.95 }
  },
  
  // Estado de confirmación
  confirm: {
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration: 0.2 }
    },
    shake: {
      x: [0, -3, 3, -2, 2, 0],
      transition: { 
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    progressBar: {
      initial: { width: "0%" },
      animate: { width: "100%" },
      transition: { duration: 3 }
    }
  },
  
  // Estado de eliminación
  deleting: {
    // Animación de partículas
    particle: (particle) => ({
      initial: { x: 0, y: 0, opacity: 1, scale: 1 },
      animate: { 
        x: Math.cos(particle.angle * (Math.PI/180)) * particle.distance,
        y: Math.sin(particle.angle * (Math.PI/180)) * particle.distance,
        opacity: 0,
        scale: 0,
        transition: { duration: particle.duration, ease: "easeOut" }
      }
    }),
    
    // Animación de onda expansiva
    explosionWave: (index) => ({
      initial: { width: 20, height: 20, opacity: 0.7 },
      animate: { 
        width: [20, 120 + index * 30],
        height: [20, 120 + index * 30],
        opacity: [0.7, 0],
        borderWidth: [3, 1],
        transition: { 
          duration: 1 + index * 0.2,
          delay: index * 0.15,
          ease: "easeOut"
        }
      }
    })
  },
  
  // Estado eliminado
  deleted: {
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration: 0.3 }
    },
    glow: {
      initial: { opacity: 0 },
      animate: { 
        opacity: [0, 0.5, 0],
        scale: [0.8, 1.1, 0.9]
      },
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  }
};`;

export default DeleteButton;