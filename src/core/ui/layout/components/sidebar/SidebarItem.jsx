import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { linkVariants, itemHoverVariants, iconVariants, badgeVariants } from './utils/animations';

const SidebarItem = ({ item, index }) => {
  return (
    <motion.div
      key={item.path}
      variants={linkVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay: index * 0.05 }}
    >
      <NavLink 
        to={item.path} 
        end={item.end}
        className={({isActive}) => 
          isActive 
            ? "flex items-center px-3 py-2 text-sm font-medium text-white rounded-lg bg-purple-800 bg-opacity-50" 
            : "flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-purple-800 hover:bg-opacity-30 transition-colors"
        }
      >
        {({ isActive }) => (
          <motion.div 
            className="flex items-center w-full"
            variants={itemHoverVariants}
            whileHover="hover"
            animate={isActive ? "active" : "initial"}
          >
            <motion.span 
              className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`}
              variants={iconVariants}
              whileHover="hover"
            >
              {item.icon}
            </motion.span>

            {item.badge ? (
              <div className="flex items-center justify-between w-full">
                <span>{item.label}</span>
                <motion.span 
                  className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                    item.badge.color === 'purple' 
                      ? 'bg-purple-800 text-purple-200' 
                      : 'bg-green-900 text-green-200'
                  }`}
                  whileHover={
                    item.badge.color === 'purple' 
                      ? "hover" 
                      : "hoverGreen"
                  }
                  variants={badgeVariants}
                >
                  {item.badge.text}
                </motion.span>
              </div>
            ) : (
              <span>{item.label}</span>
            )}
          </motion.div>
        )}
      </NavLink>
    </motion.div>
  );
};

export default SidebarItem;