import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/navItem';
import { sidebarVariants } from './utils/animations';
import SidebarBubble from './SidebarBubble';
import SidebarTitle from './SidebarTitle';
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <motion.div 
      className="hidden md:block fixed left-8 top-28 bottom-8 w-56 glass-effect rounded-2xl overflow-hidden z-10"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
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
  );
}

export default Sidebar;