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
// Próximos proyectos (30-09-2026, primero "futuros"; pedido de Marcos para mostrar a futuros clientes que vienen más
// obras): dos obras de EJEMPLO en Santiago que parten en 2027, inventadas y marcadas igual que las
// demás. Su "foto" es una imagen referencial (Unsplash) y su plano sale de ella con scripts/plano.mjs.
//
// Cada obra finalizada tiene su ficha en /proyectos-terminados/<slug>/, con el mismo slug que
// usaba su subpágina en el sitio de 2018 (así esos links siguen funcionando), y un paso a paso del
// terreno a la entrega (30-09-2026): Terreno → Excavación → Fundaciones → Obra gruesa → Terminaciones
// → Entrega. "Entrega" es la foto real de la obra; las otras cinco son fotos de ejemplo (stock, ver
// `pasos`) que se alternan entre obras hasta que lleguen las de cada una: reemplazarlas en `etapas`.
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
import bodegas from '../assets/futuros/bodegas-cerrillos.jpg';
import bodegasPlano from '../assets/futuros/bodegas-cerrillos-plano.jpg';
import oficinas from '../assets/futuros/oficinas-san-miguel.jpg';
import oficinasPlano from '../assets/futuros/oficinas-san-miguel-plano.jpg';
import terrenoUrbano from '../assets/etapas/terreno-sitio-urbano.jpg';
import terrenoNivelado from '../assets/etapas/terreno-nivelado.jpg';
import excavacionUrbana from '../assets/etapas/excavacion-urbana.jpg';
import fundacionesLosa from '../assets/etapas/fundaciones-losa.jpg';
import enfierraduraPilares from '../assets/etapas/obra-gruesa-enfierradura.jpg';
import fachada from '../assets/etapas/terminaciones-fachada.jpg';
import interior from '../assets/etapas/terminaciones-interior.jpg';
import ventanales from '../assets/etapas/terminaciones-ventanales.jpg';
import bomba from '../assets/capacidad/bomba-hormigon.jpg';
import moldaje from '../assets/capacidad/moldaje-muros.jpg';
import alzaprimas from '../assets/capacidad/losa-alzaprimas.jpg';
import andamio from '../assets/capacidad/andamio-fachada.jpg';
import tablero from '../assets/portada/04-tablero-electrico.jpg';
import obraGrua from '../assets/dron/obra-grua.jpg';

export type Estado = 'terminado' | 'en-construccion' | 'futuro';

export interface Imagen {
  src: ImageMetadata;
  /** referencial = imagen de stock de una obra parecida (futuros proyectos) */
  tipo: 'foto' | 'render' | 'referencial';
  /** de dónde salió, para la marca de revisión */
  origen: string;
}

/** una foto de la obra: una etapa del paso a paso o una foto de su galería */
export interface Foto {
  src: ImageMetadata;
  alt: string;
  /** etapa a la que pertenece, se muestra como rótulo: Antes, Durante, Después (obras
   *  finalizadas) o Inicio de obra, Obra gruesa, Avance actual, Así quedará (en ejecución) */
  etapa: string;
  /** true = foto de stock que se reemplaza por una real de la obra */
  ejemplo: boolean;
  fecha: string | null;
  descripcion: string | null;
  /** rótulo de origen que se muestra sobre la foto (si falta: "Foto de ejemplo" o "Foto real") */
  origen?: string;
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
  /** tipos de obra para el filtro de Proyectos (salen del uso del edificio; [] = sin datos) */
  tipos: string[];
  /** paso a paso: Antes → Durante → Después; en las obras en ejecución, Inicio → Obra gruesa →
   *  Avance actual → Así quedará (el render) */
  etapas: Foto[];
  /** obras en ejecución: % de avance, inicio y entrega estimada (null en las finalizadas) */
  avance: number | null;
  inicio: string | null;
  entregaEstimada: string | null;
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

// paso a paso de las obras finalizadas, del terreno a la entrega: fotos de ejemplo por etapa. Cada
// obra toma una distinta de cada lista (se corren según la obra), así ninguna ficha repite la
// secuencia de otra. Autores (Unsplash): ver README.
const pasos: [etapa: string, fotos: [ImageMetadata, string][]][] = [
  ['Terreno', [
    [terrenoUrbano, 'Vista aérea de un terreno baldío entre calles y árboles'],
    [terrenoNivelado, 'Terreno despejado y nivelado con una motoniveladora'],
  ]],
  ['Excavación', [
    [excavadora, 'Excavadora trabajando en un terreno'],
    [excavacion, 'Excavación de un terreno vista desde arriba'],
    [excavacionUrbana, 'Excavadora en una faena urbana bajo un viaducto'],
  ]],
  ['Fundaciones', [
    [fundacionesLosa, 'Trabajadores armando la enfierradura de una losa de fundación'],
    [fierros, 'Enfierradura de un pilar vista desde abajo'],
    [bomba, 'Trabajador junto a una bomba de hormigón remolcable'],
    [moldaje, 'Moldaje metálico de muros y pilares armado en la obra'],
  ]],
  ['Obra gruesa', [
    [losa, 'Trabajadores sobre una losa con enfierradura'],
    [alzaprimas, 'Apuntalamiento de una losa con alzaprimas y trípodes'],
    [gruas, 'Grúas junto a un edificio en obra gruesa'],
    [enfierraduraPilares, 'Enfierradura de pilares sobre una losa, vista desde arriba'],
    [obraGrua, 'Vista aérea de una obra con grúa torre'],
  ]],
  ['Terminaciones', [
    [fachada, 'Trabajador en un elevador instalando los paneles de la fachada'],
    [interior, 'Trabajador en una escalera haciendo terminaciones interiores'],
    [andamio, 'Trabajadores con arnés sobre un andamio de fachada'],
    [ventanales, 'Edificio en terminaciones con sus ventanales instalados'],
    [tablero, 'Instalación de un tablero eléctrico'],
  ]],
];
/** cuándo va cada etapa (menos la entrega), como fracción del plazo de la obra */
const avanceEtapa = [0, 0.12, 0.25, 0.5, 0.8];

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
// filtro de Proyectos (06-10-2026): los tipos se deducen del uso del edificio; una obra puede tener
// varios ("bodegas y oficinas" → Bodegas y Oficinas)
export const TIPOS_OBRA = ['Bodegas', 'Oficinas', 'Locales comerciales', 'Departamentos', 'Industrial'];
const tiposDe = (uso?: string | null): string[] => {
  if (!uso) return [];
  const u = uso.toLowerCase();
  const t: string[] = [];
  if (u.includes('bodega')) t.push('Bodegas');
  if (u.includes('oficina')) t.push('Oficinas');
  if (u.includes('local') || u.includes('sala de ventas')) t.push('Locales comerciales');
  if (u.includes('departamento')) t.push('Departamentos');
  if (u.includes('galpón') || u.includes('industrial')) t.push('Industrial');
  return t;
};

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
    ? [{ src: img.src, alt: `${e?.nombre ?? `Obra ${n}`} terminado`, etapa: 'Entrega', ejemplo: false, fecha: null, descripcion: null }]
    : [];
  // del terreno a la entrega: una foto de ejemplo por etapa (corrida según la obra) y la real al final
  const previas = pasos.map(([etapa, lista], k) => {
    const [src, alt] = lista[(i + k) % lista.length];
    return ejemplo(src, etapa, alt);
  });
  const etapas = slug ? [...previas, ...despues] : [];
  const galeria: Foto[] = [];
  if (e && etapas.length === pasos.length + 1) {
    const instalaciones = e.servicios.includes('Voz y datos') ? 'instalaciones eléctricas y de voz y datos' : 'instalaciones eléctricas';
    const textos = [
      i % 2 ? 'Demolición de la construcción antigua y despeje del terreno.' : 'Recepción del terreno, cierre perimetral e instalación de faena.',
      'Excavación y trazado de las fundaciones.',
      'Enfierradura y hormigonado de las fundaciones.',
      `Estructura y losas de los ${e.pisos} pisos.`,
      `Fachada, ${instalaciones} y terminaciones interiores.`,
    ];
    textos.forEach((t, k) => {
      const mes = Math.round(e.plazoMeses * avanceEtapa[k]);
      etapas[k] = { ...etapas[k], fecha: mesAnio(e.entrega, e.plazoMeses - mes), descripcion: t };
    });
    const z = etapas.length - 1;
    etapas[z] = { ...etapas[z], fecha: mesAnio(e.entrega), descripcion: `Edificio de ${e.uso} terminado y entregado.` };
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
    tipos: tiposDe(e?.uso),
    etapas,
    galeria,
    avance: null,
    inicio: null,
    entregaEstimada: null,
  };
};

// ---------- obras en ejecución: datos de ejemplo (inventados, como los de las finalizadas) ----------
// Los nombres salen del nombre de archivo de cada render de 2018. El avance es de ejemplo y se
// cuenta a septiembre de 2026 (HOY). Son obras de 2018: falta confirmar si siguen en ejecución.
interface EjemploEjecucion {
  nombre: string;
  mandante: string;
  comuna: string;
  inicio: [mes: number, anio: number];
  /** entrega estimada */
  entrega: [mes: number, anio: number];
  m2: number;
  servicios: string[];
  pisos: number;
  uso: string;
  /** % de avance */
  avance: number;
}
const HOY: [number, number] = [9, 2026];
const ejemplosEjecucion: Record<string, EjemploEjecucion> = {
  zhu_sa: { nombre: 'Edificio Zhu', mandante: 'Importadora privada', comuna: 'Santiago', inicio: [3, 2026], entrega: [4, 2027], m2: 2100, servicios: ['Construcción', 'Electricidad', 'Voz y datos'], pisos: 4, uso: 'bodegas y oficinas', avance: 45 },
  xia: { nombre: 'Edificio Xia', mandante: 'Inmobiliaria privada', comuna: 'Estación Central', inicio: [11, 2025], entrega: [12, 2026], m2: 1600, servicios: ['Construcción', 'Electricidad'], pisos: 3, uso: 'locales comerciales', avance: 75 },
  altomaipu: { nombre: 'Alto Maipú', mandante: 'Inmobiliaria privada', comuna: 'Maipú', inicio: [6, 2025], entrega: [2, 2027], m2: 3800, servicios: ['Construcción', 'Electricidad', 'Voz y datos'], pisos: 6, uso: 'departamentos', avance: 60 },
  zhu_gay: { nombre: 'Edificio Gay', mandante: 'Importadora privada', comuna: 'Santiago', inicio: [5, 2026], entrega: [7, 2027], m2: 1300, servicios: ['Construcción', 'Montaje industrial', 'Electricidad'], pisos: 3, uso: 'bodegas y sala de ventas', avance: 25 },
  sazie2642: { nombre: 'Sazié 2642', mandante: 'Inmobiliaria privada', comuna: 'Santiago', inicio: [1, 2026], entrega: [3, 2027], m2: 1900, servicios: ['Construcción', 'Electricidad'], pisos: 5, uso: 'departamentos y locales', avance: 40 },
  broncerias: { nombre: 'Broncerías', mandante: 'Empresa industrial', comuna: 'Quinta Normal', inicio: [9, 2025], entrega: [11, 2026], m2: 2600, servicios: ['Construcción', 'Montaje industrial', 'Electricidad'], pisos: 2, uso: 'galpón industrial y oficinas', avance: 85 },
  ula444: { nombre: 'Ula 444', mandante: 'Inmobiliaria privada', comuna: 'Independencia', inicio: [4, 2026], entrega: [6, 2027], m2: 1450, servicios: ['Construcción', 'Electricidad', 'Voz y datos'], pisos: 4, uso: 'oficinas', avance: 30 },
};
const meses = ([m1, a1]: [number, number], [m2x, a2]: [number, number]) => a2 * 12 + m2x - (a1 * 12 + m1);
const queSeHace = (avance: number) =>
  avance >= 70 ? 'terminaciones e instalaciones' : avance >= 40 ? 'obra gruesa de los pisos superiores' : 'fundaciones y primeros pisos';

const fichaEjecucion = (img: Imagen | null, slug: string, i: number): Proyecto => {
  const e = ejemplosEjecucion[slug];
  const plazo = meses(e.inicio, e.entrega);
  // meses desde el inicio hasta la obra gruesa (un tercio del plazo)
  const alTercio = Math.round(plazo / 3);
  const inicio = mesAnio(e.inicio);
  const obraGruesa = mesAnio(e.inicio, -alTercio);
  const etapas: Foto[] = [
    { ...antes[(i + 1) % 2], etapa: 'Inicio de obra', fecha: inicio, descripcion: 'Instalación de faena, excavación y fundaciones.' },
    { ...durante[(i + 1) % 4], etapa: 'Obra gruesa', fecha: obraGruesa, descripcion: `Estructura y losas de los ${e.pisos} pisos.` },
    { ...durante[(i + 3) % 4], etapa: 'Avance actual', fecha: mesAnio(HOY), descripcion: `${e.avance} % de avance: ${queSeHace(e.avance)}.` },
    ...(img
      ? [{ src: img.src, alt: `Render de ${e.nombre} terminado`, etapa: 'Así quedará', ejemplo: false, fecha: `Entrega estimada: ${mesAnio(e.entrega)}`, descripcion: `Edificio de ${e.uso}.` }]
      : []),
  ];
  return {
    slug,
    nombre: e.nombre,
    mandante: e.mandante,
    comuna: e.comuna,
    anio: String(e.entrega[1]),
    servicios: e.servicios,
    superficie: m2(e.m2),
    plazo: `${plazo} meses`,
    magnitud: `${m2(e.m2)} · ${plazo} meses`,
    estado: 'en-construccion',
    imagen: img,
    datosEjemplo: true,
    tipos: tiposDe(e.uso),
    etapas,
    galeria: [],
    avance: e.avance,
    inicio,
    entregaEstimada: mesAnio(e.entrega),
  };
};

// ---------- futuros proyectos: datos de ejemplo (inventados) ----------
interface EjemploFuturo {
  nombre: string;
  mandante: string;
  comuna: string;
  inicio: [mes: number, anio: number];
  /** entrega estimada */
  entrega: [mes: number, anio: number];
  m2: number;
  servicios: string[];
  pisos: number;
  uso: string;
  foto: ImageMetadata;
  plano: ImageMetadata;
  alt: string;
  /** autor de la imagen referencial */
  credito: string;
}
const ejemplosFuturos: Record<string, EjemploFuturo> = {
  'bodegas-cerrillos': { nombre: 'Bodegas Cerrillos', mandante: 'Empresa de logística privada', comuna: 'Cerrillos', inicio: [1, 2027], entrega: [10, 2027], m2: 4200, servicios: ['Construcción', 'Montaje industrial', 'Electricidad'], pisos: 2, uso: 'bodegas con oficinas', foto: bodegas, plano: bodegasPlano, alt: 'Galpón industrial moderno con portón y oficinas en dos pisos', credito: 'Esphera ArqEng / Unsplash' },
  'oficinas-san-miguel': { nombre: 'Oficinas San Miguel', mandante: 'Inmobiliaria privada', comuna: 'San Miguel', inicio: [3, 2027], entrega: [6, 2028], m2: 3400, servicios: ['Construcción', 'Electricidad', 'Voz y datos'], pisos: 6, uso: 'oficinas y locales comerciales', foto: oficinas, plano: oficinasPlano, alt: 'Edificio de oficinas de varios pisos con ventanales', credito: 'Matt Reames / Unsplash' },
};
const mayuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const fichaFutura = (slug: string): Proyecto => {
  const e = ejemplosFuturos[slug];
  const plazo = meses(e.inicio, e.entrega);
  const referencial = `Imagen referencial · ${e.credito}`;
  // el arrastre de la ficha va del plano a cómo quedará
  const etapas: Foto[] = [
    { src: e.plano, alt: `Plano de ${e.nombre}`, etapa: 'Proyecto', ejemplo: true, fecha: `Inicio de obra: ${mesAnio(e.inicio)}`, descripcion: `Proyecto listo para empezar: ${plazo} meses de obra.`, origen: 'Plano de ejemplo' },
    { src: e.foto, alt: e.alt, etapa: 'Así será', ejemplo: true, fecha: `Entrega estimada: ${mesAnio(e.entrega)}`, descripcion: `${mayuscula(e.uso)} en ${e.pisos} pisos, ${m2(e.m2)}.`, origen: referencial },
  ];
  return {
    slug,
    nombre: e.nombre,
    mandante: e.mandante,
    comuna: e.comuna,
    anio: String(e.inicio[1]),
    servicios: e.servicios,
    superficie: m2(e.m2),
    plazo: `${plazo} meses`,
    magnitud: `${m2(e.m2)} · ${plazo} meses`,
    estado: 'futuro',
    imagen: { src: e.foto, tipo: 'referencial', origen: e.credito },
    datosEjemplo: true,
    tipos: tiposDe(e.uso),
    etapas,
    galeria: [],
    avance: null,
    inicio: mesAnio(e.inicio),
    entregaEstimada: mesAnio(e.entrega),
  };
};

/** calendario previsto de un futuro proyecto: inicio, obra gruesa, terminaciones y entrega */
export const calendarioPrevisto = (p: Proyecto) => {
  const e = p.slug ? ejemplosFuturos[p.slug] : undefined;
  if (!e) return [];
  const plazo = meses(e.inicio, e.entrega);
  return [
    { hito: 'Inicio de obra', fecha: mesAnio(e.inicio), texto: 'Instalación de faena y excavación.' },
    { hito: 'Obra gruesa', fecha: mesAnio(e.inicio, -Math.round(plazo / 4)), texto: 'Fundaciones, estructura y losas.' },
    { hito: 'Terminaciones', fecha: mesAnio(e.inicio, -Math.round((plazo * 2) / 3)), texto: 'Revestimientos e instalaciones.' },
    { hito: 'Entrega', fecha: mesAnio(e.entrega), texto: 'Obra terminada y recibida.' },
  ];
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

// [archivo del render, slug de su ficha (el nombre del render de 2018)]
const enConstruccion: [string, string][] = [
  ['c01-zhu_sa.jpg', 'zhu_sa'],
  ['c02-xia.jpg', 'xia'],
  ['c03-altomaipu.jpg', 'altomaipu'],
  ['c04-zhu_gay.jpg', 'zhu_gay'],
  ['c05-sazie2642.jpg', 'sazie2642'],
  ['c06-broncerias.jpg', 'broncerias'],
  ['c07-ula444.jpg', 'ula444'],
];

export const proyectos: Proyecto[] = [
  ...terminados.map(([a, slug], i) => ficha('terminado', imagen(`2018/${a}`, 'foto'), slug, i)),
  ...enConstruccion.map(([a, slug], i) => fichaEjecucion(imagen(`2018/${a}`, 'render'), slug, i)),
  ...Object.keys(ejemplosFuturos).map(fichaFutura),
];

/** página de cada sección de obras */
export const paginaDe = { terminado: 'terminados', 'en-construccion': 'construccion', futuro: 'futuros' } as const satisfies Record<Estado, string>;

export const porEstado = (estado: Estado) => proyectos.filter((p) => p.estado === estado);

/** obras que tienen ficha propia (finalizadas, en ejecución y futuras) */
export const conFicha = () => proyectos.filter((p) => p.slug);

/** texto alternativo cuando la obra todavía no tiene nombre */
export const altObra = (p: Proyecto, numero: number) => {
  const n = String(numero).padStart(2, '0');
  const que = p.imagen?.tipo === 'render' ? 'Render' : p.imagen?.tipo === 'referencial' ? 'Imagen referencial' : 'Foto';
  const estado = p.estado === 'terminado' ? 'obra finalizada' : p.estado === 'futuro' ? 'próximo proyecto' : 'obra en ejecución';
  return p.nombre ? `${que} de ${p.nombre}` : `${que} de la ${estado} ${n}`;
};
