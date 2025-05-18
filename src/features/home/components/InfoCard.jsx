import React from 'react';
import { motion } from 'framer-motion';

const InfoCard = ({ title, children, icon, delay = 0 }) => (
  <motion.div 
    className="p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      delay, 
      type: "spring",
      stiffness: 100 
    }}
  >
    <div className="flex items-start mb-4">
      <div className="p-2 bg-purple-600/20 rounded-lg mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="text-gray-300 space-y-3">
      {children}
    </div>
  </motion.div>
);

export default InfoCard;