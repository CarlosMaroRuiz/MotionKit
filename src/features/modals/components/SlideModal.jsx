import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SlideModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => setIsOpen(!isOpen);

  // Variants for animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const modalVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.3
      }
    }
  };

  const contentLayerVariants = {
    hidden: (custom) => ({ 
      x: 50 + custom * 10, 
      opacity: 0 
    }),
    visible: (custom) => ({ 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: custom * 0.1
      }
    }),
    exit: (custom) => ({ 
      x: 50 + custom * 5, 
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: custom * 0.05
      }
    })
  };

  // Modal content for demonstration
  const ModalContent = () => (
    <>
      <motion.div 
        className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-800"
        custom={2}
        variants={contentLayerVariants}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-white">Modal Deslizante</h2>
        <motion.button
          className="p-1 sm:p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white"
          onClick={toggleModal}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </motion.div>
      
      <motion.div 
        className="p-4 sm:p-6 overflow-y-auto max-h-[40vh]"
        custom={3}
        variants={contentLayerVariants}
      >
        <p className="text-gray-300 mb-4 text-sm sm:text-base">
          Este modal utiliza un efecto de deslizamiento desde el lado derecho con múltiples capas 
          animadas a diferentes velocidades para crear un efecto parallax.
        </p>
        <div className="bg-indigo-900/30 p-3 sm:p-4 rounded-lg border border-indigo-800/50 mt-4">
          <h3 className="text-indigo-300 font-medium mb-2 text-sm sm:text-base">Características</h3>
          <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
            <li className="flex items-center">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Efecto parallax con múltiples capas</span>
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Animaciones con física natural (spring)</span>
            </li>
          </ul>
        </div>
      </motion.div>
      
      <motion.div 
        className="p-4 sm:p-6 border-t border-gray-800 flex justify-end"
        custom={4}
        variants={contentLayerVariants}
      >
        <motion.button
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg"
          onClick={toggleModal}
          whileHover={{ scale: 1.05 }}
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
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg text-sm sm:text-base"
        onClick={toggleModal}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 15px rgba(79, 70, 229, 0.5)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        Abrir Modal
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          // Portal container - fixed positioning to avoid container limitations
          <div className="fixed inset-0 z-[9999] flex overflow-y-auto overflow-x-hidden">
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleModal}
            />
            
            {/* Modal Container - Reduced width for better fit in demo */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-gray-900/95 shadow-2xl overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Decorative layers with parallax effect */}
              <motion.div 
                className="absolute top-0 right-0 bottom-0 w-2 bg-indigo-600/50"
                custom={0}
                variants={contentLayerVariants}
              />
              <motion.div 
                className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-indigo-600/10 to-transparent"
                custom={1}
                variants={contentLayerVariants}
              />
              
              {/* Modal Content */}
              <div className="flex flex-col h-full">
                <ModalContent />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// JSX code example (updated)
export const slideModalJSX = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SlideModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="flex justify-center">
      <motion.button
        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
        onClick={toggleModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Abrir Modal
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex overflow-y-auto overflow-x-hidden">
            {/* Overlay con efecto blur */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.2 } }}
              onClick={toggleModal}
            />
            
            {/* Modal Container - adaptable width */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-gray-900/95 shadow-2xl overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ 
                x: 0,
                transition: {
                  type: "spring",
                  damping: 25,
                  when: "beforeChildren",
                  staggerChildren: 0.1
                }
              }}
              exit={{ x: "100%" }}
            >
              {/* Decorative layers with parallax effect */}
              <motion.div 
                className="absolute top-0 right-0 bottom-0 w-2 bg-indigo-600/50"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              />
              
              {/* Modal Content */}
              <div className="flex flex-col h-full">
                {/* Header */}
                <motion.div 
                  className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-800"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <h2 className="text-lg font-semibold text-white">Modal Deslizante</h2>
                  <motion.button
                    onClick={toggleModal}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                  >
                    {/* Icono de cierre */}
                  </motion.button>
                </motion.div>
                
                {/* Content and Footer */}
                <motion.div 
                  className="p-4 sm:p-6 overflow-y-auto max-h-[40vh]"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  {/* Contenido del modal */}
                </motion.div>
                
                <motion.div className="p-4 sm:p-6 border-t border-gray-800">
                  <button onClick={toggleModal}>Cerrar</button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};`;

// Animation code example (updated for better container fit)
export const slideModalJS = `// Variantes para el overlay (fondo oscuro con blur)
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  exit: { 
    opacity: 0,
    transition: { delay: 0.2, duration: 0.3, ease: "easeInOut" }
  }
};

// Variantes para el contenedor del modal - valores reducidos para mejor adaptación
const modalVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    x: "100%", 
    opacity: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200
    }
  }
};

// Variantes para las capas de contenido con efecto parallax
// Reducido el desplazamiento para un mejor ajuste en contenedores más pequeños
const contentLayerVariants = {
  hidden: (custom) => ({ 
    x: 50 + custom * 10, // Reducido de 100 a 50
    opacity: 0 
  }),
  visible: (custom) => ({ 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      delay: custom * 0.1
    }
  }),
  exit: (custom) => ({ 
    x: 50 + custom * 5, // Reducido para adaptarse mejor
    opacity: 0,
    transition: {
      duration: 0.3,
      delay: custom * 0.05
    }
  })
};

// Configuración para posicionar el modal correctamente en cualquier contenedor
const modalPositioning = {
  // Usamos fixed con z-index alto para asegurar que el modal sea visible
  position: "fixed",
  zIndex: 9999,
  // Establecemos el tamaño máximo para evitar que ocupe demasiado espacio
  maxWidth: "100%",
  // Permitimos scroll dentro del modal si el contenido es muy largo
  overflowY: "auto"
};`;

export default SlideModal;