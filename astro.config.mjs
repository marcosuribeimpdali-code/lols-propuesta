// @ts-check
import { defineConfig } from 'astro/config';

// Sitio 100% estático: el hosting (cPanel compartido) solo sirve archivos.
// Las rutas terminan en "/" para calzar con las URLs que Google ya tiene indexadas de lols.cl
// (/quienes-somos/, /nuestros-servicios/, …) y no tener que redirigirlas al migrar.
export default defineConfig({
  site: 'https://new.lols.cl',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
