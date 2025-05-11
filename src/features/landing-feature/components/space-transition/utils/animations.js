/**
 * Configuraciones predefinidas para animaciones comunes en la transición espacial
 */

// Animación de desvanecimiento
export const fadeAnimation = (
  from = 0, 
  to = 1, 
  duration = 0.3, 
  ease = "easeInOut"
) => ({
  opacity: from < to ? [from, to] : [to, from],
  transition: {
    duration,
    ease
  }
});

// Animación de escala
export const scaleAnimation = (
  from = 0,
  to = 1,
  duration = 0.6,
  ease = "easeOut"
) => ({
  scale: from < to ? [from, to] : [to, from],
  transition: {
    duration,
    ease
  }
});

// Animación de desenfoque
export const blurAnimation = (
  from = "10px",
  to = "0px",
  duration = 0.6,
  ease = "easeOut"
) => ({
  filter: `blur(${from})`,
  to: { filter: `blur(${to})` },
  transition: {
    duration,
    ease
  }
});

// Animación de ancho para el rayo
export const rayWidthAnimation = (
  maxWidth = 5000,
  duration = 1.2,
  ease = "easeOut"
) => ({
  width: [0, maxWidth],
  transition: {
    duration,
    ease
  }
});

// Animación compleja con tiempos específicos
export const complexAnimation = (
  keyframes = [],
  times = [],
  duration = 1,
  ease = "easeInOut"
) => ({
  animate: keyframes,
  transition: {
    duration,
    times,
    ease
  }
});

// Variantes para el contador
export const counterVariants = {
  initial: { 
    scale: 0, 
    opacity: 0,
    filter: "blur(10px)"
  },
  animate: { 
    scale: [0, 1.2, 1], 
    opacity: [0, 1, 1], 
    filter: ["blur(10px)", "blur(2px)", "blur(0px)"],
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  },
  exit: { 
    scale: [1, 1.2, 0], 
    opacity: [1, 1, 0],
    filter: ["blur(0px)", "blur(2px)", "blur(20px)"],
    transition: { 
      duration: 0.4,
      ease: "easeIn" 
    }
  }
};