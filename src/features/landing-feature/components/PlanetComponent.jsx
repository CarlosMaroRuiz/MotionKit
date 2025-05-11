import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Planet = () => {
  // Controles de animación para el planeta
  const planetControls = useAnimation();
  
  // Animación de rotación del planeta (más lenta)
  useEffect(() => {
    planetControls.start({
      rotateY: 360,
      transition: {
        duration: 120, // Duración aumentada para una rotación más lenta
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [planetControls]);

  // Variantes de animación para el planeta - entrada desde arriba
  const planetVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: -100 // Comienza arriba de su posición final
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,   // Llega a su posición final
      transition: {
        delay: 0.9,
        duration: 1.5,
        type: "spring",
        stiffness: 70, // Más suave
        damping: 17,  // Más amortiguación para un movimiento más elegante
        mass: 1.2    // Añade un poco más de peso para un movimiento más elegante
      }
    }
  };

  return (
    <motion.div 
      className="w-full md:w-1/2 relative h-96 md:h-[600px] perspective-1000"
      variants={planetVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sistema planetario */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
        {/* Planeta - Ahora con más efectos para mayor esfericidad */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full overflow-hidden"
          animate={planetControls}
          style={{ 
            transformStyle: "preserve-3d",
            boxShadow: "0 0 60px rgba(147, 51, 234, 0.5)",
            // Mejora la sensación de profundidad con una sombra interna
            filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.4))"
          }}
          whileHover={{
            boxShadow: "0 0 80px rgba(147, 51, 234, 0.7)",
          }}
        >
          {/* Base esférica del planeta */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(191, 128, 252, 1), rgba(88, 28, 135, 0.8))",
              // Añade un ligero efecto de borde para reforzar la forma esférica
              boxShadow: "inset -15px -15px 40px rgba(0, 0, 0, 0.4), inset 15px 15px 40px rgba(255, 255, 255, 0.2)"
            }}
          />

          {/* Capa de superficie con gradiente dinámico */}
          <motion.div 
            className="absolute inset-0 rounded-full opacity-90"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, rgba(179, 136, 255, 0.6), rgba(67, 56, 202, 0.8), rgba(55, 48, 163, 1))",
                "radial-gradient(circle at 35% 35%, rgba(168, 129, 252, 0.6), rgba(79, 70, 229, 0.8), rgba(67, 56, 202, 1))",
                "radial-gradient(circle at 40% 25%, rgba(157, 114, 245, 0.6), rgba(79, 70, 229, 0.7), rgba(88, 28, 135, 1))",
                "radial-gradient(circle at 30% 30%, rgba(179, 136, 255, 0.6), rgba(67, 56, 202, 0.8), rgba(55, 48, 163, 1))"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />

          {/* Efecto de brillo esférico para simular iluminación */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.3), transparent 50%)",
              mixBlendMode: "overlay"
            }}
          />

          {/* Sombra dinámica para simular rotación */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(120deg, transparent 40%, rgba(0, 0, 0, 0.4) 80%)"
            }}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 120,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Textura del planeta - Cráteres y detalles mejorados */}
          {Array.from({ length: 15 }).map((_, i) => {
            const size = 8 + Math.random() * 25;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = 0.2 + Math.random() * 0.4;
            
            return (
              <motion.div
                key={`crater-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: `${posX}%`,
                  top: `${posY}%`,
                  background: `radial-gradient(circle, rgba(${60 + Math.random() * 40}, ${40 + Math.random() * 30}, ${120 + Math.random() * 60}, ${opacity}), rgba(${40 + Math.random() * 20}, ${20 + Math.random() * 20}, ${100 + Math.random() * 50}, ${opacity * 1.2}))`,
                  boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.6)'
                }}
              />
            );
          })}

          {/* Nubes/Atmósfera con efecto más tridimensional */}
          {Array.from({ length: 8 }).map((_, i) => {
            const width = 50 + Math.random() * 120;
            const height = 8 + Math.random() * 18;
            const posX = Math.random() * 80;
            const posY = Math.random() * 100;
            const rotation = Math.random() * 180;
            const blur = 5 + Math.random() * 5;
            
            return (
              <motion.div
                key={`cloud-${i}`}
                className="absolute rounded-full"
                style={{
                  width,
                  height,
                  left: `${posX}%`,
                  top: `${posY}%`,
                  transform: `rotate(${rotation}deg)`,
                  background: 'rgba(255, 255, 255, 0.2)',
                  filter: `blur(${blur}px)`,
                  opacity: 0.2 + Math.random() * 0.2
                }}
                animate={{
                  opacity: [0.2 + Math.random() * 0.1, 0.3 + Math.random() * 0.2, 0.2 + Math.random() * 0.1],
                  x: [0, width * 0.08, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            );
          })}
        </motion.div>

        {/* Anillos del planeta - Ahora con mejor perspectiva */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 planet-ring">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full"
              style={{
                width: 310 + i * 20,
                height: 310 + i * 20,
                borderWidth: 3 - i * 0.5,
                borderColor: `rgba(${168 - i * 15}, ${85 - i * 8}, ${247 - i * 15}, ${0.35 - i * 0.06})`,
                boxShadow: `0 0 10px rgba(${168 - i * 15}, ${85 - i * 8}, ${247 - i * 15}, 0.25)`,
                // Mejora el efecto de perspectiva de los anillos
                transform: `translate(-50%, -50%) rotateX(75deg) rotateZ(${i * 5}deg)`
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.02, 1],
                opacity: [0.25 + i * 0.04, 0.35 + i * 0.04, 0.25 + i * 0.04]
              }}
              transition={{
                rotate: {
                  duration: 90 - i * 10, // Rotación más lenta para los anillos
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 5 + i,
                  repeat: Infinity,
                  repeatType: "reverse"
                },
                opacity: {
                  duration: 4 + i,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          ))}
        </div>

        {/* Particulas de polvo en los anillos */}
        {Array.from({ length: 30 }).map((_, i) => {
          const size = 1 + Math.random() * 2;
          const angle = Math.random() * 360;
          const radius = 155 + Math.random() * 70;
          const speed = 30 + Math.random() * 60;
          
          return (
            <motion.div
              key={`dust-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full bg-purple-200 opacity-60"
              style={{
                width: size,
                height: size,
                transform: `translate(-50%, -50%) rotateX(75deg)`,
                boxShadow: size > 1.3 ? `0 0 ${size * 2}px rgba(216, 180, 254, 0.8)` : 'none'
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: "linear"
              }}
              initial={{
                left: `calc(50% + ${radius * Math.cos(angle * Math.PI / 180)}px)`,
                top: `calc(50% + ${radius * Math.sin(angle * Math.PI / 180) * 0.3}px)`
              }}
            />
          );
        })}

        {/* Lunas pequeñas */}
        {Array.from({ length: 3 }).map((_, i) => {
          const size = 8 + i * 7;
          const distance = 190 + i * 30;
          const speed = 15 - i * 2;
          const delay = i * 2;
          
          return (
            <motion.div
              key={`moon-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                width: size,
                height: size,
                marginTop: -size / 2,
                marginLeft: -size / 2,
                // Estilo más detallado para las lunas
                background: i === 1 
                  ? 'radial-gradient(circle at 30% 30%, rgba(226, 232, 240, 0.9), rgba(203, 213, 225, 0.8))' 
                  : 'radial-gradient(circle at 30% 30%, rgba(248, 250, 252, 0.9), rgba(226, 232, 240, 0.8))',
                boxShadow: `0 0 10px rgba(255, 255, 255, 0.3), inset 0 0 4px rgba(0, 0, 0, 0.4)`
              }}
              animate={{
                x: [0, distance, 0, -distance, 0],
                y: [distance, 0, -distance, 0, distance],
                boxShadow: [
                  `0 0 10px rgba(255, 255, 255, 0.2), inset 0 0 4px rgba(0, 0, 0, 0.4)`,
                  `0 0 15px rgba(255, 255, 255, 0.4), inset 0 0 4px rgba(0, 0, 0, 0.4)`,
                  `0 0 10px rgba(255, 255, 255, 0.2), inset 0 0 4px rgba(0, 0, 0, 0.4)`
                ]
              }}
              transition={{
                x: {
                  duration: speed * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay
                },
                y: {
                  duration: speed * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay
                },
                boxShadow: {
                  duration: speed / 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay
                }
              }}
            >
              {/* Sombra en la superficie de la luna */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.3) 100%)",
                  transform: "rotate(45deg)"
                }}
              />
              
              {/* Cráteres en las lunas para mayor detalle */}
              {Array.from({ length: i * 2 + 1 }).map((_, j) => (
                <div
                  key={`moon-crater-${i}-${j}`}
                  className="absolute rounded-full"
                  style={{
                    width: 1 + Math.random() * (size / 4),
                    height: 1 + Math.random() * (size / 4),
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    background: 'rgba(0, 0, 0, 0.2)',
                    boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.5)'
                  }}
                />
              ))}
            </motion.div>
          );
        })}

        {/* Estrellas cercanas adicionales */}
        {Array.from({ length: 25 }).map((_, i) => {
          const size = 1 + Math.random() * 2;
          const distance = 250 + Math.random() * 100;
          const angle = Math.random() * 360;
          const angleRad = (angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * distance;
          const y = Math.sin(angleRad) * distance;
          const pulseSpeed = 1 + Math.random() * 2;
          
          return (
            <motion.div
              key={`nearby-star-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full bg-white"
              style={{
                width: size,
                height: size,
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                boxShadow: size > 1.5 ? `0 0 ${size * 3}px rgba(255, 255, 255, 0.8)` : 'none'
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: pulseSpeed,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Planet;