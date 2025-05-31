import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { expandableCardJS } from './expandableCardJS';
import { expandableCardJSX } from './expandableCardJSX';
export {expandableCardJS,expandableCardJSX}


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

  // Generar partículas aleatorias
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    color: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#ec4899' : '#06b6d4',
    angle: (i / 15) * 360,
    distance: Math.random() * 60 + 30,
    duration: Math.random() * 0.8 + 0.6
  }));

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
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)"
        }}
      >
        {/* Fondo con brillo animado */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-cyan-600/10"
          animate={{
            backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%"
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
          style={{ backgroundSize: "200% 100%" }}
        />

        {/* Contenido principal */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <motion.div 
            className="flex items-center mb-4"
            layout
          >
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4"
              whileHover={{ rotate: 15, scale: 1.1 }}
              animate={isExpanded ? { rotate: [0, 360] } : {}}
              transition={{ duration: 0.8 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 11.172V5l-1-1z" />
              </svg>
            </motion.div>
            
            <div>
              <motion.h3 
                className="text-white font-bold text-xl"
                layout
              >
                Expandable Card
              </motion.h3>
              <motion.p 
                className="text-gray-400 text-sm"
                layout
              >
                Experiencia interactiva
              </motion.p>
            </div>
          </motion.div>

          {/* Contenido básico */}
          <motion.p 
            className="text-gray-300 text-sm mb-4 flex-1"
            layout
          >
            Una card que se expande dinámicamente con efectos de partículas y animaciones suaves.
          </motion.p>

          {/* Contenido expandido */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mb-4"
              >
                <motion.div 
                  className="space-y-3"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    { label: "Performance", value: 98, color: "bg-green-500" },
                    { label: "Interactividad", value: 92, color: "bg-blue-500" },
                    { label: "Diseño", value: 95, color: "bg-purple-500" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <span className="text-gray-300 text-sm">{stat.label}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${stat.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.value}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          />
                        </div>
                        <span className="text-white text-sm font-medium">{stat.value}%</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div 
            className="flex items-center justify-between mt-auto"
            layout
          >
            <motion.span 
              className="text-gray-400 text-xs"
              animate={isHovered ? { color: "#a855f7" } : { color: "#9ca3af" }}
            >
              {isExpanded ? "Haz clic para contraer" : "Haz clic para expandir"}
            </motion.span>
            
            <motion.div
              className="flex items-center text-purple-400"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Efectos de borde animados */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.1), transparent, rgba(6, 182, 212, 0.1), transparent)",
            backgroundSize: "400% 400%"
          }}
          animate={isHovered ? {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          } : {}}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
        />

        {/* Partículas de expansión */}
        <AnimatePresence>
          {showParticles && particles.map((particle) => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                top: "50%",
                left: "50%",
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos(particle.angle * (Math.PI / 180)) * particle.distance,
                y: Math.sin(particle.angle * (Math.PI / 180)) * particle.distance,
                opacity: [1, 0.8, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: particle.duration,
                ease: "easeOut"
              }}
            />
          ))}
        </AnimatePresence>

        {/* Ondas de expansión */}
        <AnimatePresence>
          {showParticles && (
            <>
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={`wave-${index}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-400"
                  initial={{ width: 20, height: 20, opacity: 0.8 }}
                  animate={{
                    width: [20, 200 + index * 50],
                    height: [20, 200 + index * 50],
                    opacity: [0.8, 0],
                    borderWidth: [2, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Código JSX para mostrar en la card



export default ExpandableCard;