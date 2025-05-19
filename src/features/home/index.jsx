import React, { useEffect, useState, useRef } from 'react';
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
  
  // Transformación para el efecto paralaje mejorado - reducido para que funcione mejor dentro del layout
  const y = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [50 * parallaxFactor, 0, -50 * parallaxFactor]
  );
  
  // Valor de rotación sutil basado en scroll - reducido para que funcione mejor dentro del layout
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.7 * parallaxFactor, 0, -0.7 * parallaxFactor]
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
  const containerRef = useRef(null);
  
  // Estado para controlar diferentes rangos de tamaño de pantalla
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Función para actualizar el ancho de la ventana
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Evento de escucha para el cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);
    
    // Comprobación inicial
    handleResize();
    
    // Limpieza del evento
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Obtener la posición de scroll general
  const { scrollYProgress } = useScroll();
  
  // Transformaciones basadas en scroll más elegantes para el encabezado principal
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.96]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, 30]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.15], ["blur(0px)", "blur(4px)"]);
  
  // Calcular los estilos basados en el ancho de la ventana
  const getOffsetStyle = () => {
    if (windowWidth < 602) {
      return { transform: 'translateX(10px)' };
    } else if (windowWidth === 675) {
      return { transform: 'translateX(5px)' };
    } else if (windowWidth < 765) {
      return { transform: 'translateX(-40px)' };
    } else if (windowWidth < 860) {
      return { transform: 'translateX(-40px)' };
    } else if (windowWidth < 995) {
      return { transform: 'translateX(0px)' };
    }
    return {};
  };
  
  // Determinar el grid dependiendo del tamaño
  const isLargeScreen = windowWidth >= 995;
  
  return (
    <div 
      ref={containerRef}
      className="w-full flex overflow-visible flex-col relative" 
      style={getOffsetStyle()}
    >
      {/* Encabezado principal con efecto desaparición elegante */}
      <motion.div 
        style={{ 
          opacity: headerOpacity,
          scale: headerScale,
          y: headerY,
          filter: headerBlur
        }}
        id="inicio"
        className="pt-4 md:pt-6"
      >
        <Header />
      </motion.div>

      {/* Grid de tarjetas informativas */}
      <div className={`grid grid-cols-1 ${isLargeScreen ? 'lg:grid-cols-2' : ''} gap-6 md:gap-8 mx-auto mb-12 relative mt-16 sm:mt-20 md:mt-24`}>
        <AnimatedSection parallaxFactor={0.8}>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
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
              hidden: { opacity: 0, x: 30, filter: "blur(4px)" },
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
        className="mx-auto mb-12 relative"
        delay={0.1}
        parallaxFactor={0.5}
      >
        <InstallationSection />
      </AnimatedSection>

      {/* Ejemplo de uso */}
      <AnimatedSection 
        className="mx-auto mb-12 relative"
        delay={0.2}
        parallaxFactor={1}
      >
        <ComponentExampleSection />
      </AnimatedSection>

      {/* Características */}
      <AnimatedSection 
        className="mx-auto mb-12 relative"
        delay={0.3}
        parallaxFactor={0.7}
      >
        <FeaturesSection />
      </AnimatedSection>
    </div>
  );
};

export default Home;