import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import "./style.css";
import Bubble from './components/bublee';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0118] text-gray-100 relative overflow-hidden">
      
    
      <div className="absolute inset-0 overflow-hidden">
     
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/10 z-0"></div>
      
        <div className="absolute inset-0 bg-grid opacity-10 z-0"></div>
      
        <Bubble/>
      </div>
      

      <Navbar />
   
      <div className="flex flex-1 pt-16 relative z-10">
        <Sidebar />
        <motion.main 
          className="flex-1 md:ml-72 px-4 md:px-6 lg:px-8 pb-16" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-7xl mx-auto py-8">
            <Outlet />
          </div>
        </motion.main>
      </div>
      
 
      <Footer />
    </div>
  );
}

export default Layout;
