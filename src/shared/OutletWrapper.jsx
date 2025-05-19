import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const OutletWrapper = () => {
  return (
    <motion.div 
      className="w-full flex flex-col  "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Outlet />
    </motion.div>
  );
};

export default OutletWrapper;