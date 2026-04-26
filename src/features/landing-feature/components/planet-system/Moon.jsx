import { useMemo } from 'react';
import { motion } from 'framer-motion';

const Moon = ({
  size = 24,
  baseDistance = 230,
  varianceX = 1.0,
  varianceY = 0.8,
  speed = 20,
  delay = 0,
  color = 'radial-gradient(circle at 30% 30%, rgba(248,250,252,0.95), rgba(226,232,240,0.85))'
}) => {
  const craterCount = Math.floor(size / 6) + 2;
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  const craters = useMemo(() => Array.from({ length: craterCount }).map((_, j) => ({
    id: j,
    size: 1.5 + Math.random() * (size / 3.5),
    top: `${10 + Math.random() * 75}%`,
    left: `${10 + Math.random() * 75}%`
  })), [craterCount, size]);

  const orbitKeyframes = {
    x: [
      `calc(-50% + 0px)`,
      `calc(-50% + ${baseDistance * varianceX}px)`,
      `calc(-50% + 0px)`,
      `calc(-50% - ${baseDistance * varianceX}px)`,
      `calc(-50% + 0px)`
    ],
    y: [
      `calc(-50% + ${baseDistance * varianceY}px)`,
      `calc(-50% + 0px)`,
      `calc(-50% - ${baseDistance * varianceY}px)`,
      `calc(-50% + 0px)`,
      `calc(-50% + ${baseDistance * varianceY}px)`
    ]
  };

  const orbitTransition = (durationMultiplier = 1) => ({
    duration: speed * 2 * durationMultiplier,
    repeat: Infinity,
    ease: "easeInOut",
    delay
  });

  return (
    <>
      <svg className="hidden absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={`moon-noise-${uniqueId}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" />
          </filter>
        </defs>
      </svg>

      {/* Static halo (replaces animated boxShadow — GPU friendly) */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
        style={{
          width: size * 2.2,
          height: size * 2.2,
          x: "-50%", y: "-50%",
          background: `radial-gradient(circle, rgba(255,255,255,0.18) 20%, transparent 70%)`,
          filter: `blur(${size * 0.4}px)`,
          willChange: "transform"
        }}
        animate={{ ...orbitKeyframes }}
        transition={{ x: orbitTransition(), y: orbitTransition() }}
      />

      {/* Moon body */}
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-full overflow-hidden"
        style={{
          width: size, height: size,
          x: "-50%", y: "-50%",
          background: color,
          willChange: "transform"
        }}
        animate={{ ...orbitKeyframes }}
        transition={{ x: orbitTransition(), y: orbitTransition() }}
      >
        {/* Procedural texture */}
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none z-0"
          style={{ filter: `url(#moon-noise-${uniqueId})`, opacity: 0.8 }}
        />

        {/* Terminator shadow */}
        <div
          className="absolute inset-0 rounded-full z-10"
          style={{
            background: `
              radial-gradient(circle at 80% 80%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 30%, transparent 65%),
              linear-gradient(115deg, transparent 35%, rgba(0,0,0,0.8) 65%, rgba(0,0,0,0.98) 100%)
            `,
            mixBlendMode: "multiply",
            boxShadow: "inset -8px -8px 16px rgba(0,0,0,1), inset 3px 3px 8px rgba(255,255,255,0.7)"
          }}
        />

        {/* Rim bounce light */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none z-20"
          style={{ boxShadow: "inset -2px -2px 5px rgba(226,232,240,0.35)" }}
        />

        {/* Craters — static */}
        {craters.map((crater) => (
          <div
            key={`moon-crater-${crater.id}`}
            className="absolute rounded-full z-0"
            style={{
              width: crater.size, height: crater.size,
              top: crater.top, left: crater.left,
              background: 'radial-gradient(circle at 40% 40%, rgba(0,0,0,0.15), rgba(0,0,0,0.3))',
              boxShadow: 'inset -1px -1px 3px rgba(0,0,0,0.6), inset 1px 1px 2px rgba(255,255,255,0.4)'
            }}
          />
        ))}
      </motion.div>
    </>
  );
};

export default Moon;