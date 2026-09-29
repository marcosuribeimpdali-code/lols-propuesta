// Obras. El sitio de 2018 mostraba 8 terminadas y 7 en construcción. De ahí vienen las
// imágenes (src/assets/obras/2018/, 500 px y sin el marco verde que traían pegado): las
// terminadas son fotos; las "en construcción" son renders con el sello "Próximas entregas".
// Los datos de cada obra están pendientes con la jefatura: todo campo `null` se muestra como
// [PENDIENTE] en el sitio.
//
// Para cambiar una imagen: reemplazar el archivo en src/assets/obras/ (mismo nombre) o apuntar
// `archivo` a uno nuevo. Para cargar una obra: completar sus campos.

import type { ImageMetadata } from 'astro';

export type Estado = 'terminado' | 'en-construccion';

export interface Imagen {
  src: ImageMetadata;
  tipo: 'foto' | 'render';
  /** de dónde salió, para la marca de revisión */
  origen: string;
}

export interface Proyecto {
  nombre: string | null;
  mandante: string | null;
  comuna: string | null;
  anio: string | null;
  servicios: string[] | null;
  /** m², plazo u otra magnitud que dé idea del tamaño de la obra */
  magnitud: string | null;
  estado: Estado;
  imagen: Imagen | null;
}

const archivos = import.meta.glob<ImageMetadata>('../assets/obras/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const imagen = (archivo: string, tipo: Imagen['tipo']): Imagen | null => {
  const src = archivos[`../assets/obras/${archivo}`];
  return src ? { src, tipo, origen: 'sitio lols.cl de 2018' } : null;
};

const ficha = (estado: Estado, img: Imagen | null): Proyecto => ({
  nombre: null,
  mandante: null,
  comuna: null,
  anio: null,
  servicios: null,
  magnitud: null,
  estado,
  imagen: img,
});

const terminados = [
  't01-b_cam_esp.jpg',
  't02-renacer_bas.jpg',
  't03-eiffel_am.jpg',
  't04-ventura_esp.jpg',
  't05-abate.jpg',
  't06-kolm_am.jpg',
  't07-mak_sa.jpg',
  't08-zhu_am.jpg',
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
  ...terminados.map((a) => ficha('terminado', imagen(`2018/${a}`, 'foto'))),
  ...enConstruccion.map((a) => ficha('en-construccion', imagen(`2018/${a}`, 'render'))),
];

export const porEstado = (estado: Estado) => proyectos.filter((p) => p.estado === estado);

/** texto alternativo cuando la obra todavía no tiene nombre */
export const altObra = (p: Proyecto, numero: number) => {
  const n = String(numero).padStart(2, '0');
  const que = p.imagen?.tipo === 'render' ? 'Render' : 'Foto';
  const estado = p.estado === 'terminado' ? 'obra terminada' : 'obra en ejecución';
  return p.nombre ? `${que} de ${p.nombre}` : `${que} de la ${estado} ${n}`;
};
