import { buttonRegistry } from './buttons';
import { cardRegistry } from './cards';
import { alertRegistry } from './alerts';

// Agrupamos todos los registros individuales en un único índice central
export const globalSearchIndex = [
  ...buttonRegistry,
  ...cardRegistry,
  ...alertRegistry,
  // A medida que crees nuevas carpetas, simplemente expórtalas e impórtalas aquí
];

// Opcional: También podemos exportar un objeto agrupado por categoría si la UI del buscador lo necesita
export const groupedSearchIndex = {
  Buttons: buttonRegistry,
  Cards: cardRegistry,
  Alerts: alertRegistry
};
