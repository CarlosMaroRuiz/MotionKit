import React from 'react';
import InfoCard from '../InfoCard';
import CodeExample from '../CodeExample';
import { codeExamples } from '../../data/codeExamples';

const ComponentExampleSection = () => (
  <InfoCard 
    title="Ejemplo de Componente" 
    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>}
    delay={0.6}
  >
    <p className="text-sm sm:text-base">Un ejemplo de cómo estructurar un componente:</p>
    
    <h4 className="text-white font-medium mt-3 sm:mt-4 mb-1 sm:mb-2 text-sm sm:text-base">SubmitButton.jsx</h4>
    <div className="overflow-x-auto">
      <CodeExample 
        language="jsx"
        code={codeExamples.submitButton} 
      />
    </div>
    
    <h4 className="text-white font-medium mt-4 sm:mt-6 mb-1 sm:mb-2 text-sm sm:text-base">animations.js</h4>
    <div className="overflow-x-auto">
      <CodeExample 
        language="javascript"
        code={codeExamples.animations} 
      />
    </div>
  </InfoCard>
);

export default ComponentExampleSection;