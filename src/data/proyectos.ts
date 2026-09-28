// Obras. El sitio de 2018 mostraba 8 terminadas y 7 en construcción, solo como imágenes y sin
// datos; el listado actualizado está pendiente con la jefatura. Mientras tanto se generan fichas
// vacías con la misma cantidad, para que se vea cómo queda la página.
//
// Para cargar una obra real, reemplazar la ficha vacía por un objeto con los datos. Todo campo
// `null` se muestra como [PENDIENTE] en el sitio.

export type Estado = 'terminado' | 'en-construccion';

export interface Proyecto {
  nombre: string | null;
  mandante: string | null;
  comuna: string | null;
  anio: string | null;
  servicios: string[] | null;
  /** m², plazo u otra magnitud que dé idea del tamaño de la obra */
  magnitud: string | null;
  estado: Estado;
  /** rutas dentro de public/, ej. '/obras/edificio-x-1.jpg' */
  fotos: string[];
  /** texto alternativo de la foto principal */
  alt?: string;
}

const fichaVacia = (estado: Estado): Proyecto => ({
  nombre: null,
  mandante: null,
  comuna: null,
  anio: null,
  servicios: null,
  magnitud: null,
  estado,
  fotos: [],
});

export const proyectos: Proyecto[] = [
  ...Array.from({ length: 8 }, () => fichaVacia('terminado')),
  ...Array.from({ length: 7 }, () => fichaVacia('en-construccion')),
];

export const porEstado = (estado: Estado) => proyectos.filter((p) => p.estado === estado);
