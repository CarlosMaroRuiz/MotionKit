/**
 * Configuraciones predefinidas para animaciones comunes
 */

// Animación de rotación infinita
export const rotateInfinite = (duration = 120) => ({
  rotate: 360,
  transition: {
    duration,
    repeat: Infinity,
    ease: "linear"
  }
});

// Animación de pulso (escala)
export const pulsate = (
  minScale = 1, 
  maxScale = 1.2, 
  duration = 3, 
  delay = 0
) => ({
  scale: [minScale, maxScale, minScale],
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay
  }
});

// Animación de desvanecimiento (opacidad)
export const fade = (
  minOpacity = 0.7, 
  maxOpacity = 1, 
  duration = 4, 
  delay = 0
) => ({
  opacity: [minOpacity, maxOpacity, minOpacity],
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay
  }
});

// Animación de movimiento orbital
export const orbit = (
  distance, 
  speed, 
  delay = 0, 
  varianceX = 1, 
  varianceY = 1,
  ease = "easeInOut"
) => ({
  x: [0, distance * varianceX, 0, -distance * varianceX, 0],
  y: [distance * varianceY, 0, -distance * varianceY, 0, distance * varianceY],
  transition: {
    duration: speed,
    repeat: Infinity,
    ease,
    delay
  }
});

// Animación de brillo (boxShadow)
export const glow = (
  color = "rgba(255, 255, 255, 0.8)", 
  minSize = 10, 
  maxSize = 30, 
  duration = 3, 
  delay = 0
) => ({
  boxShadow: [
    `0 0 ${minSize}px ${color}`,
    `0 0 ${maxSize}px ${color}`,
    `0 0 ${minSize}px ${color}`
  ],
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay
  }
});

// Configuración de entrada para el planeta
export const planetEntryVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: -100
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.9,
      duration: 1.5,
      type: "spring",
      stiffness: 70,
      damping: 17,
      mass: 1.2
    }
  }
};