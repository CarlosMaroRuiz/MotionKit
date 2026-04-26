import { motion } from 'framer-motion';
import Planet from './Planet';
import PlanetRings from './PlanetRings';
import NearbyStars from './NearbyStars';
import Moon from './Moon';

// Variantes movidas fuera para evitar recreación en cada render (Optimización)
const planetVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: -100
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.9,
      duration: 1.5,
      type: "spring",
      stiffness: 70,
      damping: 17,
      mass: 1.2
    }
  }
};

// Configuración de lunas movida fuera (Optimización)
const MOONS_CONFIG = [
  {
    id: 1,
    size: 24,
    baseDistance: 230,
    varianceX: 1.0,
    varianceY: 0.8,
    speed: 20,
    delay: 0,
    color: 'radial-gradient(circle at 30% 30%, rgba(248, 250, 252, 0.95), rgba(226, 232, 240, 0.85))'
  },
  {
    id: 2,
    size: 40,
    baseDistance: 275,
    varianceX: 1.1,
    varianceY: 0.75,
    speed: 17.5,
    delay: 3,
    color: 'radial-gradient(circle at 30% 30%, rgba(240, 240, 245, 0.95), rgba(203, 213, 225, 0.85))'
  },
  {
    id: 3,
    size: 56,
    baseDistance: 320,
    varianceX: 1.2,
    varianceY: 0.7,
    speed: 15,
    delay: 6,
    color: 'radial-gradient(circle at 25% 25%, rgba(238, 240, 255, 0.95), rgba(200, 215, 235, 0.85))'
  }
];

const PlanetSystem = () => {
  return (
    <motion.div 
      className="w-full md:w-1/2 relative h-96 md:h-[620px] perspective-1000"
      variants={planetVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Contenedor del sistema con preserve-3d para intersección real de anillos */}
      <div 
        className="absolute top-1/2 left-1/2 w-full h-full z-10"
        style={{ 
          transform: "translate(-50%, -50%)",
          transformStyle: "preserve-3d" 
        }}
      >
        <NearbyStars count={25} />

        {/* Nebula backdrop — gives depth and color to the void behind the system */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: 700, height: 700,
            transform: 'translate(-50%, -50%)',
            background: `
              radial-gradient(ellipse at 30% 40%, rgba(88,28,135,0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(59,130,246,0.06) 0%, transparent 45%),
              radial-gradient(ellipse at 50% 30%, rgba(192,132,252,0.08) 0%, transparent 40%)
            `,
            filter: 'blur(40px)',
            zIndex: 0
          }}
        />

        {/* Distant star — primary light source */}
        <div
          className="absolute rounded-full"
          style={{
            width: 6, height: 6,
            top: '8%', left: '15%',
            background: '#fff',
            boxShadow: '0 0 20px 4px rgba(255,255,255,0.9), 0 0 60px 10px rgba(192,132,252,0.4), 0 0 100px 20px rgba(139,92,246,0.15)',
            zIndex: 1
          }}
        />

        {/* Lens flare — horizontal streak from the star */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 180, height: 1,
            top: 'calc(8% + 3px)', left: 'calc(15% - 87px)',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 70%, transparent 100%)',
            filter: 'blur(1.5px)',
            opacity: 0.6,
            zIndex: 2
          }}
        />
        {/* Lens flare — vertical cross streak */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 1, height: 70,
            top: 'calc(8% - 32px)', left: 'calc(15% + 2px)',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 70%, transparent 100%)',
            filter: 'blur(1px)',
            opacity: 0.45,
            zIndex: 2
          }}
        />
        {/* Lens flare — secondary ghost */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 14, height: 14,
            top: '22%', left: '28%',
            background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)',
            filter: 'blur(4px)',
            zIndex: 1
          }}
        />

        {/* God rays — volumetric light beams from behind the planet */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: 600, height: 600,
            transform: 'translate(-50%, -50%)',
            background: `conic-gradient(
              from 200deg at 50% 50%,
              transparent 0deg,
              rgba(168,85,247,0.04) 8deg,
              transparent 16deg,
              transparent 35deg,
              rgba(192,132,252,0.03) 42deg,
              transparent 50deg,
              transparent 80deg,
              rgba(139,92,246,0.05) 90deg,
              transparent 100deg,
              transparent 140deg,
              rgba(168,85,247,0.04) 148deg,
              transparent 156deg,
              transparent 200deg,
              rgba(216,180,254,0.03) 210deg,
              transparent 220deg,
              transparent 280deg,
              rgba(168,85,247,0.04) 290deg,
              transparent 300deg,
              transparent 360deg
            )`,
            filter: 'blur(8px)',
            opacity: 0.8,
            zIndex: 5,
            maskImage: 'radial-gradient(circle, transparent 28%, black 40%, black 100%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 28%, black 40%, black 100%)'
          }}
        />

        {/* Polar aurora shimmer */}
        <motion.div
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: 280, height: 280,
            x: '-50%', y: '-55%',
            background: 'radial-gradient(ellipse at 50% 15%, rgba(96,165,250,0.12) 0%, rgba(139,92,246,0.06) 30%, transparent 60%)',
            filter: 'blur(12px)',
            borderRadius: '50%',
            willChange: 'opacity'
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <PlanetRings />
        <Planet />

        {/* Planet shadow cast on rings (behind the planet) */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: 400, height: 160,
            transform: 'translate(-50%, -50%) rotateX(75deg) translateZ(-2px)',
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.35) 75%, transparent 100%)',
            clipPath: 'polygon(35% 0%, 65% 0%, 80% 100%, 20% 100%)',
            filter: 'blur(6px)',
            zIndex: 15
          }}
        />

        {/* Lunas */}
        {MOONS_CONFIG.map((moon) => (
          <Moon 
            key={moon.id}
            {...moon}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PlanetSystem;