import React from 'react';
import InfoCard from '../InfoCard';
import CodeExample from '../CodeExample';
import { codeExamples } from '../../data/codeExamples';

const ComponentExampleSection = () => (
  <InfoCard 
    title="Ejemplo de Componente" 
    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>}
    delay={0.6}
  >
    <p>Un ejemplo de cómo estructurar un componente:</p>
    
    <h4 className="text-white font-medium mt-4 mb-2">SubmitButton.jsx</h4>
    <CodeExample 
      language="jsx"
      code={codeExamples.submitButton} 
    />
    
    <h4 className="text-white font-medium mt-4 mb-2">animations.js</h4>
    <CodeExample 
      language="javascript"
      code={codeExamples.animations} 
    />
  </InfoCard>
);

export default ComponentExampleSection;