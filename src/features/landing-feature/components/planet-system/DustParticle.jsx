import { motion } from 'framer-motion';

const DustParticle = ({ size, angle, radius, speed, opacity }) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        x: "-50%",
        y: "-50%",
        rotateX: 75,
        willChange: "transform"
      }}
      animate={{ rotateZ: [angle, angle + 360] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="absolute rounded-full bg-purple-100"
        style={{
          width: size,
          height: size,
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: size > 1.3 ? `0 0 ${size * 3}px rgba(216,180,254,${opacity + 0.2})` : 'none',
          opacity
        }}
      />
    </motion.div>
  );
};

export default DustParticle;