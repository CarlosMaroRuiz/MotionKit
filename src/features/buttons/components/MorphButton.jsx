import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MorphButton = () => {
  const [isActive, setIsActive] = useState(false);
  
  // Toggle button state
  const toggleActive = () => {
    setIsActive(!isActive);
  };
  
  // Variantes para la animación morph
  const buttonVariants = {
    rounded: { borderRadius: "9999px", width: "auto" },
    squared: { borderRadius: "12px", width: "100%" }
  };
  
  // Variantes para el texto
  const textVariants = {
    default: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.2 } 
    },
    exit: { 
      y: 10, 
      opacity: 0, 
      transition: { duration: 0.2 } 
    }
  };
  
  // Variantes para el icono
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 300, 
        duration: 0.3 
      }
    }
  };
  
  return (
    <div className="flex justify-center w-full max-w-xs">
      <motion.button
        className={`flex items-center justify-center px-8 py-4 ${isActive ? 'bg-green-600' : 'bg-purple-600'} text-white font-medium shadow-lg overflow-hidden`}
        onClick={toggleActive}
        variants={buttonVariants}
        animate={isActive ? "squared" : "rounded"}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20, 
          duration: 0.5 
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        style={{ boxShadow: isActive ? "0 0 20px rgba(16, 185, 129, 0.5)" : "0 0 20px rgba(147, 51, 234, 0.5)" }}
      >
        <motion.div 
          className="relative w-full flex items-center justify-center"
        >
          {/* Texto que cambia */}
          <motion.span
            key={isActive ? "active" : "inactive"}
            initial="exit"
            animate="default"
            exit="exit"
            variants={textVariants}
          >
            {isActive ? "Activado" : "Botón Morfismo"}
          </motion.span>
          
          {/* Icono de check cuando está activo */}
          {isActive && (
            <motion.div 
              className="absolute right-0"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </motion.div>
        
        {/* Fondo que pulsa al cambiar */}
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? {
            scale: [0, 2, 0],
            opacity: [0, 0.3, 0],
          } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    </div>
  );
};

// Código JSX para mostrar en la card
export const morphButtonJSX = `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MorphButton = () => {
  const [isActive, setIsActive] = useState(false);
  
  // Toggle button state
  const toggleActive = () => {
    setIsActive(!isActive);
  };
  
  return (
    <div className="flex justify-center w-full max-w-xs">
      <motion.button
        className={\`flex items-center justify-center px-8 py-4 \${isActive ? 'bg-green-600' : 'bg-purple-600'} text-white font-medium shadow-lg overflow-hidden\`}
        onClick={toggleActive}
        animate={{
          borderRadius: isActive ? "12px" : "9999px",
          width: isActive ? "100%" : "auto"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        style={{ 
          boxShadow: isActive 
            ? "0 0 20px rgba(16, 185, 129, 0.5)" 
            : "0 0 20px rgba(147, 51, 234, 0.5)" 
        }}
      >
        <motion.div className="relative w-full flex items-center justify-center">
          {/* Texto que cambia */}
          <motion.span
            key={isActive ? "active" : "inactive"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isActive ? "Activado" : "Botón Morfismo"}
          </motion.span>
          
          {/* Icono de check cuando está activo */}
          {isActive && (
            <motion.div 
              className="absolute right-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </motion.div>
        
        {/* Efecto de onda al activar */}
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? {
            scale: [0, 2, 0],
            opacity: [0, 0.3, 0],
          } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    </div>
  );
};`;

// Código JS de animación para mostrar
export const morphButtonJS = `// Variantes para la animación morph
const buttonVariants = {
  rounded: { 
    borderRadius: "9999px", 
    width: "auto"
  },
  squared: { 
    borderRadius: "12px", 
    width: "100%" 
  }
};

// Variantes para el texto
const textVariants = {
  default: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.2 } 
  },
  exit: { 
    y: 10, 
    opacity: 0, 
    transition: { duration: 0.2 } 
  }
};

// Variantes para el icono
const iconVariants = {
  hidden: { 
    scale: 0, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 10, 
      stiffness: 300
    }
  }
};

// Animación de la onda de activación
const rippleAnimation = {
  inactive: { 
    scale: 0, 
    opacity: 0 
  },
  active: {
    scale: [0, 2, 0],
    opacity: [0, 0.3, 0],
    transition: { duration: 0.5 }
  }
};`;

export default MorphButton;