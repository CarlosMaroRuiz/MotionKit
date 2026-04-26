import { useRef, useState, Suspense, lazy, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Stars from '../../shared/layout/Stars';
import BackgroundEffects from '../../shared/layout/BackgroundEffects';
import HeroSection from './components/HeroSection';
import PageTransition from '../../shared/transitions/PageTransition';
import Loader from '../../shared/ui/Loader';
import './landing.css';

const PlanetSystem = lazy(() => import('./components/planet-system'));

const LandingPage = () => {
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStartTransition = useCallback(() => setIsTransitioning(true), []);
  const handleTransitionComplete = useCallback(() => setIsTransitioning(false), []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.15 }
    }
  }), []);

  return (
    <>
      <PageTransition
        isActive={isTransitioning}
        destination="/components"
        onTransitionComplete={handleTransitionComplete}
      />

      <motion.div
        className="landing-root"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={containerRef}
      >
        <BackgroundEffects />
        <Stars />

        <nav className="landing-nav">
          <div className="landing-nav-inner">
            <a href="/" className="landing-logo-link">
              <img src="/img/logo.png" alt="Motion Kit" className="landing-logo-img" />
              <span className="landing-logo-text">Motion Kit</span>
            </a>
            <div className="landing-nav-actions">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="landing-nav-link">GitHub</a>
              <a href="/components" className="landing-nav-cta">Explorar</a>
            </div>
          </div>
        </nav>

        <div className="landing-content">
          <div className="landing-hero-col">
            <HeroSection onStartTransition={handleStartTransition} />
          </div>
          <div className="landing-planet-col">
            <Suspense fallback={<Loader size="lg" text="Sintetizando entorno..." />}>
              <PlanetSystem />
            </Suspense>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LandingPage;