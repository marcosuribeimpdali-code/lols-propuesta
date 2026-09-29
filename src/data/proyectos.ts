// Obras. El sitio de 2018 mostraba 8 terminadas y 7 en construcción. De ahí vienen las
// imágenes (src/assets/obras/2018/, 500 px y sin el marco verde que traían pegado): las
// terminadas son fotos; las "en construcción" son renders con el sello "Próximas entregas".
// Los datos reales de cada obra están pendientes con la jefatura: todo campo `null` se muestra como
// [PENDIENTE] en el sitio. Mientras tanto, las obras finalizadas llevan DATOS DE EJEMPLO
// (inventados, pedido de Marcos el 29-09-2026, para que el jefe vea cómo quedan las fichas): van
// en `ejemplos`, el sitio los marca como "Datos de ejemplo" y se reemplazan cuando lleguen los reales.
// Los mandantes son genéricos a propósito ("Inmobiliaria privada"): no se le atribuye una obra
// inventada a una empresa real.
//
// Cada obra finalizada tiene su ficha en /proyectos-terminados/<slug>/, con el mismo slug que
// usaba su subpágina en el sitio de 2018 (así esos links siguen funcionando), y un paso a paso
// Antes → Durante → Después. "Después" es la foto real de la obra; "Antes" y "Durante" son fotos
// de ejemplo (stock) hasta que lleguen las de cada obra: reemplazarlas en `etapas`.
//
// Para cambiar una imagen: reemplazar el archivo en src/assets/ (mismo nombre) o apuntar a uno
// nuevo. Para cargar una obra: completar sus campos.

import type { ImageMetadata } from 'astro';
import excavadora from '../assets/ejemplo/antes-excavadora.jpg';
import excavacion from '../assets/ejemplo/antes-excavacion-aerea.jpg';
import losa from '../assets/portada/03-trabajadores-losa.jpg';
import gruas from '../assets/portada/01-gruas-edificio.jpg';
import fierros from '../assets/portada/05-enfierradura.jpg';
import soldador from '../assets/portada/02-soldador-estructura.jpg';

export type Estado = 'terminado' | 'en-construccion';

export interface Imagen {
  src: ImageMetadata;
  tipo: 'foto' | 'render';
  /** de dónde salió, para la marca de revisión */
  origen: string;
}

/** una foto de la obra: una etapa del paso a paso o una foto de su galería */
export interface Foto {
  src: ImageMetadata;
  alt: string;
  /** etapa a la que pertenece, se muestra como rótulo */
  etapa: 'Antes' | 'Durante' | 'Después';
  /** true = foto de stock que se reemplaza por una real de la obra */
  ejemplo: boolean;
  fecha: string | null;
  descripcion: string | null;
}

export interface Proyecto {
  /** slug de su ficha (el de su subpágina en el sitio de 2018); null = sin ficha */
  slug: string | null;
  nombre: string | null;
  mandante: string | null;
  comuna: string | null;
  anio: string | null;
  servicios: string[] | null;
  superficie: string | null;
  plazo: string | null;
  /** m², plazo u otra magnitud que dé idea del tamaño de la obra */
  magnitud: string | null;
  estado: Estado;
  imagen: Imagen | null;
  /** true = nombre y datos inventados, para ver cómo se ve la ficha (el sitio lo marca) */
  datosEjemplo: boolean;
  /** paso a paso: Antes → Durante → Después */
  etapas: Foto[];
  /** fotos extra para la galería de la ficha */
  galeria: Foto[];
}

const archivos = import.meta.glob<ImageMetadata>('../assets/obras/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const imagen = (archivo: string, tipo: Imagen['tipo']): Imagen | null => {
  const src = archivos[`../assets/obras/${archivo}`];
  return src ? { src, tipo, origen: 'sitio lols.cl de 2018' } : null;
};

// fotos de ejemplo (Unsplash, licencia libre) para las etapas que aún no tienen foto real
const ejemplo = (src: ImageMetadata, etapa: Foto['etapa'], alt: string): Foto => ({
  src,
  alt,
  etapa,
  ejemplo: true,
  fecha: null,
  descripcion: null,
});
const antes = [
  ejemplo(excavadora, 'Antes', 'Excavadora trabajando en un terreno'),
  ejemplo(excavacion, 'Antes', 'Excavación de un terreno vista desde arriba'),
];
const durante = [
  ejemplo(losa, 'Durante', 'Trabajadores sobre una losa con enfierradura'),
  ejemplo(gruas, 'Durante', 'Grúas junto a un edificio en obra gruesa'),
  ejemplo(fierros, 'Durante', 'Enfierradura de un pilar vista desde abajo'),
  ejemplo(soldador, 'Durante', 'Soldador trabajando en una estructura metálica'),
];

// ---------- datos de ejemplo de las obras finalizadas (inventados) ----------
interface Ejemplo {
  nombre: string;
  mandante: string;
  comuna: string;
  /** mes y año de entrega */
  entrega: [mes: number, anio: number];
  plazoMeses: number;
  m2: number;
  servicios: string[];
  pisos: number;
  uso: string;
}
const ejemplos: Record<string, Ejemplo> = {
  bro_cam: { nombre: 'Edificio Cam', mandante: 'Inmobiliaria privada', comuna: 'Estación Central', entrega: [11, 2016], plazoMeses: 8, m2: 1250, servicios: ['Construcción', 'Electricidad', 'Voz y datos'], pisos: 3, uso: 'locales comerciales y oficinas' },
  renacer_bas: { nombre: 'Edificio Renacer', mandante: 'Comercializadora privada', comuna: 'Estación Central', entrega: [8, 2017], plazoMeses: 7, m2: 980, servicios: ['Construcción', 'Electricidad'], pisos: 2, uso: 'bodegas y locales comerciales' },
  eiffel_am: { nombre: 'Edificio Eiffel', mandante: 'Importadora privada', comuna: 'Santiago', entrega: [3, 2015], plazoMeses: 10, m2: 1640, servicios: ['Construcción', 'Montaje industrial', 'Electricidad'], pisos: 4, uso: 'bodegas y oficinas' },
  ventura_esp: { nombre: 'Edificio Ventura', mandante: 'Inmobiliaria privada', comuna: 'Santiago', entrega: [12, 2014], plazoMeses: 12, m2: 2400, servicios: ['Construcción', 'Electricidad', 'Voz y datos'], pisos: 4, uso: 'locales comerciales y oficinas' },
  abate: { nombre: 'Edificio Abate', mandante: 'Inmobiliaria privada', comuna: 'Independencia', entrega: [10, 2013], plazoMeses: 14, m2: 3100, servicios: ['Construcción', 'Electricidad'], pisos: 6, uso: 'departamentos' },
  kolm_am: { nombre: 'Edificio Kolm', mandante: 'Empresa de electrónica', comuna: 'Santiago', entrega: [5, 2017], plazoMeses: 9, m2: 1420, servicios: ['Construcción', 'Montaje industrial', 'Electricidad'], pisos: 3, uso: 'bodega y sala de ventas' },
  mahesh: { nombre: 'Edificio Mahesh', mandante: 'Importadora privada', comuna: 'Estación Central', entrega: [7, 2016], plazoMeses: 8, m2: 1150, servicios: ['Construcción', 'Electricidad'], pisos: 3, uso: 'locales comerciales y bodegas' },
  zhu_am: { nombre: 'Edificio Xian Zhu', mandante: 'Importadora privada', comuna: 'Santiago', entrega: [1, 2018], plazoMeses: 10, m2: 1800, servicios: ['Construcción', 'Montaje industrial', 'Electricidad', 'Voz y datos'], pisos: 3, uso: 'bodegas y oficinas' },
};

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
/** "Marzo 2015", contando meses hacia atrás desde la entrega */
const mesAnio = ([mes, anio]: [number, number], menos = 0) => {
  const total = anio * 12 + (mes - 1) - menos;
  const m = MESES[total % 12];
  return `${m.charAt(0).toUpperCase()}${m.slice(1)} ${Math.floor(total / 12)}`;
};
const m2 = (n: number) => `${n.toLocaleString('es-CL')} m²`;

const ficha = (estado: Estado, img: Imagen | null, slug: string | null = null, i = 0): Proyecto => {
  const n = String(i + 1).padStart(2, '0');
  const e = slug ? ejemplos[slug] : undefined;
  const despues: Foto[] = img
    ? [{ src: img.src, alt: `${e?.nombre ?? `Obra ${n}`} terminado`, etapa: 'Después', ejemplo: false, fecha: null, descripcion: null }]
    : [];
  // se alternan las fotos de ejemplo para que las fichas no se vean todas iguales
  const etapas = slug ? [antes[i % 2], durante[i % 4], ...despues] : [];
  const galeria = slug ? [durante[(i + 1) % 4], durante[(i + 2) % 4]] : [];
  if (e && etapas.length === 3) {
    const [a, d, z] = etapas;
    etapas[0] = { ...a, fecha: mesAnio(e.entrega, e.plazoMeses), descripcion: i % 2 ? 'Demolición de la construcción antigua y excavación para las fundaciones.' : 'Terreno despejado y excavación para las fundaciones.' };
    etapas[1] = { ...d, fecha: mesAnio(e.entrega, Math.round(e.plazoMeses / 2)), descripcion: `Obra gruesa: fundaciones, estructura y losas de los ${e.pisos} pisos.` };
    etapas[2] = { ...z, fecha: mesAnio(e.entrega), descripcion: `Edificio de ${e.uso} terminado y entregado.` };
  }
  return {
    slug,
    nombre: e?.nombre ?? null,
    mandante: e?.mandante ?? null,
    comuna: e?.comuna ?? null,
    anio: e ? String(e.entrega[1]) : null,
    servicios: e?.servicios ?? null,
    superficie: e ? m2(e.m2) : null,
    plazo: e ? `${e.plazoMeses} meses` : null,
    magnitud: e ? `${m2(e.m2)} · ${e.plazoMeses} meses` : null,
    estado,
    imagen: img,
    datosEjemplo: !!e,
    etapas,
    galeria,
  };
};

// [archivo de la imagen, slug de su subpágina en el sitio de 2018]
const terminados: [string, string][] = [
  ['t01-b_cam_esp.jpg', 'bro_cam'],
  ['t02-renacer_bas.jpg', 'renacer_bas'],
  ['t03-eiffel_am.jpg', 'eiffel_am'],
  ['t04-ventura_esp.jpg', 'ventura_esp'],
  ['t05-abate.jpg', 'abate'],
  ['t06-kolm_am.jpg', 'kolm_am'],
  ['t07-mak_sa.jpg', 'mahesh'],
  ['t08-zhu_am.jpg', 'zhu_am'],
];

const enConstruccion = [
  'c01-zhu_sa.jpg',
  'c02-xia.jpg',
  'c03-altomaipu.jpg',
  'c04-zhu_gay.jpg',
  'c05-sazie2642.jpg',
  'c06-broncerias.jpg',
  'c07-ula444.jpg',
];

export const proyectos: Proyecto[] = [
  ...terminados.map(([a, slug], i) => ficha('terminado', imagen(`2018/${a}`, 'foto'), slug, i)),
  ...enConstruccion.map((a) => ficha('en-construccion', imagen(`2018/${a}`, 'render'))),
];

export const porEstado = (estado: Estado) => proyectos.filter((p) => p.estado === estado);

/** obras que tienen ficha propia */
export const conFicha = () => proyectos.filter((p) => p.slug);

/** texto alternativo cuando la obra todavía no tiene nombre */
export const altObra = (p: Proyecto, numero: number) => {
  const n = String(numero).padStart(2, '0');
  const que = p.imagen?.tipo === 'render' ? 'Render' : 'Foto';
  const estado = p.estado === 'terminado' ? 'obra finalizada' : 'obra en ejecución';
  return p.nombre ? `${que} de ${p.nombre}` : `${que} de la ${estado} ${n}`;
};
