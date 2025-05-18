import React from 'react';

const Logo = () => (
  <div className="flex items-center">
    <div className="bg-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    </div>
    <span className="text-white text-2xl font-semibold">Motion Kit</span>
  </div>
);

export default Logo;