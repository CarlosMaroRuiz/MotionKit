import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/navItem';
import { sidebarVariants } from './utils/animations';
import SidebarBubble from './SidebarBubble';
import SidebarTitle from './SidebarTitle';
import SidebarItem from './SidebarItem';
import MobileSidebar from './MobileSidebar';

function Sidebar() {
  // Estado para controlar la visualización basada en el ancho de la ventana
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 995);
  
  useEffect(() => {
    // Función para actualizar el estado basado en el ancho de la ventana
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 995);
    };
    
    // Aplicamos debounce para mejorar el rendimiento
    let timeoutId = null;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };
    
    // Evento de escucha para el cambio de tamaño de la ventana
    window.addEventListener('resize', debouncedHandleResize);
    
    // Comprobación inicial
    handleResize();
    
    // Limpieza del evento y timeout
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* Versión de escritorio - se muestra solo cuando isDesktop es true */}
      <AnimatePresence>
        {isDesktop && (
          <motion.div
            className="fixed left-8 top-28 bottom-8 w-56 glass-effect rounded-2xl overflow-hidden z-10"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="desktop-sidebar"
          >
            {/* Burbujas decorativas */}
            <SidebarBubble
              position="top-right"
              size="medium"
              color="purple"
            />
            
            <SidebarBubble
              position="bottom-left"
              size="small"
              color="purple-light"
              delay={1.5}
            />
            
            <div className="px-4 py-6 h-full flex flex-col">
              {/* Título del sidebar */}
              <SidebarTitle title="Explorar Componentes" />
              
              {/* Lista de elementos de navegación */}
              <motion.div
                className="space-y-1 flex-1 overflow-auto custom-scrollbar"
              >
                <AnimatePresence>
                  {navItems.map((item, index) => (
                    <SidebarItem
                      key={item.path}
                      item={item}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Versión móvil - se muestra solo cuando isDesktop es false */}
      {!isDesktop && <MobileSidebar navItems={navItems} />}
    </>
  );
}

export default Sidebar;