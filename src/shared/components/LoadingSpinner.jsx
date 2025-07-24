import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  message = "Cargando...", 
  showLogo = true, 
  size = "medium",
  className = "" 
}) => {
  // Configuración de tamaños
  const sizeConfig = {
    small: {
      container: "py-4",
      logo: "text-2xl mb-2",
      text: "text-sm",
      spinner: "w-6 h-6"
    },
    medium: {
      container: "py-8",
      logo: "text-4xl mb-4",
      text: "text-base",
      spinner: "w-8 h-8"
    },
    large: {
      container: "py-12",
      logo: "text-6xl mb-6",
      text: "text-lg",
      spinner: "w-12 h-12"
    }
  };

  const config = sizeConfig[size];

  // Animaciones para las letras de "Motion Kit"
  const letterVariants = {
    initial: { 
      opacity: 0.3,
      scale: 0.8,
      filter: "blur(2px)"
    },
    animate: { 
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Animación del contenedor
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animación del spinner
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Animación de pulsación para el mensaje
  const messageVariants = {
    initial: { opacity: 0.7 },
    animate: { 
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Gradiente animado para las letras
  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center text-center ${config.container} ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {showLogo && (
        <motion.div 
          className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 ${config.logo}`}
          style={{
            backgroundSize: "200% 200%"
          }}
          variants={gradientVariants}
          animate="animate"
        >
          <motion.div 
            className="flex space-x-1"
            variants={containerVariants}
          >
            {"Motion Kit".split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Spinner personalizado */}
      <motion.div 
        className="mb-4"
        variants={letterVariants}
      >
        <motion.div
          className={`${config.spinner} border-2 border-purple-200 border-t-purple-600 rounded-full`}
          variants={spinnerVariants}
          animate="animate"
        />
      </motion.div>

      {/* Mensaje de carga */}
      <motion.p 
        className={`text-gray-300 ${config.text}`}
        variants={messageVariants}
        initial="initial"
        animate="animate"
      >
        {message}
      </motion.p>

      {/* Puntos animados */}
      <motion.div 
        className="flex space-x-1 mt-2"
        variants={containerVariants}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-purple-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;