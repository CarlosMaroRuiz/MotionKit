import React from 'react';
import { motion } from 'framer-motion';
import CodeExample from './CodeExample';

const InstallationStep = ({ number, title, description, code, language, delay = 0 }) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: delay,
      duration: 0.5
    }}
  >
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="bg-purple-700 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-3">{description}</p>
        {code && (
          <CodeExample code={code} language={language || "bash"} />
        )}
      </div>
    </div>
    {number < 5 && (
      <div className="ml-5 pl-4 border-l border-gray-700 h-8"></div>
    )}
  </motion.div>
);

export default InstallationStep;