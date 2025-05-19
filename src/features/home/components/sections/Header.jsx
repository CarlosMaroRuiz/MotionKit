import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Componente Header principal que elige entre versiones móvil y desktop
const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Aplicamos debounce para mejorar el rendimiento
    let timeoutId = null;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedHandleResize);
    
    // Comprobación inicial
    handleResize();
    
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

// Versión para dispositivos móviles
const MobileHeader = () => {
  // Animaciones basadas en scroll
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -15]);
  const descY = useTransform(scrollYProgress, [0, 0.2], [0, -10]);
  const buttonY = useTransform(scrollYProgress, [0, 0.2], [0, 5]);
  
  // Separar el título en caracteres para animar cada uno
  const titleChars = "Motion Kit".split("");
  
  // Variantes de animación
  const titleVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
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
      boxShadow: "0 10px 25px -8px rgba(139, 92, 246, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };
  
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

  return (
    <div className="w-full text-center py-4 relative">
      {/* Efecto de brillo detrás del título */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-12 bg-purple-600/20 rounded-full -z-10"
        initial={{
          opacity: 0.1,
          filter: "blur(20px)"
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          filter: ["blur(20px)", "blur(25px)", "blur(20px)"],
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror"
          }
        }}
      />
      
      {/* Título con animación letra por letra */}
      <motion.h1 
        className="text-2xl sm:text-3xl font-bold text-white mb-3 relative"
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
              className={`inline-block ${char === " " ? "mx-0.5" : ""}`}
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
          className="h-0.5 w-14 bg-gradient-to-r from-purple-600 to-violet-400 rounded-full mx-auto mt-2"
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
        className="text-xs text-gray-300 mx-auto mb-4 max-w-[260px]"
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
            className="inline-block px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-medium rounded-lg shadow-lg shadow-purple-600/20 relative overflow-hidden"
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
          </Link>
        </motion.div>
        
        {/* Indicador "Desplaza para descubrir" */}
        <motion.div 
          className="mt-5"
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
              y: [0, 5, 0]
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
              className="text-gray-300 text-xs mb-1 font-light tracking-wide"
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
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-purple-400" 
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
    </div>
  );
};

// Versión para pantallas medianas y grandes
const DesktopHeader = () => {
  // Animaciones basadas en scroll
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const descY = useTransform(scrollYProgress, [0, 0.2], [0, -15]);
  const buttonY = useTransform(scrollYProgress, [0, 0.2], [0, 5]);
  
  // Separar el título en caracteres para animar cada uno
  const titleChars = "Motion Kit".split("");
  
  // Variantes de animación (mantenemos las mismas que las originales)
  const titleVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
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

  return (
    <div className="w-full text-center py-6 md:py-8 lg:py-10 relative">
      {/* Efecto de brillo detrás del título */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] md:w-[24rem] lg:w-[28rem] h-20 md:h-24 bg-purple-600/20 rounded-full -z-10"
        initial={{
          opacity: 0.1,
          filter: "blur(20px)"
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          filter: ["blur(20px)", "blur(25px)", "blur(20px)"],
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror"
          }
        }}
      />
      
      {/* Título con animación letra por letra */}
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 relative"
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
              className={`inline-block ${char === " " ? "mx-1 md:mx-2 lg:mx-3" : ""}`}
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
          className="h-1 w-20 md:w-24 lg:w-32 bg-gradient-to-r from-purple-600 to-violet-400 rounded-full mx-auto mt-3"
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
        className="text-base md:text-lg lg:text-xl text-gray-300 mx-auto mb-8 max-w-md md:max-w-lg lg:max-w-2xl"
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
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm md:text-base font-medium rounded-lg shadow-lg shadow-purple-600/20 relative overflow-hidden"
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
                className="h-5 md:h-6 w-5 md:w-6 text-purple-400" 
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
      </motion.div>
    </div>
  );
};

export default Header;