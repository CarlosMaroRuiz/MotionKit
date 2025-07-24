import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '', requirements: [] };
    
    let score = 0;
    const requirements = [];
    
    // Longitud mínima
    if (pwd.length >= 8) {
      score += 1;
      requirements.push({ text: 'Al menos 8 caracteres', met: true });
    } else {
      requirements.push({ text: 'Al menos 8 caracteres', met: false });
    }
    
    // Letra minúscula
    if (/[a-z]/.test(pwd)) {
      score += 1;
      requirements.push({ text: 'Una letra minúscula', met: true });
    } else {
      requirements.push({ text: 'Una letra minúscula', met: false });
    }
    
    // Letra mayúscula
    if (/[A-Z]/.test(pwd)) {
      score += 1;
      requirements.push({ text: 'Una letra mayúscula', met: true });
    } else {
      requirements.push({ text: 'Una letra mayúscula', met: false });
    }
    
    // Número
    if (/\d/.test(pwd)) {
      score += 1;
      requirements.push({ text: 'Un número', met: true });
    } else {
      requirements.push({ text: 'Un número', met: false });
    }
    
    // Carácter especial
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      score += 1;
      requirements.push({ text: 'Un carácter especial', met: true });
    } else {
      requirements.push({ text: 'Un carácter especial', met: false });
    }
    
    // Determinar fortaleza
    let label = '';
    let color = '';
    
    if (score === 0) {
      label = '';
      color = '';
    } else if (score <= 2) {
      label = 'Débil';
      color = 'red';
    } else if (score <= 3) {
      label = 'Moderada';
      color = 'yellow';
    } else if (score <= 4) {
      label = 'Fuerte';
      color = 'green';
    } else {
      label = 'Muy fuerte';
      color = 'emerald';
    }
    
    return { score, label, color, requirements };
  };

  const strength = getPasswordStrength(password);

  if (!password) return null;

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${(strength.score / 5) * 100}%`,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const requirementVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  const getColorClasses = (color) => {
    const colors = {
      red: {
        bg: 'bg-red-500',
        text: 'text-red-400',
        border: 'border-red-500'
      },
      yellow: {
        bg: 'bg-yellow-500',
        text: 'text-yellow-400',
        border: 'border-yellow-500'
      },
      green: {
        bg: 'bg-green-500',
        text: 'text-green-400',
        border: 'border-green-500'
      },
      emerald: {
        bg: 'bg-emerald-500',
        text: 'text-emerald-400',
        border: 'border-emerald-500'
      }
    };
    return colors[color] || colors.red;
  };

  const colorClasses = getColorClasses(strength.color);

  return (
    <AnimatePresence>
      <motion.div
        className="mt-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Barra de fortaleza */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Fortaleza de contraseña</span>
            {strength.label && (
              <span className={`text-xs font-medium ${colorClasses.text}`}>
                {strength.label}
              </span>
            )}
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${colorClasses.bg}`}
              variants={barVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
        </div>

        {/* Requisitos */}
        <motion.div 
          className="space-y-1"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.05 }}
        >
          {strength.requirements.map((req, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2"
              variants={requirementVariants}
            >
              <motion.div
                className={`w-3 h-3 rounded-full flex items-center justify-center ${
                  req.met ? 'bg-green-500' : 'bg-gray-600'
                }`}
                animate={{ 
                  scale: req.met ? [1, 1.2, 1] : 1,
                  backgroundColor: req.met ? '#10b981' : '#4b5563'
                }}
                transition={{ duration: 0.3 }}
              >
                {req.met && (
                  <motion.svg
                    className="w-2 h-2 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </motion.div>
              <span className={`text-xs ${req.met ? 'text-green-400' : 'text-gray-400'}`}>
                {req.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PasswordStrengthIndicator;