import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Footer from './components/Footer';
import "./style.css";
import Bubble from './components/bublee';
import OutletWrapper from '../../shared/OutletWrapper';

function Layout() {
  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/examples', label: 'Ejemplos' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0118] text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/10 z-0"></div>
        <div className="absolute inset-0 bg-grid opacity-10 z-0"></div>
        <Bubble />
      </div>
      
      <Navbar navItems={navItems} />
      
      <div className="flex flex-1 pt-16 relative z-10">
        <Sidebar />
        <motion.main
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Layout responsivo: cambia padding lateral cuando el ancho es menor a 961px */}
          <div className="w-full py-8 pl-64 pr-10 max-[961px]:pl-5 max-[961px]:pr-3">
            <OutletWrapper />
          </div>
        </motion.main>
      </div>
      
      <Footer />
    </div>
  );
}

export default Layout;
