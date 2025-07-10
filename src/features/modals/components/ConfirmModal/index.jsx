import ConfirmModal from './ConfirmModal';

export default ConfirmModal;


export { 
  overlayVariants, 
  modalVariants, 
  iconVariants, 
  buttonVariants,
  shakeVariants 
} from './animations';


export const confirmModalJSX = `import React, { useState } from 'react';
import { ConfirmModal } from './components';

const ExampleComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    
    // Simular operación async
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsOpen(false);
    alert('¡Acción confirmada!');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Eliminar Usuario
      </button>
      
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title="¿Eliminar usuario?"
        message="Esta acción eliminará permanentemente el usuario y todos sus datos."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
        requireConfirmation={true}
      />
    </>
  );
};`;

// Código de animaciones para documentación
export const confirmModalJS = `// animations.js
export const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.1,
      duration: 0.5,
      ease: "easeOut",
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

export const shakeVariants = {
  visible: {
    x: [0, -8, 8, -8, 8, -4, 4, -2, 2, 0],
    transition: {
      x: {
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1]
      }
    }
  }
};`;