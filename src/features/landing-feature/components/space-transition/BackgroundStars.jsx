import React from 'react';
import { generateRandomStars } from './utils/randomUtils';

const BackgroundStars = ({ count = 50 }) => {
  const stars = generateRandomStars(count, {
    minSize: 0.5,
    maxSize: 1.5,
    minOpacity: 0.1,
    maxOpacity: 0.4
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={`bg-star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.posX}%`,
            top: `${star.posY}%`,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundStars;