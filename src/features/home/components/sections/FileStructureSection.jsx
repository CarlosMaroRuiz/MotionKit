import React from 'react';
import InfoCard from '../InfoCard';
import FileStructure from '../FileStructure';
import { fileStructureData } from '../../data/fileStructure';

const FileStructureSection = () => (
  <InfoCard 
    title="Estructura de Archivos" 
    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>}
    delay={0.4}
  >
    <p>Recomendamos la siguiente estructura para organizar tus componentes:</p>
    
    <div className="mt-4 mb-2">
      <FileStructure items={fileStructureData} />
    </div>
    
    <p className="mt-4">Cada componente puede tener:</p>
    <ul className="list-disc pl-5 mt-2 space-y-1">
      <li><span className="text-white font-mono">ComponentName.jsx</span> - Componente principal</li>
      <li><span className="text-white font-mono">animations.js</span> - Configuraciones de animación</li>
      <li><span className="text-white font-mono">index.js</span> - Exportaciones</li>
    </ul>
  </InfoCard>
);

export default FileStructureSection;