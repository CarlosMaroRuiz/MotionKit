export const sneakerCardJSX = `import React, { useState } from 'react';

const SneakerCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const handleAddToCart = () => {
    if (isAddingToCart || cartAdded) return;
    
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2000);
    }, 1500);
  };

  // Datos del producto (definidos dentro del componente)
  const sneakerData = {
    name: "Air Motion Elite",
    brand: "Motion Sport",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 324,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
  };

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="relative w-80 h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isHovered 
            ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 107, 107, 0.2)"
            : "0 20px 40px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Imagen del producto con animación 3D */}
        <div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 transition-all duration-2000"
          style={{
            transform: isHovered 
              ? 'translateX(-50%) translateY(-10px) rotateY(-15deg) rotateZ(5deg)' 
              : 'translateX(-50%) translateY(-5px) rotateY(0deg) rotateZ(0deg)'
          }}
        >
          {/* Sombra del producto */}
          <div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-md transition-all duration-1000"
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
            className="w-40 h-32 object-contain filter drop-shadow-xl transition-all duration-500"
            style={{
              filter: isHovered 
                ? "drop-shadow(0 0 20px rgba(255, 107, 107, 0.5)) brightness(1.1)"
                : "drop-shadow(0 0 10px rgba(0, 0, 0, 0.3)) brightness(1)",
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </div>

        {/* Información del producto */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-bold text-xl">{sneakerData.name}</h3>
          <p className="text-gray-400 text-sm">{sneakerData.brand}</p>
          
          {/* Rating con estrellas */}
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 transition-all duration-300"
                  fill={i < Math.floor(sneakerData.rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              {sneakerData.rating} ({sneakerData.reviews} reviews)
            </span>
          </div>
          
          {/* Colores disponibles */}
          <div className="flex items-center space-x-2 my-3">
            <span className="text-gray-400 text-sm mr-2">Colores:</span>
            {sneakerData.colors.map((color, index) => (
              <div
                key={color}
                className="w-6 h-6 rounded-full border-2 border-white/20 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-white active:scale-90"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Precio y descuento */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span
                className="text-2xl font-bold transition-colors duration-300"
                style={{ color: isHovered ? "#FF6B6B" : "#FFFFFF" }}
              >
                ${20}
              </span>
              <span className="text-gray-500 line-through text-sm">
                ${15}
              </span>
            </div>
            
            <div
              className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 hover:rotate-0 hover:scale-110"
              style={{ transform: 'rotate(-12deg)' }}
            >
              -24%
            </div>
          </div>

          {/* Botón Add to Cart */}
          <button
            className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-75"
            onClick={handleAddToCart}
            disabled={isAddingToCart || cartAdded}
          >
            <div className="flex items-center justify-center relative z-10">
              {cartAdded ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ¡Agregado al carrito!
                </>
              ) : isAddingToCart ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" />
                  Agregando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>
    </div>
  );
};`;