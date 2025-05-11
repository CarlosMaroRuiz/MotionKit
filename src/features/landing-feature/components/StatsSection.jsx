import React from 'react';
import StatItem from './StatItem';

const StatsSection = () => {
  const stats = [
    { value: 200, label: "Componentes", index: 0 },
    { value: 40, label: "Animaciones", index: 1 },
    { value: 12, label: "Plantillas", index: 2 }
  ];
  
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 lg:gap-16">
      {stats.map((stat) => (
        <StatItem 
          key={stat.index}
          value={stat.value}
          label={stat.label}
          index={stat.index}
        />
      ))}
    </div>
  );
};

export default StatsSection;