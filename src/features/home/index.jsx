import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from './components/sections/Header';
import DependenciesSection from './components/sections/DependenciesSection';
import FileStructureSection from './components/sections/FileStructureSection';
import InstallationSection from './components/sections/InstallationSection';
import ComponentExampleSection from './components/sections/ComponentExampleSection';
import FeaturesSection from './components/sections/FeaturesSection';

// Componente para animar secciones al hacer scroll con animaciones elegantes
const AnimatedSection = ({ children, delay = 0, className, parallaxFactor = 1 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, 
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transformación para el efecto paralaje mejorado
  const y = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [70 * parallaxFactor, 0, -70 * parallaxFactor]
  );
  
  // Valor de rotación sutil basado en scroll
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1 * parallaxFactor, 0, -1 * parallaxFactor]
  );
  
  // Efecto de escala sutil
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.98, 1, 0.98]
  );

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      style={{ 
        y,
        rotateZ: rotate,
        scale
      }}
      variants={{
        hidden: { 
          opacity: 0,
          filter: "blur(5px)"
        },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.8,
            delay: delay,
            ease: [0.25, 0.1, 0, 1],
            when: "beforeChildren",
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  // Obtener la posición de scroll general
  const { scrollYProgress } = useScroll();
  
  // Transformaciones basadas en scroll más elegantes para el encabezado principal
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.96]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, 30]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.15], ["blur(0px)", "blur(4px)"]);
  
  return (
    <div className="w-full relative overflow-visible">
      {/* Encabezado principal con efecto desaparición elegante */}
      <motion.div 
        style={{ 
          opacity: headerOpacity,
          scale: headerScale,
          y: headerY,
          filter: headerBlur
        }}
        id="inicio"
        className="pt-8"
      >
        <Header />
      </motion.div>

      {/* Grid de tarjetas informativas */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 mb-16 relative mt-28">
        <AnimatedSection parallaxFactor={0.8}>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
              visible: { 
                opacity: 1, 
                x: 0,
                filter: "blur(0px)",
                transition: { 
                  type: "spring",
                  damping: 20,
                  stiffness: 90
                }
              }
            }}
          >
            <DependenciesSection />
          </motion.div>
        </AnimatedSection>
        
        <AnimatedSection parallaxFactor={1.2}>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
              visible: { 
                opacity: 1, 
                x: 0,
                filter: "blur(0px)",
                transition: { 
                  type: "spring",
                  damping: 20,
                  stiffness: 90,
                  delay: 0.2
                }
              }
            }}
          >
            <FileStructureSection />
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Instalación de Tailwind CSS como plugin de Vite */}
      <AnimatedSection 
        className="max-w-5xl mx-auto px-4 mb-16 relative"
        delay={0.1}
        parallaxFactor={0.5}
      >
        <InstallationSection />
      </AnimatedSection>

      {/* Ejemplo de uso */}
      <AnimatedSection 
        className="max-w-5xl mx-auto px-4 mb-16 relative"
        delay={0.2}
        parallaxFactor={1}
      >
        <ComponentExampleSection />
      </AnimatedSection>

      {/* Características */}
      <AnimatedSection 
        className="max-w-5xl mx-auto px-4 mb-16 relative"
        delay={0.3}
        parallaxFactor={0.7}
      >
        <FeaturesSection />
      </AnimatedSection>
    </div>
  );
};

export default Home;
