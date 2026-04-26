import React from 'react';
import { motion } from 'framer-motion';
import { titleVariants } from './utils/animations';

const SidebarTitle = ({ title = "Explorar Componentes" }) => {
  return (
    <motion.h3 
      className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-4"
      variants={titleVariants}
      whileHover="hover"
    >
      {title}
    </motion.h3>
  );
};

export default SidebarTitle;