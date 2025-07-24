// src/features/layout-feature/components/navbar/UserAvatar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../core/context/AuthContext';

const UserAvatar = ({ size = 'medium' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  // Configuración de tamaños
  const sizeConfig = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg'
  };

  // Animaciones
  const avatarVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)"
    },
    tap: { scale: 0.95 }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.15 }
    }
  };

  const itemVariants = {
    hover: {
      backgroundColor: "rgba(139, 92, 246, 0.1)",
      x: 4,
      transition: { duration: 0.2 }
    }
  };

  if (!user) {
    return (
      <motion.button
        onClick={() => navigate('/login')}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Iniciar Sesión
      </motion.button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`${sizeConfig[size]} bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
        variants={avatarVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {user.avatar || user.name?.charAt(0).toUpperCase() || 'U'}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.avatar || user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {user.name || 'Usuario'}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {user.email}
                  </p>
                  {user.role && (
                    <span className="inline-block px-2 py-1 text-xs bg-purple-600 text-white rounded mt-1">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <motion.button
                className="w-full px-4 py-2 text-left text-gray-300 hover:text-white flex items-center space-x-2"
                variants={itemVariants}
                whileHover="hover"
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Aquí podrías navegar a un perfil de usuario
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>Mi Perfil</span>
              </motion.button>

              <motion.button
                className="w-full px-4 py-2 text-left text-gray-300 hover:text-white flex items-center space-x-2"
                variants={itemVariants}
                whileHover="hover"
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Aquí podrías navegar a configuraciones
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>Configuración</span>
              </motion.button>

              <div className="border-t border-gray-700 my-1"></div>

              <motion.button
                className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 flex items-center space-x-2"
                variants={itemVariants}
                whileHover="hover"
                onClick={handleLogout}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                <span>Cerrar Sesión</span>
              </motion.button>
            </div>

            {/* Login Time */}
            {user.loginTime && (
              <div className="px-4 py-2 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Conectado desde: {new Date(user.loginTime).toLocaleTimeString()}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAvatar;