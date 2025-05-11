import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Stars from './components/Start';
import BackgroundEffects from './components/BackgroundEffects';
import HeroSection from './components/HeroSection';
import StyleProvider from './providers/StyleProvider';
import SpaceTransition from './components/space-transition';
import PlanetSystem from './components/planet-system';

const LandingPage = () => {
  // Referencias
  const containerRef = useRef(null);
  
  // Estado para controlar la transición
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Manejador para iniciar la transición
  const handleStartTransition = () => {
    setIsTransitioning(true);
  };
  
  // Manejador para cuando la transición finaliza
  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <StyleProvider>
      {/* Componente de transición espacial */}
      <SpaceTransition 
        isActive={isTransitioning} 
        destination="/components" 
        // Opcionalmente puedes personalizar el mensaje
        // customMessage="Iniciando viaje a la plataforma"
        onTransitionComplete={handleTransitionComplete} 
      />
      
      <motion.div
        className="min-h-screen w-full bg-[#0a0118] relative overflow-hidden flex items-center px-6 md:px-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={containerRef}
      >
        {/* Efectos de fondo */}
        <BackgroundEffects />

        {/* Estrellas de fondo */}
        <Stars />
        
        {/* Contenedor principal */}
        <div className="container mx-auto px-4 py-10 md:py-20 relative z-10 flex flex-col md:flex-row items-center">
          {/* Columna izquierda - Hero Section - En móviles ocupa ancho completo */}
          <div className="w-full md:w-1/2 flex justify-center">
            <HeroSection onStartTransition={handleStartTransition} />
          </div>
          
          {/* Columna derecha - Sistema Planetario - Oculto en móviles, visible en md y superiores */}
          <div className="hidden md:flex md:w-1/2 justify-center">
            <PlanetSystem />
          </div>
        </div>
      </motion.div>
    </StyleProvider>
  );
};

export default LandingPage;