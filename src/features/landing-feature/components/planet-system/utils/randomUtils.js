/**
 * Genera cráteres aleatorios para la superficie del planeta
 * @param {number} count - Número de cráteres a generar
 * @returns {Array} - Array de objetos con propiedades para los cráteres
 */
export const generateRandomCraters = (count) => {
  return Array.from({ length: count }).map(() => {
    const size = 8 + Math.random() * 35;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = 0.2 + Math.random() * 0.4;
    const colorR = 60 + Math.random() * 50;
    const colorG = 40 + Math.random() * 40;
    const colorB = 120 + Math.random() * 80;
    const colorDarkR = 40 + Math.random() * 20;
    const colorDarkG = 20 + Math.random() * 20;
    const colorDarkB = 100 + Math.random() * 50;
    
    return {
      size,
      posX,
      posY,
      opacity,
      colorR,
      colorG,
      colorB,
      colorDarkR,
      colorDarkG,
      colorDarkB
    };
  });
};

/**
 * Genera terrenos aleatorios para la superficie del planeta
 * @param {number} count - Número de elementos de terreno a generar
 * @returns {Array} - Array de objetos con propiedades para los terrenos
 */
export const generateRandomTerrains = (count) => {
  return Array.from({ length: count }).map(() => {
    const width = 100 + Math.random() * 150;
    const height = 40 + Math.random() * 60;
    const posX = Math.random() * 80;
    const posY = Math.random() * 100;
    const rotation = Math.random() * 180;
    const colorR = 100 + Math.random() * 80;
    const colorG = 50 + Math.random() * 40;
    const colorB = 160 + Math.random() * 60;
    
    return {
      width,
      height,
      posX,
      posY,
      rotation,
      colorR,
      colorG,
      colorB
    };
  });
};

/**
 * Genera nubes aleatorias para la atmósfera del planeta
 * @param {number} count - Número de nubes a generar
 * @returns {Array} - Array de objetos con propiedades para las nubes
 */
export const generateRandomClouds = (count) => {
  return Array.from({ length: count }).map(() => {
    const width = 50 + Math.random() * 150;
    const height = 8 + Math.random() * 22;
    const posX = Math.random() * 80;
    const posY = Math.random() * 100;
    const rotation = Math.random() * 180;
    const blur = 4 + Math.random() * 6;
    const opacity = 0.15 + Math.random() * 0.25;
    const duration = 8 + Math.random() * 7;
    
    return {
      width,
      height,
      posX,
      posY,
      rotation,
      blur,
      opacity,
      duration
    };
  });
};

/**
 * Genera un valor aleatorio entre min y max
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Valor aleatorio entre min y max
 */
export const randomBetween = (min, max) => {
  return min + Math.random() * (max - min);
};