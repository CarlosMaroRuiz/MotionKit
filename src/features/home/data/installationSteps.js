export const installationSteps = [
  {
    number: "01",
    title: "Instalar Tailwind CSS",
    description: "Instala tailwindcss y @tailwindcss/vite mediante npm.",
    code: "npm install tailwindcss @tailwindcss/vite"
  },
  {
    number: "02",
    title: "Configurar el plugin de Vite",
    description: "Añade el plugin @tailwindcss/vite a tu configuración de Vite.",
    code: `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})`,
    language: "javascript"
  },
  {
    number: "03",
    title: "Importar Tailwind CSS",
    description: "Añade un @import a tu archivo CSS que importe Tailwind CSS.",
    code: "@import tailwindcss;",
    language: "css"
  },
  {
    number: "04",
    title: "Iniciar el proceso de construcción",
    description: "Ejecuta el proceso de construcción con npm run dev o el comando configurado en tu package.json.",
    code: "npm run dev"
  },
  {
    number: "05",
    title: "Comenzar a usar Tailwind en tu HTML",
    description: "Asegúrate de que tu CSS compilado esté incluido en el head y comienza a usar las clases de utilidad de Tailwind.",
    code: `<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/styles.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>`,
    language: "html"
  }
];