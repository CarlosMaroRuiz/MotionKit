import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { linkVariants } from './utils/animations';

const NavLinks = ({ navItems = [], onClick }) => {
  if (!navItems || navItems.length === 0) {
    // Valores por defecto si no se proporcionan items
    navItems = [
      { path: '/', label: 'Inicio' },
      { path: '/examples', label: 'Ejemplos' }
    ];
  }

  return (
    <div className="flex items-center space-x-8">
      {navItems.map((item, index) => (
        <NavLink 
          key={item.path}
          to={item.path} 
          className={({ isActive }) => 
            isActive 
              ? "text-purple-400 text-sm font-medium" 
              : "text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors duration-300"
          }
          onClick={onClick} // Opcional, para cerrar menús móviles
        >
          {({ isActive }) => (
            <motion.span 
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              animate={isActive ? "active" : "initial"}
              custom={index}
            >
              {item.label}
            </motion.span>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;