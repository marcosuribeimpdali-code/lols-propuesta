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
import fotoMantencion from '../assets/servicios/mantencion.jpg';
import fotoVozDatos from '../assets/servicios/voz-y-datos.jpg';
import obraAerea from '../assets/portada/obra-aerea.jpg';
import { dron } from './dron';
import oficinasArboles from '../assets/portada/terminadas/oficinas-arboles.jpg';
import conjuntoAereo from '../assets/portada/terminadas/conjunto-aereo.jpg';
import departamentos from '../assets/portada/terminadas/departamentos.jpg';
import galpon from '../assets/portada/terminadas/galpon.jpg';
import comercial from '../assets/portada/terminadas/comercial.jpg';

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
    // los años ya están en la banda de cifras, justo bajo el cubo
    enCubo: false,
  },
];

// ---------- portada con fundido y pestañas de servicios (opción C, 30-09-2026) ----------
// Una foto por servicio que se funde con la siguiente; abajo, una pestaña por servicio con una
// barra que muestra cuánto falta para el cambio. El lema de la empresa queda fijo arriba del título.
// Reemplaza al cubo 3D (PortadaCubo.astro sigue en el repositorio por si se quiere volver).

export interface PasoPortada {
  /** slug del servicio (nombre e ícono salen de servicios.ts) */
  slug: string;
  titulo: string;
  texto: string;
  img: ImageMetadata;
  alt: string;
  /** autor si es de stock (se marca "Imagen referencial"); null = foto de LOLS */
  credito: string | null;
}

export const portadaServicios: PasoPortada[] = [
  {
    slug: 'construccion',
    titulo: 'Obra gruesa y terminaciones',
    texto: 'De las fundaciones y la estructura a los revestimientos y la entrega de la obra.',
    img: dron.obraGrua.img,
    alt: dron.obraGrua.alt,
    credito: dron.obraGrua.credito,
  },
  {
    slug: 'montaje-industrial',
    titulo: 'Estructuras metálicas y equipos',
    texto: 'Soportes, pasarelas, galpones y montaje de equipos en plantas e instalaciones industriales.',
    img: soldador,
    alt: 'Soldador trabajando sobre una viga de una estructura metálica',
    credito: 'Jason Richard / Unsplash',
  },
  {
    slug: 'mantencion',
    titulo: 'Mantención preventiva y correctiva',
    texto: 'Para que edificios e instalaciones sigan funcionando de forma segura.',
    img: fotoMantencion,
    alt: 'Técnico con casco y chaleco trabajando en las instalaciones del cielo de un edificio',
    credito: 'Valentin Lacoste / Unsplash',
  },
  {
    slug: 'electricidad',
    titulo: 'Alumbrado, fuerza y tableros',
    texto: 'Instalaciones eléctricas para obras nuevas, ampliaciones y regularizaciones, según la normativa vigente.',
    img: tablero,
    alt: 'Tablero eléctrico con cableado y contactores',
    credito: 'Toolmash Expo / Unsplash',
  },
  {
    slug: 'voz-y-datos',
    titulo: 'Cableado estructurado y redes',
    texto: 'Puntos de red y telefonía, racks ordenados y certificación de cada punto.',
    img: fotoVozDatos,
    alt: 'Bandeja portacables con cableado de red ordenado por colores',
    credito: 'Wonderlane / Unsplash',
  },
];

// ---------- portada "obra anotada" (opción G, 30-09-2026) ----------
// La cámara recorre una foto aérea de una obra, como un dron, y se detiene en lo que hace LOLS.
// Los puntos van en % de la foto (0-100, desde arriba a la izquierda). `zoom`: cuánto se acerca
// la cámara; los puntos a la izquierda de la foto necesitan más zoom para quedar a la derecha del
// texto. Con una foto aérea real de LOLS: reemplazar el archivo y volver a ubicar los puntos.
// Reemplaza al fundido con pestañas (PortadaFundido.astro sigue en el repositorio).


export interface PuntoObra {
  x: number;
  y: number;
  zoom: number;
  titulo: string;
  /** nombre corto para el botón de la parada */
  corto: string;
  /** texto del enlace de la etiqueta */
  texto: string;
  pagina: Pagina;
  ancla?: string;
}

export const portadaObra = {
  img: obraAerea,
  alt: 'Vista aérea de una obra en construcción con grúa torre, moldajes y acopio de materiales',
  credito: 'Centar MURID / Unsplash' as string | null,
  puntos: [
    { x: 47, y: 60, zoom: 1.8, titulo: 'Obra gruesa', corto: 'Obra gruesa', texto: 'Construcción', pagina: 'servicios', ancla: '#construccion' },
    { x: 52, y: 41, zoom: 1.9, titulo: 'Moldaje de muros', corto: 'Moldajes', texto: 'Moldajes propios', pagina: 'maquinaria', ancla: '#moldajes' },
    { x: 72.5, y: 64, zoom: 1.8, titulo: 'Alzaprimas y vigas', corto: 'Alzaprimas', texto: 'Más de 7.000 alzaprimas', pagina: 'maquinaria', ancla: '#losas' },
    { x: 29.5, y: 71, zoom: 2, titulo: 'Flota propia', corto: 'Flota', texto: 'Más de 25 vehículos', pagina: 'maquinaria', ancla: '#flota' },
    { x: 23, y: 46, zoom: 2.3, titulo: 'Edificio terminado', corto: 'Terminado', texto: 'Ver proyectos', pagina: 'terminados' },
  ] satisfies PuntoObra[],
};

// ---------- Portada "fondo fijo" (opción N, 01-10-2026) ----------
// Fotos de obras TERMINADAS que se funden en el fondo mientras la página sube encima. A Marcos le
// recomendaron que la portada no muestre obras a medio construir ("desordenado"). Son de stock
// (Unsplash, "Imagen referencial"): para usar fotos reales de LOLS, reemplazar el archivo (mín.
// 2000 px de ancho, horizontal) y poner `credito: null`. `encuadre` = object-position.
export interface FotoFija {
  img: ImageMetadata;
  alt: string;
  /** autor si es de stock (se marca "Imagen referencial"); null = foto de LOLS */
  credito: string | null;
  encuadre?: string;
}

export const portadaFija: FotoFija[] = [
  { img: oficinasArboles, alt: 'Edificio de oficinas de pocos pisos, terminado, con árboles al frente', credito: 'Roger Starnes Sr / Unsplash', encuadre: '60% 70%' },
  { img: conjuntoAereo, alt: 'Vista aérea de un conjunto de edificios de oficinas terminados', credito: 'Alex Reynolds / Unsplash' },
  { img: departamentos, alt: 'Edificios de departamentos terminados en una calle con árboles', credito: 'Long Chung / Unsplash' },
  { img: galpon, alt: 'Galpón industrial terminado, con revestimiento metálico', credito: 'Sam / Unsplash', encuadre: '50% 60%' },
  { img: comercial, alt: 'Edificio comercial terminado, de fachada roja y blanca', credito: 'set.sj / Unsplash' },
];
