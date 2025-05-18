import React from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../../shared/ComponentCard';
import { 
  ParticleButton, 
  MorphButton, 
  MagneticButton,
  DeleteButton,
  SubmitButton,
  particleButtonJSX,
  particleButtonJS,
  morphButtonJSX,
  morphButtonJS,
  magneticButtonJSX,
  magneticButtonJS,
  deleteButtonJSX,
  deleteButtonJS,
  submitButtonJSX,
  submitButtonJS
} from './components';

const ButtonsView = () => {
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
          jsxCode={morphButtonJSX}
          animationCode={morphButtonJS}
        />

        {/* Botón Magnético */}
        <ComponentCard
          title="Botón con Efecto Magnético"
          description="Un botón que reacciona a la posición del cursor, creando un efecto magnético que sigue el movimiento del mouse."
          component={<MagneticButton />}
          jsxCode={magneticButtonJSX}
          animationCode={magneticButtonJS}
        />
      </div>
    </div>
  );
};

export default ButtonsView;