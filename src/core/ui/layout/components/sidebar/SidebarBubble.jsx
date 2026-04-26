import React from 'react';
import { motion } from 'framer-motion';
import { bubbleVariants } from './utils/animations';

const SidebarBubble = ({ 
  position = 'top-right',  // top-right, bottom-left, etc.
  size = 'medium',         // small, medium, large
  color = 'purple',        // purple, blue, etc.
  delay = 0                // delay in animation
}) => {
  // Configuración de posición
  let positionClass = '';
  switch (position) {
    case 'top-right':
      positionClass = '-top-10 -right-10';
      break;
    case 'bottom-left':
      positionClass = '-bottom-10 -left-10';
      break;
    default:
      positionClass = '-top-10 -right-10';
  }

  // Configuración de tamaño
  let sizeClass = '';
  switch (size) {
    case 'small':
      sizeClass = 'w-16 h-16';
      break;
    case 'medium':
      sizeClass = 'w-20 h-20';
      break;
    case 'large':
      sizeClass = 'w-24 h-24';
      break;
    default:
      sizeClass = 'w-20 h-20';
  }

  // Configuración de color
  let colorClass = '';
  switch (color) {
    case 'purple':
      colorClass = 'bg-purple-600/10';
      break;
    case 'purple-light':
      colorClass = 'bg-purple-600/5';
      break;
    default:
      colorClass = 'bg-purple-600/10';
  }

  return (
    <motion.div
      className={`absolute ${positionClass} ${sizeClass} rounded-full ${colorClass} -z-10`}
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      style={{ 
        animationDelay: `${delay}s` 
      }}
    />
  );
};

export default SidebarBubble;