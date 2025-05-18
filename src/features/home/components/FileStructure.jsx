import React from 'react';
import { motion } from 'framer-motion';

const FileStructure = ({ items, level = 0 }) => {
  // Variantes para la animación de contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: level * 0.2,
        when: "beforeChildren" 
      }
    }
  };

  // Variantes para la animación de cada elemento
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: -20, 
      height: 0,
      filter: "blur(3px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: "auto",
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        duration: 0.5
      }
    }
  };

  // Variantes para la animación del ícono
  const iconVariants = {
    hidden: { scale: 0, rotate: -15 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15,
        delay: 0.1
      }
    }
  };

  // Variantes para la animación de la línea del árbol
  const treeLineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: { 
        duration: 0.5,
        delay: 0.2 * level
      }
    }
  };

  return (
    <motion.div 
      className="pl-5 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Línea vertical del árbol */}
      <motion.div 
        className="absolute top-0 bottom-0 left-0 w-px bg-gray-700" 
        variants={treeLineVariants}
        style={{ originY: 0 }}
      />
      
      {items.map((item, index) => (
        <motion.div 
          key={index} 
          className="my-3 relative"
          variants={itemVariants}
        >
          <motion.div className="flex items-center text-sm">
            <motion.div 
              variants={iconVariants}
              className="mr-2 flex-shrink-0"
            >
              {item.type === 'folder' ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-yellow-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" 
                    clipRule="evenodd" 
                  />
                  <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                </svg>
              ) : item.type === 'jsx' ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-blue-400" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-indigo-400" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </motion.div>
            
            <motion.span 
              className={`${item.type === 'folder' ? 'text-gray-300 font-medium' : 'text-gray-400'}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 0.1 } 
              }}
            >
              {item.name}
            </motion.span>

            {/* Indicador de expansión para carpetas */}
            {item.type === 'folder' && item.children && (
              <motion.div 
                className="ml-2"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  rotate: 0,
                  transition: { delay: 0.2 } 
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 text-gray-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
          
          {/* Renderiza los hijos con retraso adicional basado en el nivel */}
          {item.children && (
            <FileStructure 
              items={item.children} 
              level={level + 1} 
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FileStructure;
