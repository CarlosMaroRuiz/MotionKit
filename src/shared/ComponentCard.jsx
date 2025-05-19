import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ComponentCard = ({ 
  title, 
  description,
  component, 
  jsxCode, 
  animationCode 
}) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  
  // Animaciones simplificadas
  const tabVariants = {
    inactive: { 
      opacity: 0.7,
      color: "#9CA3AF"
    },
    active: { 
      opacity: 1,
      color: "#C084FC"
    },
    hover: {
      opacity: 1
    }
  };

  const contentVariants = {
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    enter: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        delay: 0.1
      }
    }
  };
  
  // Función para copiar al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Renderiza el contenido según la pestaña activa
  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        {activeTab === 'preview' && (
          <motion.div 
            key="preview"
            variants={contentVariants}
            initial="exit"
            animate="enter"
            exit="exit"
            className="relative"
          >
            <div className="p-3 sm:p-5 md:p-8 bg-gray-900/50 rounded-lg flex items-center justify-center min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
              {component}
            </div>
          </motion.div>
        )}
        
        {activeTab === 'jsx' && (
          <motion.div 
            key="jsx"
            className="relative"
            variants={contentVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <button
              className={`absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-md z-10 flex items-center gap-1 border ${
                copied ? 'bg-green-600 text-white border-green-500' : 'bg-gray-800 text-gray-300 border-gray-700'
              } transition-colors duration-200`}
              onClick={() => copyToClipboard(jsxCode)}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-xs">¡Copiado!</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  <span className="text-xs sm:text-xs">Copiar</span>
                </>
              )}
            </button>
            <div className="rounded-lg overflow-hidden border border-gray-800">
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  marginTop: 0,
                  marginBottom: 0,
                  backgroundColor: 'rgba(17, 24, 39, 0.7)',
                  fontSize: '12px',
                  '@media (min-width: 640px)': {
                    fontSize: '14px'
                  }
                }}
                showLineNumbers={true}
                wrapLines={true}
                lineProps={{
                  style: {
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap'
                  }
                }}
              >
                {jsxCode}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'js' && (
          <motion.div 
            key="js"
            className="relative"
            variants={contentVariants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <button
              className={`absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-md z-10 flex items-center gap-1 border ${
                copied ? 'bg-green-600 text-white border-green-500' : 'bg-gray-800 text-gray-300 border-gray-700'
              } transition-colors duration-200`}
              onClick={() => copyToClipboard(animationCode)}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-xs">¡Copiado!</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  <span className="text-xs sm:text-xs">Copiar</span>
                </>
              )}
            </button>
            <div className="rounded-lg overflow-hidden border border-gray-800">
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  marginTop: 0,
                  marginBottom: 0,
                  backgroundColor: 'rgba(17, 24, 39, 0.7)',
                  fontSize: '12px',
                  '@media (min-width: 640px)': {
                    fontSize: '14px'
                  }
                }}
                showLineNumbers={true}
                wrapLines={true}
                lineProps={{
                  style: {
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap'
                  }
                }}
              >
                {animationCode}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Indicador de la pestaña activa simplificado
  const ActiveTabIndicator = () => (
    <motion.div 
      className="absolute bottom-0 h-0.5 bg-purple-500"
      layoutId="activeTabIndicator"
      style={{
        width: "100%"
      }}
    />
  );

  return (
    <div className="w-full bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-lg mb-6 sm:mb-8">
      {/* Header */}
      <div className="border-b border-gray-800 p-3 sm:p-4 md:p-5">
        <h3 className="text-lg sm:text-xl text-white font-medium mb-1 sm:mb-2">{title}</h3>
        {description && (
          <p className="text-gray-400 text-xs sm:text-sm">{description}</p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-800 relative scrollbar-hide">
        {["preview", "jsx", "js"].map((tab) => (
          <motion.button
            key={tab}
            className={`px-3 py-2 sm:px-4 md:px-5 sm:py-3 text-xs sm:text-sm font-medium relative flex-shrink-0 ${activeTab === tab ? 'text-purple-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab(tab)}
            variants={tabVariants}
            initial="inactive"
            animate={activeTab === tab ? 'active' : 'inactive'}
            whileHover="hover"
          >
            <div className="flex items-center gap-1 sm:gap-2">
              {tab === 'preview' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              )}
              {tab === 'jsx' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
              {tab === 'js' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              )}
              <span className="whitespace-nowrap">
                {tab === 'preview' ? 'Vista previa' : 
                  tab === 'jsx' ? 'JSX / HTML' : 
                  'Animaciones JS'}
              </span>
            </div>
            
            {activeTab === tab && <ActiveTabIndicator />}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5">
        {renderContent()}
      </div>
    </div>
  );
};

export default ComponentCard;