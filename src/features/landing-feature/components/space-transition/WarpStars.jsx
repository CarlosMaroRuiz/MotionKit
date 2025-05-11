import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { generateWarpStars } from './utils/randomUtils';

const WarpStars = ({ count = 3, starCount = 150 }) => {
  const [stars, setStars] = useState([]);
  
  // Generar estrellas cuando el componente se monta
  useEffect(() => {
    setStars(generateWarpStars(starCount));
  }, [starCount]);

  return (
    <>
      {stars.map(star => (
        <motion.div
          key={`warp-star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: "50%",
            top: "50%",
            x: `${star.x}%`,
            y: `${star.y}%`,
            opacity: star.opacity,
            zIndex: Math.floor(star.z)
          }}
          animate={{
            x: [
              `${star.x}%`, 
              `${star.x}%`, 
              `${star.x * (count === 1 ? 25 : count === 2 ? 5 : 1)}%`
            ],
            y: [
              `${star.y}%`, 
              `${star.y}%`, 
              `${star.y * (count === 1 ? 25 : count === 2 ? 5 : 1)}%`
            ],
            width: [
              star.size, 
              star.size, 
              count === 1 ? star.size * 20 * star.speed : star.size * (count === 2 ? 3 : 1)
            ],
            opacity: count === 1 ? [star.opacity, star.opacity, 0] : [star.opacity]
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: star.delay
          }}
        />
      ))}
    </>
  );
};

export default WarpStars;