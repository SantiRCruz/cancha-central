# Cancha Central

Aplicación web de noticias deportivas desarrollada para la entrega final del módulo Front End. La versión actual implementa Angular con componentes independientes, enrutamiento, enlace de datos, formularios, señales y persistencia en `localStorage`.

- Repositorio: https://github.com/SantiRCruz/cancha-central
- Aplicación: https://santircruz.github.io/cancha-central/

## Requisitos

- Node.js 22 o superior.
- npm 10 o superior.

## Ejecutar localmente

```bash
npm ci
npm start
```

Abra `http://localhost:4200` en el navegador. Para generar una compilación de producción ejecute `npm run build`.

## Funcionalidades

- Inicio con noticias destacadas y llamados a la acción.
- Catálogo cargado dinámicamente desde `public/data/noticias.json`.
- Búsqueda y filtros reactivos por categoría.
- Vista de detalle para cada noticia.
- Favoritos guardados de forma persistente con `localStorage`.
- Formulario de contacto con validaciones y confirmación visual.
- Mini CRUD local para crear y eliminar noticias.
- Navegación responsive para escritorio y dispositivos móviles.

## Organización del proyecto

```text
src/app/
├── core/          # Modelos y servicio de noticias
├── pages/         # Componentes de cada página
├── shared/        # Tarjeta de noticia reutilizable
├── app.routes.ts  # Rutas con carga diferida
└── app.ts         # Componente raíz
public/
├── assets/        # Fotografías locales
└── data/          # Catálogo JSON
```

Los archivos HTML, CSS y JavaScript de la Entrega 2 se mantienen en la raíz como evidencia de la evolución del prototipo. La aplicación final se encuentra en `src/` y se despliega automáticamente mediante GitHub Actions.

## Despliegue

Cada cambio enviado a `main` ejecuta el flujo `.github/workflows/deploy-pages.yml`. Este instala las dependencias, compila Angular con la ruta base del repositorio y publica la carpeta resultante en GitHub Pages.

## Imágenes

Las fotografías de las noticias están almacenadas localmente en `public/assets/`. Sus fuentes se documentan en el archivo académico de la entrega.
