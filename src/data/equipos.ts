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
// una foto por familia del catálogo
import verticales from '../assets/equipos/fam-verticales.jpg';
import horizontales from '../assets/equipos/fam-horizontales.jpg';
import diagonales from '../assets/equipos/fam-diagonales.jpg';
import bandejas from '../assets/equipos/fam-bandejas.jpg';
import ruedas from '../assets/equipos/fam-ruedas.jpg';
import mensulas from '../assets/equipos/fam-mensulas.jpg';
import escaleras from '../assets/equipos/fam-escaleras.jpg';
import malla from '../assets/equipos/fam-malla.jpg';
import escuadras from '../assets/equipos/fam-escuadras-muro.jpg';
import telescopicas from '../assets/equipos/fam-alz-telescopicas.jpg';
import cabezales from '../assets/equipos/fam-cabezales.jpg';
import tripodes from '../assets/equipos/fam-tripodes.jpg';
import vigas from '../assets/equipos/fam-vigas.jpg';
import bambu from '../assets/equipos/fam-bambu.jpg';
import esquineros from '../assets/equipos/fam-esquineros.jpg';
import angulos from '../assets/equipos/fam-angulos.jpg';
import alineadores from '../assets/equipos/fam-alineadores.jpg';
import ganchos from '../assets/equipos/fam-ganchos.jpg';
import separadores from '../assets/equipos/fam-separadores.jpg';
import pernos from '../assets/equipos/fam-pernos.jpg';
import chavetas from '../assets/equipos/fam-chavetas.jpg';

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

// ---------- catálogo completo por familias (los 132 ítems del inventario, agrupados) ----------
// Unidades: suma del stock de todas las ubicaciones al 28-09-2026. Fotos del catálogo de Bóveda:
// varias son de los equipos de LOLS (se ven usados) y otras son de catálogo; se aclara por sección.

export interface Familia {
  nombre: string;
  /** "1.550 piezas", "89 sacos"… */
  cantidad: string;
  medidas?: string;
  texto: string;
  foto: ImageMetadata | null;
}

export interface Grupo {
  id: string;
  titulo: string;
  resumen: string;
  familias: Familia[];
}

export const catalogo: Grupo[] = [
  {
    id: 'andamios',
    titulo: 'Andamios',
    resumen: 'Más de 5.000 piezas para armar andamios de fachada e interiores, con sus accesorios de seguridad.',
    familias: [
      { nombre: 'Verticales', cantidad: '1.550 piezas', medidas: '50, 100 y 200 cm', texto: 'Los postes del andamio: definen la altura de cada tramo.', foto: verticales },
      { nombre: 'Horizontales', cantidad: '2.656 piezas', medidas: '90, 120 y 180 cm', texto: 'Unen los verticales y forman cada nivel de trabajo.', foto: horizontales },
      { nombre: 'Diagonales', cantidad: '167 piezas', medidas: '1,8 y 2,5 m', texto: 'Arriostran el andamio para que no se deforme.', foto: diagonales },
      { nombre: 'Bases regulables', cantidad: '99 unidades', texto: 'Nivelan el andamio sobre terreno irregular.', foto: andamio },
      { nombre: 'Bandejas y tablones', cantidad: '384 unidades', medidas: '1,2 × 0,5 · 1,8 × 0,25 · 1,8 × 0,5 m', texto: 'Plataformas metálicas para trabajar y circular en altura.', foto: bandejas },
      { nombre: 'Ruedas', cantidad: '98 unidades', texto: 'Para andamios móviles en trabajos interiores.', foto: ruedas },
      { nombre: 'Ménsulas', cantidad: '55 unidades', texto: 'Amplían la plataforma de trabajo hacia la fachada.', foto: mensulas },
      { nombre: 'Escaleras de andamio', cantidad: '27 unidades', texto: 'Acceso seguro entre los niveles del andamio.', foto: escaleras },
      { nombre: 'Malla de seguridad', cantidad: '1.057 paños', texto: 'Cierra perímetros y protege bordes y vanos.', foto: malla },
      { nombre: 'Escuadras de muro', cantidad: '800 unidades', texto: 'Sostienen las pasarelas de trabajo sobre el moldaje de muros.', foto: escuadras },
    ],
  },
  {
    id: 'alzaprimas',
    titulo: 'Alzaprimas y vigas',
    resumen: 'Más de 7.000 alzaprimas y 4.200 vigas para sostener losas y vigas mientras fragua el hormigón.',
    familias: [
      { nombre: 'Alzaprimas fijas', cantidad: '3.355 unidades', medidas: '1,87 a 4 m', texto: 'Puntales metálicos para apuntalar losas y vigas.', foto: alzaprima },
      { nombre: 'Alzaprimas telescópicas', cantidad: '3.741 unidades', medidas: 'De 1,8 a 8 m extendidas', texto: 'Puntales regulables: se ajustan a la altura de cada piso.', foto: telescopicas },
      { nombre: 'Cabezales', cantidad: '1.778 unidades', medidas: 'Simples y dobles', texto: 'Reciben las vigas sobre la alzaprima.', foto: cabezales },
      { nombre: 'Trípodes', cantidad: '1.352 unidades', texto: 'Mantienen la alzaprima vertical mientras se arma el moldaje.', foto: tripodes },
      { nombre: 'Vigas', cantidad: '4.238 unidades', medidas: '3,0 a 4 m, más vigas PERI', texto: 'Soportan el moldaje de losas entre alzaprimas.', foto: vigas },
    ],
  },
  {
    id: 'moldajes',
    titulo: 'Moldajes',
    resumen: 'Más de 4.600 m² de moldaje en paneles, más placas y todos los accesorios para muros, pilares y losas.',
    familias: [
      { nombre: 'Moldaje fenólico', cantidad: '9.549 paneles · 4.617 m²', medidas: '27 medidas, de 10 × 60 a 60 × 150 cm', texto: 'Paneles para muros, pilares y vigas, reutilizables obra tras obra.', foto: moldaje },
      { nombre: 'Moldaje de bambú', cantidad: '62 paneles', medidas: '30 × 120 cm', texto: 'Paneles livianos para elementos de menor tamaño.', foto: bambu },
      { nombre: 'Placas fenólicas y para tableros', cantidad: 'Más de 3.100 placas', medidas: '18 mm, negras y amarillas', texto: 'Para losas y tableros a medida.', foto: null },
      { nombre: 'Esquineros', cantidad: '1.624 unidades', medidas: '10, 15 y 20 cm × 60 a 150 cm', texto: 'Resuelven las esquinas del moldaje de muros y pilares.', foto: esquineros },
      { nombre: 'Ángulos', cantidad: '2.929 unidades', medidas: '60 a 180 cm', texto: 'Unen y refuerzan los paneles en los encuentros de muros.', foto: angulos },
      { nombre: 'Alineadores', cantidad: '992 unidades', medidas: '3 y 6 m', texto: 'Perfiles que mantienen el moldaje recto y a plomo.', foto: alineadores },
      { nombre: 'Ganchos y garras de alineador', cantidad: '770 unidades', texto: 'Fijan los alineadores a los paneles.', foto: ganchos },
      { nombre: 'Separadores de muro (agujas)', cantidad: 'Más de 130.000', medidas: '10 a 40 cm', texto: 'Mantienen el espesor del muro entre las dos caras del moldaje.', foto: separadores },
      { nombre: 'Pernos y tuercas', cantidad: '574 pernos y 959 tuercas', medidas: 'Pernos de 1 m de ½″', texto: 'Amarran las dos caras del moldaje de muro.', foto: pernos },
      { nombre: 'Chavetas', cantidad: '89 sacos', texto: 'Trabas para unir paneles y accesorios.', foto: chavetas },
    ],
  },
];
