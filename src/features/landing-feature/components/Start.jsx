import React from 'react';
import { motion } from 'framer-motion';

const Stars = () => {
  // Generar estrellas aleatorias en capas con movimiento
  const generateStarsLayer = (count, sizeRange, opacityRange, speedFactor = 1, direction = 1) => {
    return Array.from({ length: count }, (_, i) => {
      const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
      const isExtra = Math.random() > 0.8; // 20% de estrellas con efectos especiales
      
      return {
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: isExtra ? 
          (Math.random() > 0.7 ? '#f3e8ff' : Math.random() > 0.5 ? '#e9d5ff' : '#ffffff') : 
          '#ffffff',
        opacity: opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 2,
        isTwinkle: Math.random() > 0.3, // 70% de las estrellas parpadean
        moveSpeed: (0.5 + Math.random() * 1.5) * speedFactor * direction, // Velocidad y dirección de movimiento
        moveDelay: Math.random() * 10, // Retraso en el inicio del movimiento
        hasPulse: isExtra && Math.random() > 0.5 // Algunas estrellas tendrán pulso adicional
      };
    });
  };
  
  // Capas de estrellas con diferentes características de movimiento
  const distantStars = generateStarsLayer(60, [0.6, 1.2], [0.15, 0.35], 0.3, 1);  // Muy lentas
  const backgroundStars = generateStarsLayer(80, [0.8, 1.5], [0.2, 0.4], 0.6, 1);  // Lentas
  const midgroundStars = generateStarsLayer(40, [1.0, 1.8], [0.3, 0.5], 1.0, -1);  // Velocidad media, dirección opuesta
  const foregroundStars = generateStarsLayer(30, [1.5, 2.5], [0.4, 0.7], 1.8, 1);  // Rápidas
  
  // Estrellas fugaces mejoradas
  const shootingStars = Array.from({ length: 6 }, (_, i) => {
    const startX = Math.random() * 95;
    const startY = Math.random() * 60;
    const size = Math.random() * 3 + 1.8;
    const angle = Math.random() * 60 - 30; // Ángulo entre -30 y 30 grados
    
    return {
      id: i,
      startX,
      startY,
      size,
      angle,
      tailLength: 15 + Math.random() * 25, // La longitud del rastro varía
      delay: 3 + Math.random() * 12, // Retraso menor para más frecuencia
      duration: 0.8 + Math.random() * 0.7, // Duración entre 0.8 y 1.5 segundos
      brightness: 0.7 + Math.random() * 0.3, // Brillo variable
      isLarge: i === 0 // La primera es más grande y especial
    };
  });
  
  // Estrellas brillantes especiales (con halo y destellos)
  const brightStars = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: 2.5 + Math.random() * 2,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    color: Math.random() > 0.5 ? '#ffffff' : '#f0f0ff',
    glowSize: 3 + Math.random() * 3,
    glowColor: Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(203, 213, 225, 0.8)',
    pulseDuration: 2 + Math.random() * 3,
    pulseDelay: Math.random() * 2
  }));
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Capa de estrellas muy distantes (las más pequeñas y lentas) */}
      {distantStars.map(star => (
        <motion.div
          key={`dist-star-${star.id}`}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color,
            opacity: star.opacity,
          }}
          animate={{
            x: [`0%`, `${star.moveSpeed}%`],
            opacity: star.isTwinkle ? [star.opacity, star.opacity * 1.2, star.opacity] : [star.opacity],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 80, // Muy lento
              ease: "linear",
              delay: star.moveDelay
            },
            opacity: star.isTwinkle ? {
              duration: star.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: star.delay
            } : {}
          }}
        />
      ))}
      
      {/* Capa de estrellas de fondo (más pequeñas y distantes) */}
      {backgroundStars.map(star => (
        <motion.div
          key={`bg-star-${star.id}`}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color,
            opacity: star.opacity,
          }}
          animate={{
            x: [`0%`, `${star.moveSpeed}%`],
            opacity: star.isTwinkle ? [star.opacity, star.opacity * 1.3, star.opacity] : [star.opacity],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60, // Lento
              ease: "linear",
              delay: star.moveDelay
            },
            opacity: star.isTwinkle ? {
              duration: star.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: star.delay
            } : {}
          }}
        />
      ))}
      
      {/* Capa de estrellas de plano medio (dirección contraria) */}
      {midgroundStars.map(star => (
        <motion.div
          key={`mid-star-${star.id}`}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color,
            opacity: star.opacity,
            boxShadow: star.hasPulse ? `0 0 ${star.size}px rgba(255, 255, 255, 0.3)` : 'none',
          }}
          animate={{
            x: [`0%`, `${star.moveSpeed}%`],
            opacity: star.isTwinkle ? [star.opacity, star.opacity * 1.4, star.opacity] : [star.opacity],
            boxShadow: star.hasPulse ? [
              `0 0 ${star.size}px rgba(255, 255, 255, 0.3)`,
              `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
              `0 0 ${star.size}px rgba(255, 255, 255, 0.3)`
            ] : [],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50, // Velocidad media
              ease: "linear",
              delay: star.moveDelay
            },
            opacity: star.isTwinkle ? {
              duration: star.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: star.delay
            } : {},
            boxShadow: star.hasPulse ? {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: star.delay
            } : {}
          }}
        />
      ))}
      
      {/* Capa de estrellas frontales (más grandes y brillantes, movimiento más rápido) */}
      {foregroundStars.map(star => (
        <motion.div
          key={`fg-star-${star.id}`}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
            opacity: star.opacity,
            zIndex: 3
          }}
          animate={{
            x: [`0%`, `${star.moveSpeed}%`],
            opacity: star.isTwinkle ? [star.opacity, star.opacity * 1.5, star.opacity] : [star.opacity],
            scale: star.isTwinkle ? [1, 1.2, 1] : [1],
            boxShadow: star.isTwinkle ? [
              `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
              `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.7)`,
              `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`
            ] : []
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40, // Más rápido
              ease: "linear",
              delay: star.moveDelay
            },
            opacity: star.isTwinkle ? {
              duration: star.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: star.delay
            } : {},
            scale: star.isTwinkle ? {
              duration: star.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: star.delay
            } : {},
            boxShadow: star.isTwinkle ? {
              duration: star.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: star.delay
            } : {}
          }}
        />
      ))}
      
      {/* Estrellas brillantes especiales con halo */}
      {brightStars.map(star => (
        <React.Fragment key={`bright-star-${star.id}`}>
          {/* Halo exterior */}
          <motion.div 
            className="absolute rounded-full"
            style={{
              width: star.size * star.glowSize * 2,
              height: star.size * star.glowSize * 2,
              left: `${star.x}%`,
              top: `${star.y}%`,
              backgroundColor: 'transparent',
              boxShadow: `0 0 ${star.size * 6}px ${star.glowColor}`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.3,
              zIndex: 2
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: star.pulseDuration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: star.pulseDelay
            }}
          />
          
          {/* Estrella central */}
          <motion.div 
            className="absolute rounded-full"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.glowColor}`,
              transform: 'translate(-50%, -50%)',
              zIndex: 3
            }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                `0 0 ${star.size * 2}px ${star.glowColor}`,
                `0 0 ${star.size * 4}px ${star.glowColor}`,
                `0 0 ${star.size * 2}px ${star.glowColor}`
              ]
            }}
            transition={{
              duration: star.pulseDuration * 0.7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: star.pulseDelay
            }}
          />
          
          {/* Destellos (lines of light) */}
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = i * 45;
            const length = star.size * 2;
            
            return (
              <motion.div
                key={`flare-${star.id}-${i}`}
                className="absolute bg-white"
                style={{
                  height: 1,
                  width: length,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  opacity: 0.5,
                  zIndex: 2
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  width: [length, length * 1.5, length]
                }}
                transition={{
                  duration: star.pulseDuration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: star.pulseDelay
                }}
              />
            );
          })}
        </React.Fragment>
      ))}
      
      {/* Estrellas fugaces mejoradas */}
      {shootingStars.map(shootingStar => {
        const distance = 120; // Distancia que recorre la estrella fugaz
        const angleRad = (shootingStar.angle * Math.PI) / 180;
        const endX = shootingStar.startX + distance * Math.cos(angleRad);
        const endY = shootingStar.startY + distance * Math.sin(angleRad);
        const tailWidth = shootingStar.isLarge ? shootingStar.size * 30 : shootingStar.size * shootingStar.tailLength;

        return (
          <React.Fragment key={`shooting-star-${shootingStar.id}`}>
            {/* Estela luminosa (tail) */}
            <motion.div
              className="absolute bg-white rounded-full z-10"
              style={{
                width: shootingStar.size * 0.5,
                height: shootingStar.size * 0.2,
                left: `${shootingStar.startX}%`,
                top: `${shootingStar.startY}%`,
                rotate: `${shootingStar.angle}deg`,
                filter: `blur(${shootingStar.size * 0.5}px)`,
                opacity: 0,
                background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0))",
                transformOrigin: "left center",
                boxShadow: `0 0 ${shootingStar.size * 2}px rgba(255, 255, 255, ${shootingStar.brightness})`
              }}
              animate={{
                x: [`0%`, `${endX - shootingStar.startX}%`], 
                y: [`0%`, `${endY - shootingStar.startY}%`],
                opacity: [0, shootingStar.brightness, 0],
                width: [shootingStar.size, tailWidth],
              }}
              transition={{
                duration: shootingStar.duration,
                repeat: Infinity,
                repeatDelay: shootingStar.delay,
                ease: "easeOut"
              }}
            />
            
            {/* Núcleo brillante de la estrella fugaz */}
            <motion.div
              className="absolute rounded-full z-11"
              style={{
                width: shootingStar.size * 1.2,
                height: shootingStar.size * 1.2,
                left: `${shootingStar.startX}%`,
                top: `${shootingStar.startY}%`,
                backgroundColor: shootingStar.isLarge ? "#f0f8ff" : "#ffffff",
                boxShadow: `0 0 ${shootingStar.size * 4}px rgba(255, 255, 255, ${shootingStar.brightness})`,
                opacity: 0
              }}
              animate={{
                x: [`0%`, `${endX - shootingStar.startX}%`], 
                y: [`0%`, `${endY - shootingStar.startY}%`],
                opacity: [0, 1, 0],
                scale: [1, shootingStar.isLarge ? 1.5 : 1.2, 0.8]
              }}
              transition={{
                duration: shootingStar.duration,
                repeat: Infinity,
                repeatDelay: shootingStar.delay,
                ease: "easeOut"
              }}
            />
            
            {/* Destello especial para la estrella fugaz grande */}
            {shootingStar.isLarge && (
              <motion.div
                className="absolute z-12"
                style={{
                  width: shootingStar.size * 3,
                  height: shootingStar.size * 3,
                  left: `${shootingStar.startX}%`,
                  top: `${shootingStar.startY}%`,
                  background: "radial-gradient(circle, rgba(255,255,255,0.9) 10%, rgba(255,255,255,0) 70%)",
                  opacity: 0
                }}
                animate={{
                  x: [`0%`, `${(endX - shootingStar.startX) * 0.4}%`], 
                  y: [`0%`, `${(endY - shootingStar.startY) * 0.4}%`],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 4, 0.1]
                }}
                transition={{
                  duration: shootingStar.duration * 0.6,
                  repeat: Infinity,
                  repeatDelay: shootingStar.delay,
                  ease: "easeOut"
                }}
              />
            )}
          </React.Fragment>
        );
      })}
      
      {/* Efecto Aurora mejorado */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-60"
        style={{
          background: "linear-gradient(to top, rgba(76, 29, 149, 0.08) 0%, rgba(124, 58, 237, 0.03) 60%, transparent 100%)",
          filter: "blur(40px)",
          opacity: 0.2,
          zIndex: 0
        }}
        animate={{
          y: [-15, 0, -8, -15],
          opacity: [0.15, 0.25, 0.18, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
      
      {/* Bruma estelar - añade un poco de polvo cósmico */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.01) 0%, rgba(0, 0, 0, 0) 70%)",
          opacity: 0.3
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Stars;