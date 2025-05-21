import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [autoDismiss, setAutoDismiss] = useState(true);
  const [dismissProgress, setDismissProgress] = useState(100);

  // Duration for auto-dismiss in ms
  const dismissDuration = 5000;
  
  // Toggle modal visibility and reset progress
  const showAlert = (type) => {
    setAlertType(type);
    setDismissProgress(100);
    setIsOpen(true);
  };
  
  // Close the alert
  const closeAlert = () => {
    setIsOpen(false);
  };
  
  // Toggle auto-dismiss feature
  const toggleAutoDismiss = () => {
    setAutoDismiss(!autoDismiss);
  };

  // Handle auto-dismiss countdown
  useEffect(() => {
    let intervalId;
    let timeoutId;
    
    if (isOpen && autoDismiss) {
      // Set timeout to close the alert
      timeoutId = setTimeout(() => {
        closeAlert();
      }, dismissDuration);
      
      // Set interval to update progress bar
      intervalId = setInterval(() => {
        setDismissProgress((prev) => {
          const newProgress = prev - (100 / (dismissDuration / 100));
          return newProgress < 0 ? 0 : newProgress;
        });
      }, 100);
    }
    
    // Cleanup on unmount or when alert closes
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isOpen, autoDismiss]);

  // Get alert configuration based on type
  const getAlertConfig = (type) => {
    const configs = {
      success: {
        bgColor: 'bg-green-500/90',
        borderColor: 'border-green-600',
        iconColor: 'text-green-100',
        progressColor: 'bg-green-300',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ),
        title: 'Operación Exitosa',
        message: 'La acción se ha completado correctamente.'
      },
      error: {
        bgColor: 'bg-red-500/90',
        borderColor: 'border-red-600',
        iconColor: 'text-red-100',
        progressColor: 'bg-red-300',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        ),
        title: 'Error',
        message: 'Ha ocurrido un error al procesar tu solicitud.'
      },
      warning: {
        bgColor: 'bg-amber-500/90',
        borderColor: 'border-amber-600', 
        iconColor: 'text-amber-100',
        progressColor: 'bg-amber-300',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ),
        title: 'Advertencia',
        message: 'Esta acción podría tener consecuencias no deseadas.'
      },
      info: {
        bgColor: 'bg-blue-500/90',
        borderColor: 'border-blue-600',
        iconColor: 'text-blue-100',
        progressColor: 'bg-blue-300',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        ),
        title: 'Información',
        message: 'Esto es un mensaje informativo para tu conocimiento.'
      }
    };
    
    return configs[type] || configs.info;
  };

  // Animation variants
  const alertContainerVariants = {
    hidden: { 
      y: -100,
      x: "-50%",
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      y: 0,
      x: "-50%",
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      y: -100,
      x: "-50%",
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const alertContentVariants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
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

  // Get current alert config
  const config = getAlertConfig(alertType);

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {/* Buttons to trigger different types of alerts */}
      <motion.button
        className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium"
        onClick={() => showAlert('success')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Éxito
      </motion.button>
      
      <motion.button
        className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium"
        onClick={() => showAlert('error')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Error
      </motion.button>
      
      <motion.button
        className="px-3 sm:px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium"
        onClick={() => showAlert('warning')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Advertencia
      </motion.button>
      
      <motion.button
        className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
        onClick={() => showAlert('info')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Info
      </motion.button>
      
      {/* Auto-dismiss toggle */}
      <motion.button
        className={`px-3 sm:px-4 py-2 ${autoDismiss ? 'bg-purple-600' : 'bg-gray-600'} text-white rounded-lg text-sm font-medium`}
        onClick={toggleAutoDismiss}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Auto-cierre: {autoDismiss ? 'ON' : 'OFF'}
      </motion.button>

      {/* Alert Container */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] pointer-events-none flex items-start justify-center pt-16">
            <motion.div
              className={`pointer-events-auto max-w-sm w-full rounded-lg shadow-lg border ${config.borderColor} ${config.bgColor} backdrop-blur-sm overflow-hidden`}
              variants={alertContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ 
                left: "50%", 
                boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 0, 0, 0.2)` 
              }}
            >
              {/* Progress bar for auto-dismiss */}
              {autoDismiss && (
                <motion.div 
                  className={`h-1 ${config.progressColor}`} 
                  initial={{ width: "100%" }}
                  animate={{ width: `${dismissProgress}%` }}
                  transition={{ ease: "linear" }}
                />
              )}
              
              <div className="p-4">
                <div className="flex items-start">
                  {/* Alert Icon */}
                  <motion.div 
                    className={`flex-shrink-0 ${config.iconColor}`}
                    variants={alertContentVariants}
                  >
                    {config.icon}
                  </motion.div>
                  
                  {/* Alert Content */}
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <motion.p 
                      className="text-sm font-medium text-white"
                      variants={alertContentVariants}
                    >
                      {config.title}
                    </motion.p>
                    <motion.p 
                      className="mt-1 text-sm text-white/90"
                      variants={alertContentVariants}
                    >
                      {config.message}
                    </motion.p>
                  </div>
                  
                  {/* Close Button */}
                  <div className="ml-4 flex-shrink-0 flex">
                    <motion.button
                      className="inline-flex text-white/80 hover:text-white"
                      onClick={closeAlert}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      variants={alertContentVariants}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// JSX code example
export const alertModalJSX = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [autoDismiss, setAutoDismiss] = useState(true);
  const [dismissProgress, setDismissProgress] = useState(100);
  
  // Duración para auto-cierre en ms
  const dismissDuration = 5000;
  
  // Muestra la alerta y reinicia la barra de progreso
  const showAlert = (type) => {
    setAlertType(type);
    setDismissProgress(100);
    setIsOpen(true);
  };
  
  // Auto-cierre con cuenta regresiva
  useEffect(() => {
    let intervalId;
    let timeoutId;
    
    if (isOpen && autoDismiss) {
      // Timeout para cerrar la alerta
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, dismissDuration);
      
      // Intervalo para actualizar la barra de progreso
      intervalId = setInterval(() => {
        setDismissProgress((prev) => {
          const newProgress = prev - (100 / (dismissDuration / 100));
          return newProgress < 0 ? 0 : newProgress;
        });
      }, 100);
    }
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isOpen, autoDismiss]);

  // Configuración de la alerta según el tipo
  const config = {
    success: {
      bgColor: 'bg-green-500/90',
      borderColor: 'border-green-600',
      icon: <svg>...</svg>, // Icono de éxito
      title: 'Operación Exitosa',
      message: 'La acción se ha completado correctamente.'
    },
    error: {
      bgColor: 'bg-red-500/90',
      borderColor: 'border-red-600',
      icon: <svg>...</svg>, // Icono de error
      title: 'Error',
      message: 'Ha ocurrido un error al procesar tu solicitud.'
    },
    // Otras configuraciones (warning, info)...
  }[alertType];

  return (
    <div>
      {/* Botones para mostrar diferentes tipos de alertas */}
      <div className="flex space-x-2">
        <button onClick={() => showAlert('success')}>Éxito</button>
        <button onClick={() => showAlert('error')}>Error</button>
        {/* Otros botones... */}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] pointer-events-none flex items-start justify-center pt-16">
            <motion.div
              className={\`pointer-events-auto max-w-sm w-full rounded-lg shadow-lg border \${config.borderColor} \${config.bgColor}\`}
              initial={{ y: -100, x: "-50%", opacity: 0 }}
              animate={{ y: 0, x: "-50%", opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              style={{ left: "50%" }}
            >
              {/* Barra de progreso para auto-cierre */}
              {autoDismiss && (
                <motion.div 
                  className="h-1 bg-white/30" 
                  initial={{ width: "100%" }}
                  animate={{ width: \`\${dismissProgress}%\` }}
                />
              )}
              
              <div className="p-4">
                <div className="flex">
                  {/* Icono de la alerta */}
                  <div className="flex-shrink-0">
                    {config.icon}
                  </div>
                  
                  {/* Contenido de la alerta */}
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-white">
                      {config.title}
                    </p>
                    <p className="mt-1 text-sm text-white/90">
                      {config.message}
                    </p>
                  </div>
                  
                  {/* Botón de cierre */}
                  <button
                    className="text-white/80 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293..." />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};`;

// Animation code example
export const alertModalJS = `// Configuración de animaciones para el modal de alerta

// Variantes para el contenedor de la alerta
const alertContainerVariants = {
  hidden: { 
    y: -100, // Empieza fuera de la pantalla (arriba)
    x: "-50%", // Se mantiene centrado horizontalmente
    opacity: 0,
    scale: 0.9
  },
  visible: { 
    y: 0, // Posición final
    x: "-50%", // Mantiene centrado horizontal
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.1 // Retraso entre animaciones de hijos
    }
  },
  exit: { 
    y: -100, // Sale por arriba
    x: "-50%",
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Variantes para el contenido interno de la alerta
const alertContentVariants = {
  hidden: { 
    opacity: 0,
    y: 10 // Ligero desplazamiento hacia abajo
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0,
    y: -10, // Ligero desplazamiento hacia arriba al salir
    transition: {
      duration: 0.2
    }
  }
};

// Animación de la barra de progreso
const progressBarAnimation = {
  initial: { width: "100%" },
  animate: { 
    width: "0%",
    transition: { 
      duration: 5, // Duración en segundos
      ease: "linear" // Movimiento constante
    }
  }
};

// Animaciones para los iconos
const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.5,
      repeat: 1,
      repeatType: "reverse"
    }
  }
};

// Configuración de estilos dinámicos para tipos de alertas
const alertStyles = {
  success: {
    bgColor: 'bg-green-500/90',
    borderColor: 'border-green-600',
    iconColor: 'text-green-100',
    progressColor: 'bg-green-300',
    shadow: "0 10px 30px -5px rgba(16, 185, 129, 0.3)"
  },
  error: {
    bgColor: 'bg-red-500/90',
    borderColor: 'border-red-600',
    iconColor: 'text-red-100',
    progressColor: 'bg-red-300',
    shadow: "0 10px 30px -5px rgba(239, 68, 68, 0.3)"
  },
  warning: {
    bgColor: 'bg-amber-500/90',
    borderColor: 'border-amber-600',
    iconColor: 'text-amber-100',
    progressColor: 'bg-amber-300',
    shadow: "0 10px 30px -5px rgba(245, 158, 11, 0.3)"
  },
  info: {
    bgColor: 'bg-blue-500/90',
    borderColor: 'border-blue-600',
    iconColor: 'text-blue-100',
    progressColor: 'bg-blue-300',
    shadow: "0 10px 30px -5px rgba(59, 130, 246, 0.3)"
  }
};

// Función para gestionar la auto-desaparición
const autoCloseAlert = (duration = 5000) => {
  const progressStep = 100 / (duration / 100); // Cálculo para actualizaciones cada 100ms
  
  return {
    // Configuración de temporizador
    timer: {
      duration, // Duración total en ms
      interval: 100, // Intervalo de actualización en ms
      step: progressStep // Paso de reducción por intervalo
    },
    
    // Animación de la barra de progreso
    progressAnimation: {
      initial: { width: "100%" },
      animate: { 
        width: "0%",
        transition: { 
          duration: duration / 1000, // Convertir a segundos
          ease: "linear"
        }
      }
    }
  };
};`;

export default AlertModal;