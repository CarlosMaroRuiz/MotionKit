// Código JSX para mostrar en la card
export const flipCardJSX = `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective-1000 w-80 h-48">
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
        onClick={handleFlip}
      >
        {/* Cara Frontal */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 p-6 flex flex-col justify-between shadow-xl"
          initial={{ rotateY: 0 }}
        >
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Motion Card</h3>
                <p className="text-purple-200 text-sm">Componente Premium</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white/80 text-sm mb-3">
              Haz clic para voltear la carta
            </p>
          </div>
        </motion.div>

        {/* Cara Trasera */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-indigo-700 to-purple-800 p-6"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {/* Contenido de la cara trasera */}
        </motion.div>
      </motion.div>
    </div>
  );
};`;