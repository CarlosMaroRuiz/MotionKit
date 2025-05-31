import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { flipCardJS } from './flipCardJS';
import { flipCardJSX } from './flipCardJSX';
export {flipCardJS,flipCardJSX}

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
            <motion.div
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Motion Card</h3>
                <p className="text-purple-200 text-sm">Componente Premium</p>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center">
            <motion.p 
              className="text-white/80 text-sm mb-3"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Haz clic para voltear la carta
            </motion.p>
            <motion.div
              className="inline-flex items-center text-purple-200 text-xs"
              whileHover={{ x: 5 }}
            >
              <span>Ver más detalles</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>

          {/* Partículas decorativas */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>

        {/* Cara Trasera */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-indigo-700 to-purple-800 p-6 flex flex-col justify-between shadow-xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div>
            <motion.h3 
              className="text-white font-bold text-xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
              transition={{ delay: 0.3 }}
            >
              Características Premium
            </motion.h3>
            
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFlipped ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: "⚡", text: "Animaciones fluidas" },
                { icon: "🎨", text: "Diseño personalizable" },
                { icon: "📱", text: "Totalmente responsive" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-white/90"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isFlipped ? 1 : 0, 
                    x: isFlipped ? 0 : -20 
                  }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <span className="mr-3 text-lg">{feature.icon}</span>
                  <span className="text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.button
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isFlipped ? 1 : 0, 
              y: isFlipped ? 0 : 20 
            }}
            transition={{ delay: 0.8 }}
          >
            Explorar Componente
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};



// Código JS de animación para mostrar


export default FlipCard;