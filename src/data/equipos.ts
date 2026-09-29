// Maquinaria y capacidad técnica: lo que LOLS tiene en propiedad (no arrendado).
// Fuente: inventario y flota de Bóveda LOLS, respaldo del 28-09-2026 (tablas items_inventario,
// ubicaciones_stock y vehiculos). Son cifras redondeadas hacia abajo ("más de"); para actualizarlas,
// volver a sumar el stock de todas las ubicaciones. No se publican ubicaciones, patentes ni valores.
// Fotos: las del catálogo de Bóveda (src/assets/equipos/), sin la etiqueta de medida y centradas
// en fondo blanco. Casi todas son imágenes de catálogo, no fotos de los equipos de LOLS: van
// marcadas "Imagen referencial" hasta que se haga una sesión de fotos en bodega.

import type { ImageMetadata } from 'astro';
import alzaprima from '../assets/equipos/alzaprima.jpg';
import andamio from '../assets/equipos/andamio.jpg';
import moldaje from '../assets/equipos/moldaje.jpg';
import contenedor from '../assets/equipos/contenedor.jpg';
import bomba from '../assets/equipos/bomba-hormigon.jpg';
import grua from '../assets/equipos/grua-horquilla.jpg';
import montacarga from '../assets/equipos/montacarga.jpg';
import retro from '../assets/equipos/mini-retroexcavadora.jpg';
import pluma from '../assets/equipos/camion-pluma.jpg';
import tijera from '../assets/equipos/elevador-tijera.jpg';
import vertical from '../assets/equipos/elevador-vertical.jpg';
import cortadora from '../assets/equipos/cortadora-fierros.jpg';
import placa from '../assets/equipos/placa-compactadora.jpg';
import barredora from '../assets/equipos/barredora.jpg';
import soldadora from '../assets/equipos/soldadora-laser.jpg';

export const fuenteEquipos = 'inventario de Bóveda al 28-09-2026';

export interface Foto {
  src: ImageMetadata;
  alt: string;
  /** true = foto real de LOLS; false = imagen de catálogo (referencial) */
  real: boolean;
}
const cat = (src: ImageMetadata, alt: string): Foto => ({ src, alt, real: false });

/** cifras grandes de la página (y de la portada) */
export const cifrasEquipos = [
  { valor: '+7.000', leido: 'más de 7.000', texto: 'alzaprimas' },
  { valor: '+5.000', leido: 'más de 5.000', texto: 'piezas de andamio' },
  { valor: '+4.600', leido: 'más de 4.600', texto: 'm² de moldaje' },
  { valor: '+25', leido: 'más de 25', texto: 'vehículos de trabajo' },
];

export interface Linea {
  titulo: string;
  cifra: string;
  texto: string;
  foto: Foto;
}

export const lineas: Linea[] = [
  {
    titulo: 'Andamios',
    cifra: 'Más de 5.000 piezas',
    texto: 'Verticales de 50 a 200 cm, horizontales de 90 a 180 cm, diagonales, bandejas, ruedas, ménsulas y escaleras. Más de 1.000 mallas de seguridad.',
    foto: cat(andamio, 'Base regulable de andamio'),
  },
  {
    titulo: 'Alzaprimas y vigas',
    cifra: 'Más de 7.000 alzaprimas y 4.200 vigas',
    texto: 'Alzaprimas fijas y telescópicas de 1,8 a 8 m, con cabezales y trípodes, y vigas de 3 a 4 m para losas.',
    foto: cat(alzaprima, 'Alzaprima metálica roja'),
  },
  {
    titulo: 'Moldajes',
    cifra: 'Más de 4.600 m²',
    texto: 'Paneles fenólicos y de tablero de 10 × 60 a 60 × 150 cm, más de 2.500 placas fenólicas, esquineros, alineadores y separadores de muro.',
    foto: cat(moldaje, 'Panel de moldaje fenólico'),
  },
  {
    titulo: 'Instalaciones de faena',
    cifra: '5 módulos',
    texto: 'Contenedores de oficina con baño, de baños y duchas para el personal, bodega y oficina de planta libre.',
    foto: { src: contenedor, alt: 'Contenedor de oficina de LOLS en una faena', real: true },
  },
];

export interface Maquina {
  nombre: string;
  cantidad: number;
  foto: Foto | null;
}

export const maquinaria: Maquina[] = [
  { nombre: 'Bomba de hormigón', cantidad: 2, foto: cat(bomba, 'Bomba de hormigón remolcable') },
  { nombre: 'Grúa horquilla 5 t', cantidad: 1, foto: cat(grua, 'Grúa horquilla') },
  { nombre: 'Montacargas', cantidad: 3, foto: cat(montacarga, 'Montacargas eléctrico') },
  { nombre: 'Mini retroexcavadora', cantidad: 1, foto: cat(retro, 'Mini retroexcavadora') },
  { nombre: 'Camión con brazo pluma hidráulico', cantidad: 2, foto: cat(pluma, 'Camión con brazo pluma hidráulico') },
  { nombre: 'Elevador tijera 3,9 m', cantidad: 5, foto: cat(tijera, 'Elevador tijera') },
  { nombre: 'Elevadores verticales de 6 a 12 m', cantidad: 4, foto: cat(vertical, 'Elevador vertical de persona') },
  { nombre: 'Cortadora de fierros 380 V', cantidad: 3, foto: cat(cortadora, 'Cortadora de fierros') },
  { nombre: 'Dobladora de fierros GF25', cantidad: 6, foto: null },
  { nombre: 'Placa compactadora', cantidad: 1, foto: cat(placa, 'Placa compactadora') },
  { nombre: 'Barredora industrial', cantidad: 1, foto: cat(barredora, 'Barredora industrial') },
  { nombre: 'Soldadora láser', cantidad: 1, foto: cat(soldadora, 'Soldadora láser') },
  { nombre: 'Elevador de muro (ascensor de carga 220 V)', cantidad: 1, foto: null },
];

export const flota = [
  { valor: '20', texto: 'camionetas' },
  { valor: '5', texto: 'camiones' },
  { valor: '1', texto: 'minibús' },
];
export const flotaMarcas = 'Camiones Mercedes-Benz, Hyundai, Foton y Maxus.';
