import React from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../../shared/ComponentCard';
import './styles.css';
import { 
  FlipCard, 
  ExpandableCard,
  SneakerCard,
  flipCardJSX,
  flipCardJS,
  expandableCardJSX,
  expandableCardJS,
  sneakerCardJSX,
  sneakerCardJS
} from './components';

const CardsView = () => {
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
          jsxCode={flipCardJSX}
          animationCode={flipCardJS}
        />

        {/* Card Expandible */}
        <ComponentCard
          title="Card Expandible con Partículas"
          description="Card que se expande dinámicamente mostrando contenido adicional con efectos de partículas, ondas de expansión y animaciones fluidas."
          component={<ExpandableCard />}
          jsxCode={expandableCardJSX}
          animationCode={expandableCardJS}
        />
      </div>
    </div>
  );
};

export default CardsView;