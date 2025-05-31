export const expandableCardJSX = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandableCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1000);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden cursor-pointer"
        initial={{ width: 320, height: 200 }}
        animate={{ 
          width: isExpanded ? 400 : 320,
          height: isExpanded ? 300 : 200,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ 
          duration: 0.5, 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
        onClick={handleExpand}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Contenido principal */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header con ícono animado */}
          <motion.div className="flex items-center mb-4" layout>
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4"
              whileHover={{ rotate: 15, scale: 1.1 }}
              animate={isExpanded ? { rotate: [0, 360] } : {}}
            >
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 11.172V5l-1-1z" />
              </svg>
            </motion.div>
            
            <div>
              <h3 className="text-white font-bold text-xl">Expandable Card</h3>
              <p className="text-gray-400 text-sm">Experiencia interactiva</p>
            </div>
          </motion.div>

          {/* Contenido expandido con AnimatePresence */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {/* Contenido adicional aquí */}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer con flecha animada */}
          <motion.div className="flex items-center justify-between mt-auto" layout>
            <span className="text-gray-400 text-xs">
              {isExpanded ? "Haz clic para contraer" : "Haz clic para expandir"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};`;