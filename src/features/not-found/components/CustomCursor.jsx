import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Al principio, el cursor no es visible hasta que se mueva el mouse
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
      
      // Comprobar si el cursor está sobre un elemento interactivo
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const isInteractive = 
          element.tagName === 'A' || 
          element.tagName === 'BUTTON' || 
          element.classList.contains('cursor-pointer') ||
          element.closest('a, button, .cursor-pointer');
        
        setHovered(isInteractive);
      } else {
        setHovered(false);
      }
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const hideCursor = () => {
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
      
      // También ocultar el cursor en elementos interactivos
      const elements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      elements.forEach(el => {
        el.style.cursor = 'none';
      });
    };

    const showCursor = () => {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      
      // Restablecer el cursor en elementos interactivos
      const elements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      elements.forEach(el => {
        el.style.cursor = '';
      });
    };
    
    // Ocultar el cursor por defecto
    hideCursor();
    
    // Añadir event listeners
    addEventListeners();

    // Limpiar al desmontar
    return () => {
      showCursor();
      removeEventListeners();
    };
  }, [visible]);

  return (
    <>
      {/* Cursor principal */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: clicked ? 0.8 : hovered ? 1.5 : 1,
          opacity: visible ? 1 : 0
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 800,
          damping: 28,
          opacity: { duration: 0.2 }
        }}
        style={{
          backgroundColor: "white"
        }}
      />
      
      {/* Cursor pequeño que sigue exactamente al mouse */}
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: visible && !hovered ? 0.7 : 0
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 1000,
          damping: 34,
          opacity: { duration: 0.2 }
        }}
        style={{
          backgroundColor: "rgba(168, 85, 247, 0.8)",
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.6)"
        }}
      />
      
      {/* Efecto de rastro */}
      {visible && Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed rounded-full pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            x: position.x - 2,
            y: position.y - 2,
            scale: 1,
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: i * 0.05,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
          style={{ 
            width: 4,
            height: 4,
            backgroundColor: "rgba(168, 85, 247, 0.5)",
            boxShadow: "0 0 5px rgba(168, 85, 247, 0.3)"
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;