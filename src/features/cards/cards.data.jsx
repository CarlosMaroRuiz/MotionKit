import { 
  FlipCard, 
  ExpandableCard,
  SneakerCard,
  flipCardJSX,
  flipCardJS,
  expandableCardJSX,
  expandableCardJS,
  sneakerCardJSX,
  sneakerCardJS
} from './components';

export const CARDS_COLLECTION = [
  {
    id: "sneaker-card",
    title: "Card de Producto Premium para Tenis",
    description: "Una impresionante card de producto para tenis con animaciones 3D, efectos de partículas de velocidad, explosiones de carrito y interacciones avanzadas de e-commerce.",
    component: <SneakerCard />,
    jsxCode: sneakerCardJSX,
    animationCode: sneakerCardJS
  },
  {
    id: "flip-card",
    title: "Card con Efecto Flip 3D",
    description: "Una card interactiva que se voltea en 3D para revelar contenido adicional. Incluye animaciones de partículas y efectos de hover suaves.",
    component: <FlipCard />,
    jsxCode: flipCardJSX,
    animationCode: flipCardJS
  },
  {
    id: "expandable-card",
    title: "Card Expandible con Partículas",
    description: "Card que se expande dinámicamente mostrando contenido adicional con efectos de partículas, ondas de expansión y animaciones fluidas.",
    component: <ExpandableCard />,
    jsxCode: expandableCardJSX,
    animationCode: expandableCardJS
  }
];
