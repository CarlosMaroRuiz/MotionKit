import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SpaceTransition = ({ isActive, destination = '/components', onTransitionComplete }) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('idle');
  
  useEffect(() => {
    if (!isActive) return;
    
    const sequence = async () => {
      setPhase('opening');
      
      setTimeout(() => setPhase('expanding'), 400);
      setTimeout(() => setPhase('morphing'), 800);
      setTimeout(() => setPhase('completing'), 1100);
      
      setTimeout(() => {
        navigate(destination);
        if (onTransitionComplete) onTransitionComplete();
      }, 1400);
    };
    
    sequence();
  }, [isActive, navigate, destination, onTransitionComplete]);

  // Generar partículas elegantes
  const particles = Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full"
      style={{
        background: `radial-gradient(circle, rgba(196, 181, 253, ${0.4 + Math.random() * 0.4}) 0%, transparent 70%)`,
        width: `${4 + Math.random() * 8}px`,
        height: `${4 + Math.random() * 8}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={phase === 'idle' ? {} : {
        y: [0, -100 - Math.random() * 200],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [0, 0.8, 0.6, 0],
        scale: [0.3, 1, 1.2, 0]
      }}
      transition={{
        duration: 1.4,
        delay: Math.random() * 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    />
  ));

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #1a1435 0%, #0f0c29 100%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Campo de estrellas animado */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1px 1px at 15% 20%, rgba(255,255,255,0.9), transparent),
                radial-gradient(1px 1px at 85% 15%, rgba(196,181,253,0.8), transparent),
                radial-gradient(2px 2px at 45% 80%, rgba(255,255,255,0.6), transparent),
                radial-gradient(1px 1px at 75% 60%, rgba(139,92,246,0.7), transparent),
                radial-gradient(1px 1px at 25% 75%, rgba(255,255,255,0.5), transparent),
                radial-gradient(2px 2px at 60% 25%, rgba(196,181,253,0.6), transparent)
              `,
              backgroundSize: '300px 200px, 250px 180px, 400px 300px'
            }}
            animate={{
              backgroundPosition: 
                phase === 'idle' ? '0% 0%, 0% 0%, 0% 0%' :
                phase === 'opening' ? '10% 5%, -5% 10%, 15% -5%' :
                phase === 'expanding' ? '30% 20%, -20% 30%, 40% -20%' :
                phase === 'morphing' ? '60% 45%, -45% 60%, 80% -45%' :
                '100% 80%, -80% 100%, 120% -80%',
              opacity: phase === 'completing' ? 0.2 : 0.8
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Círculo central que se expande elegantemente */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: 
                phase === 'idle' ? 0 :
                phase === 'opening' ? 0.1 :
                phase === 'expanding' ? 1 :
                phase === 'morphing' ? 2.5 :
                4,
              opacity:
                phase === 'idle' ? 0 :
                phase === 'opening' ? 0.3 :
                phase === 'expanding' ? 0.8 :
                phase === 'morphing' ? 0.6 :
                0
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] // Curva de easing muy suave
            }}
          >
            <div
              className="w-80 h-80 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, 
                    rgba(196, 181, 253, 0.4) 0%, 
                    rgba(139, 92, 246, 0.3) 25%, 
                    rgba(91, 33, 182, 0.2) 50%, 
                    rgba(76, 29, 149, 0.1) 75%, 
                    transparent 100%
                  )
                `,
                filter: 'blur(1px)',
                boxShadow: `
                  0 0 60px rgba(139, 92, 246, 0.3),
                  inset 0 0 40px rgba(196, 181, 253, 0.2)
                `
              }}
            />
          </motion.div>

          {/* Ondas concéntricas elegantes */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300"
              style={{
                borderColor: 'rgba(196, 181, 253, 0.3)'
              }}
              animate={phase === 'idle' ? {} : {
                scale: [0, 3 + index],
                opacity: [0.6, 0],
                borderWidth: ['2px', '0px']
              }}
              transition={{
                duration: 1.2,
                delay: index * 0.2,
                ease: "easeOut",
                repeat: phase === 'morphing' ? 1 : 0
              }}
              initial={{ width: '20px', height: '20px' }}
            />
          ))}

          {/* Efecto de morphing líquido */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 600px 300px at 30% 50%, 
                  rgba(139, 92, 246, 0.15) 0%, 
                  transparent 50%
                ),
                radial-gradient(ellipse 400px 600px at 70% 30%, 
                  rgba(196, 181, 253, 0.1) 0%, 
                  transparent 50%
                )
              `,
              filter: 'blur(2px)'
            }}
            animate={{
              scale: phase === 'morphing' ? [1, 1.5, 2] : 1,
              rotate: phase === 'morphing' ? [0, 180] : 0,
              opacity: phase === 'completing' ? 0 : 1
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />

          {/* Partículas flotantes elegantes */}
          <div className="absolute inset-0">
            {particles}
          </div>

          {/* Efecto de brillo fluido */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(45deg, 
                  transparent 0%, 
                  rgba(255, 255, 255, 0.1) 30%, 
                  rgba(196, 181, 253, 0.2) 50%, 
                  rgba(255, 255, 255, 0.1) 70%, 
                  transparent 100%
                )
              `,
              filter: 'blur(1px)'
            }}
            animate={{
              x: phase === 'idle' ? '-100%' : '100%',
              skewX: [-20, 0, 20]
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3
            }}
          />

          {/* Transición final suave */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0f0c29 0%, #1a1435 50%, #24243e 100%)'
            }}
            animate={{
              clipPath: 
                phase === 'completing' 
                  ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                  : 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
            }}
            transition={{
              duration: 0.4,
              ease: [0.76, 0, 0.24, 1] // Easing muy elegante
            }}
          />

          {/* Velo final con opacidad graduada */}
          {phase === 'completing' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpaceTransition;