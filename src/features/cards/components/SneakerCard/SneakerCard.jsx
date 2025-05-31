import React, { useState } from 'react';
import { sneakerCardJS } from './sneakerCardJS';
import { sneakerCardJSX } from './sneakerCardJSX';
export {sneakerCardJS,sneakerCardJSX}

const SneakerCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('42');

  const handleAddToCart = () => {
    if (isAddingToCart || cartAdded) return;
    
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2000);
    }, 1500);
  };

  // Datos del producto
  const sneakerData = {
    name: "Air Motion Elite",
    brand: "Motion Sport",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 324,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    sizes: ['40', '41', '42', '43', '44', '45']
  };

  // Partículas de velocidad
  const speedParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    duration: 1.5 + Math.random() * 1,
    startY: 10 + Math.random() * 80,
    distance: 100 + Math.random() * 50
  }));

  // Partículas de explosión para add to cart
  const cartParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    color: ['#FFD93D', '#6BCF7F', '#4D96FF', '#FF6B6B'][Math.floor(Math.random() * 4)],
    angle: (i / 20) * 360,
    distance: Math.random() * 80 + 40,
    duration: Math.random() * 0.8 + 0.6
  }));

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
      <div
        className="relative w-96 h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isHovered 
            ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 107, 107, 0.2)"
            : "0 20px 40px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Fondo dinámico con gradiente animado */}
        <div
          className="absolute inset-0 opacity-50 transition-all duration-2000"
          style={{
            background: `linear-gradient(135deg, 
              ${sneakerData.colors[0]}20, 
              ${sneakerData.colors[1]}15, 
              ${sneakerData.colors[2]}20, 
              ${sneakerData.colors[3]}15)`,
            transform: isHovered ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)'
          }}
        />

        {/* Partículas de velocidad */}
        {isHovered && speedParticles.map((particle) => (
          <div
            key={`speed-${particle.id}`}
            className="absolute w-1 bg-gradient-to-r from-white to-transparent animate-pulse"
            style={{
              height: 2,
              left: '10%',
              top: `${particle.startY}%`,
              borderRadius: '2px',
              animationDelay: `${particle.delay}s`,
              transform: `translateX(${particle.distance}px)`,
              opacity: 0.7
            }}
          />
        ))}

        {/* Imagen del tenis */}
        <div
          className="absolute top-12 left-1/2 transform -translate-x-1/2 transition-all duration-2000"
          style={{
            transform: isHovered 
              ? 'translateX(-50%) translateY(-10px) rotateY(-15deg) rotateZ(5deg)' 
              : 'translateX(-50%) translateY(-5px) rotateY(0deg) rotateZ(0deg)'
          }}
        >
          {/* Sombra del tenis */}
          <div
            className="absolute top-24 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-black/20 rounded-full blur-md transition-all duration-1000"
            style={{
              transform: isHovered 
                ? 'translateX(-50%) scaleX(1.2)' 
                : 'translateX(-50%) scaleX(1.1)',
              opacity: isHovered ? 0.3 : 0.2
            }}
          />
          
          {/* Imagen real del tenis */}
          <img
            src="https://cdn.pixabay.com/photo/2021/02/13/05/58/tennis-6010392_960_720.png"
            alt="Air Motion Elite Sneaker"
            className="w-48 h-40 object-contain filter drop-shadow-xl transition-all duration-500"
            style={{
              filter: isHovered 
                ? "drop-shadow(0 0 20px rgba(255, 107, 107, 0.5)) brightness(1.1)"
                : "drop-shadow(0 0 10px rgba(0, 0, 0, 0.3)) brightness(1)",
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </div>

        {/* Información del producto */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
          {/* Marca y nombre */}
          <div className="mb-5">
            <p className="text-gray-400 text-base font-medium">
              {sneakerData.brand}
            </p>
            <h3 className="text-white font-bold text-2xl">
              {sneakerData.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-5">
            <div className="flex text-yellow-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 transition-all duration-300"
                  fill={i < Math.floor(sneakerData.rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    animationDelay: `${1 + i * 0.1}s`
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-400 text-base">
              {sneakerData.rating} ({sneakerData.reviews} reviews)
            </span>
          </div>

          {/* Colores disponibles */}
          <div className="flex items-center space-x-3 mb-5">
            <span className="text-gray-400 text-base mr-3">Colores:</span>
            {sneakerData.colors.map((color, index) => (
              <div
                key={color}
                className="w-8 h-8 rounded-full border-2 border-white/20 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-white active:scale-90"
                style={{ 
                  backgroundColor: color,
                  animationDelay: `${1.2 + index * 0.1}s`
                }}
              />
            ))}
          </div>

          {/* Tallas disponibles */}
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-gray-400 text-base mr-3">Tallas:</span>
            {sneakerData.sizes.slice(0, 4).map((size, index) => (
              <div
                key={size}
                className={`w-10 h-10 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center text-sm font-medium ${
                  selectedSize === size 
                    ? 'border-red-500 bg-red-500 text-white' 
                    : 'border-white/20 text-white hover:border-white'
                }`}
                onClick={() => setSelectedSize(size)}
                style={{
                  animationDelay: `${1.4 + index * 0.1}s`
                }}
              >
                {size}
              </div>
            ))}
          </div>

          {/* Precio */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span
                className="text-3xl font-bold transition-colors duration-300"
                style={{ color: isHovered ? "#FF6B6B" : "#FFFFFF" }}
              >
                ${sneakerData.price}
              </span>
              <span className="text-gray-500 line-through text-lg">
                ${sneakerData.originalPrice}
              </span>
            </div>
            
            <div
              className="bg-red-500 text-white px-3 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:rotate-0 hover:scale-110"
              style={{ transform: 'rotate(-12deg)' }}
            >
              -24%
            </div>
          </div>

          {/* Botón Add to Cart */}
          <button
            className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-75 text-lg"
            onClick={handleAddToCart}
            disabled={isAddingToCart || cartAdded}
          >
            <div className="flex items-center justify-center relative z-10">
              {cartAdded ? (
                <>
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ¡Agregado al carrito!
                </>
              ) : isAddingToCart ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3 animate-spin" />
                  Agregando...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18" />
                  </svg>
                  Agregar al carrito
                </>
              )}
            </div>

            {/* Efecto de brillo al hacer hover */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-800"
              style={{
                transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)'
              }}
            />
          </button>
        </div>

        {/* Partículas de carrito */}
        {isAddingToCart && cartParticles.map((particle) => (
          <div
            key={`cart-particle-${particle.id}`}
            className="absolute rounded-full animate-pulse"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              top: "50%",
              left: "50%",
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              transform: `translate(${Math.cos(particle.angle * (Math.PI / 180)) * particle.distance}px, ${Math.sin(particle.angle * (Math.PI / 180)) * particle.distance}px)`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}

        {/* Efecto de resplandor general */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-1000"
          style={{
            background: "radial-gradient(circle at 50% 20%, rgba(255, 107, 107, 0.1), transparent 70%)",
            opacity: isHovered ? 0.3 : 0.1
          }}
        />
      </div>
    </div>
  );
};





export default SneakerCard;