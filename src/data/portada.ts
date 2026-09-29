// Diapositivas de la portada giratoria (propuesta Panorámica).
// Las fotos son de stock (Unsplash, licencia libre) y se muestran marcadas como "Imagen
// referencial" mientras no lleguen fotos reales de LOLS. Para cambiarlas: reemplazar el archivo
// en src/assets/portada/ (mismo nombre) y poner `referencial: false` y `credito` en null.
// Cada cara del cubo cuenta algo distinto: la primera, el lema; las otras, un servicio cada una,
// con su botón a ese servicio. Las frases institucionales van solo en Quiénes somos.

import type { ImageMetadata } from 'astro';
import type { Pagina } from './rutas';
import { empresa } from './empresa';
import { listaServicios, servicios } from './servicios';
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
  cta: { label: string; pagina: Pagina; ancla?: string };
  referencial: boolean;
  credito: string | null;
  /** false = la foto se usa en otras páginas, pero no es una cara del cubo de la portada */
  enCubo?: boolean;
}

const desc = (slug: string) => servicios.find((s) => s.slug === slug)?.descripcion ?? '';

export const diapositivas: Diapositiva[] = [
  {
    img: gruas,
    alt: 'Grúas torre junto a un edificio en construcción',
    antetitulo: empresa.razonSocial,
    titulo: 'Sus proyectos en las mejores manos',
    texto: listaServicios,
    cta: { label: 'Ver proyectos', pagina: 'terminados' },
    referencial: true,
    credito: 'Frames For Your Heart / Unsplash',
  },
  {
    img: soldador,
    alt: 'Soldador trabajando sobre una viga de una estructura metálica',
    antetitulo: 'Servicios',
    titulo: 'Montaje industrial',
    texto: desc('montaje-industrial'),
    cta: { label: 'Ver servicio', pagina: 'servicios', ancla: '#montaje-industrial' },
    referencial: true,
    credito: 'Jason Richard / Unsplash',
  },
  {
    img: losa,
    alt: 'Trabajadores con casco sobre una losa con enfierradura',
    antetitulo: 'Servicios',
    titulo: 'Construcción',
    texto: desc('construccion'),
    cta: { label: 'Ver servicio', pagina: 'servicios', ancla: '#construccion' },
    referencial: true,
    credito: 'Etienne Girardet / Unsplash',
  },
  {
    img: tablero,
    alt: 'Tablero eléctrico con cableado y contactores',
    antetitulo: 'Servicios',
    titulo: 'Electricidad, voz y datos',
    texto: 'Alumbrado, fuerza y tableros eléctricos, y cableado estructurado para redes de datos y telefonía.',
    cta: { label: 'Ver servicio', pagina: 'servicios', ancla: '#electricidad' },
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
    // los 30 años ya están en la banda de cifras, justo bajo el cubo
    enCubo: false,
  },
];
