export const getButtonStyles = (variant) => {
  switch(variant) {
    case "gradient":
      return "bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 shadow-purple-900/30 text-white";
    case "secondary":
      return "bg-gray-800/70 text-gray-300 border border-purple-900/20 backdrop-blur-sm shadow-indigo-900/30";
    case "outline":
      return "bg-transparent text-purple-400 border border-purple-500/50 hover:bg-purple-900/20";
    default:
      return "bg-gray-800 text-white";
  }
};

export const getHoverShadow = (variant) => {
  if (variant === "gradient") return "0 0 35px rgba(147, 51, 234, 0.7)";
  if (variant === "secondary") return "0 0 25px rgba(99, 102, 241, 0.5)";
  return "0 0 15px rgba(168, 85, 247, 0.4)";
};
