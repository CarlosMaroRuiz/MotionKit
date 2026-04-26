import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarItem from './SidebarItem';
import SidebarTitle from './SidebarTitle';

const MobileSidebar = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Variantes para animar el menú móvil
  const menuVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  // Variantes para animar el botón hamburguesa
  const toggleVariants = {
    closed: { 
      rotate: 0,
      backgroundColor: "rgba(107, 33, 168, 0.2)"
    },
    open: { 
      rotate: 90,
      backgroundColor: "rgba(139, 92, 246, 0.5)"
    }
  };

  return (
    <>
      {/* Botón para abrir/cerrar el sidebar móvil */}
      <motion.button
        className="fixed top-24 left-4 z-50 p-2 rounded-full shadow-lg bg-purple-900/20 backdrop-blur-sm border border-purple-800/30"
        onClick={() => setIsOpen(!isOpen)}
        variants={toggleVariants}
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle menu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-purple-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isOpen ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          )}
        </svg>
      </motion.button>

      {/* Overlay que aparece cuando el sidebar está abierto */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900/90 backdrop-blur-md z-40 shadow-xl border-r border-purple-800/30 overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-4 py-6 h-full flex flex-col">
              {/* Título del sidebar */}
              <div className="mt-12">
                <SidebarTitle title="Explorar Componentes" />
              </div>
              
              {/* Lista de elementos de navegación */}
              <motion.div
                className="space-y-1 flex-1 overflow-auto custom-scrollbar mt-4"
              >
                {navItems.map((item, index) => (
                  <div onClick={() => setIsOpen(false)} key={item.path}>
                    <SidebarItem
                      item={item}
                      index={index}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSidebar;