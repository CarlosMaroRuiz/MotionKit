import { useMemo } from 'react';
import { motion } from 'framer-motion';
import DustParticle from './DustParticle';

const PlanetRings = ({ ringCount = 6, dustCount = 20 }) => {
  const rings = useMemo(() => Array.from({ length: ringCount }).map((_, i) => {
    const baseSize = 390 + i * 26;
    return {
      id: i,
      size: baseSize,
      borderWidth: Math.max(1, 3 - i * 0.4),
      colorR: 168 - i * 15,
      colorG: 85 - i * 8,
      colorB: 247 - i * 15,
      opacity: 0.4 - i * 0.05,
      glowOpacity: 0.3 - i * 0.03,
      rotationDuration: 100 - i * 10,
      rotationOffset: i * 4
    };
  }), [ringCount]);

  const dustParticles = useMemo(() => Array.from({ length: dustCount }).map((_, i) => {
    const size = 1 + Math.random() * 2.5;
    const angle = (i / dustCount) * 360;
    const radius = 195 + Math.random() * 105;
    const speed = 35 + Math.random() * 55;
    const opacity = 0.3 + Math.random() * 0.5;
    return { id: i, size, angle, radius, speed, opacity };
  }), [dustCount]);

  return (
    <div
      className="absolute top-1/2 left-1/2 w-[520px] h-[520px] pointer-events-none"
      style={{ transform: "translate(-50%, -50%)", transformStyle: 'preserve-3d' }}
    >
      {/* Dense dust disc with Cassini-like division */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
        style={{
          width: 520, height: 520,
          x: "-50%", y: "-50%",
          rotateX: 75,
          background: `
            repeating-radial-gradient(
              circle at center,
              transparent 0,
              transparent 185px,
              rgba(168,85,247,0.04) 200px,
              rgba(216,180,254,0.1) 218px,
              rgba(192,132,252,0.06) 228px,
              rgba(168,85,247,0.02) 232px,
              transparent 236px,
              transparent 240px,
              rgba(139,92,246,0.05) 248px,
              rgba(216,180,254,0.08) 258px,
              rgba(168,85,247,0.03) 268px,
              transparent 278px
            ),
            conic-gradient(
              from 0deg,
              rgba(168,85,247,0.08) 0deg,
              rgba(216,180,254,0.18) 45deg,
              rgba(139,92,246,0.06) 90deg,
              rgba(192,132,252,0.15) 135deg,
              rgba(168,85,247,0.08) 180deg,
              rgba(216,180,254,0.18) 225deg,
              rgba(139,92,246,0.06) 270deg,
              rgba(192,132,252,0.15) 315deg,
              rgba(168,85,247,0.08) 360deg
            )
          `,
          filter: "blur(2.5px)",
          willChange: "transform",
          maskImage: "radial-gradient(circle, transparent 38%, black 48%, black 60%, transparent 62%, transparent 64%, black 66%, black 87%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 38%, black 48%, black 60%, transparent 62%, transparent 64%, black 66%, black 87%, transparent 100%)"
        }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      />

      {/* Ring shadow — subtle darkening on one side (light occlusion) */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
        style={{
          width: 520, height: 520,
          transform: "translate(-50%, -50%) rotateX(75deg)",
          background: "linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.25) 80%, transparent 100%)",
          maskImage: "radial-gradient(circle, transparent 38%, black 50%, black 85%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 38%, black 50%, black 85%, transparent 100%)"
        }}
      />

      {/* Defined ring lines */}
      {rings.map((ring) => (
        <motion.div
          key={`ring-${ring.id}`}
          className="absolute top-1/2 left-1/2 border rounded-full"
          style={{
            width: ring.size, height: ring.size,
            borderWidth: ring.borderWidth,
            borderColor: `rgba(${ring.colorR},${ring.colorG},${ring.colorB},${ring.opacity})`,
            boxShadow: `0 0 12px rgba(${ring.colorR},${ring.colorG},${ring.colorB},${ring.glowOpacity}), inset 0 0 8px rgba(${ring.colorR},${ring.colorG},${ring.colorB},${ring.glowOpacity * 0.7})`,
            x: "-50%", y: "-50%",
            rotateX: 75,
            willChange: "transform"
          }}
          animate={{
            rotateZ: [ring.rotationOffset, ring.rotationOffset + 360],
            opacity: [ring.opacity, ring.opacity + 0.08, ring.opacity]
          }}
          transition={{
            rotateZ: { duration: ring.rotationDuration, repeat: Infinity, ease: "linear" },
            opacity: { duration: 5 + ring.id, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }}
        />
      ))}

      {/* Dust particle highlights */}
      {dustParticles.map((particle) => (
        <DustParticle key={`dust-${particle.id}`} {...particle} />
      ))}
    </div>
  );
};

export default PlanetRings;