import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PortalModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => setIsOpen(!isOpen);

  // Generate random particles for the portal effect (reduced count for better performance)
  const generateParticles = (count = 8) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1, // Slightly smaller particles
      distance: Math.random() * 80 + 60, // Shorter travel distance
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 0.3,
      angle: (i / count) * 360,
      color: i % 3 === 0 
        ? 'rgba(236, 72, 153, 0.7)' 
        : i % 3 === 1 
        ? 'rgba(139, 92, 246, 0.7)'
        : 'rgba(59, 130, 246, 0.7)'
    }));
  };

  const particles = generateParticles(8);
  const exitParticles = generateParticles(12);

  // Variants for animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.4,
        delay: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -5
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      scale: 0,
      opacity: 0,
      rotate: 5,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const particleVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      x: 0,
      y: 0
    },
    visible: (custom) => ({ 
      scale: [0, 1, 0.5, 0],
      opacity: [0, 0.8, 0.2, 0],
      x: Math.cos(custom.angle * (Math.PI / 180)) * custom.distance,
      y: Math.sin(custom.angle * (Math.PI / 180)) * custom.distance,
      transition: { 
        duration: custom.duration,
        delay: custom.delay,
        ease: "easeOut"
      }
    })
  };

  // Glow animation for the border (more subtle for better container adaptation)
  const glowAnimation = {
    boxShadow: [
      "0 0 5px rgba(236, 72, 153, 0.4), 0 0 15px rgba(139, 92, 246, 0.2), inset 0 0 5px rgba(236, 72, 153, 0.3), inset 0 0 15px rgba(139, 92, 246, 0.2)",
      "0 0 8px rgba(236, 72, 153, 0.6), 0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 8px rgba(236, 72, 153, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.2)",
      "0 0 5px rgba(236, 72, 153, 0.4), 0 0 15px rgba(139, 92, 246, 0.2), inset 0 0 5px rgba(236, 72, 153, 0.3), inset 0 0 15px rgba(139, 92, 246, 0.2)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Modal content for demonstration
  const ModalContent = () => (
    <>
      <motion.div 
        className="relative p-4 sm:p-6 border-b border-gray-800"
        variants={contentVariants}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-white pr-8">Portal Modal</h2>
        <motion.button
          className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1 sm:p-2 rounded-full bg-gray-800/70 text-gray-400 hover:text-white"
          onClick={toggleModal}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </motion.div>
      
      <motion.div 
        className="p-4 sm:p-6 overflow-y-auto max-h-[30vh]"
        variants={contentVariants}
      >
        <p className="text-gray-300 mb-4 text-sm sm:text-base">
          Este modal utiliza efectos de partículas y animaciones para crear una experiencia
          visual tipo portal con un borde brillante pulsante.
        </p>
        <div className="bg-purple-900/30 p-3 sm:p-4 rounded-lg border border-pink-800/30 mt-4">
          <h3 className="text-pink-300 font-medium mb-2 text-sm sm:text-base">Características</h3>
          <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Efecto de revelación circular</span>
            </motion.li>
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Partículas animadas multicolor</span>
            </motion.li>
          </ul>
        </div>
      </motion.div>
      
      <motion.div 
        className="p-4 sm:p-6 border-t border-gray-800 flex justify-end"
        variants={contentVariants}
      >
        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm"
          onClick={toggleModal}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 10px rgba(236, 72, 153, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Cerrar Portal
        </motion.button>
      </motion.div>
    </>
  );

  return (
    <div className="flex justify-center">
      <motion.button
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium shadow-lg text-sm sm:text-base"
        onClick={toggleModal}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        Abrir Portal Modal
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          // Portal container - fixed positioning for container adaptation
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 backdrop-blur-sm"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleModal}
              style={{
                background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2), rgba(17, 24, 39, 0.8) 70%)",
              }}
            />
            
            {/* Portal backdrop */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center pointer-events-none"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 10%, transparent 70%)",
              }}
            />
            
            {/* Modal Container - sized for better container fit */}
            <motion.div
              className="bg-gray-900/70 backdrop-blur-lg rounded-lg border border-transparent w-full max-w-sm sm:max-w-md overflow-hidden relative z-10"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              animate={[
                "visible",
                glowAnimation
              ]}
            >
              {/* Particles - positioned correctly for centering */}
              {particles.map(particle => (
                <motion.div
                  key={`particle-${particle.id}`}
                  className="absolute rounded-full"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    backgroundColor: particle.color,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none"
                  }}
                  custom={particle}
                  variants={particleVariants}
                  initial="hidden"
                  animate="visible"
                />
              ))}
              
              <ModalContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// JSX code example (updated)
export const portalModalJSX = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PortalModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  // Generar partículas aleatorias (cantidad reducida para mejor rendimiento)
  const generateParticles = (count = 8) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1,
      distance: Math.random() * 80 + 60,
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 0.3,
      angle: (i / count) * 360,
      color: i % 3 === 0 
        ? 'rgba(236, 72, 153, 0.7)' 
        : i % 3 === 1 
        ? 'rgba(139, 92, 246, 0.7)'
        : 'rgba(59, 130, 246, 0.7)'
    }));
  };

  const particles = generateParticles(8);

  // Animación del borde brillante (más sutil)
  const glowAnimation = {
    boxShadow: [
      "0 0 5px rgba(236, 72, 153, 0.4), 0 0 15px rgba(139, 92, 246, 0.2)",
      "0 0 8px rgba(236, 72, 153, 0.6), 0 0 20px rgba(139, 92, 246, 0.3)",
      "0 0 5px rgba(236, 72, 153, 0.4), 0 0 15px rgba(139, 92, 246, 0.2)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="flex justify-center">
      <motion.button
        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg"
        onClick={toggleModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Abrir Portal Modal
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Overlay con gradiente radial */}
            <motion.div
              className="fixed inset-0 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
              style={{
                background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2), rgba(17, 24, 39, 0.8) 70%)",
              }}
            />
            
            {/* Fondo del portal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 10%, transparent 70%)",
              }}
            />
            
            {/* Modal Container - ancho adaptable */}
            <motion.div
              className="bg-gray-900/70 backdrop-blur-lg rounded-lg border border-transparent w-full max-w-sm sm:max-w-md overflow-hidden relative z-10"
              initial={{ scale: 0, opacity: 0, rotate: -5 }}
              animate={[
                { scale: 1, opacity: 1, rotate: 0 },
                glowAnimation // Aplicar animación de brillo
              ]}
              exit={{ scale: 0, opacity: 0, rotate: 5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Partículas - posicionadas correctamente para centrar */}
              {particles.map(particle => (
                <motion.div
                  key={\`particle-\${particle.id}\`}
                  className="absolute rounded-full"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    backgroundColor: particle.color,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0.5, 0],
                    opacity: [0, 0.8, 0.2, 0],
                    x: Math.cos(particle.angle * (Math.PI / 180)) * particle.distance,
                    y: Math.sin(particle.angle * (Math.PI / 180)) * particle.distance
                  }}
                  transition={{ 
                    duration: particle.duration,
                    delay: particle.delay,
                    ease: "easeOut"
                  }}
                />
              ))}
              
              {/* Contenido del Modal - código omitido para brevedad */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[30vh]">
                {/* Contenido del modal */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};`;

// Animation code example (updated)
export const portalModalJS = `// Generar partículas aleatorias para el efecto portal (cantidad reducida)
const generateParticles = (count = 8) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 1, // Tamaño reducido
    distance: Math.random() * 80 + 60, // Distancia de viaje menor
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 0.3,
    angle: (i / count) * 360, // Distribuir partículas en círculo
    color: i % 3 === 0 
      ? 'rgba(236, 72, 153, 0.7)' // Rosa
      : i % 3 === 1 
      ? 'rgba(139, 92, 246, 0.7)' // Púrpura
      : 'rgba(59, 130, 246, 0.7)' // Azul
  }));
};

// Variantes para el overlay 
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4, delay: 0.2 }
  }
};

// Variantes para el backdrop del portal
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4 }
  }
};

// Variantes para el contenedor del modal
const modalVariants = {
  hidden: { 
    scale: 0,
    opacity: 0,
    rotate: -5 // Ligera rotación inicial
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 200,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    scale: 0,
    opacity: 0,
    rotate: 5, // Rotación opuesta al salir
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Variantes para las partículas
const particleVariants = {
  hidden: { 
    scale: 0, 
    opacity: 0,
    x: 0,
    y: 0
  },
  visible: (custom) => ({ 
    scale: [0, 1, 0.5, 0],
    opacity: [0, 0.8, 0.2, 0],
    x: Math.cos(custom.angle * (Math.PI / 180)) * custom.distance,
    y: Math.sin(custom.angle * (Math.PI / 180)) * custom.distance,
    transition: { 
      duration: custom.duration,
      delay: custom.delay,
      ease: "easeOut"
    }
  })
};

// Animación del borde brillante (efecto más sutil para mejor adaptación)
const glowAnimation = {
  boxShadow: [
    "0 0 5px rgba(236, 72, 153, 0.4), 0 0 15px rgba(139, 92, 246, 0.2), inset 0 0 5px rgba(236, 72, 153, 0.3)",
    "0 0 8px rgba(236, 72, 153, 0.6), 0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 8px rgba(236, 72, 153, 0.4)",
    "0 0 5px rgba(236, 72, 153, 0.4), 0 0 15px rgba(139, 92, 246, 0.2), inset 0 0 5px rgba(236, 72, 153, 0.3)",
  ],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Configuración para adaptación al contenedor
const containerSettings = {
  // Asegurar que el modal sea visible y adaptable
  position: "fixed",
  zIndex: 9999,
  padding: "1rem",
  
  // Configuración para overflow
  overflow: "hidden", // Para el contenedor principal
  maxHeight: "80vh", // Limitar altura
  
  // Asegurarse que el contenido puede desplazarse
  contentContainer: {
    overflowY: "auto",
    maxHeight: "30vh" // Altura máxima para el contenido
  },
  
  // Reducción de tamaños para mejor adaptación
  reducedValues: {
    particleCount: 8, // Menos partículas
    particleSize: 2.5, // Partículas más pequeñas
    glowIntensity: 0.6, // Brillo menos intenso
    distance: 80 // Distancia de viaje más corta
  }
};`;

export default PortalModal;