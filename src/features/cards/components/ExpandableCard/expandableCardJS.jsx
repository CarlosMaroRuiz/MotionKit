export const expandableCardJS = `// Configuración de animaciones para ExpandableCard
const expandableAnimations = {
  // Animación del contenedor principal
  container: {
    initial: { width: 320, height: 200 },
    expanded: { 
      width: 400, 
      height: 300,
      transition: { 
        duration: 0.5, 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)"
    }
  },

  // Animación del fondo con brillo
  backgroundGlow: {
    animate: {
      backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%"
    },
    transition: {
      duration: 2,
      repeat: isHovered ? Infinity : 0,
      ease: "linear"
    }
  },

  // Animación del ícono principal
  icon: {
    hover: { rotate: 15, scale: 1.1 },
    expanded: { 
      rotate: [0, 360],
      transition: { duration: 0.8 }
    }
  },

  // Animación del contenido expandido
  expandedContent: {
    initial: { opacity: 0, height: 0 },
    animate: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, delay: 0.2 }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 }
    }
  },

  // Animación de las barras de progreso
  progressBar: (value, index) => ({
    initial: { width: 0 },
    animate: { width: \`\${value}%\` },
    transition: { 
      delay: 0.5 + index * 0.1, 
      duration: 0.8 
    }
  }),

  // Animación de partículas
  particles: (particle) => ({
    initial: { scale: 0, x: 0, y: 0, opacity: 1 },
    animate: {
      scale: [0, 1, 0],
      x: Math.cos(particle.angle * (Math.PI / 180)) * particle.distance,
      y: Math.sin(particle.angle * (Math.PI / 180)) * particle.distance,
      opacity: [1, 0.8, 0]
    },
    transition: {
      duration: particle.duration,
      ease: "easeOut"
    }
  }),

  // Animación de ondas expansivas
  waves: (index) => ({
    initial: { width: 20, height: 20, opacity: 0.8 },
    animate: {
      width: [20, 200 + index * 50],
      height: [20, 200 + index * 50],
      opacity: [0.8, 0],
      borderWidth: [2, 0]
    },
    transition: {
      duration: 1,
      delay: index * 0.2,
      ease: "easeOut"
    }
  }),

  // Animación de la flecha del footer
  arrow: {
    expanded: { rotate: 180 },
    collapsed: { rotate: 0 },
    transition: { duration: 0.3 }
  }
};

// Función para generar partículas aleatorias
const generateParticles = (count = 15) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    color: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#ec4899' : '#06b6d4',
    angle: (i / count) * 360,
    distance: Math.random() * 60 + 30,
    duration: Math.random() * 0.8 + 0.6
  }));
};`;