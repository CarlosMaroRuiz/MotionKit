import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  // Animaciones basadas en scroll
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const descY = useTransform(scrollYProgress, [0, 0.2], [0, -15]);
  const buttonY = useTransform(scrollYProgress, [0, 0.2], [0, 5]);
  
  // Variante para animación del título letra por letra
  const titleVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  // Variante para cada carácter del título
  const charVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150
      }
    }
  };
  
  // Separar el título en caracteres para animar cada uno
  const titleChars = "Motion Kit".split("");
  
  // Variante para el efecto de brillo del título
  const glowVariants = {
    initial: {
      opacity: 0.1,
      filter: "blur(20px)"
    },
    animate: {
      opacity: [0.1, 0.3, 0.1],
      filter: ["blur(20px)", "blur(25px)", "blur(20px)"],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror"
      }
    }
  };
  
  // Variante para animación del botón
  const buttonVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.9
      }
    },
    hover: {
      scale: 1.05,
      y: -3,
      boxShadow: "0 15px 30px -10px rgba(139, 92, 246, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      y: 0
    }
  };
  
  // Variante para animación de la descripción
  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.7
      }
    }
  };

  // Indicador de scroll mejorado con animación elegante
  const ScrollIndicator = () => (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1,
        y: 0
      }}
      transition={{ 
        duration: 0.8,
        delay: 1.5,
        ease: "easeOut"
      }}
    >
      <motion.div 
        className="flex flex-col items-center"
        animate={{
          y: [0, 8, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
      >
        <motion.span 
          className="text-gray-300 text-sm mb-2 font-light tracking-wide"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          Desplaza para descubrir
        </motion.span>
        <motion.div
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-purple-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                transition: { 
                  duration: 1,
                  delay: 0.5,
                  ease: "easeInOut"
                }
              }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="text-center py-16 relative">
      {/* Efecto de brillo detrás del título */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-28 bg-purple-600/20 rounded-full -z-10"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Título con animación letra por letra */}
      <motion.h1 
        className="text-6xl md:text-7xl font-bold text-white mb-6 relative"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        style={{ y: titleY }}
      >
        <span className="sr-only">Motion Kit</span>
        <span aria-hidden="true" className="inline-block overflow-hidden">
          {titleChars.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={charVariants}
              className={`inline-block ${char === " " ? "mx-3" : ""}`}
              style={{
                textShadow: "0 0 15px rgba(167, 139, 250, 0.7)"
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
        
        {/* Línea decorativa bajo el título */}
        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-purple-600 to-violet-400 rounded-full mx-auto mt-4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: 1, 
            opacity: 1,
            transition: { 
              delay: 0.6,
              duration: 0.8,
              ease: [0.175, 0.885, 0.32, 1]
            }
          }}
        />
      </motion.h1>
      
      {/* Descripción con animación de fade in */}
      <motion.p 
        className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 relative"
        variants={descriptionVariants}
        initial="hidden"
        animate="visible"
        style={{ y: descY }}
      >
        Biblioteca moderna de componentes React con animaciones avanzadas para 
        crear interfaces de usuario dinámicas y atractivas.
      </motion.p>

      {/* Botón con animaciones de hover avanzadas */}
      <motion.div 
        className="flex flex-col items-center"
        style={{ y: buttonY }}
      >
        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            to="/components/buttons"
            className="block px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg transition duration-200 shadow-lg shadow-purple-600/20 relative overflow-hidden"
          >
            <span className="relative z-10">Ver Componentes</span>
            
            {/* Efecto de brillo al hacer hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500"
              initial={{ opacity: 0 }}
              whileHover={{ 
                opacity: 1,
                transition: { duration: 0.3 }
              }}
            />
            
            {/* Efecto de partículas detrás del botón */}
            <motion.div
              className="absolute -z-10 w-full h-full left-0 top-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-purple-300/40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, -Math.random() * 30 - 10],
                    x: [0, (Math.random() - 0.5) * 20],
                    opacity: [0.4, 0],
                    scale: [1, 0]
                  }}
                  transition={{
                    duration: 1 + Math.random() * 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeOut",
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </motion.div>
          </Link>
        </motion.div>
        
        {/* Indicador "Desplaza para descubrir" */}
        <ScrollIndicator />
      </motion.div>
    </div>
  );
};

export default Header;