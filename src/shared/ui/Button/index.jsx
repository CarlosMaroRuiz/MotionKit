import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getButtonStyles, getHoverShadow } from './utils/styleUtils';

const Button = ({
  children,
  href,
  onClick,
  className = "",
  variant = "gradient", // 'gradient', 'secondary', 'outline'
  isExternal = false,
  starEffect = false,
  delay = 0,
  ...props
}) => {
  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { delay, duration: 0.5, type: "spring", stiffness: 500, damping: 25 }
    },
    hover: {
      scale: 1.05, y: -5,
      boxShadow: getHoverShadow(variant),
      transition: { duration: 0.2, type: "spring", stiffness: 500 }
    },
    tap: {
      scale: 0.97, y: 0,
      boxShadow: "0 0 10px rgba(147, 51, 234, 0.3)",
    }
  };

  const content = (
    <motion.div
      className={`w-full sm:w-auto px-8 py-4 rounded-full font-medium shadow-lg font-inter relative overflow-hidden flex justify-center items-center cursor-pointer ${getButtonStyles(variant)} ${className}`}
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {/* Stars effect for gradient buttons */}
      {starEffect && variant === "gradient" && (
        <AnimatePresence>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/80"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0 }}
              exit={{ 
                opacity: [0, 0.8, 0], scale: [0, 1.5, 0],
                x: [(i % 2 === 0 ? 10 : -10) * Math.random() * 3, (i % 2 === 0 ? 30 : -30) * Math.random() * 3],
                y: [-5, -20 * Math.random() * 3],
              }}
              transition={{ duration: 0.8 + Math.random() * 0.5 }}
              style={{ left: `${35 + i * 5}%`, top: '80%' }}
            />
          ))}
        </AnimatePresence>
      )}

      {/* Glow sweep effect for gradient buttons */}
      {variant === "gradient" && (
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/30 to-purple-600/0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.85 }}
          whileHover={{ opacity: 1, scale: 1.05, x: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.div>
  );

  if (!href) {
    return <div onClick={onClick} className="w-full sm:w-auto appearance-none inline-block">{content}</div>;
  }

  if (isExternal || href.startsWith("http")) {
    return <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-block">{content}</a>;
  }

  return <Link to={href} onClick={onClick} className="w-full sm:w-auto inline-block">{content}</Link>;
};

export default Button;
