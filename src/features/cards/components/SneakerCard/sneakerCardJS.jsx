export const sneakerCardJS = `// Configuración de animaciones para SneakerCard
const sneakerAnimations = {
  // Animación del contenedor principal
  container: {
    hover: {
      scale: 1.02,
      boxShadow: [
        "0 20px 40px rgba(0, 0, 0, 0.3)",
        "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 107, 107, 0.2)"
      ]
    }
  },

  // Animación del producto en 3D
  product: {
    idle: {
      transform: 'translateX(-50%) translateY(-5px) rotateY(0deg) rotateZ(0deg)',
      transition: 'transform 4s ease-in-out infinite alternate'
    },
    hover: {
      transform: 'translateX(-50%) translateY(-10px) rotateY(-15deg) rotateZ(5deg)',
      transition: 'transform 2s ease-in-out infinite alternate'
    }
  },

  // Partículas de velocidad
  speedParticles: (particle) => ({
    style: {
      animationDelay: particle.delay + 's',
      transform: 'translateX(' + particle.distance + 'px)',
      opacity: 0.7
    },
    className: 'animate-pulse'
  }),

  // Animación de estrellas del rating
  stars: (index) => ({
    style: {
      animationDelay: (1 + index * 0.1) + 's'
    },
    className: 'transition-all duration-300'
  }),

  // Animación de colores disponibles
  colorDots: (index) => ({
    style: {
      animationDelay: (1.2 + index * 0.1) + 's'
    },
    className: 'transition-all duration-300 hover:scale-110 hover:border-white active:scale-90'
  }),

  // Animación del botón de carrito
  cartButton: {
    states: {
      default: "Agregar al carrito",
      loading: "Agregando...",
      success: "¡Agregado al carrito!"
    },
    className: 'transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-75',
    shimmer: {
      style: (isHovered) => ({
        transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)'
      }),
      className: 'transition-transform duration-800'
    }
  },

  // Partículas de explosión del carrito
  cartExplosion: (particle) => ({
    style: {
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      top: "50%",
      left: "50%",
      boxShadow: '0 0 ' + (particle.size * 2) + 'px ' + particle.color,
      transform: 'translate(' + 
        (Math.cos(particle.angle * (Math.PI / 180)) * particle.distance) + 'px, ' +
        (Math.sin(particle.angle * (Math.PI / 180)) * particle.distance) + 'px)',
      animationDuration: particle.duration + 's'
    },
    className: 'animate-pulse'
  }),

  // Efecto de resplandor de fondo
  backgroundGlow: {
    style: (isHovered) => ({
      opacity: isHovered ? 0.3 : 0.1
    }),
    className: 'transition-opacity duration-1000'
  },

  // Animación de precio
  price: {
    style: (isHovered) => ({
      color: isHovered ? "#FF6B6B" : "#FFFFFF"
    }),
    className: 'transition-colors duration-300'
  },

  // Badge de descuento
  discountBadge: {
    style: { transform: 'rotate(-12deg)' },
    className: 'transition-all duration-300 hover:rotate-0 hover:scale-110'
  }
};

// Datos del producto
const productDataExample = {
  name: "Air Motion Elite",
  brand: "Motion Sport",
  price: 189.99,
  originalPrice: 249.99,
  rating: 4.8,
  reviews: 324,
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
  sizes: ['40', '41', '42', '43', '44', '45']
};

// Función para generar partículas de velocidad
const generateSpeedParticles = (count = 12) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    duration: 1.5 + Math.random() * 1,
    startY: 10 + Math.random() * 80,
    distance: 100 + Math.random() * 50
  }));
};

// Función para generar partículas de carrito
const generateCartParticles = (count = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    color: ['#FFD93D', '#6BCF7F', '#4D96FF', '#FF6B6B'][Math.floor(Math.random() * 4)],
    angle: (i / count) * 360,
    distance: Math.random() * 80 + 40,
    duration: Math.random() * 0.8 + 0.6
  }));
};

// Estados del botón de carrito
const handleCartStates = (isAddingToCart, cartAdded, setIsAddingToCart, setCartAdded) => {
  if (isAddingToCart || cartAdded) return;
  
  setIsAddingToCart(true);
  setTimeout(() => {
    setIsAddingToCart(false);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  }, 1500);
};`;