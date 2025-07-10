export const overlayVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

export const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.1,
      duration: 0.5,
      ease: "easeOut",
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

export const buttonVariants = {
  hover: {
    scale: 1.02,
    y: -1,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: 0.1
    }
  }
};

export const shakeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: [0, -8, 8, -8, 8, -4, 4, -2, 2, 0],
    transition: {
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
      y: { duration: 0.3 },
      x: {
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1]
      }
    }
  }
};