import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  mobileMenuVariants, 
  mobileMenuItemVariants, 
  mobileUserInfoVariants,
  mobileAvatarVariants,
  mobileUserTextVariants
} from './utils/animations';

const MobileMenu = ({ 
  isOpen, 
  navItems = [], 
  onClose,
  userInfo = {
    name: 'Usuario',
    email: 'usuario@ejemplo.com',
    avatar: 'MK'
  }
}) => {
  // Valores por defecto si no se proporcionan items
  if (!navItems || navItems.length === 0) {
    navItems = [
      { path: '/', label: 'Inicio' },
      { path: '/examples', label: 'Ejemplos' }
    ];
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
                onClick={onClose}
              >
                {({ isActive }) => (
                  <motion.div
                    variants={mobileMenuItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>
          <motion.div 
            className="pt-4 pb-3 border-t border-gray-700"
            variants={mobileUserInfoVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-center px-4">
              <motion.div 
                className="flex-shrink-0"
                variants={mobileAvatarVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div 
                  className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium"
                  whileHover={{
                    boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)"
                  }}
                >
                  {userInfo.avatar}
                </motion.div>
              </motion.div>
              <motion.div 
                className="ml-3"
                variants={mobileUserTextVariants}
                initial="initial"
                animate="animate"
              >
                <div className="text-base font-medium text-white">{userInfo.name}</div>
                <div className="text-sm font-medium text-gray-400">{userInfo.email}</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;