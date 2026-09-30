// Archivos para descargar desde el sitio. Se generan con scripts/descargas.mjs (ver ahí cómo) y
// viven en public/. El peso se lee del archivo al compilar (desde la raíz del proyecto, donde
// corre `npm run build`), para mostrarlo junto al botón.
import fs from 'node:fs';
import path from 'node:path';

const peso = (ruta: string) => {
  try {
    const mb = fs.statSync(path.join(process.cwd(), 'public', ruta)).size / 1024 / 1024;
    return `${mb.toLocaleString('es-CL', { maximumFractionDigits: 1 })} MB`;
  } catch {
    return null;
  }
};

export const presentacion = {
  href: '/descargas/presentacion-lols.pdf',
  /** nombre con que se guarda en el equipo de quien la descarga */
  nombreArchivo: 'Presentacion-LOLS-Ingenieria.pdf',
  peso: peso('/descargas/presentacion-lols.pdf'),
};
