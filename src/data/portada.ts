// Diapositivas de la portada giratoria (propuesta Panorámica).
// Las fotos son de stock (Unsplash, licencia libre) y se muestran marcadas como "Imagen
// referencial" mientras no lleguen fotos reales de LOLS. Para cambiarlas: reemplazar el archivo
// en src/assets/portada/ (mismo nombre) y poner `referencial: false` y `credito` en null.
// Los textos son solo contenido confirmado del kit (lema, servicios, textos institucionales).

import type { ImageMetadata } from 'astro';
import type { Pagina } from './rutas';
import { empresa } from './empresa';
import gruas from '../assets/portada/01-gruas-edificio.jpg';
import soldador from '../assets/portada/02-soldador-estructura.jpg';
import losa from '../assets/portada/03-trabajadores-losa.jpg';
import tablero from '../assets/portada/04-tablero-electrico.jpg';
import fierros from '../assets/portada/05-enfierradura.jpg';

export interface Diapositiva {
  img: ImageMetadata;
  alt: string;
  antetitulo: string;
  titulo: string;
  texto: string;
  /** nota "Por confirmar" junto al texto, si corresponde */
  revisar?: string;
  cta: { label: string; pagina: Pagina };
  referencial: boolean;
  credito: string | null;
}

export const diapositivas: Diapositiva[] = [
  {
    img: gruas,
    alt: 'Grúas torre junto a un edificio en construcción',
    antetitulo: empresa.razonSocial,
    titulo: 'Sus proyectos en las mejores manos',
    texto: 'Construcción, montaje industrial, mantención, electricidad, voz y datos, y muebles.',
    cta: { label: 'Ver proyectos', pagina: 'terminados' },
    referencial: true,
    credito: 'Frames For Your Heart / Unsplash',
  },
  {
    img: soldador,
    alt: 'Soldador trabajando sobre una viga de una estructura metálica',
    antetitulo: 'Servicios',
    titulo: 'Montaje industrial',
    texto: empresa.directrices,
    cta: { label: 'Nuestros servicios', pagina: 'servicios' },
    referencial: true,
    credito: 'Jason Richard / Unsplash',
  },
  {
    img: losa,
    alt: 'Trabajadores con casco sobre una losa con enfierradura',
    antetitulo: 'Servicios',
    titulo: 'Construcción',
    texto: empresa.principios[0],
    cta: { label: 'Quiénes somos', pagina: 'quienes' },
    referencial: true,
    credito: 'Etienne Girardet / Unsplash',
  },
  {
    img: tablero,
    alt: 'Tablero eléctrico con cableado y contactores',
    antetitulo: 'Servicios',
    titulo: 'Electricidad, voz y datos',
    texto: empresa.principios[1],
    cta: { label: 'Contáctenos', pagina: 'contacto' },
    referencial: true,
    credito: 'Toolmash Expo / Unsplash',
  },
  {
    img: fierros,
    alt: 'Enfierradura de un pilar vista desde abajo',
    antetitulo: empresa.nombreCorto,
    titulo: `${empresa.anios} años de experiencia`,
    texto: 'En el área de la construcción.',
    cta: { label: 'Quiénes somos', pagina: 'quienes' },
    referencial: true,
    credito: 'Michael Bader / Unsplash',
  },
];
