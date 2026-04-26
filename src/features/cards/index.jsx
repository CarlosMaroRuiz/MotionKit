import { motion } from 'framer-motion';
import ComponentCard from '../../shared/ComponentCard';
import './styles.css';
import { CARDS_COLLECTION } from './cards.data';

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
        {CARDS_COLLECTION.map((card) => (
          <ComponentCard
            key={card.id}
            title={card.title}
            description={card.description}
            component={card.component}
            jsxCode={card.jsxCode}
            animationCode={card.animationCode}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsView;