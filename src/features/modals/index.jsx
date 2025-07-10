
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../../shared/ComponentCard';
import { 
  BasicModal, 
  ConfirmModal,
  basicModalJSX,
  basicModalJS,
  confirmModalJSX,
  confirmModalJS
} from './components';

const ModalsView = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmAction = async () => {
    setIsLoading(true);
    
 
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setConfirmModalOpen(false);
    alert('¡Acción confirmada exitosamente!');
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-10">
        <motion.h1 
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Modales Animados
        </motion.h1>
        <motion.p 
          className="text-gray-300 text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Modales elegantes con animaciones fluidas y diferentes tipos de interacción.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {/* Modal Básico */}
        <ComponentCard
          title="Modal Básico"
          description="Modal versátil con animaciones suaves, diferentes tamaños y opciones de personalización. Ideal para mostrar contenido general."
          component={
            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={() => setBasicModalOpen(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Abrir Modal Básico
              </button>
            </div>
          }
          jsxCode={basicModalJSX}
          animationCode={basicModalJS}
        />

        {/* Modal de Confirmación */}
        <ComponentCard
          title="Modal de Confirmación"
          description="Modal especializado para acciones críticas con diferentes tipos (warning, danger, success, info), confirmación por texto y estados de carga."
          component={
            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={() => setConfirmModalOpen(true)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Eliminar Usuario
              </button>
            </div>
          }
          jsxCode={confirmModalJSX}
          animationCode={confirmModalJS}
        />
      </div>

      {/* Modales activos */}
      <BasicModal
        isOpen={basicModalOpen}
        onClose={() => setBasicModalOpen(false)}
        title="Mi Modal Básico"
        size="md"
        showCloseButton={true}
        closeOnOverlayClick={true}
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Este es un ejemplo de modal básico con contenido personalizable. 
            Puedes agregar cualquier elemento React aquí.
          </p>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Características:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>✨ Animaciones suaves de entrada y salida</li>
              <li>📱 Completamente responsivo</li>
              <li>⌨️ Soporte para teclado (ESC para cerrar)</li>
              <li>🎨 Diferentes tamaños disponibles</li>
              <li>🔒 Opciones de bloqueo de interacción</li>
            </ul>
          </div>
          
          <div className="flex gap-3 justify-end pt-4">
            <button 
              onClick={() => setBasicModalOpen(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={() => setBasicModalOpen(false)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </BasicModal>

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmAction}
        title="¿Eliminar usuario?"
        message="Esta acción eliminará permanentemente el usuario y todos sus datos asociados. Esta operación no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
        requireConfirmation={true}
      />
    </div>
  );
};

export default ModalsView;