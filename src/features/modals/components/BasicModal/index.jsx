import BasicModal from './BasicModal';

export default BasicModal;


export { overlayVariants, modalVariants, closeButtonVariants } from './animations';

export const basicModalJSX = `import React, { useState } from 'react';
import { BasicModal } from './components';

const ExampleComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Abrir Modal
      </button>
      
      <BasicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Mi Modal Básico"
        size="md"
        showCloseButton={true}
        closeOnOverlayClick={true}
      >
        <p className="text-gray-300 mb-4">
          Este es el contenido del modal. Puedes agregar cualquier elemento aquí.
        </p>
        <div className="flex gap-3 justify-end">
          <button 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Confirmar
          </button>
        </div>
      </BasicModal>
    </>
  );
};`;

export const basicModalJS = `// animations.js
export const overlayVariants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};`;