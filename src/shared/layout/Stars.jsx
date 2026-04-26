import { motion } from 'framer-motion';
import { useMemo } from 'react';

const generateStars = (count, sizeRange, opacityRange) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 4,
  }));
};

const generateShootingStars = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const startX = Math.random() * 80;
    const startY = Math.random() * 50;
    const angle = Math.random() * 40 - 20;
    const angleRad = (angle * Math.PI) / 180;
    const distance = 100;
    return {
      id: i,
      startX, startY, angle,
      endX: startX + distance * Math.cos(angleRad),
      endY: startY + distance * Math.sin(angleRad),
      size: 1.5 + Math.random() * 2,
      tailLength: 20 + Math.random() * 30,
      delay: 4 + Math.random() * 14,
      duration: 0.8 + Math.random() * 0.6,
      brightness: 0.7 + Math.random() * 0.3,
    };
  });
};

const Stars = () => {
  const layers = useMemo(() => ({
    back: generateStars(50, [0.5, 1.2], [0.15, 0.35]),
    mid: generateStars(35, [0.8, 1.6], [0.2, 0.5]),
    front: generateStars(20, [1.2, 2.2], [0.35, 0.65]),
    shooting: generateShootingStars(4),
  }), []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {layers.back.map(s => (
        <motion.div
          key={`b-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity }}
          animate={{ opacity: [s.opacity, s.opacity * 1.4, s.opacity] }}
          transition={{ duration: s.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: s.delay }}
        />
      ))}

      {layers.mid.map(s => (
        <motion.div
          key={`m-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity }}
          animate={{ opacity: [s.opacity, s.opacity * 1.5, s.opacity], scale: [1, 1.15, 1] }}
          transition={{ duration: s.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: s.delay }}
        />
      ))}

      {layers.front.map(s => (
        <motion.div
          key={`f-${s.id}`}
          className="absolute rounded-full"
          style={{
            width: s.size, height: s.size,
            left: `${s.x}%`, top: `${s.y}%`,
            backgroundColor: '#fff',
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.5)`,
            opacity: s.opacity, zIndex: 2,
          }}
          animate={{ opacity: [s.opacity, s.opacity * 1.6, s.opacity], scale: [1, 1.25, 1] }}
          transition={{ duration: s.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: s.delay }}
        />
      ))}

      {layers.shooting.map(ss => (
        <motion.div
          key={`ss-${ss.id}`}
          className="absolute rounded-full bg-white z-10"
          style={{
            width: ss.size, height: ss.size * 0.4,
            left: `${ss.startX}%`, top: `${ss.startY}%`,
            rotate: `${ss.angle}deg`,
            background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0))",
            transformOrigin: "left center",
            boxShadow: `0 0 ${ss.size * 3}px rgba(255,255,255,${ss.brightness})`,
            opacity: 0,
          }}
          animate={{
            x: [`0%`, `${ss.endX - ss.startX}%`],
            y: [`0%`, `${ss.endY - ss.startY}%`],
            opacity: [0, ss.brightness, 0],
            width: [ss.size, ss.size * ss.tailLength],
          }}
          transition={{ duration: ss.duration, repeat: Infinity, repeatDelay: ss.delay, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: "linear-gradient(to top, rgba(76,29,149,0.08) 0%, rgba(124,58,237,0.03) 60%, transparent 100%)",
          filter: "blur(40px)", opacity: 0.2, zIndex: 0,
        }}
        animate={{ y: [-10, 0, -5, -10], opacity: [0.15, 0.25, 0.18, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      />
    </div>
  );
};

export default Stars;