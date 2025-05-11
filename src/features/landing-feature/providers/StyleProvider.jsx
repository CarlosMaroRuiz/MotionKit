import React from 'react';

const StyleProvider = ({ children }) => {
  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap');
    
    .font-poppins {
      font-family: 'Poppins', sans-serif;
    }
    
    .font-inter {
      font-family: 'Inter', sans-serif;
    }
    
    /* Estilos para efectos de neón */
    .neon-purple {
      color: #ffffff; /* texto blanco */
      text-shadow: 0 0 5px rgba(168, 85, 247, 0.5), 
                   0 0 10px rgba(168, 85, 247, 0.3), 
                   0 0 15px rgba(168, 85, 247, 0.1);
    }
    
    .gradient-text {
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient(to right, #c084fc, #e879f9, #c084fc);
      background-size: 200% auto;
      animation: shine 3s linear infinite;
    }
    
    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
    
    .floating {
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    /* Efecto de brillo para estrellas */
    .star-glow {
      filter: blur(1px);
      box-shadow: 0 0 8px #fff, 0 0 12px rgba(168, 85, 247, 0.7);
    }
    
    /* Anillos de planeta */
    .planet-ring {
      transform-style: preserve-3d;
      transform: rotateX(75deg);
    }
  `;

  return (
    <>
      <style>{fontStyles}</style>
      {children}
    </>
  );
};

export default StyleProvider;