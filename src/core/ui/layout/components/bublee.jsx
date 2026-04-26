import React, { useState, useEffect } from 'react';

// Generador de ID único
const generateUniqueId = () => {
  return `bubble-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Función para determinar la posición horizontal considerando el layout
const getHorizontalPosition = (windowWidth) => {
  // Umbral para pantallas medianas donde aparece el sidebar
  const isMediumScreen = windowWidth >= 768; // md breakpoint en Tailwind
  
  // Zona de sidebar (aprox 72 unidades de ancho en pantallas md o mayores)
  const sidebarWidthPercent = isMediumScreen ? (72 / windowWidth) * 100 : 0;
  
  // Decidir en qué zona colocar la burbuja
  const zone = Math.random() * 100;
  
  if (zone < 25) {
    // Zona derecha (25% de probabilidad)
    return 80 + Math.random() * 20; // 80-100%
  } else if (zone < 40) {
    // Zona izquierda (15% de probabilidad)
    // Evitar la zona del sidebar en pantallas medianas
    return isMediumScreen ? 
      sidebarWidthPercent + Math.random() * 10 : // Justo después del sidebar
      Math.random() * 20; // 0-20% en pantallas pequeñas
  } else if (zone < 70) {
    // Bordes superior/inferior (lateral derecho) (30% probabilidad)
    return 60 + Math.random() * 40; // 60-100%
  } else if (zone < 85) {
    // Zona izquierda extrema (15% probabilidad)
    // En pantallas grandes, esto estará detrás del sidebar (efecto de profundidad)
    return Math.random() * 15; // 0-15%
  } else {
    // Zona centro-derecha (15% probabilidad)
    return 50 + Math.random() * 30; // 50-80%
  }
};

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const totalBubbles = 35; // 35 burbujas activas a la vez
  
  // Escuchar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Regenerar burbujas cuando cambia el tamaño de ventana
  useEffect(() => {
    setBubbles(prevBubbles => {
      return prevBubbles.map(bubble => {
        // Actualizar solo la posición horizontal
        const leftPosition = getHorizontalPosition(windowWidth);
        return {
          ...bubble,
          left: `${leftPosition}%`
        };
      });
    });
  }, [windowWidth]);
  
  // Inicializar burbujas
  useEffect(() => {
    // Generar las burbujas iniciales
    const initialBubbles = Array.from({ length: totalBubbles }, () => createBubble());
    setBubbles(initialBubbles);
    
    // Configurar el intervalo para regenerar burbujas
    const interval = setInterval(() => {
      setBubbles(prevBubbles => {
        // Filtrar burbujas expiradas
        // Tiempo de vida más largo porque las burbujas suben más lento
        const maxLifetime = 45000; // 45 segundos de vida
        const currentTime = Date.now();
        
        const activeBubbles = prevBubbles.filter(bubble => {
          return currentTime - bubble.createdAt < maxLifetime;
        });
        
        // Añadir nuevas burbujas para mantener el total
        const newBubblesCount = totalBubbles - activeBubbles.length;
        const newBubbles = Array.from({ length: newBubblesCount }, () => createBubble());
        
        return [...activeBubbles, ...newBubbles];
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  // Crear una burbuja
  const createBubble = () => {
    // Tamaños disponibles (más variación)
    const sizes = ['size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7', 'size-8'];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    
    // Posición horizontal adaptada al layout
    const leftPosition = getHorizontalPosition(windowWidth);
    
    // Velocidad considerablemente más lenta
    const sizeIndex = parseInt(size.split('-')[1]);
    
    // Nueva fórmula para velocidades más lentas:
    // - Burbujas pequeñas: 18-24s
    // - Burbujas medianas: 24-30s
    // - Burbujas grandes: 30-35s
    const baseSpeed = 18 + (sizeIndex * 2); // Aumenta con el tamaño
    const randomFactor = Math.random() * 6; // Variación aleatoria
    const speed = baseSpeed + randomFactor;
    
    // Añadir una ligera variación en la opacidad
    const opacity = Math.random() * 0.3 + 0.5; // Entre 0.5 y 0.8
    
    return {
      id: generateUniqueId(),
      size,
      left: `${leftPosition}%`,
      top: `${100 + Math.random() * 10}%`, // Comienza fuera de pantalla
      speed: `${speed}s`,
      delay: `${Math.random() * 5}s`, // Retraso hasta 5s para mejor distribución
      opacity,
      createdAt: Date.now()
    };
  };
  
  return (
    <div className="bubbles-container">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`bubble ${bubble.size}`}
          style={{
            left: bubble.left,
            top: bubble.top,
            animationDuration: bubble.speed,
            animationDelay: bubble.delay,
            opacity: bubble.opacity
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;