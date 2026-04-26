import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ text = "Cargando entorno...", size = "lg" }) => {
  const dimensionClasses = size === "lg" ? "w-16 h-16" : size === "md" ? "w-10 h-10" : "w-6 h-6";
  const containerClasses = size === "lg" ? "h-96 md:h-[620px]" : "h-full min-h-32";

  return (
    <div className={`flex flex-col items-center justify-center w-full ${containerClasses}`}>
      <motion.div 
        className={`relative ${dimensionClasses}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        {/* Anillo exterior orbitando */}
        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        
        {/* Estrella central pulsante */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-1/4 h-1/4 rounded-full bg-purple-200"
          style={{ transform: "translate(-50%, -50%)", boxShadow: "0 0 10px rgba(216, 180, 254, 0.8)" }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      {text && (
        <motion.p 
          className={`mt-6 text-purple-300/70 tracking-[0.3em] uppercase font-light ${size === "sm" ? "text-[10px]" : "text-xs"}`}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
