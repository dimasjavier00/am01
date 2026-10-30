# Automarket

Marketplace de vehículos para Honduras: conecta a compradores con vendedores particulares y concesionarios.

**Versión 2.0 (remake):** frontend completo y funcional como prototipo, siguiendo el *Manual de Identidad Corporativa* de Automarket. Todavía no hay backend: la sesión, los favoritos y el inventario del vendedor se guardan en el navegador (`localStorage`).

Sitio: https://am01.pages.dev

## Páginas

| Ruta | Descripción |
| --- | --- |
| `/` | Portada: buscador, categorías, destacados, cómo funciona, beneficios |
| `/vehiculos/` | Catálogo con filtros (marca, tipo, precio, año, combustible, transmisión, ciudad, permuta), orden y vista cuadrícula/lista |
| `/vehiculos/[id]/` | Ficha: especificaciones, equipamiento, calculadora de cuota, contacto y WhatsApp |
| `/favoritos/` | Vehículos guardados |
| `/planes/` | Planes Básico, Profesional y Concesionario, comparativa y preguntas frecuentes |
| `/vender/` | Página para vendedores |
| `/login/`, `/registro/` | Acceso con validación y **cuenta demo** |
| `/panel/` | Panel de vendedor: resumen, inventario, publicar (4 pasos con fotos), reportes y compartir inventario |
| `/inventario/[vendedor]/` | Inventario público y compartible de un vendedor |
| `/marca/` | Identidad de marca aplicada a la web |

> Para probar el panel: `/login/?demo=1`. En el menú de usuario del panel está *Restablecer datos demo*.

## Stack

- [Astro 5](https://astro.build) (sitio estático) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) con los tokens de marca en `src/styles/global.css`
- Tipografías: Open Sans (títulos), Roboto Condensed (subtítulos), Roboto (texto)
- Colores: azul acua `#129FB1`, gris `#414141`, fucsia `#C5299B`, azul marino `#001A70`, aguamarina `#2CCCD3`

## Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run check    # revisión de tipos
```

Requiere Node 20.3 o superior. Cloudflare Pages compila con `npm run build` y publica `dist/`.

Fotos de vehículos: [Unsplash](https://unsplash.com) (licencia Unsplash).
