// src/features/layout/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Variantes para animaciones
  const navbarVariants = {
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
  
  const logoVariants = {
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
  
  const linkVariants = {
    initial: { y: 0 },
    hover: { 
      y: -2,
      color: "#c084fc", // purple-400
      transition: { duration: 0.2 }
    }
  };
  
  const mobileMenuVariants = {
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

  const buttonVariants = {
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
  
  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/examples', label: 'Ejemplos' }
  ];
  
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 glass-navbar z-20"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0"
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
            >
              <div className="flex items-center">
                <motion.div 
                  className="h-9 w-9 bg-purple-600 rounded-lg flex items-center justify-center mr-2 purple-glow"
                  whileHover={{ 
                    boxShadow: "0 0 20px rgba(147, 51, 234, 0.7)",
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <NavLink to="/" className="text-xl font-bold text-white hover:text-purple-300 transition-colors duration-300">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Motion Kit
                  </motion.span>
                </NavLink>
              </div>
            </motion.div>
            
            {/* Enlaces de navegación */}
            <div className="hidden md:block ml-10">
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
                  >
                    {({ isActive }) => (
                      <motion.span 
                        variants={linkVariants}
                        initial="initial"
                        whileHover="hover"
                        animate={isActive ? {
                          y: 0,
                          color: "#c084fc",
                          textShadow: "0 0 8px rgba(192, 132, 252, 0.6)"
                        } : "initial"}
                        custom={index}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          
          {/* Acciones del lado derecho */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {/* Buscador con animación */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <motion.svg 
                    className="h-5 w-5 text-gray-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{ rotate: [0, -1, 1, -1, 0] }}
                    transition={{ repeat: Infinity, repeatType: "loop", duration: 5 }}
                  >
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </motion.svg>
                </div>
                <motion.input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-full bg-gray-800 focus:ring-purple-500 focus:border-purple-500 text-sm text-gray-300" 
                  placeholder="Buscar componentes..."
                  whileFocus={{ 
                    boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                    width: "110%",
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
              
              {/* Avatar de usuario */}
              <motion.div 
                className="relative"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.button 
                  className="h-8 w-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium text-sm border border-purple-500 hover:bg-purple-600 transition-colors duration-300"
                  whileHover={{
                    boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)"
                  }}
                >
                  MK
                </motion.button>
              </motion.div>
            </div>
          </div>
          
          {/* Menú móvil */}
          <div className="flex items-center md:hidden">
            {/* Botón de búsqueda en móvil */}
            <motion.button 
              className="p-1 mr-3 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-300 focus:outline-none"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
            
            {/* Botón de menú en móvil */}
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <span className="sr-only">Abrir menú</span>
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.svg 
                    key="close"
                    className="h-6 w-6" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg 
                    key="menu"
                    className="h-6 w-6" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil expandido con animación */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="pt-2 pb-3 space-y-1 px-2">
              {navItems.map((item, index) => (
                <NavLink 
                  key={item.path}
                  to={item.path} 
                  className={({ isActive }) => 
                    isActive 
                      ? "block px-3 py-2 rounded-md text-sm font-medium text-white bg-purple-900"
                      : "block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        opacity: 1,
                        transition: { delay: index * 0.1 }
                      }}
                      whileHover={{ 
                        x: 3,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {item.label}
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </div>
            <motion.div 
              className="pt-4 pb-3 border-t border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 0.2 }
              }}
            >
              <div className="flex items-center px-4">
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium"
                    whileHover={{
                      boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)"
                    }}
                  >
                    MK
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="ml-3"
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { delay: 0.3 }
                  }}
                >
                  <div className="text-base font-medium text-white">Usuario</div>
                  <div className="text-sm font-medium text-gray-400">usuario@ejemplo.com</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;