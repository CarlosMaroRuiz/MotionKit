import React from 'react';
import { motion } from 'framer-motion';

const InfoCard = ({ title, children, icon, delay = 0 }) => (
  <motion.div 
    className="w-full p-4 sm:p-5 md:p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      delay, 
      type: "spring",
      stiffness: 100 
    }}
    whileHover={{ 
      boxShadow: "0 0 15px rgba(139, 92, 246, 0.1)",
      borderColor: "rgba(139, 92, 246, 0.2)",
      transition: { duration: 0.3 }
    }}
  >
    <div className="flex flex-col w-full">
      <div className="flex items-start mb-3 sm:mb-4 flex-shrink-0">
        <div className="p-1.5 sm:p-2 bg-purple-600/20 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
      </div>
      
      <div className="text-gray-300 space-y-2 sm:space-y-3 w-full overflow-hidden">
        {children}
      </div>
    </div>
  </motion.div>
);

export default InfoCard;