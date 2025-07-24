import React from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../../shared/ComponentCard';
import { useFetchComponents } from '../../shared/hooks/useFetchComponents';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import './styles.css';
import { 
  FlipCard, 
  ExpandableCard,
  SneakerCard,
  sneakerCardJSX,
  sneakerCardJS
} from './components';

const CardsView = () => {
   const { components, loading, error } = useFetchComponents('cards', [2, 3]);



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
          Cards Animadas
        </motion.h1>
        <motion.p 
          className="text-gray-300 text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explora nuestra colección de cards con efectos visuales avanzados, animaciones interactivas y diseños para e-commerce.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {/* Card de Producto/Tenis */}
        <ComponentCard
          title="Card de Producto Premium para Tenis"
          description="Una impresionante card de producto para tenis con animaciones 3D, efectos de partículas de velocidad, explosiones de carrito y interacciones avanzadas de e-commerce."
          component={<SneakerCard />}
          jsxCode={sneakerCardJSX}
          animationCode={sneakerCardJS}
        />

        {/* Card con Efecto Flip */}
        <ComponentCard
          title="Card con Efecto Flip 3D"
          description="Una card interactiva que se voltea en 3D para revelar contenido adicional. Incluye animaciones de partículas y efectos de hover suaves."
          component={<FlipCard />}
          jsxCode={components[0]?.jsxCode}
          animationCode={components[0]?.animationCode}
        />

        {/* Card Expandible */}
        <ComponentCard
          title="Card Expandible con Partículas"
          description="Card que se expande dinámicamente mostrando contenido adicional con efectos de partículas, ondas de expansión y animaciones fluidas."
          component={<ExpandableCard />}
          jsxCode={components[1]?.jsxCode}
          animationCode={components[1]?.animationCode}
        />
      </div>
    </div>
  );
};

export default CardsView;