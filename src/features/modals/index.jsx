// src/features/modals/index.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../../shared/ComponentCard';
import { 
  SlideModal, 
  FadeScaleModal,
  PortalModal,
  AlertModal,
  slideModalJSX,
  slideModalJS,
  fadeScaleModalJSX,
  fadeScaleModalJS,
  portalModalJSX,
  portalModalJS,
  alertModalJSX,
  alertModalJS
} from './components';

const ModalsView = () => {
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
          Explora nuestra colección de modales con animaciones avanzadas y efectos visuales impresionantes.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {/* Alert Modal */}
        <ComponentCard
          title="Modal de Alerta con Auto-cierre"
          description="Sistema de notificaciones tipo toast con diferentes estilos de alerta, barra de progreso y auto-cierre configurable."
          component={<AlertModal />}
          jsxCode={alertModalJSX}
          animationCode={alertModalJS}
        />

        {/* Slide Modal */}
        <ComponentCard
          title="Modal con Efecto Deslizante"
          description="Un modal con efectos de deslizamiento y parallax que crea una experiencia visual dinámica al abrir y cerrar."
          component={<SlideModal />}
          jsxCode={slideModalJSX}
          animationCode={slideModalJS}
        />

        {/* Fade Scale Modal */}
        <ComponentCard
          title="Modal con Fade y Escala"
          description="Un elegante modal con animaciones de desvanecimiento y escala, con elementos que aparecen de forma escalonada."
          component={<FadeScaleModal />}
          jsxCode={fadeScaleModalJSX}
          animationCode={fadeScaleModalJS}
        />

        {/* Portal Modal */}
        <ComponentCard
          title="Modal Efecto Portal"
          description="Un impresionante modal con efecto de portal estilo sci-fi, con partículas animadas y revelación circular."
          component={<PortalModal />}
          jsxCode={portalModalJSX}
          animationCode={portalModalJS}
        />
      </div>
    </div>
  );
};

export default ModalsView;