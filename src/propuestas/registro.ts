// Propuestas del sitio.
//
// `principal` decide qué se publica:
//   - el slug de una propuesta → esa propuesta ES el sitio: sus páginas quedan en la raíz
//     (/quienes-somos/, /contacto/…) y las demás no se publican (su código sigue aquí).
//   - null → se publican todas bajo su prefijo (/plano/, /panoramica/…) y la raíz muestra la
//     portada para elegir entre ellas.
//
// Para agregar una propuesta nueva: copiar una carpeta de src/propuestas/, cambiarle el slug en
// su config.ts, sumarla aquí y en src/propuestas/paginas.ts.

export const principal: string | null = 'panoramica';

export interface Propuesta {
  slug: string;
  numero: number;
  nombre: string;
  resumen: string;
  rasgos: string[];
  /** colores principales, para la muestra en la portada */
  colores: string[];
}

export const propuestas: Propuesta[] = [
  {
    slug: 'plano',
    numero: 1,
    nombre: 'Plano técnico',
    resumen: 'Sobria y oscura, como un plano de ingeniería.',
    rasgos: ['Grilla de plano y rótulos técnicos', 'Verde de marca como único acento', 'Tipografía del logo (DM Sans)'],
    colores: ['#0e1410', '#029e4d', '#f3f4f1'],
  },
  {
    slug: 'panoramica',
    numero: 2,
    nombre: 'Panorámica',
    resumen: 'Fotográfica, con portada a pantalla completa e imágenes que giran en cubo 3D.',
    rasgos: ['Colores del sitio lols.cl de 2018', 'Fotos grandes y titulares en mayúscula', 'Tipografía condensada (Barlow)'],
    colores: ['#168d3a', '#81d742', '#141414'],
  },
];

export const propuesta = (slug: string) => propuestas.find((p) => p.slug === slug)!;
