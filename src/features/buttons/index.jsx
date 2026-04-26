import { motion } from 'framer-motion';
import ComponentCard from '../../shared/ComponentCard';
import { BUTTONS_COLLECTION } from './buttons.data';

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
        {BUTTONS_COLLECTION.map((button) => (
          <ComponentCard
            key={button.id}
            title={button.title}
            description={button.description}
            component={button.component}
            jsxCode={button.jsxCode}
            animationCode={button.animationCode}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonsView;