import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedText from '../../../shared/ui/AnimatedText';
import Button from '../../../shared/ui/Button';
import StatsSection from './StatsSection';

const HeroSection = ({ onStartTransition }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20, duration: 1 }
    }
  };

  const handlePlatformClick = (e) => {
    e.preventDefault();
    if (onStartTransition) onStartTransition();
  };

  return (
    <div className="w-full text-center md:text-left md:max-w-xl">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-poppins leading-[1.1]"
        variants={titleVariants}
      >
        <span className="text-white">Descubre, Crea</span><br />
        <span className="text-white">y Experimenta </span><br />
        <AnimatedText text="Motion Kit" className="gradient-text" />
      </motion.h1>

      <motion.p
        className="text-base sm:text-lg text-gray-400 mb-10 font-inter font-light leading-relaxed max-w-lg mx-auto md:mx-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } }}
      >
        Una biblioteca moderna de componentes React con animaciones avanzadas
        para crear interfaces de usuario <span className="text-purple-300">impresionantes</span> y dinámicas.
      </motion.p>

      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
        <Button variant="gradient" starEffect={true} href="/components" onClick={handlePlatformClick}>
          <motion.span
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="w-4 h-4 rounded-full bg-white mr-2 opacity-70 star-glow inline-block"
          />
          Ir a la plataforma
        </Button>

        <Button variant="secondary" href="/components">
          <motion.span
            animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
            className="mr-2 inline-block text-purple-400"
          >
            <Sparkles size={20} />
          </motion.span>
          Ver ejemplos
        </Button>
      </div>

      <div className="flex justify-center md:justify-start">
        <StatsSection />
      </div>
    </div>
  );
};

export default HeroSection;