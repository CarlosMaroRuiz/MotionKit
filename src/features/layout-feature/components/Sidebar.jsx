// src/features/layout/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Sidebar() {
  // Variantes para animaciones
  const sidebarVariants = {
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
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        delay: 0.2 
      } 
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 10 
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: [-1, 2, -2, 1, 0],
      transition: { 
        duration: 0.5, 
        repeatDelay: 3 
      }
    }
  };

  const bubbleVariants = {
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

  const itemHoverVariants = {
    initial: { x: 0 },
    hover: { 
      x: 3,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  // La estructura de datos original
  const navItems = [
    { path: '/', label: 'Inicio', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ), end: true },
    { path: '/buttons', label: 'Botones', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
    ) },
    { path: '/cards', label: 'Cards', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v-1H5v1h10zm0 3v-1H5v1h10z" clipRule="evenodd" />
      </svg>
    ) },
    { path: '/alerts', label: 'Alertas', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h1v3a1 1 0 102 0v-3h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ) },
    { path: '/modals', label: 'Modales', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
    ), badge: { text: 'Premium', color: 'purple' } },
    { path: '/tooltips', label: 'Tooltips', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
      </svg>
    ), badge: { text: 'Gratis', color: 'green' } },
    { path: '/counters', label: 'Contadores', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ), badge: { text: 'Premium', color: 'purple' } },
    { path: '/navigation', label: 'Navegación', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ) },
    { path: '/forms', label: 'Formularios', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
      </svg>
    ) }
  ];

  return (
    <motion.div 
      className="hidden md:block fixed left-8 top-28 bottom-8 w-56 glass-effect rounded-2xl overflow-hidden z-10"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
    >
      {/* Burbuja decorativa 1 */}
      <motion.div
        className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-purple-600/10 -z-10"
        variants={bubbleVariants}
        initial="initial"
        animate="animate"
        custom={1}
      />
      
      {/* Burbuja decorativa 2 */}
      <motion.div
        className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full bg-purple-600/5 -z-10"
        variants={bubbleVariants}
        initial="initial"
        animate="animate"
        custom={2}
        style={{ animationDelay: "1.5s" }}
      />

      <div className="px-4 py-6 h-full flex flex-col">
        <motion.h3 
          className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-4"
          variants={titleVariants}
          whileHover={{ 
            textShadow: "0 0 8px rgba(168, 85, 247, 0.5)",
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          Explorar Componentes
        </motion.h3>

        <motion.div 
          className="space-y-1 flex-1 overflow-auto custom-scrollbar"
        >
          {/* Enlaces a las diferentes vistas */}
          <AnimatePresence>
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={linkVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink 
                  to={item.path} 
                  end={item.end}
                  className={({isActive}) => 
                    isActive 
                      ? "flex items-center px-3 py-2 text-sm font-medium text-white rounded-lg bg-purple-800 bg-opacity-50" 
                      : "flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-purple-800 hover:bg-opacity-30 transition-colors"
                  }
                >
                  {({ isActive }) => (
                    <motion.div 
                      className="flex items-center w-full"
                      variants={itemHoverVariants}
                      whileHover="hover"
                      animate={isActive ? {
                        x: 2,
                        textShadow: "0 0 5px rgba(168, 85, 247, 0.6)",
                      } : "initial"}
                    >
                      <motion.span 
                        className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`}
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        {item.icon}
                      </motion.span>

                      {item.badge ? (
                        <div className="flex items-center justify-between w-full">
                          <span>{item.label}</span>
                          <motion.span 
                            className={`ml-2 px-1.5 py-0.5 text-xs rounded ${item.badge.color === 'purple' ? 'bg-purple-800 text-purple-200' : 'bg-green-900 text-green-200'}`}
                            whileHover={{ 
                              scale: 1.05, 
                              boxShadow: item.badge.color === 'purple' 
                                ? "0 0 5px rgba(168, 85, 247, 0.5)"
                                : "0 0 5px rgba(16, 185, 129, 0.5)"
                            }}
                          >
                            {item.badge.text}
                          </motion.span>
                        </div>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </motion.div>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Sidebar;