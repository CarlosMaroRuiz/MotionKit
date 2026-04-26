import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, X, ArrowRight, Command } from 'lucide-react';
import { useSearchStore } from '../../store/useSearchStore';
import { globalSearchIndex } from '../index';

const fuse = new Fuse(globalSearchIndex, {
  keys: ['title', 'tags', 'category', 'description'],
  threshold: 0.3,
  includeMatches: true
});

const SearchModal = () => {
  const { isOpen, closeSearch, toggleSearch } = useSearchStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(globalSearchIndex);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Escuchar atajo de teclado Ctrl+K o Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        closeSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleSearch, closeSearch]);

  // Enfocar input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults(globalSearchIndex);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Realizar búsqueda
  useEffect(() => {
    if (query.trim() === '') {
      setResults(globalSearchIndex);
    } else {
      const searchResults = fuse.search(query).map(result => result.item);
      setResults(searchResults);
    }
    setSelectedIndex(0);
  }, [query]);

  // Navegación por teclado dentro del modal
  useEffect(() => {
    if (!isOpen) return;

    const handleNavigation = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item) => {
    closeSearch();
    navigate(item.path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
          {/* Overlay oscuro con blur */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
          />

          {/* Modal */}
          <motion.div 
            className="relative w-full max-w-2xl bg-[#110524] border border-purple-500/30 rounded-2xl shadow-[0_0_50px_rgba(147,51,234,0.15)] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Barra de búsqueda */}
            <div className="flex items-center px-4 py-4 border-b border-purple-500/20 bg-[#150a2e]">
              <Search className="w-5 h-5 text-purple-400 mr-3" />
              <input 
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-purple-300/40"
                placeholder="Buscar componentes, animaciones..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={closeSearch} className="p-1 rounded-md hover:bg-purple-500/20 text-purple-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resultados */}
            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
              {results.length === 0 ? (
                <div className="py-12 text-center text-purple-300/50">
                  <p>No se encontraron componentes para "{query}"</p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {results.map((item, index) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSelect(item)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 ${
                          selectedIndex === index 
                            ? 'bg-purple-600/20 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                            : 'hover:bg-purple-900/10 border border-transparent'
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{item.title}</span>
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/50">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm text-purple-200/60 mt-1">{item.description}</p>
                        </div>
                        {selectedIndex === index && (
                          <ArrowRight className="w-5 h-5 text-purple-400" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer con atajos */}
            <div className="px-4 py-3 border-t border-purple-500/20 bg-[#0c031c] flex items-center justify-between text-xs text-purple-300/50">
              <div className="flex items-center space-x-4">
                <span className="flex items-center"><Command className="w-3 h-3 mr-1"/> K</span>
                <span className="flex items-center">↑ ↓ para navegar</span>
                <span className="flex items-center">↵ para seleccionar</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
