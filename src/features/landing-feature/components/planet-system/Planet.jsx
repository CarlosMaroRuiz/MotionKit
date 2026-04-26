import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateRandomCraters, generateRandomTerrains, generateRandomClouds } from './utils/randomUtils';

const Planet = () => {
  const craters  = useMemo(() => generateRandomCraters(18), []);
  const terrains = useMemo(() => generateRandomTerrains(8),  []);
  const clouds   = useMemo(() => generateRandomClouds(8),    []);

  return (
    <div
      className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <svg className="hidden absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="planet-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.25 0" />
          </filter>
          <filter id="planet-noise-fine">
            <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.12 0" />
          </filter>
        </defs>
      </svg>

      {/* Atmospheric glow — Rayleigh scattering */}
      <motion.div
        className="absolute -inset-12 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 38% 38%, rgba(139,92,246,0.45) 0%, rgba(147,51,234,0.18) 45%, rgba(59,130,246,0.06) 65%, transparent 75%)",
          filter: "blur(28px)",
          willChange: "opacity"
        }}
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Atmospheric rim — limb brightening like a real gas giant */}
      <div
        className="absolute -inset-3 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 46%, rgba(139,92,246,0.22) 56%, rgba(96,165,250,0.12) 66%, rgba(59,130,246,0.06) 74%, transparent 82%)",
          filter: "blur(5px)",
          zIndex: 60
        }}
      />

      {/* Subsurface scattering — light bleeding through atmosphere at the terminator */}
      <div
        className="absolute -inset-1 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 62% 62%, transparent 40%, rgba(192,132,252,0.15) 50%, rgba(168,85,247,0.08) 58%, transparent 65%)",
          filter: "blur(8px)",
          zIndex: 55
        }}
      />

      {/* Planet sphere mask */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: "#1e0a3c",
          boxShadow: "0 0 80px rgba(147,51,234,0.5), 0 0 40px rgba(88,28,135,0.3), inset -30px -30px 60px rgba(0,0,0,0.85)",
          transform: "translateZ(0)"
        }}
      >
        {/* Base radial gradient — thermal depth */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(168,85,247,1) 0%, rgba(126,34,206,0.95) 25%, rgba(88,28,135,1) 50%, rgba(30,10,60,1) 100%)"
          }}
        />

        {/* Gas giant banding — horizontal color bands like Jupiter/Saturn */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                180deg,
                transparent 0%,
                rgba(192,132,252,0.06) 3%,
                transparent 5%,
                rgba(139,92,246,0.04) 8%,
                transparent 10%,
                rgba(168,85,247,0.07) 14%,
                transparent 17%,
                rgba(126,34,206,0.05) 20%,
                transparent 23%
              )
            `,
            mixBlendMode: "screen",
            opacity: 0.9
          }}
        />

        {/* Procedural fractal noise — coarse texture */}
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none z-0"
          style={{ filter: "url(#planet-noise)", opacity: 0.7 }}
        />

        {/* Procedural fractal noise — fine detail layer */}
        <div
          className="absolute inset-0 mix-blend-soft-light pointer-events-none z-0"
          style={{ filter: "url(#planet-noise-fine)", opacity: 0.5 }}
        />

        {/* Rotating surface — terrains + craters */}
        <motion.div
          className="absolute top-0 bottom-0 z-10"
          style={{ width: '200%', left: 0, willChange: "transform" }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((offset) => (
            <div key={`surf-${offset}`} className="absolute top-0 bottom-0 w-1/2" style={{ left: `${offset * 50}%` }}>
              {terrains.map((t, i) => (
                <div
                  key={`t-${offset}-${i}`}
                  className="absolute rounded-full opacity-40 mix-blend-color-dodge"
                  style={{
                    width: t.width, height: t.height,
                    left: `${t.posX}%`, top: `${t.posY}%`,
                    transform: `rotate(${t.rotation}deg)`,
                    background: `radial-gradient(ellipse, rgba(${t.colorR},${t.colorG},${t.colorB},0.6), transparent 70%)`,
                    filter: "blur(5px)"
                  }}
                />
              ))}
              {craters.map((c, i) => (
                <div
                  key={`c-${offset}-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: c.size, height: c.size,
                    left: `${c.posX}%`, top: `${c.posY}%`,
                    background: `radial-gradient(circle at 35% 35%, rgba(${c.colorR},${c.colorG},${c.colorB},${c.opacity}), rgba(${c.colorDarkR},${c.colorDarkG},${c.colorDarkB},${c.opacity * 1.5}))`,
                    boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.9), inset -1px -1px 4px rgba(255,255,255,0.25)'
                  }}
                />
              ))}
            </div>
          ))}
        </motion.div>

        {/* Rotating cloud layer — static divs inside single motion container */}
        <motion.div
          className="absolute top-0 bottom-0 pointer-events-none z-20"
          style={{ width: '200%', left: 0, willChange: "transform" }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 85, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((offset) => (
            <div key={`cl-${offset}`} className="absolute top-0 bottom-0 w-1/2" style={{ left: `${offset * 50}%` }}>
              {clouds.map((cloud, i) => (
                <div
                  key={`cl-${offset}-${i}`}
                  className="absolute rounded-full mix-blend-screen"
                  style={{
                    width: cloud.width, height: cloud.height,
                    left: `${cloud.posX}%`, top: `${cloud.posY}%`,
                    transform: `rotate(${cloud.rotation}deg)`,
                    background: `linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.3), rgba(255,255,255,0.05))`,
                    filter: `blur(${cloud.blur}px)`,
                    opacity: cloud.opacity
                  }}
                />
              ))}
            </div>
          ))}
        </motion.div>

        {/* Ring shadow on planet surface — cast by the rings passing over */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none z-25"
          style={{
            background: "linear-gradient(175deg, transparent 35%, rgba(0,0,0,0.12) 42%, transparent 44%, rgba(0,0,0,0.08) 48%, transparent 50%)",
            opacity: 0.7
          }}
        />

        {/* Day/Night terminator — enhanced with color shift */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none z-30"
          style={{
            background: `
              radial-gradient(circle at 78% 78%, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.9) 25%, rgba(10,0,20,0.6) 45%, transparent 65%),
              linear-gradient(118deg, transparent 28%, rgba(30,10,60,0.4) 42%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,1) 96%)
            `,
            mixBlendMode: "multiply",
            boxShadow: "inset -28px -28px 65px rgba(0,0,0,1), inset 15px 15px 45px rgba(255,255,255,0.25)"
          }}
        />

        {/* Specular highlight — primary star reflection */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none z-40"
          style={{
            background: `
              radial-gradient(ellipse at 22% 22%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 15%, transparent 45%),
              radial-gradient(ellipse at 30% 28%, rgba(192,132,252,0.15) 0%, transparent 40%)
            `,
            mixBlendMode: "screen"
          }}
        />

        {/* Rim light — light bouncing off dark side */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none z-50"
          style={{
            boxShadow: "inset -6px -6px 18px rgba(168,85,247,0.3), inset -3px -3px 8px rgba(96,165,250,0.15)"
          }}
        />
      </div>
    </div>
  );
};

export default Planet;