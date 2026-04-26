import { 
  ParticleButton, 
  MorphButton, 
  MagneticButton,
  DeleteButton,
  SubmitButton,
  particleButtonJSX,
  particleButtonJS,
  morphButtonJSX,
  morphButtonJS,
  magneticButtonJSX,
  magneticButtonJS,
  deleteButtonJSX,
  deleteButtonJS,
  submitButtonJSX,
  submitButtonJS
} from './components';

export const BUTTONS_COLLECTION = [
  {
    id: "submit-button",
    title: "Botón de Enviar Formulario",
    description: "Botón interactivo para formularios con estados de carga, éxito y error. Proporciona feedback visual del estado del envío.",
    component: <SubmitButton />,
    jsxCode: submitButtonJSX,
    animationCode: submitButtonJS
  },
  {
    id: "delete-button",
    title: "Botón de Eliminación con Efectos Avanzados",
    description: "Un impresionante botón de eliminar con múltiples estados, confirmación visual, efectos de partículas y desintegración.",
    component: <DeleteButton />,
    jsxCode: deleteButtonJSX,
    animationCode: deleteButtonJS
  },
  {
    id: "particle-button",
    title: "Botón con Explosión de Partículas",
    description: "Un botón que dispara partículas coloridas cuando se hace clic en él, creando un efecto visual impactante.",
    component: <ParticleButton />,
    jsxCode: particleButtonJSX,
    animationCode: particleButtonJS
  },
  {
    id: "morph-button",
    title: "Botón con Transformación Morfológica",
    description: "Este botón cambia su forma, color y contenido al hacer clic, con animaciones fluidas de transformación.",
    component: <MorphButton />,
    jsxCode: morphButtonJSX,
    animationCode: morphButtonJS
  },
  {
    id: "magnetic-button",
    title: "Botón con Efecto Magnético",
    description: "Un botón que reacciona a la posición del cursor, creando un efecto magnético que sigue el movimiento del mouse.",
    component: <MagneticButton />,
    jsxCode: magneticButtonJSX,
    animationCode: magneticButtonJS
  }
];
