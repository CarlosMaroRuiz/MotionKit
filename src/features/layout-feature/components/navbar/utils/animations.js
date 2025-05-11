/**
 * Variantes de animación para el Navbar
 */


export const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Animación del logo
export const logoVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    rotate: [0, -1, 1, -1, 0],
    transition: { 
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 2
    }
  }
};

// Animación del contenedor del logo
export const logoContainerVariants = {
  hover: { 
    boxShadow: "0 0 20px rgba(147, 51, 234, 0.7)",
    rotate: [0, -5, 5, -5, 0],
    transition: { duration: 0.5 }
  }
};

// Animación del texto del logo
export const logoTextVariants = {
  hover: { 
    scale: 1.05,
    transition: { 
      type: "spring", 
      stiffness: 300 
    }
  }
};

// Animación de los enlaces de navegación
export const linkVariants = {
  initial: { y: 0 },
  hover: { 
    y: -2,
    color: "#c084fc", // purple-400
    transition: { duration: 0.2 }
  },
  active: {
    y: 0,
    color: "#c084fc",
    textShadow: "0 0 8px rgba(192, 132, 252, 0.6)"
  }
};

// Animación del menú móvil
export const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Animación para botones
export const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    boxShadow: "0 0 5px rgba(168, 85, 247, 0.3)",
  }
};

// Animación para el ícono de búsqueda
export const searchIconVariants = {
  initial: { rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 5 
  },
  animate: { 
    rotate: [0, -1, 1, -1, 0],
    transition: { 
      repeat: Infinity, 
      repeatType: "loop", 
      duration: 5 
    }
  }
};

// Animación para el campo de búsqueda
export const searchInputVariants = {
  focus: { 
    boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
    width: "110%",
    transition: { duration: 0.3 }
  }
};

// Animaciones para los íconos del menú móvil
export const menuIconVariants = {
  open: {
    rotate: 0, 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  closed: {
    rotate: -90, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const hamburgerIconVariants = {
  open: {
    rotate: 90, 
    opacity: 0,
    transition: { duration: 0.2 }
  },
  closed: {
    rotate: 0, 
    opacity: 1,
    transition: { duration: 0.2 }
  }
};

// Animaciones para elementos del menú móvil
export const mobileMenuItemVariants = {
  initial: { x: -10, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1
  },
  hover: { 
    x: 3,
    transition: { duration: 0.2 }
  }
};

export const mobileUserInfoVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { delay: 0.2 }
  }
};

export const mobileAvatarVariants = {
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)"
  },
  tap: { 
    scale: 0.95 
  }
};

export const mobileUserTextVariants = {
  initial: { x: -5, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { delay: 0.3 }
  }
};