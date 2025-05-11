import PlanetSystem from './PlanetSystem';

// Re-exportamos componentes individuales para facilitar su importación
export { default as Planet } from './Planet';
export { default as PlanetRings } from './PlanetRings';
export { default as Moon } from './Moon';
export { default as NearbyStars } from './NearbyStars';

// Exportamos el componente principal como exportación por defecto
export default PlanetSystem;