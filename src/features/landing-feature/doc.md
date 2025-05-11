# Un poco de documentacion por si hace util en un futuro

## Ejemplos de personalización del Sistema Planetario

A continuación se muestran algunas formas en las que se puede personalizar y extender el sistema planetario modularizado ubicado en:
### landing-feature/components/planet-system
- Se puede encontrar Gradientes
- Utils para crear nuevos componentes.
-

### 1. Personalizar colores del planeta

```jsx
import React from 'react';
import { PlanetSystem } from './components/planet-system';
import { PLANET_BASE_GRADIENTS } from './components/planet-system/utils/gradients';

const LandingPage = () => {
  return (
    <div className="container">
      {/* Usar un tema de color azul predefinido */}
      <PlanetSystem planetGradient={PLANET_BASE_GRADIENTS.blue} />
    </div>
  );
};
```

### 2. Añadir más lunas o modificar las existentes

```jsx
import React from 'react';
import PlanetSystem from './components/planet-system';
import { Moon } from './components/planet-system';

const LandingPage = () => {
  // Configuración personalizada de lunas
  const customMoons = [
    {
      id: 1,
      size: 30,
      baseDistance: 230,
      varianceX: 1.1,
      varianceY: 0.7,
      speed: 18,
      delay: 0
    },
    {
      id: 2,
      size: 45,
      baseDistance: 290,
      varianceX: 1.0,
      varianceY: 0.8,
      speed: 25,
      delay: 5
    }
  ];

  return (
    <div className="container">
      <PlanetSystem moons={customMoons} />
      
      {/* O añadir una luna adicional independiente */}
      <div className="relative">
        <Moon 
          size={60}
          baseDistance={400}
          speed={30}
          color="radial-gradient(circle at 35% 35%, rgba(254, 226, 226, 0.95), rgba(248, 113, 113, 0.85))"
        />
      </div>
    </div>
  );
};
```

### 3. Crear un sistema solar con múltiples planetas

```jsx
import React from 'react';
import { Planet, PlanetRings, NearbyStars } from './components/planet-system';
import { PLANET_BASE_GRADIENTS } from './components/planet-system/utils/gradients';

const SolarSystem = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Estrella central */}
      <div className="absolute" style={{ zIndex: 5 }}>
        <div className="w-40 h-40 rounded-full bg-yellow-300" 
             style={{ 
               boxShadow: "0 0 60px rgba(252, 211, 77, 0.8), 0 0 120px rgba(252, 211, 77, 0.4)" 
             }} 
        />
      </div>
      
      {/* Primer planeta */}
      <div className="absolute" style={{ 
        transform: 'translateX(-200px) scale(0.3)', 
        zIndex: 3 
      }}>
        <Planet gradient={PLANET_BASE_GRADIENTS.teal} />
      </div>
      
      {/* Segundo planeta con anillos */}
      <div className="absolute" style={{ 
        transform: 'translateX(300px) translateY(-100px) scale(0.6)', 
        zIndex: 4 
      }}>
        <Planet gradient={PLANET_BASE_GRADIENTS.purple} />
        <PlanetRings />
      </div>
      
      {/* Tercer planeta */}
      <div className="absolute" style={{ 
        transform: 'translateX(100px) translateY(200px) scale(0.4)', 
        zIndex: 2 
      }}>
        <Planet gradient={PLANET_BASE_GRADIENTS.blue} />
      </div>
      
      {/* Estrellas de fondo */}
      <NearbyStars count={100} />
    </div>
  );
};
```

### 4. Animación de aproximación (zoom)

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlanetSystem } from './components/planet-system';

const ZoomablePlanet = () => {
  const [zoomed, setZoomed] = useState(false);
  
  return (
    <div className="relative h-screen flex items-center justify-center">
      <motion.div
        onClick={() => setZoomed(!zoomed)}
        animate={{
          scale: zoomed ? 2 : 1,
          transition: { duration: 1.5, type: "spring" }
        }}
        className="cursor-pointer"
      >
        <PlanetSystem />
      </motion.div>
      
      <div className="absolute bottom-10 text-white text-center">
        Haz clic en el planeta para {zoomed ? 'alejar' : 'acercar'}
      </div>
    </div>
  );
};
```

### 5. Planeta reactivo a eventos

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Planet, PlanetRings, Moon } from './components/planet-system';

const InteractivePlanet = () => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="relative h-screen flex items-center justify-center">
      <motion.div
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        animate={{
          rotate: isActive ? 20 : 0,
          transition: { duration: 1 }
        }}
        className="cursor-pointer relative"
      >
        <Planet />
        <PlanetRings />
        
        {/* Luna que aparece solo cuando el planeta está activo */}
        {isActive && (
          <Moon 
            size={40}
            baseDistance={350}
            speed={10}
          />
        )}
      </motion.div>
      
      <div className="absolute bottom-10 text-white text-center">
        Pasa el cursor sobre el planeta para activarlo
      </div>
    </div>
  );
};
```

Estos ejemplos muestran la flexibilidad que ofrece el sistema planetario modularizado, permitiéndote crear desde simples personalizaciones hasta complejas escenas espaciales interactivas.