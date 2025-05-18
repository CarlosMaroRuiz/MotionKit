import React from 'react';
import { motion } from 'framer-motion';

const StatisticsSection = () => (
  <motion.div 
    className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.6 }}
  >
    <div>
      <p className="text-4xl font-bold text-purple-400">200+</p>
      <p className="text-gray-400">Componentes</p>
    </div>
    <div>
      <p className="text-4xl font-bold text-purple-400">40+</p>
      <p className="text-gray-400">Animaciones</p>
    </div>
    <div>
      <p className="text-4xl font-bold text-purple-400">100%</p>
      <p className="text-gray-400">Personalizable</p>
    </div>
    <div>
      <p className="text-4xl font-bold text-purple-400">12+</p>
      <p className="text-gray-400">Plantillas</p>
    </div>
  </motion.div>
);

export default StatisticsSection;