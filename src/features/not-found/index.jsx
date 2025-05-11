import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Bubbles from '../layout-feature/components/bublee';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isExploding, setIsExploding] = useState(false);
  const containerRef = useRef(null);
  const numberControls = useAnimation();
  
  // Para seguimiento de mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setMousePosition({ 
          x: x / width, 
          y: y / height 
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Para efecto parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  useEffect(() => {
    x.set((mousePosition.x - 0.5) * 10); // Reducido para menor movimiento
    y.set((mousePosition.y - 0.5) * 10);
  }, [mousePosition]);

  // Función para el efecto de explosión
  const triggerExplosion = async () => {
    if (!isExploding) {
      setIsExploding(true);
      
      // Secuencia de animación
      await numberControls.start({
        scale: [1, 1.1, 0.9, 1.05, 1],
        rotate: [0, -2, 2, -1, 0],
        transition: { duration: 0.4 }
      });
      
      setTimeout(() => setIsExploding(false), 300);
    }
  };

  // Configurar variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.2
      }
    }
  };

  const numberVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      scale: 1.05,
      filter: "brightness(1.2)",
      textShadow: "0 0 30px rgba(147, 51, 234, 0.8)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: "100%", 
      opacity: 1,
      transition: { 
        delay: 0.7, 
        duration: 0.8 
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.9,
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 1.2,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Partículas de explosión
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 5) + 3,
    angle: (i / 20) * 360,
    distance: Math.random() * 150 + 50,
    duration: Math.random() * 1 + 0.5
  }));

  const particleVariants = {
    initial: { 
      scale: 0, 
      opacity: 0.8,
      x: 0, 
      y: 0 
    },
    animate: (i) => ({ 
      scale: 0,
      opacity: 0,
      x: Math.cos(i.angle * (Math.PI / 180)) * i.distance,
      y: Math.sin(i.angle * (Math.PI / 180)) * i.distance,
      transition: { 
        duration: i.duration,
        ease: [0.2, 0.9, 0.1, 1]
      }
    })
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0118] relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      ref={containerRef}
    >
      {/* Capa de burbujas - movida para que no interfiera */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <Bubbles />
      </div>

      {/* Logo Motion Kit (arriba) */}
      <motion.div 
        className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
      >
        <div className="bg-purple-600 h-10 w-10 rounded-md flex items-center justify-center shadow-lg shadow-purple-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      </motion.div>

      {/* Contenido principal - ASEGURADO Z-INDEX ALTO */}
      <div className="text-center z-20 relative px-4 mx-auto">
        {/* NÚMERO 404 GRANDE - SIMPLIFICADO Y CON PRIORIDAD */}
        <motion.div 
          className="mt-6 mb-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-[150px] sm:text-[180px] md:text-[240px] lg:text-[300px] font-bold text-purple-500 leading-none cursor-pointer select-none"
            variants={numberVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            onClick={triggerExplosion}
            style={{ 
              display: "block",
              filter: "drop-shadow(0 0 15px rgba(147, 51, 234, 0.4))",
              textShadow: "0 0 30px rgba(147, 51, 234, 0.4)",
              position: "relative",
              transform: "translateZ(0)"
            }}
          >
            404
          </motion.div>
          
          {/* Partículas de explosión */}
          <AnimatePresence>
            {isExploding && particles.map((particle) => (
              <motion.div
                key={`particle-${particle.id}`}
                className="absolute top-1/2 left-1/2 rounded-full bg-purple-500"
                style={{ 
                  width: particle.size, 
                  height: particle.size,
                  boxShadow: "0 0 5px rgba(168, 85, 247, 0.6)"
                }}
                custom={particle}
                variants={particleVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0 }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Línea decorativa */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent max-w-xs mx-auto mb-10"
          variants={lineVariants}
          style={{ 
            boxShadow: "0 0 8px rgba(147, 51, 234, 0.4)"
          }}
        />

        {/* Badge de Error */}
        <motion.div
          className="inline-block mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="px-4 py-1.5 bg-purple-600/30 rounded-full text-sm font-medium text-purple-300 border border-purple-500/20">
            Error 404
          </span>
        </motion.div>

        {/* Mensaje de error */}
        <motion.div 
          className="mb-10"
          variants={textVariants}
        >
          <motion.p 
            className="text-gray-300 mb-1 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            La página que estás buscando no existe o ha sido movida.
          </motion.p>
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            Verifica la URL o regresa al inicio para explorar nuestros componentes.
          </motion.p>
        </motion.div>

        {/* Botones de acción */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <a 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-purple-700 text-white font-medium rounded-full shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Ir al inicio
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <a 
              href="/examples"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-gray-300 font-medium rounded-full border border-purple-900/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Ver ejemplos
            </a>
          </motion.div>
        </div>
        
        {/* Etiqueta Premium */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="cursor-pointer"
        >
          <span className="px-4 py-1.5 bg-purple-600/20 rounded-full text-xs font-medium text-purple-300 border border-purple-500/20 inline-flex items-center">
            <span className="mr-1">✨</span>
            Explora nuestros componentes premium
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;