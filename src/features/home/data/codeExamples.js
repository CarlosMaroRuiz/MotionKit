export const codeExamples = {
  submitButton: `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonVariants } from './animations';

const SubmitButton = () => {
  const [status, setStatus] = useState('idle');
  
  const handleSubmit = () => {
    // Lógica del botón
  };

  return (
    <motion.button
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
      variants={buttonVariants}
      animate={status}
      onClick={handleSubmit}
    >
      Enviar Formulario
    </motion.button>
  );
};

export default SubmitButton;`,

  animations: `// Variantes para los estados del botón
export const buttonVariants = {
  idle: {
    scale: 1,
    backgroundColor: '#4f46e5'
  },
  loading: {
    scale: 0.98,
    backgroundColor: '#6366f1'
  },
  success: {
    scale: 1,
    backgroundColor: '#22c55e'
  }
};`
};