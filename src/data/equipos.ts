// Capacidad técnica: lo que LOLS tiene en propiedad (no arrendado).
// Fuente: inventario y flota de Bóveda LOLS, respaldo del 28-09-2026 (tablas items_inventario,
// ubicaciones_stock y vehiculos). Son cifras redondeadas hacia abajo ("más de"); para actualizarlas,
// volver a sumar el stock de todas las ubicaciones. No se publican ubicaciones, patentes ni valores.
// En la página van solo cifras redondas ("más de 500", "más de 1.000"): la empresa pidió no
// publicar cantidades exactas (30-09-2026).
//
// La página muestra QUÉ se puede hacer con los equipos (por uso, con fotos en obra), no un catálogo
// pieza por pieza: las fotos sueltas en fondo blanco con unidades y medidas se leían como tienda.
// Fotos: stock de Unsplash (licencia libre), marcadas "Imagen referencial" hasta tener fotos de
// LOLS en obra. Para cambiar una: reemplazar el archivo en src/assets/capacidad/ (mismo nombre) y
// poner `credito: null` (y `real: true`).

import type { ImageMetadata } from 'astro';
import banner from '../assets/capacidad/banner-obra-moldajes.jpg';
import moldajeMuros from '../assets/capacidad/moldaje-muros.jpg';
import losaAlzaprimas from '../assets/capacidad/losa-alzaprimas.jpg';
import andamioFachada from '../assets/capacidad/andamio-fachada.jpg';
import bombaHormigon from '../assets/capacidad/bomba-hormigon.jpg';
import bodegaPlacas from '../assets/capacidad/bodega-placas.jpg';
import flotaCamionetas from '../assets/capacidad/flota-camionetas.jpg';
import contenedor from '../assets/equipos/contenedor.jpg';

export const fuenteEquipos = 'inventario de Bóveda al 28-09-2026';

export interface Foto {
  src: ImageMetadata;
  alt: string;
  /** true = foto de LOLS; false = stock (se marca "Imagen referencial") */
  real: boolean;
  /** autor, si es de stock */
  credito: string | null;
}
const stock = (src: ImageMetadata, alt: string, autor: string): Foto => ({
  src,
  alt,
  real: false,
  credito: `${autor} / Unsplash`,
});

export const fotoBanner = stock(banner, '', 'Julia Taubitz');
export const fotoBodega = stock(bodegaPlacas, 'Placas de moldaje apiladas en bodega', 'Yurii Hetsko');

/** cifras grandes de la página (y de la portada) */
export const cifrasEquipos = [
  { valor: '+7.000', leido: 'más de 7.000', texto: 'alzaprimas' },
  { valor: '+5.000', leido: 'más de 5.000', texto: 'piezas de andamio' },
  { valor: '+4.500', leido: 'más de 4.500', texto: 'm² de moldaje' },
  { valor: '+25', leido: 'más de 25', texto: 'vehículos de trabajo' },
];

/** por qué importa que los equipos sean propios (textos propuestos, a validar) */
export const ventajas = [
  {
    titulo: 'Plazos propios',
    texto: 'La obra no espera la disponibilidad de un arriendo: los equipos salen de nuestra bodega cuando se necesitan.',
  },
  {
    titulo: 'Equipos conocidos',
    texto: 'Sabemos qué tenemos y en qué estado está. Cada equipo vuelve a bodega al terminar la obra y se revisa antes de salir a la siguiente.',
  },
  {
    titulo: 'Logística propia',
    texto: 'Con camiones y camionetas propias movemos personal, materiales y equipos entre la bodega y cada faena.',
  },
];
export const ventajasRevisar = 'textos propuestos; confirmar que la revisión en bodega se hace así';

export interface Uso {
  id: string;
  antetitulo: string;
  titulo: string;
  texto: string;
  /** con qué equipos se hace: texto corrido, sin fichas por pieza */
  equipos: string[];
  foto: Foto;
}

/** lo que LOLS ejecuta con sus equipos, en el orden de una obra */
export const usos: Uso[] = [
  {
    id: 'moldajes',
    antetitulo: 'Estructura',
    titulo: 'Moldajes para muros y pilares',
    texto: 'Armamos el moldaje de muros, pilares y vigas con paneles propios, reutilizables obra tras obra, y lo dejamos alineado y a plomo antes de hormigonar.',
    equipos: [
      'Más de 4.500 m² de moldaje fenólico, en distintas medidas',
      'Esquineros y ángulos para resolver encuentros y esquinas',
      'Alineadores de 3 y 6 m, pernos y separadores de muro',
      'Escuadras para las pasarelas de trabajo sobre el moldaje',
    ],
    foto: stock(moldajeMuros, 'Moldaje metálico rojo de muros y pilares armado en una obra', 'Di'),
  },
  {
    id: 'losas',
    antetitulo: 'Estructura',
    titulo: 'Alzaprimas y vigas para losas',
    texto: 'Apuntalamos losas y vigas mientras fragua el hormigón, con alzaprimas que se ajustan a la altura de cada piso.',
    equipos: [
      'Más de 7.000 alzaprimas fijas y telescópicas, de 1,8 a 8 m',
      'Más de 4.000 vigas para el moldaje de losas',
      'Cabezales y trípodes para cada alzaprima',
      'Placas fenólicas de 18 mm para los tableros',
    ],
    foto: stock(losaAlzaprimas, 'Trabajadores armando el apuntalamiento de una losa con alzaprimas y trípodes', 'Ray Donnelly'),
  },
  {
    id: 'andamios',
    antetitulo: 'Trabajo en altura',
    titulo: 'Andamios de fachada e interiores',
    texto: 'Montamos andamios con plataformas, escaleras y protecciones para trabajar seguros en altura, por fuera y por dentro del edificio.',
    equipos: [
      'Más de 5.000 piezas de andamio',
      'Plataformas metálicas, ménsulas y escaleras de acceso',
      'Ruedas para andamios móviles en trabajos interiores',
      'Más de 1.000 paños de malla de seguridad',
    ],
    foto: stock(andamioFachada, 'Trabajadores con arnés sobre un andamio de fachada', 'Etienne Girardet'),
  },
  {
    id: 'maquinaria',
    antetitulo: 'Maquinaria',
    titulo: 'Maquinaria de apoyo en obra',
    texto: 'Bombeamos hormigón, movemos carga y preparamos la enfierradura en la misma obra, sin depender de un proveedor externo.',
    equipos: [
      'Bombas de hormigón',
      'Camiones con brazo pluma y grúa horquilla de 5 t',
      'Elevadores tijera, elevadores verticales y montacargas',
      'Cortadoras y dobladoras de fierro',
    ],
    foto: stock(bombaHormigon, 'Trabajador junto a una bomba de hormigón remolcable en una obra', 'Estefania Ruiz'),
  },
  {
    id: 'faena',
    antetitulo: 'Faena',
    titulo: 'Instalación de faena',
    texto: 'Llegamos a cada obra con nuestras propias instalaciones para el equipo de terreno.',
    equipos: [
      'Contenedores de oficina con baño',
      'Módulos de baños y duchas para el personal',
      'Contenedor de bodega y oficina de planta libre',
    ],
    foto: { src: contenedor, alt: 'Contenedor de oficina de LOLS en una faena', real: true, credito: null },
  },
  {
    id: 'flota',
    antetitulo: 'Logística',
    titulo: 'Flota propia',
    texto: 'Trasladamos personal, materiales y equipos entre la bodega y cada faena con vehículos propios.',
    equipos: [
      'Más de 25 vehículos de trabajo',
      'Camionetas para el personal y las herramientas',
      'Camiones Mercedes-Benz, Hyundai, Foton y Maxus',
      'Minibús para el personal',
    ],
    foto: stock(flotaCamionetas, 'Camionetas de trabajo estacionadas en una obra', 'Maaz Khan'),
  },
];

// ---------- detalle del inventario (NO se publica: cantidades exactas) ----------
// Base del "listado de equipos" que se envía a solicitud para licitaciones. Unidades: suma del
// stock de todas las ubicaciones al 28-09-2026 (132 ítems del inventario, agrupados).

export interface Maquina {
  nombre: string;
  cantidad: number;
}

export const maquinaria: Maquina[] = [
  { nombre: 'Bomba de hormigón', cantidad: 2 },
  { nombre: 'Grúa horquilla 5 t', cantidad: 1 },
  { nombre: 'Montacargas', cantidad: 3 },
  { nombre: 'Mini retroexcavadora', cantidad: 1 },
  { nombre: 'Camión con brazo pluma hidráulico', cantidad: 2 },
  { nombre: 'Elevador tijera 3,9 m', cantidad: 5 },
  { nombre: 'Elevadores verticales de 6 a 12 m', cantidad: 4 },
  { nombre: 'Cortadora de fierros 380 V', cantidad: 3 },
  { nombre: 'Dobladora de fierros GF25', cantidad: 6 },
  { nombre: 'Placa compactadora', cantidad: 1 },
  { nombre: 'Barredora industrial', cantidad: 1 },
  { nombre: 'Soldadora láser', cantidad: 1 },
  { nombre: 'Elevador de muro (ascensor de carga 220 V)', cantidad: 1 },
];

export const flota = [
  { valor: '20', texto: 'camionetas' },
  { valor: '5', texto: 'camiones' },
  { valor: '1', texto: 'minibús' },
];

export interface Familia {
  nombre: string;
  /** "1.550 piezas", "89 sacos"… */
  cantidad: string;
  medidas?: string;
}

export const catalogo: { grupo: string; familias: Familia[] }[] = [
  {
    grupo: 'Andamios',
    familias: [
      { nombre: 'Verticales', cantidad: '1.550 piezas', medidas: '50, 100 y 200 cm' },
      { nombre: 'Horizontales', cantidad: '2.656 piezas', medidas: '90, 120 y 180 cm' },
      { nombre: 'Diagonales', cantidad: '167 piezas', medidas: '1,8 y 2,5 m' },
      { nombre: 'Bases regulables', cantidad: '99 unidades' },
      { nombre: 'Bandejas y tablones', cantidad: '384 unidades', medidas: '1,2 × 0,5 · 1,8 × 0,25 · 1,8 × 0,5 m' },
      { nombre: 'Ruedas', cantidad: '98 unidades' },
      { nombre: 'Ménsulas', cantidad: '55 unidades' },
      { nombre: 'Escaleras de andamio', cantidad: '27 unidades' },
      { nombre: 'Malla de seguridad', cantidad: '1.057 paños' },
      { nombre: 'Escuadras de muro', cantidad: '800 unidades' },
    ],
  },
  {
    grupo: 'Alzaprimas y vigas',
    familias: [
      { nombre: 'Alzaprimas fijas', cantidad: '3.355 unidades', medidas: '1,87 a 4 m' },
      { nombre: 'Alzaprimas telescópicas', cantidad: '3.741 unidades', medidas: 'De 1,8 a 8 m extendidas' },
      { nombre: 'Cabezales', cantidad: '1.778 unidades', medidas: 'Simples y dobles' },
      { nombre: 'Trípodes', cantidad: '1.352 unidades' },
      { nombre: 'Vigas', cantidad: '4.238 unidades', medidas: '3,0 a 4 m, más vigas PERI' },
    ],
  },
  {
    grupo: 'Moldajes',
    familias: [
      { nombre: 'Moldaje fenólico', cantidad: '9.549 paneles · 4.617 m²', medidas: '27 medidas, de 10 × 60 a 60 × 150 cm' },
      { nombre: 'Moldaje de bambú', cantidad: '62 paneles', medidas: '30 × 120 cm' },
      { nombre: 'Placas fenólicas y para tableros', cantidad: 'Más de 3.100 placas', medidas: '18 mm, negras y amarillas' },
      { nombre: 'Esquineros', cantidad: '1.624 unidades', medidas: '10, 15 y 20 cm × 60 a 150 cm' },
      { nombre: 'Ángulos', cantidad: '2.929 unidades', medidas: '60 a 180 cm' },
      { nombre: 'Alineadores', cantidad: '992 unidades', medidas: '3 y 6 m' },
      { nombre: 'Ganchos y garras de alineador', cantidad: '770 unidades' },
      { nombre: 'Separadores de muro (agujas)', cantidad: 'Más de 130.000', medidas: '10 a 40 cm' },
      { nombre: 'Pernos y tuercas', cantidad: '574 pernos y 959 tuercas', medidas: 'Pernos de 1 m de ½″' },
      { nombre: 'Chavetas', cantidad: '89 sacos' },
    ],
  },
];
