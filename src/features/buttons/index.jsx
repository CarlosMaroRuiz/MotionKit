import React from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../../shared/ComponentCard';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { 
  ParticleButton, 
  MorphButton, 
  MagneticButton,
  DeleteButton,
  SubmitButton,
  particleButtonJSX,
  particleButtonJS,
  deleteButtonJSX,
  deleteButtonJS,
  submitButtonJSX,
  submitButtonJS
} from './components';
import { useFetchComponents } from '../../shared/hooks/useFetchComponents';

const ButtonsView = () => {
  const { components, loading, error } = useFetchComponents('button', [4, 5]);

  if (loading) {
    return (
      <div className="container mx-auto min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner 
          message="Cargando componentes de botones..." 
          size="large"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <motion.div 
          className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-red-400 text-4xl mb-4"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚠️
          </motion.div>
          <h3 className="text-red-400 text-xl font-semibold mb-2">
            Error al cargar componentes
          </h3>
          <p className="text-red-300">
            {error}
          </p>
          <motion.button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
          >
            Reintentar
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-10">
        <motion.h1 
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Botones Animados
        </motion.h1>
        <motion.p 
          className="text-gray-300 text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explora nuestra colección de botones con animaciones avanzadas y efectos visuales.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {/* Botón de Enviar Formulario */}
        <ComponentCard
          title="Botón de Enviar Formulario"
          description="Botón interactivo para formularios con estados de carga, éxito y error. Proporciona feedback visual del estado del envío."
          component={<SubmitButton />}
          jsxCode={submitButtonJSX}
          animationCode={submitButtonJS}
        />

        {/* Botón de Eliminar */}
        <ComponentCard
          title="Botón de Eliminación con Efectos Avanzados"
          description="Un impresionante botón de eliminar con múltiples estados, confirmación visual, efectos de partículas y desintegración."
          component={<DeleteButton />}
          jsxCode={deleteButtonJSX}
          animationCode={deleteButtonJS}
        />

        {/* Botón con Explosión de Partículas */}
        <ComponentCard
          title="Botón con Explosión de Partículas"
          description="Un botón que dispara partículas coloridas cuando se hace clic en él, creando un efecto visual impactante."
          component={<ParticleButton />}
          jsxCode={particleButtonJSX}
          animationCode={particleButtonJS}
        />

        {/* Botón con Morfismo */}
        <ComponentCard
          title="Botón con Transformación Morfológica"
          description="Este botón cambia su forma, color y contenido al hacer clic, con animaciones fluidas de transformación."
          component={<MorphButton />}
          jsxCode={components[0]?.jsxCode }
          animationCode={components[0]?.animationCode}
        />

        {/* Botón Magnético */}
        <ComponentCard
          title="Botón con Efecto Magnético"
          description="Un botón que reacciona a la posición del cursor, creando un efecto magnético que sigue el movimiento del mouse."
          component={<MagneticButton />}
          jsxCode={components[1]?.jsxCode }
          animationCode={components[1]?.animationCode}
        />
      </div>
    </div>
  );
};

export default ButtonsView;