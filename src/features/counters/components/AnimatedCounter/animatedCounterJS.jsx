export const animatedCounterJS = `// Configuraciones de animación para AnimatedCounter

// Animaciones para botones con sombras
const buttonVariants = {
  hover: { 
    scale: 1.05,
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Animaciones para el número del contador con glow effect
const numberAnimation = {
  initial: { scale: 0.8 },
  animate: { 
    scale: 1,
    textShadow: "0 0 20px rgba(255,255,255,0.6)"
  },
  transition: { duration: 0.2 }
};

// Animaciones para partículas simples
const particleAnimation = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: -30 },
  transition: { duration: 0.6 }
};

// Función para crear partículas
const createParticles = (isIncrement) => {
  return [
    { id: 1, text: isIncrement ? '+1' : '-1', color: isIncrement ? '#10b981' : '#ef4444' },
    { id: 2, text: isIncrement ? '+1' : '-1', color: isIncrement ? '#10b981' : '#ef4444' },
    { id: 3, text: isIncrement ? '+1' : '-1', color: isIncrement ? '#10b981' : '#ef4444' }
  ];
};`;