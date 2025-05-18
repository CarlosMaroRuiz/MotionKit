import React from 'react';
import { motion } from 'framer-motion';
import InstallationStep from '../InstallationStep';
import { installationSteps } from '../../data/installationSteps';

const InstallationSection = () => (
  <motion.div
    className="p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <motion.div 
      className="flex items-start mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="p-2 bg-purple-600/20 rounded-lg mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-white">Instalación de Tailwind CSS con Vite</h2>
    </motion.div>
    
    <motion.p 
      className="text-gray-300 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      Instalar Tailwind CSS como plugin de Vite es la forma más sencilla de integrarlo con frameworks como Laravel, SvelteKit, React Router, Nuxt y SolidJS.
    </motion.p>
    
    <div className="space-y-6">
      {installationSteps.map((step, index) => (
        <InstallationStep 
          key={index}
          number={step.number}
          title={step.title}
          description={step.description}
          code={step.code}
          language={step.language}
          delay={0.4 + (index * 0.1)}
        />
      ))}
    </div>
    
    <motion.div 
      className="mt-8 p-4 bg-gray-900/60 rounded-lg border border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
    >
      <p className="text-yellow-400 font-medium mb-2">¿Tienes problemas?</p>
      <p className="text-gray-300">
        La configuración de Tailwind con Vite puede variar según las diferentes herramientas de construcción. Consulta nuestras guías de frameworks para ver si tenemos instrucciones más específicas para tu configuración particular.
      </p>
    </motion.div>
  </motion.div>
);

export default InstallationSection;