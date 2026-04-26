import { useMemo } from 'react';
import { motion } from 'framer-motion';

const NearbyStars = ({ count = 25 }) => {
  const stars = useMemo(() => Array.from({ length: count }).map((_, i) => {
    const size = 0.5 + Math.random() * 2;
    const distance = 260 + Math.random() * 190;
    const angle = (i / count) * 360 + Math.random() * 20;
    const angleRad = (angle * Math.PI) / 180;
    return {
      id: i,
      size,
      x: Math.cos(angleRad) * distance,
      y: Math.sin(angleRad) * distance,
      pulseSpeed: 2 + Math.random() * 4,
      hasShadow: size > 1.2,
      delay: Math.random() * 5
    };
  }), [count]);

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={`ns-${star.id}`}
          className="absolute top-1/2 left-1/2 rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            x: `calc(-50% + ${star.x}px)`,
            y: `calc(-50% + ${star.y}px)`,
            boxShadow: star.hasShadow ? `0 0 ${star.size * 4}px rgba(255,255,255,0.9)` : 'none',
            willChange: 'opacity'
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: star.pulseSpeed, repeat: Infinity, repeatType: "reverse", delay: star.delay, ease: "easeInOut" }}
        />
      ))}
    </>
  );
};

export default NearbyStars;