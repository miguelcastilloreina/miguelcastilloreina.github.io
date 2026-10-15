// @ts-check
import { defineConfig } from 'astro/config';

// Cambia `site` cuando tengas dominio propio (por ejemplo 'https://castilloreina.com').
export default defineConfig({
  site: 'https://miguelcastilloreina.github.io',
  base: '/',
  trailingSlash: 'ignore',
  // La antigua página del CV ahora forma parte de About / Sobre mí.
  redirects: {
    '/cv': '/about',
    '/es/cv': '/es/sobre-mi',
  },
});
