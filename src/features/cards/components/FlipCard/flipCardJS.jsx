export const flipCardJS = `// Configuración de animaciones para FlipCard
const flipAnimations = {
  // Animación principal del contenedor
  container: {
    animate: { rotateY: isFlipped ? 180 : 0 },
    transition: { 
      duration: 0.6, 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }
  },

  // Animaciones de la cara frontal
  frontFace: {
    hover: { scale: 1.05 },
    breathe: {
      opacity: [0.8, 1, 0.8],
      transition: { duration: 2, repeat: Infinity }
    },
    slideArrow: {
      whileHover: { x: 5 }
    }
  },

  // Animaciones de partículas decorativas
  particles: (index) => ({
    animate: {
      y: [0, -10, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1]
    },
    transition: {
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      delay: Math.random() * 2
    }
  }),

  // Animaciones de la cara trasera
  backFace: {
    title: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: isFlipped ? 1 : 0, 
        y: isFlipped ? 0 : 20 
      },
      transition: { delay: 0.3 }
    },
    
    features: (index) => ({
      initial: { opacity: 0, x: -20 },
      animate: { 
        opacity: isFlipped ? 1 : 0, 
        x: isFlipped ? 0 : -20 
      },
      transition: { delay: 0.6 + index * 0.1 }
    }),
    
    button: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: isFlipped ? 1 : 0, 
        y: isFlipped ? 0 : 20 
      },
      transition: { delay: 0.8 },
      whileHover: { backgroundColor: "rgba(255, 255, 255, 0.3)" },
      whileTap: { scale: 0.98 }
    }
  }
};

// Estilos CSS necesarios para el efecto 3D
const requiredCSS = \`
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}
\`;`;