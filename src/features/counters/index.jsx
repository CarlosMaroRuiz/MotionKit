import React from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../../shared/ComponentCard';
import {
  AnimatedCounter,

  animatedCounterJSX,
  animatedCounterJS
} from './components';

const CountersView = () => {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-10">
        <motion.h1 
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contadores Animados
        </motion.h1>
        <motion.p 
          className="text-gray-300 text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explora nuestra colección de contadores con animaciones fluidas, 
          transiciones elegantes y efectos visuales dinámicos.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {/* Solo Contador Animado */}
        <ComponentCard
          title="Contador Animado con Transiciones"
          description="Un contador suave con animaciones numéricas, efectos de partículas y transiciones fluidas para incrementar/decrementar valores."
          component={<AnimatedCounter />}
          jsxCode={animatedCounterJSX}
          animationCode={animatedCounterJS}
        />
      </div>
    </div>
  );
};

export default CountersView;