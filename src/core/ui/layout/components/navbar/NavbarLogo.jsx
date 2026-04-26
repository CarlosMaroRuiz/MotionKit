import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logoVariants, logoContainerVariants, logoTextVariants } from './utils/animations';

const NavbarLogo = () => {
  return (
    <motion.div 
      className="flex-shrink-0"
      variants={logoVariants}
      initial="initial"
      whileHover="hover"
    >
      <div className="flex items-center">
        <motion.div
          className="h-9 w-9 rounded-lg overflow-hidden mr-2 purple-glow"
          variants={logoContainerVariants}
          whileHover="hover"
        >
          <img src="/img/logo.png" alt="Motion Kit logo" className="h-full w-full object-cover" />
        </motion.div>
        <NavLink to="/" className="text-xl font-bold text-white hover:text-purple-300 transition-colors duration-300">
          <motion.span 
            variants={logoTextVariants}
            whileHover="hover"
          >
            Motion Kit
          </motion.span>
        </NavLink>
      </div>
    </motion.div>
  );
};

export default NavbarLogo;