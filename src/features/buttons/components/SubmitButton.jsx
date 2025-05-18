import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SubmitButton = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  
  // Función para simular el envío del formulario
  const handleSubmit = () => {
    if (status !== 'idle') return;
    
    setStatus('loading');
    
    // Simulación de envío de formulario
    setTimeout(() => {
      // 90% de probabilidad de éxito
      if (Math.random() > 0.1) {
        setStatus('success');
      } else {
        setStatus('error');
      }
      
      // Volver al estado inicial después de un tiempo
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <motion.button
      className={`relative px-8 py-3 rounded-lg font-medium text-white overflow-hidden ${
        status === 'idle' ? 'bg-indigo-600' :
        status === 'loading' ? 'bg-indigo-500' :
        status === 'success' ? 'bg-green-500' :
        'bg-red-500'
      }`}
      onClick={handleSubmit}
      whileHover={status === 'idle' ? { scale: 1.03 } : {}}
      whileTap={status === 'idle' ? { scale: 0.98 } : {}}
      disabled={status !== 'idle'}
      initial={{ y: 0 }}
      animate={{ 
        y: [0, status === 'success' ? -3 : 0], 
        transition: { duration: 0.2 } 
      }}
    >
      {/* Contenedor principal para el texto e iconos */}
      <div className="flex items-center justify-center gap-2">
        {/* Icono a la izquierda */}
        {status === 'idle' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
        )}
        
        {status === 'loading' && (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </motion.svg>
        )}
        
        {status === 'success' && (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </motion.svg>
        )}
        
        {status === 'error' && (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </motion.svg>
        )}
        
        {/* Texto del botón */}
        <span>
          {status === 'idle' && 'Enviar Formulario'}
          {status === 'loading' && 'Enviando...'}
          {status === 'success' && '¡Enviado con éxito!'}
          {status === 'error' && 'Error al enviar'}
        </span>
      </div>
      
      {/* Barra de progreso para el estado de carga */}
      {status === 'loading' && (
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-white"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}
      
      {/* Efecto de onda al hacer clic (solo en estado idle) */}
      {status === 'idle' && (
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
          whileTap={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            scale: 0.9,
            transition: { duration: 0.1 }
          }}
        />
      )}
      
      {/* Brillo de éxito */}
      {status === 'success' && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Efecto de sacudida para error */}
      {status === 'error' && (
        <motion.div
          className="absolute inset-0 bg-red-800/20"
          initial={{ x: 0 }}
          animate={{ x: [0, -4, 4, -4, 4, 0] }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.button>
  );
};

// Código JSX para mostrar en la card
export const submitButtonJSX = `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SubmitButton = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  
  // Función para simular el envío del formulario
  const handleSubmit = () => {
    if (status !== 'idle') return;
    
    setStatus('loading');
    
    // Simulación de envío de formulario
    setTimeout(() => {
      // 90% de probabilidad de éxito
      if (Math.random() > 0.1) {
        setStatus('success');
      } else {
        setStatus('error');
      }
      
      // Volver al estado inicial después de un tiempo
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <motion.button
      className={\`relative px-8 py-3 rounded-lg font-medium text-white overflow-hidden \${
        status === 'idle' ? 'bg-indigo-600' :
        status === 'loading' ? 'bg-indigo-500' :
        status === 'success' ? 'bg-green-500' :
        'bg-red-500'
      }\`}
      onClick={handleSubmit}
      whileHover={status === 'idle' ? { scale: 1.03 } : {}}
      whileTap={status === 'idle' ? { scale: 0.98 } : {}}
      disabled={status !== 'idle'}
    >
      <div className="flex items-center justify-center gap-2">
        {/* Icono que cambia según el estado */}
        {status === 'idle' && (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
        )}
        
        {status === 'loading' && (
          <motion.svg 
            className="h-5 w-5" 
            viewBox="0 0 24 24"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {/* SVG del spinner */}
          </motion.svg>
        )}
        
        {/* Iconos para success y error */}
        
        {/* Texto del botón */}
        <span>
          {status === 'idle' && 'Enviar Formulario'}
          {status === 'loading' && 'Enviando...'}
          {status === 'success' && '¡Enviado con éxito!'}
          {status === 'error' && 'Error al enviar'}
        </span>
      </div>
      
      {/* Barra de progreso para el estado de carga */}
      {status === 'loading' && (
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-white"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5 }}
        />
      )}
      
      {/* Efectos adicionales según el estado */}
    </motion.button>
  );
};`;

// Código JS de animación para mostrar
export const submitButtonJS = `// Configuración para los diferentes estados del botón
const buttonStates = {
  idle: {
    style: {
      backgroundColor: '#4f46e5',  // indigo-600
      scale: 1
    },
    interactions: {
      hover: { scale: 1.03 },
      tap: { scale: 0.98 }
    }
  },
  loading: {
    style: {
      backgroundColor: '#6366f1',  // indigo-500
      scale: 1
    },
    progress: {
      initial: { width: 0 },
      animate: { width: '100%' },
      transition: { duration: 1.5, ease: "easeInOut" }
    },
    spinner: {
      animate: { rotate: 360 },
      transition: { 
        duration: 1, 
        repeat: Infinity, 
        ease: "linear" 
      }
    }
  },
  success: {
    style: {
      backgroundColor: '#22c55e',  // green-500
      y: -3
    },
    icon: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    flash: {
      initial: { opacity: 0 },
      animate: { opacity: [0, 0.2, 0] },
      transition: { duration: 0.5 }
    }
  },
  error: {
    style: {
      backgroundColor: '#ef4444',  // red-500
    },
    shake: {
      animate: { x: [0, -4, 4, -4, 4, 0] },
      transition: { duration: 0.4 }
    },
    icon: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }
  }
};

// Transiciones entre estados
const stateTransition = (from, to, callback) => {
  // Simula el tiempo necesario para una operación
  // Por ejemplo, el envío del formulario
  setTimeout(() => {
    callback(to);
    
    // Si es success o error, volver al estado idle después de un tiempo
    if (to === 'success' || to === 'error') {
      setTimeout(() => {
        callback('idle');
      }, 2000);
    }
  }, from === 'loading' ? 1500 : 0);
};

// Manejo del envío de formulario
const handleFormSubmit = (status, setStatus) => {
  if (status !== 'idle') return;
  
  setStatus('loading');
  
  // Simulación del resultado (éxito o error)
  const success = Math.random() > 0.1;
  stateTransition('loading', success ? 'success' : 'error', setStatus);
};`;

export default SubmitButton;