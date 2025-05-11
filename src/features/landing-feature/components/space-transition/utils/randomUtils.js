/**
 * Genera un número aleatorio entre min y max
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Valor aleatorio entre min y max
 */
export const randomBetween = (min, max) => {
  return min + Math.random() * (max - min);
};

/**
 * Genera estrellas estáticas aleatorias para el fondo
 * @param {number} count - Número de estrellas a generar
 * @param {Object} options - Opciones de configuración
 * @returns {Array} - Array de objetos con propiedades para las estrellas
 */
export const generateRandomStars = (count, options = {}) => {
  const {
    minSize = 0.5,
    maxSize = 1.5,
    minOpacity = 0.1,
    maxOpacity = 0.4
  } = options;

  return Array.from({ length: count }).map(() => {
    const size = randomBetween(minSize, maxSize);
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = randomBetween(minOpacity, maxOpacity);
    
    return {
      size,
      posX,
      posY,
      opacity
    };
  });
};

/**
 * Genera estrellas para el efecto de warp/viaje espacial
 * @param {number} count - Número de estrellas a generar
 * @returns {Array} - Array de objetos con propiedades para las estrellas warp
 */
export const generateWarpStars = (count) => {
  return Array.from({ length: count }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 5 + Math.random() * 30;
    
    return {
      id: i,
      size: 1 + Math.random() * 1.5,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      z: Math.random() * 5,
      opacity: 0.4 + Math.random() * 0.5,
      delay: Math.random() * 0.2,
      speed: 0.5 + Math.random() * 1.5
    };
  });
};

/**
 * Genera partículas que salen del rayo
 * @param {number} count - Número de partículas a generar
 * @returns {Array} - Array de objetos con propiedades para las partículas
 */
export const generateRayParticles = (count) => {
  return Array.from({ length: count }).map(() => {
    const yOffset = (Math.random() * 40) - 20;
    const delay = Math.random() * 0.2;
    const speed = 0.7 + Math.random() * 0.6;
    const size = 1 + Math.random() * 2;
    const side = Math.random() > 0.5 ? 1 : -1; // Alternar lados aleatoriamente
    
    return {
      yOffset,
      delay,
      speed,
      size,
      targetX: side * 100 + (side * Math.random() * 200),
      targetY: (Math.random() * 60) - 30
    };
  });
};