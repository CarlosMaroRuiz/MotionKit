/**
 * Colección de gradientes predefinidos para el sistema planetario
 */

// Gradientes para la base del planeta
export const PLANET_BASE_GRADIENTS = {
  purple: "radial-gradient(circle at 30% 30%, rgba(214, 160, 255, 1) 5%, rgba(191, 128, 252, 0.9) 20%, rgba(88, 28, 135, 0.9) 60%, rgba(76, 29, 149, 1) 90%)",
  blue: "radial-gradient(circle at 30% 30%, rgba(165, 180, 252, 1) 5%, rgba(129, 140, 248, 0.9) 20%, rgba(67, 56, 202, 0.9) 60%, rgba(55, 48, 163, 1) 90%)",
  teal: "radial-gradient(circle at 30% 30%, rgba(153, 246, 228, 1) 5%, rgba(94, 234, 212, 0.9) 20%, rgba(45, 212, 191, 0.9) 60%, rgba(20, 184, 166, 1) 90%)",
  pink: "radial-gradient(circle at 30% 30%, rgba(251, 207, 232, 1) 5%, rgba(244, 114, 182, 0.9) 20%, rgba(236, 72, 153, 0.9) 60%, rgba(219, 39, 119, 1) 90%)"
};

// Gradientes para la superficie animada del planeta
export const PLANET_SURFACE_GRADIENTS = {
  purple: [
    "radial-gradient(circle at 30% 30%, rgba(188, 153, 255, 0.6) 0%, rgba(67, 56, 202, 0.7) 50%, rgba(55, 48, 163, 0.9) 75%, rgba(49, 40, 95, 0.95) 95%)",
    "radial-gradient(circle at 35% 35%, rgba(178, 147, 252, 0.6) 0%, rgba(79, 70, 229, 0.7) 50%, rgba(67, 56, 202, 0.9) 75%, rgba(49, 40, 95, 0.95) 95%)",
    "radial-gradient(circle at 40% 25%, rgba(168, 138, 245, 0.6) 0%, rgba(79, 70, 229, 0.7) 50%, rgba(88, 28, 135, 0.9) 75%, rgba(49, 40, 95, 0.95) 95%)",
    "radial-gradient(circle at 30% 30%, rgba(188, 153, 255, 0.6) 0%, rgba(67, 56, 202, 0.7) 50%, rgba(55, 48, 163, 0.9) 75%, rgba(49, 40, 95, 0.95) 95%)"
  ],
  blue: [
    "radial-gradient(circle at 30% 30%, rgba(165, 180, 252, 0.6) 0%, rgba(99, 102, 241, 0.7) 50%, rgba(79, 70, 229, 0.9) 75%, rgba(55, 48, 163, 0.95) 95%)",
    "radial-gradient(circle at 35% 35%, rgba(129, 140, 248, 0.6) 0%, rgba(99, 102, 241, 0.7) 50%, rgba(79, 70, 229, 0.9) 75%, rgba(55, 48, 163, 0.95) 95%)",
    "radial-gradient(circle at 40% 25%, rgba(99, 102, 241, 0.6) 0%, rgba(79, 70, 229, 0.7) 50%, rgba(67, 56, 202, 0.9) 75%, rgba(55, 48, 163, 0.95) 95%)",
    "radial-gradient(circle at 30% 30%, rgba(165, 180, 252, 0.6) 0%, rgba(99, 102, 241, 0.7) 50%, rgba(79, 70, 229, 0.9) 75%, rgba(55, 48, 163, 0.95) 95%)"
  ]
};

// Gradientes para las lunas
export const MOON_GRADIENTS = [
  'radial-gradient(circle at 30% 30%, rgba(248, 250, 252, 0.95), rgba(226, 232, 240, 0.85))',
  'radial-gradient(circle at 30% 30%, rgba(240, 240, 245, 0.95), rgba(203, 213, 225, 0.85))',
  'radial-gradient(circle at 25% 25%, rgba(238, 240, 255, 0.95), rgba(200, 215, 235, 0.85))',
  'radial-gradient(circle at 35% 35%, rgba(250, 245, 255, 0.95), rgba(233, 213, 255, 0.85))'
];

// Funciones para generar gradientes
export const createHighlightGradient = (position = "25% 25%", color = "255, 255, 255", opacity = 0.45) => {
  return `radial-gradient(circle at ${position}, rgba(${color}, ${opacity}) 0%, rgba(${color}, ${opacity * 0.5}) 25%, transparent 50%)`;
};

export const createShadowGradient = (angle = "120deg", opacity = 0.6) => {
  return `linear-gradient(${angle}, transparent 30%, rgba(0, 0, 0, ${opacity}) 80%, rgba(0, 0, 0, ${opacity + 0.1}) 95%)`;
};