import React from 'react';
import InfoCard from '../InfoCard';
import FileStructure from '../FileStructure';
import { fileStructureData } from '../../data/fileStructure';

const FileStructureSection = () => (
  <InfoCard 
    title="Estructura de Archivos" 
    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>}
    delay={0.4}
  >
    <p className="text-sm sm:text-base">Recomendamos la siguiente estructura para organizar tus componentes:</p>
    
    <div className="mt-3 sm:mt-4 mb-2 overflow-x-auto max-w-full">
      <div className="min-w-[320px]">
        <FileStructure items={fileStructureData} />
      </div>
    </div>
    
    <p className="mt-3 sm:mt-4 text-sm sm:text-base">Cada componente puede tener:</p>
    <ul className="list-disc pl-4 sm:pl-5 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1 text-sm sm:text-base">
      <li><span className="text-white font-mono text-xs sm:text-sm">ComponentName.jsx</span> - Componente principal</li>
      <li><span className="text-white font-mono text-xs sm:text-sm">animations.js</span> - Configuraciones de animación</li>
      <li><span className="text-white font-mono text-xs sm:text-sm">index.js</span> - Exportaciones</li>
    </ul>
  </InfoCard>
);

export default FileStructureSection;