// Obras. El sitio de 2018 mostraba 8 terminadas y 7 en construcción. De ahí vienen las
// imágenes (src/assets/obras/2018/, 500 px y sin el marco verde que traían pegado): las
// terminadas son fotos; las "en construcción" son renders con el sello "Próximas entregas".
// Los datos de cada obra están pendientes con la jefatura: todo campo `null` se muestra como
// [PENDIENTE] en el sitio.
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

const ficha = (estado: Estado, img: Imagen | null, slug: string | null = null, i = 0): Proyecto => {
  const n = String(i + 1).padStart(2, '0');
  const despues: Foto[] = img
    ? [{ src: img.src, alt: `Obra ${n} terminada`, etapa: 'Después', ejemplo: false, fecha: null, descripcion: null }]
    : [];
  // se alternan las fotos de ejemplo para que las fichas no se vean todas iguales
  const etapas = slug ? [antes[i % 2], durante[i % 4], ...despues] : [];
  const galeria = slug ? [durante[(i + 1) % 4], durante[(i + 2) % 4]] : [];
  return {
    slug,
    nombre: null,
    mandante: null,
    comuna: null,
    anio: null,
    servicios: null,
    superficie: null,
    plazo: null,
    magnitud: null,
    estado,
    imagen: img,
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
