import React from 'react';
import { motion } from 'framer-motion';
import AnimatedTypingText from './AnimatedTypingText';
import GradientButton from './GradientButton';
import SecondaryButton from './SecondaryButton';
import StatsSection from './StatsSection';

const HeroSection = ({ onStartTransition }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1
      }
    }
  };

  // Manejador para el botón de plataforma
  const handlePlatformClick = (e) => {
    e.preventDefault(); // Prevenir navegación normal
    if (onStartTransition) {
      onStartTransition();
    }
  };

  return (
    <div className="w-full text-center md:text-left md:max-w-xl">
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-poppins leading-tight"
        variants={titleVariants}
      >
        <span className="text-white">Descubre, Crea </span><br />
        <span className="text-white">y Experimenta </span><br />
        <AnimatedTypingText 
          text="Motion Kit" 
          className="gradient-text"
        />
      </motion.h1>
      
      <motion.p 
        className="text-lg text-gray-300 mb-8 font-inter font-light leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.6, duration: 0.6 }
        }}
      >
        Una biblioteca moderna de componentes React con animaciones avanzadas para crear interfaces de usuario impresionantes y dinámicas.
      </motion.p>
      
      {/* Botones centrados en móvil, alineados a la izquierda en pantallas más grandes */}
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
        <GradientButton href="/components" onClick={handlePlatformClick}>
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="w-4 h-4 rounded-full bg-white mr-2 opacity-70 star-glow inline-block"
          />
          Ir a la plataforma
        </GradientButton>
        
        <SecondaryButton href="/examples">
          <motion.span
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="mr-2 text-xl inline-block"
          >
            ✨
          </motion.span>
          Ver ejemplos
        </SecondaryButton>
      </div>
      
      {/* Stats con efectos mejorados - Centrados en móvil */}
      <div className="flex justify-center md:justify-start">
        <StatsSection />
      </div>
    </div>
  );
};

export default HeroSection;