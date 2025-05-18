import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const MagneticButton = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonRect, setButtonRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const buttonControls = useAnimationControls();
  const glowControls = useAnimationControls();
  const textControls = useAnimationControls();
  
  const buttonRef = React.useRef(null);
  
  // Inicializar el componente
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Efecto para manejar la posición del botón
  useEffect(() => {
    if (!isMounted) return;
    
    const updateButtonRect = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonRect({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    updateButtonRect();
    window.addEventListener('resize', updateButtonRect);
    window.addEventListener('scroll', updateButtonRect);
    
    return () => {
      window.removeEventListener('resize', updateButtonRect);
      window.removeEventListener('scroll', updateButtonRect);
    };
  }, [isMounted]);
  
  // Manejar el movimiento magnético
  const handleMouseMove = (e) => {
    if (!isHovered || !buttonRef.current) return;
    
    // Obtener posición del mouse relativa al centro del botón
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    setMousePosition({ x: mouseX, y: mouseY });
    
    // Calcular la distancia del mouse al centro del botón
    const deltaX = mouseX - buttonRect.x;
    const deltaY = mouseY - buttonRect.y;
    
    // Limitar el movimiento a un rango razonable (25px)
    const moveX = deltaX * 0.3;
    const moveY = deltaY * 0.3;
    
    // Calcular la distancia para el efecto de brillo
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.sqrt(buttonRect.width * buttonRect.width + buttonRect.height * buttonRect.height) / 2;
    const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);
    
    // Calcular posición del brillo
    const glowX = (deltaX / buttonRect.width) * 100;
    const glowY = (deltaY / buttonRect.height) * 100;
    
    // Animar el botón
    buttonControls.start({
      x: moveX,
      y: moveY,
      transition: { type: "spring", stiffness: 350, damping: 15, mass: 0.2 }
    });
    
    // Animar el brillo
    glowControls.start({
      opacity: 0.8 - distanceRatio * 0.3,
      background: `radial-gradient(circle at ${glowX + 50}% ${glowY + 50}%, rgba(255, 255, 255, 0.35) 0%, rgba(168, 85, 247, 0.15) 60%, transparent 80%)`,
      transition: { duration: 0.2 }
    });
    
    // Animar el texto
    textControls.start({
      x: moveX * 0.2,
      y: moveY * 0.2,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    });
  };
  
  // Manejar entrada del mouse
  const handleMouseEnter = () => {
    setIsHovered(true);
    glowControls.start({
      opacity: 0.8,
      scale: 1,
      transition: { duration: 0.2 }
    });
  };
  
  // Manejar salida del mouse
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Resetear posición del botón
    buttonControls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 900, damping: 25 }
    });
    
    // Resetear brillo
    glowControls.start({
      opacity: 0,
      transition: { duration: 0.2 }
    });
    
    // Resetear texto
    textControls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 900, damping: 25 }
    });
  };
  
  return (
    <div 
      className="py-4 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        ref={buttonRef}
        className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium shadow-lg"
        animate={buttonControls}
        whileTap={{ scale: 0.95 }}
        style={{ boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
      >
        {/* Efecto de brillo */}
        <motion.div 
          className="absolute inset-0 rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={glowControls}
        />
        
        {/* Contenido del botón */}
        <motion.div 
          animate={textControls}
          className="relative flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
          </svg>
          <span>Botón Magnético</span>
        </motion.div>
      </motion.button>
    </div>
  );
};

// Código JSX para mostrar en la card
export const magneticButtonJSX = `import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const MagneticButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonRect, setButtonRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const buttonControls = useAnimationControls();
  const glowControls = useAnimationControls();
  const textControls = useAnimationControls();
  const buttonRef = useRef(null);
  
  // Efecto para manejar la posición del botón
  useEffect(() => {
    const updateButtonRect = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonRect({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    updateButtonRect();
    window.addEventListener('resize', updateButtonRect);
    window.addEventListener('scroll', updateButtonRect);
    
    return () => {
      window.removeEventListener('resize', updateButtonRect);
      window.removeEventListener('scroll', updateButtonRect);
    };
  }, []);
  
  // Manejar el movimiento magnético
  const handleMouseMove = (e) => {
    if (!isHovered || !buttonRef.current) return;
    
    // Obtener posición del mouse relativa al centro del botón
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calcular la distancia del mouse al centro del botón
    const deltaX = mouseX - buttonRect.x;
    const deltaY = mouseY - buttonRect.y;
    
    // Limitar el movimiento a un rango razonable
    const moveX = deltaX * 0.3;
    const moveY = deltaY * 0.3;
    
    // Animar el botón, el brillo y el texto
    buttonControls.start({
      x: moveX,
      y: moveY,
      transition: { type: "spring", stiffness: 350, damping: 15 }
    });
    
    // Cálculos para el brillo y animaciones de texto...
  };
  
  return (
    <div 
      className="py-4 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        buttonControls.start({ x: 0, y: 0 });
        glowControls.start({ opacity: 0 });
        textControls.start({ x: 0, y: 0 });
      }}
    >
      <motion.button
        ref={buttonRef}
        className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium shadow-lg"
        animate={buttonControls}
        whileTap={{ scale: 0.95 }}
      >
        {/* Efecto de brillo */}
        <motion.div 
          className="absolute inset-0 rounded-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={glowControls}
        />
        
        {/* Contenido del botón */}
        <motion.div animate={textControls} className="relative flex items-center justify-center gap-2">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
          </svg>
          <span>Botón Magnético</span>
        </motion.div>
      </motion.button>
    </div>
  );
};`;

// Código JS de animación para mostrar
export const magneticButtonJS = `// Configuración para el efecto magnético
const calculateMagneticEffect = (mouseX, mouseY, buttonRect) => {
  // Calcular la distancia del mouse al centro del botón
  const deltaX = mouseX - buttonRect.x;
  const deltaY = mouseY - buttonRect.y;
  
  // Limitar el movimiento (factor 0.3 limita a aproximadamente 30% del movimiento del mouse)
  const moveX = deltaX * 0.3;
  const moveY = deltaY * 0.3;
  
  // Calcular la distancia para el efecto de brillo
  const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const maxDistance = Math.sqrt(
    buttonRect.width * buttonRect.width + buttonRect.height * buttonRect.height
  ) / 2;
  const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);
  
  // Calcular posición del brillo (en porcentaje)
  const glowX = (deltaX / buttonRect.width) * 100;
  const glowY = (deltaY / buttonRect.height) * 100;
  
  return {
    movement: { x: moveX, y: moveY },
    glow: { 
      position: { x: glowX + 50, y: glowY + 50 },
      opacity: 0.8 - distanceRatio * 0.3
    },
    text: { x: moveX * 0.2, y: moveY * 0.2 }
  };
};

// Animaciones para el botón
const buttonAnimations = {
  hover: {
    x: (moveX) => moveX,
    y: (moveY) => moveY,
    transition: { type: "spring", stiffness: 350, damping: 15, mass: 0.2 }
  },
  reset: {
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 900, damping: 25 }
  }
};

// Animaciones para el brillo
const glowAnimations = {
  hover: {
    opacity: 0.8,
    scale: 1,
    transition: { duration: 0.2 }
  },
  moving: (glowPosition) => ({
    opacity: glowPosition.opacity,
    background: \`radial-gradient(circle at \${glowPosition.x}% \${glowPosition.y}%, 
      rgba(255, 255, 255, 0.35) 0%, 
      rgba(168, 85, 247, 0.15) 60%, 
      transparent 80%)\`
  }),
  reset: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Animaciones para el texto
const textAnimations = {
  hover: (move) => ({
    x: move.x,
    y: move.y,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }),
  reset: {
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 900, damping: 25 }
  }
};`;

export default MagneticButton;