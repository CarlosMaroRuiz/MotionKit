import React from 'react';
import { motion } from 'framer-motion';
import InfoCard from '../InfoCard';
import CodeExample from '../CodeExample';

const DependenciesSection = () => {
  // Variantes para animar elementos (mantenidas igual)
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Variantes para enlaces
  const linkVariants = {
    hidden: { borderBottom: "0px solid rgba(167, 139, 250, 0)" },
    visible: { borderBottom: "0px solid rgba(167, 139, 250, 0)" },
    hover: { 
      color: "#a78bfa",
      borderBottom: "1px solid rgba(167, 139, 250, 1)",
      transition: { duration: 0.2 }
    }
  };

  // Variantes para los títulos de sección
  const sectionTitleVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      filter: "blur(3px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <InfoCard
      title="Dependencias"
      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>}
      delay={0.2}
    >
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="w-full text-sm sm:text-base"
      >
        <motion.p 
          variants={itemVariants}
          className="text-gray-300"
        >
          Para utilizar Motion Kit, necesitas instalar:
        </motion.p>
        
        <motion.div variants={itemVariants} className="w-full">
          <motion.h4 
            className="text-white font-medium mt-3 sm:mt-4 mb-1.5 sm:mb-2 flex items-center text-sm sm:text-base"
            variants={sectionTitleVariants}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "2px", height: "14px" }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="bg-purple-500 mr-1.5 sm:mr-2 rounded-full sm:w-[3px] sm:h-[16px] flex-shrink-0"
            />
            Framer Motion
          </motion.h4>
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="w-full"
          >
            <CodeExample code="npm install framer-motion" />
          </motion.div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="w-full">
          <motion.h4 
            className="text-white font-medium mt-3 sm:mt-4 mb-1.5 sm:mb-2 flex items-center text-sm sm:text-base"
            variants={sectionTitleVariants}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "2px", height: "14px" }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="bg-purple-500 mr-1.5 sm:mr-2 rounded-full sm:w-[3px] sm:h-[16px] flex-shrink-0"
            />
            Tailwind CSS
          </motion.h4>
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="w-full"
          >
            <CodeExample code="npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p" />
          </motion.div>
        </motion.div>
        
        <motion.p 
          className="mt-3 sm:mt-4 text-gray-300 text-xs sm:text-sm md:text-base break-words"
          variants={itemVariants}
        >
          Asegúrate de configurar correctamente Tailwind CSS en tu proyecto siguiendo la
          <motion.a
            href="https://tailwindcss.com/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 ml-1 relative hover:text-purple-300 inline-block"
            variants={linkVariants}
            whileHover="hover"
          >
            documentación oficial
            <motion.span
              className="absolute bottom-0 left-0 w-full h-px bg-purple-500/50"
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>.
        </motion.p>
        
        {/* Indicador de dependencias completas */}
        <motion.div
          className="flex items-center mt-3 sm:mt-4 text-green-400 text-[10px] sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 2.1, 
              type: "spring",
              stiffness: 500,
              damping: 10
            }}
            className="mr-1 sm:mr-2 flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.3 }}
          >
            Todas las dependencias listadas
          </motion.span>
        </motion.div>
      </motion.div>
    </InfoCard>
  );
};

export default DependenciesSection;