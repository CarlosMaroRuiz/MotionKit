import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FadeScaleModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => setIsOpen(!isOpen);

  // Variants for animation
  const overlayVariants = {
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
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      filter: "blur(12px)"
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      filter: "blur(12px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      y: 20, 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Floating animation with smaller amplitude for better container fit
  const floatingAnimation = {
    y: [0, -5, 0], // Reduced amplitude from -10 to -5
    transition: {
      duration: 6,
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
        <h2 className="text-lg sm:text-xl font-semibold text-white pr-8">Modal con Fade y Escala</h2>
        <motion.button
          className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1 sm:p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white"
          onClick={toggleModal}
          whileHover={{ scale: 1.1 }}
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
          Este modal utiliza una combinación de efectos de desvanecimiento y escala con un 
          fondo de degradado radial para crear una experiencia visual elegante.
        </p>
        <div className="bg-teal-900/30 p-3 sm:p-4 rounded-lg border border-teal-800/50 mt-4">
          <h3 className="text-teal-300 font-medium mb-2 text-sm sm:text-base">Características</h3>
          <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Animación de desvanecimiento con escala</span>
            </motion.li>
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fondo con degradado radial</span>
            </motion.li>
          </ul>
        </div>
      </motion.div>
      
      <motion.div 
        className="p-4 sm:p-6 border-t border-gray-800 flex justify-end"
        variants={contentVariants}
      >
        <motion.button
          className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm"
          onClick={toggleModal}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 10px rgba(20, 184, 166, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Cerrar
        </motion.button>
      </motion.div>
    </>
  );

  return (
    <div className="flex justify-center">
      <motion.button
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg font-medium shadow-lg text-sm sm:text-base"
        onClick={toggleModal}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 15px rgba(20, 184, 166, 0.5)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        Abrir Modal
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          // Portal container - fixed positioning for container adaptation
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Overlay with radial gradient */}
            <motion.div
              className="fixed inset-0 backdrop-blur-sm"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleModal}
              style={{
                background: "radial-gradient(circle at center, rgba(45, 212, 191, 0.15), rgba(17, 24, 39, 0.8) 70%)",
              }}
            />
            
            {/* Modal Container - sized better for demo */}
            <motion.div
              className="bg-gray-900/90 rounded-xl border border-teal-800/30 shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden relative z-10"
              variants={modalVariants}
              initial="hidden"
              animate={[
                "visible",
                floatingAnimation
              ]}
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 0 40px rgba(45, 212, 191, 0.2)"
              }}
            >
              <ModalContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// JSX code example (updated)
export const fadeScaleModalJSX = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FadeScaleModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  // Animación flotante para el modal (amplitud reducida)
  const floatingAnimation = {
    y: [0, -5, 0], // Reducido para mejor encaje en contenedor
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="flex justify-center">
      <motion.button
        className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg"
        onClick={toggleModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Abrir Modal
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
                background: "radial-gradient(circle at center, rgba(45, 212, 191, 0.15), rgba(17, 24, 39, 0.8) 70%)",
              }}
            />
            
            {/* Modal Container - tamaño máximo adaptable */}
            <motion.div
              className="bg-gray-900/90 rounded-xl border border-teal-800/30 shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden relative z-10"
              initial={{ scale: 0.8, opacity: 0, filter: "blur(12px)" }}
              animate={[
                { scale: 1, opacity: 1, filter: "blur(0px)" },
                floatingAnimation // Aplicar animación flotante
              ]}
              exit={{ scale: 0.8, opacity: 0, filter: "blur(12px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <motion.div 
                className="relative p-4 sm:p-6 border-b border-gray-800"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-lg font-semibold text-white pr-8">Modal con Fade y Escala</h2>
                <motion.button
                  className="absolute top-3 right-3 p-1 rounded-full bg-gray-800 text-gray-400"
                  onClick={toggleModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icono de cierre */}
                </motion.button>
              </motion.div>
              
              {/* Contenido y Footer - código reducido */}
              <motion.div 
                className="p-4 sm:p-6 overflow-y-auto max-h-[30vh]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {/* Contenido del modal */}
              </motion.div>
              
              <motion.div className="p-4 sm:p-6 border-t border-gray-800">
                <button onClick={toggleModal}>Cerrar</button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};`;

// Animation code example (updated)
export const fadeScaleModalJS = `// Variantes para el overlay (fondo con gradiente radial)
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] // Curva de ease custom para un fade más elegante
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Variantes para el contenedor del modal
const modalVariants = {
  hidden: { 
    scale: 0.8, 
    opacity: 0,
    filter: "blur(12px)" // Efecto blur inicial
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.1, // Retraso entre animaciones de hijos
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    filter: "blur(12px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Variantes para el contenido del modal
const contentVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Animación flotante para el modal abierto (amplitud reducida)
const floatingAnimation = {
  y: [0, -5, 0], // Reducido de -10 a -5 para que se adapte mejor al contenedor
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Configuraciones específicas para mejor adaptación al contenedor
const containerAdaptation = {
  // Usamos positioning fijo para asegurar que el modal esté siempre visible
  position: "fixed",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // Padding para evitar que toque los bordes en móviles
  padding: "1rem",
  // Width adaptable con máximos para diferentes pantallas
  width: "100%",
  maxWidth: {
    xs: "90vw", // Móvil pequeño
    sm: "400px", // Tablet
    md: "450px"  // Desktop
  },
  // Altura máxima para evitar overflow y permitir scroll
  maxHeight: {
    xs: "80vh",
    sm: "500px"
  },
  // Permitir scroll si el contenido es muy largo
  overflow: "auto"
};`;

export default FadeScaleModal;