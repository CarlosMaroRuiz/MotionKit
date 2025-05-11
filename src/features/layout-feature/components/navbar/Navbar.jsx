import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { navbarVariants } from './utils/animations';

// Importar componentes
import NavbarLogo from './NavbarLogo';
import NavLinks from './NavLinks';
import SearchBox from './SearchBox';
import UserAvatar from './UserAvatar';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

function Navbar({ navItems }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Si no se proporcionan navItems, usar valores por defecto
  if (!navItems) {
    navItems = [
      { path: '/', label: 'Inicio' },
      { path: '/examples', label: 'Ejemplos' }
    ];
  }
  
  // Información del usuario (podría venir de props o contexto)
  const userInfo = {
    name: 'Usuario',
    email: 'usuario@ejemplo.com',
    avatar: 'MK'
  };
  
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 glass-navbar z-20"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y enlaces de navegación */}
          <div className="flex items-center">
            {/* Logo */}
            <NavbarLogo />
            
            {/* Enlaces de navegación - Visible en desktop */}
            <div className="hidden md:block ml-10">
              <NavLinks navItems={navItems} />
            </div>
          </div>
          
          {/* Acciones del lado derecho - Visible en desktop */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {/* Buscador */}
              <SearchBox placeholder="Buscar componentes..." />
              
              {/* Avatar de usuario */}
              <UserAvatar text={userInfo.avatar} size="small" />
            </div>
          </div>
          
          {/* Controles para móvil */}
          <div className="flex items-center md:hidden">
            {/* Botón de búsqueda en móvil */}
            <motion.button 
              className="p-1 mr-3 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-300 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
            
            {/* Botón de menú */}
            <MobileMenuButton 
              isOpen={isMenuOpen} 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
            />
          </div>
        </div>
      </div>
      
      {/* Menú móvil */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        navItems={navItems} 
        onClose={() => setIsMenuOpen(false)}
        userInfo={userInfo}
      />
    </motion.nav>
  );
}

export default Navbar;