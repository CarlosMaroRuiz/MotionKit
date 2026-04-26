/**
 * Variantes de animación para el sidebar
 */

export const sidebarVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.98 },
  visible: {
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15, 
      delay: 0.1,
      when: "beforeChildren", 
      staggerChildren: 0.05 
    }
  },
  exit: {
    opacity: 0, 
    x: -20, 
    transition: { 
      duration: 0.2 
    }
  }
};

// Animación del título
export const titleVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3, 
      delay: 0.2 
    } 
  },
  hover: { 
    textShadow: "0 0 8px rgba(168, 85, 247, 0.5)",
    scale: 1.02,
    transition: { 
      duration: 0.2 
    }
  }
};

// Animación de los enlaces
export const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 10 
    }
  },
  exit: { 
    opacity: 0, 
    x: -10 
  }
};

// Animación de los íconos
export const iconVariants = {
  initial: { rotate: 0 },
  hover: { 
    rotate: [-1, 2, -2, 1, 0],
    transition: { 
      duration: 0.5, 
      repeatDelay: 3 
    }
  }
};

// Animación de las burbujas decorativas
export const bubbleVariants = {
  initial: { scale: 1, opacity: 0.3 },
  animate: {
    scale: [1, 1.05, 0.98, 1],
    opacity: [0.3, 0.4, 0.3, 0.35, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
};

// Animación al pasar el cursor sobre los elementos
export const itemHoverVariants = {
  initial: { x: 0 },
  hover: { 
    x: 3,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  active: {
    x: 2,
    textShadow: "0 0 5px rgba(168, 85, 247, 0.6)",
  }
};

// Animación para las insignias
export const badgeVariants = {
  hover: { 
    scale: 1.05, 
    boxShadow: "0 0 5px rgba(168, 85, 247, 0.5)"
  },
  hoverGreen: {
    scale: 1.05, 
    boxShadow: "0 0 5px rgba(16, 185, 129, 0.5)"
  }
};