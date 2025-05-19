import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeExample = ({ code, language = "bash" }) => {
  // Estado para controlar la animación de copiado
  const [copied, setCopied] = useState(false);
  
  // Dividir el código en líneas para animar cada una
  const lines = code.split('\n');
  
  // Función para copiar el código al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Variantes para animaciones (mantenidas igual)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      }
    }
  };
  
  const lineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };
  
  const charVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: {
      opacity: 1,
      display: "inline",
      transition: { duration: 0.03 }
    }
  };

  const cursorVariants = {
    blink: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const bgVariants = {
    hidden: {
      background: "linear-gradient(to right, #0f1015, #131419)"
    },
    visible: {
      background: "linear-gradient(to right, #0f1015, #1a1d24)",
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const copyButtonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { delay: 1.5, duration: 0.3 } },
    hover: { 
      scale: 1.05, 
      backgroundColor: "rgba(139, 92, 246, 0.3)",
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.95 }
  };

  const copiedNotificationVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { 
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="w-full bg-gray-950 rounded-md p-2 sm:p-3 font-mono text-xs sm:text-sm 
                 overflow-hidden my-2 sm:my-3 border border-gray-800 shadow-lg relative group max-w-full"
      variants={bgVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)",
        borderColor: "rgba(139, 92, 246, 0.5)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Decoración de terminal en la parte superior */}
      <motion.div 
        className="flex items-center space-x-2 mb-1 sm:mb-2 pb-1 sm:pb-2 border-b border-gray-800/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/70"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="flex-1 text-center text-[10px] sm:text-xs text-gray-500">terminal</div>
        
        {/* Botón de copiar */}
        <motion.button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs text-gray-400 bg-gray-800/40 hover:bg-purple-600/20 hover:text-gray-200 transition-colors"
          variants={copyButtonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          aria-label="Copiar código"
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 sm:h-3.5 sm:w-3.5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            animate={copied ? { scale: [1, 1.5, 1], rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {copied ? (
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            ) : (
              <>
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </>
            )}
          </motion.svg>
          <span>{copied ? "¡Copiado!" : "Copiar"}</span>
        </motion.button>
      </motion.div>

      {/* Notificación de copiado */}
      <AnimatePresence>
        {copied && (
          <motion.div 
            className="absolute top-10 sm:top-12 right-2 sm:right-3 bg-green-500/90 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs shadow-lg z-10"
            variants={copiedNotificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            ¡Código copiado al portapapeles!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenedor del código con scroll horizontal controlado */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <motion.pre
          className="relative min-w-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {lines.length > 0 ? (
            lines.map((line, lineIndex) => (
              <motion.div 
                key={lineIndex}
                variants={lineVariants}
                className="flex items-start whitespace-pre"
              >
                {/* Prompt de terminal */}
                <motion.span 
                  className="text-green-400 mr-2 flex-shrink-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * lineIndex, duration: 0.3 }}
                >
                  $
                </motion.span>
                
                {/* Código con efecto de escritura */}
                <motion.code className={`language-${language} text-gray-300 break-normal`}>
                  {Array.from(line).map((char, charIndex) => (
                    <motion.span
                      key={`${lineIndex}-${charIndex}`}
                      variants={charVariants}
                      transition={{ 
                        delay: 0.2 * lineIndex + 0.02 * charIndex,
                        duration: 0.01
                      }}
                      custom={charIndex}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.code>
                
                {/* Cursor parpadeante */}
                {lineIndex === lines.length - 1 && (
                  <motion.span
                    className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-purple-400 ml-1 flex-shrink-0"
                    variants={cursorVariants}
                    animate="blink"
                  />
                )}
              </motion.div>
            ))
          ) : (
            <motion.div variants={lineVariants} className="whitespace-pre">
              <motion.span className="text-green-400 mr-2 flex-shrink-0">$</motion.span>
              <motion.code className={`language-${language} text-gray-300`}>
                {Array.from(code).map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={charVariants}
                    transition={{ delay: 0.02 * charIndex }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.code>
              
              {/* Cursor parpadeante */}
              <motion.span
                className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-purple-400 ml-1 flex-shrink-0"
                variants={cursorVariants}
                animate="blink"
              />
            </motion.div>
          )}
        </motion.pre>
      </div>
      
      {/* Efecto de flash al copiar */}
      <AnimatePresence>
        {copied && (
          <motion.div 
            className="absolute inset-0 bg-purple-400/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CodeExample;