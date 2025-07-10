import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  overlayVariants, 
  modalVariants, 
  iconVariants, 
  buttonVariants,
  shakeVariants 
} from './animations';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "warning", // warning, danger, info, success
  isLoading = false,
  requireConfirmation = false // Si requiere escribir "CONFIRMAR"
}) => {
  const [confirmationText, setConfirmationText] = useState('');
  const [shake, setShake] = useState(false);

  // Configuración según el tipo
  const getTypeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          iconColor: 'text-red-500',
          confirmButtonColor: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.876c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.062 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )
        };
      case 'success':
        return {
          iconColor: 'text-green-500',
          confirmButtonColor: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'info':
        return {
          iconColor: 'text-blue-500',
          confirmButtonColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      default: // warning
        return {
          iconColor: 'text-yellow-500',
          confirmButtonColor: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.876c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.062 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )
        };
    }
  };

  const typeConfig = getTypeConfig();

  const handleConfirm = () => {
    if (requireConfirmation && confirmationText !== 'CONFIRMAR') {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onConfirm();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const isConfirmDisabled = requireConfirmation ? 
    confirmationText !== 'CONFIRMAR' || isLoading : 
    isLoading;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleOverlayClick}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md"
            variants={shake ? shakeVariants : modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Icon */}
              <motion.div 
                className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 ${typeConfig.iconColor} mb-4`}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
              >
                {typeConfig.icon}
              </motion.div>
              
              {/* Title */}
              <motion.h3 
                className="text-lg font-medium text-white text-center mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {title}
              </motion.h3>
              
              {/* Message */}
              <motion.p 
                className="text-sm text-gray-300 text-center mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {message}
              </motion.p>

              {/* Confirmation Input */}
              {requireConfirmation && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Escribe "CONFIRMAR" para continuar:
                  </label>
                  <input
                    type="text"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="CONFIRMAR"
                    disabled={isLoading}
                  />
                </motion.div>
              )}
              
              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={onClose}
                  disabled={isLoading}
                  variants={buttonVariants}
                  whileHover={!isLoading ? "hover" : ""}
                  whileTap={!isLoading ? "tap" : ""}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {cancelText}
                </motion.button>
                
                <motion.button
                  className={`flex-1 px-4 py-2 text-white rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${typeConfig.confirmButtonColor}`}
                  onClick={handleConfirm}
                  disabled={isConfirmDisabled}
                  variants={buttonVariants}
                  whileHover={!isConfirmDisabled ? "hover" : ""}
                  whileTap={!isConfirmDisabled ? "tap" : ""}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="ml-2">Cargando...</span>
                    </div>
                  ) : (
                    confirmText
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;