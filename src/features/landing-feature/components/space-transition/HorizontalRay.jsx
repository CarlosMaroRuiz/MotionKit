import React from 'react';
import { motion } from 'framer-motion';
import RayParticles from './RayParticles';
import GlowOrb from './GlowOrb';
import EnergyWaves from './EnergyWaves';

const HorizontalRay = () => {
  return (
    <>
      {/* Núcleo del rayo - Parte central */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-25"
        style={{
          height: 8,
          borderRadius: "4px"
        }}
        animate={{
          width: [0, 5000],
          opacity: [0, 1, 0.8, 0],
          boxShadow: [
            "0 0 0px rgba(255, 255, 255, 0)",
            "0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.8), 0 0 90px rgba(168, 85, 247, 0.7)",
            "0 0 40px rgba(255, 255, 255, 0.9), 0 0 80px rgba(255, 255, 255, 0.7), 0 0 120px rgba(168, 85, 247, 0.6)",
            "0 0 0px rgba(255, 255, 255, 0)"
          ]
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          times: [0, 0.3, 0.7, 1]
        }}
      />
      
      {/* Capa superior del rayo - Más delgada y brillante */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-26"
        style={{
          height: 4,
          marginTop: -2,
          borderRadius: "2px"
        }}
        animate={{
          width: [0, 6000],
          opacity: [0, 1, 0.9, 0],
          boxShadow: [
            "0 0 0px rgba(255, 255, 255, 0)",
            "0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)",
            "0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.7)",
            "0 0 0px rgba(255, 255, 255, 0)"
          ]
        }}
        transition={{
          duration: 1.3,
          ease: "easeOut",
          times: [0, 0.2, 0.6, 1]
        }}
      />
      
      {/* Capa inferior del rayo - Morada para efecto de energía */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 z-24"
        style={{
          height: 12,
          marginTop: 1,
          borderRadius: "6px"
        }}
        animate={{
          width: [0, 4800],
          opacity: [0, 0.9, 0.7, 0],
          boxShadow: [
            "0 0 0px rgba(168, 85, 247, 0)",
            "0 0 30px rgba(168, 85, 247, 0.9), 0 0 60px rgba(168, 85, 247, 0.7)",
            "0 0 40px rgba(168, 85, 247, 0.8), 0 0 80px rgba(168, 85, 247, 0.6)",
            "0 0 0px rgba(168, 85, 247, 0)"
          ]
        }}
        transition={{
          duration: 1.1,
          ease: "easeOut",
          times: [0, 0.3, 0.7, 1]
        }}
      />
      
      {/* Haz difuso - Crea el efecto de resplandor ancho */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-23"
        style={{
          height: 30,
          marginTop: -8,
          borderRadius: "15px",
          filter: "blur(8px)"
        }}
        animate={{
          width: [0, 5500],
          opacity: [0, 0.4, 0.3, 0],
        }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
          times: [0, 0.3, 0.7, 1]
        }}
      />
      
      {/* Partículas que salen del rayo */}
      <RayParticles count={20} />
      
      {/* Orbe de energía en el centro */}
      <GlowOrb />
      
      {/* Ondas de energía horizontales */}
      <EnergyWaves />
    </>
  );
};

export default HorizontalRay;