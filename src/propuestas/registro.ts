// Propuestas publicadas. La portada (/) las lista y la barra superior permite saltar de una a
// otra en la misma página. Para agregar una propuesta nueva: copiar una carpeta de
// src/propuestas/ y de src/pages/, cambiarle el slug y sumarla aquí.

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
