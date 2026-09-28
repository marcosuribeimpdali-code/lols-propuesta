// Servicios confirmados. En el sitio de 2018 ninguno tenía descripción, solo el nombre:
// `descripcion: null` hace que la página muestre un marcador [PENDIENTE] en su lugar.

export type IconoServicio =
  | 'construccion'
  | 'montaje'
  | 'mantencion'
  | 'electricidad'
  | 'datos'
  | 'muebles';

export interface Servicio {
  slug: string;
  nombre: string;
  icono: IconoServicio;
  descripcion: string | null;
}

export const servicios: Servicio[] = [
  { slug: 'construccion', nombre: 'Construcción', icono: 'construccion', descripcion: null },
  { slug: 'montaje-industrial', nombre: 'Montaje industrial', icono: 'montaje', descripcion: null },
  { slug: 'mantencion', nombre: 'Mantención', icono: 'mantencion', descripcion: null },
  { slug: 'electricidad', nombre: 'Electricidad', icono: 'electricidad', descripcion: null },
  { slug: 'voz-y-datos', nombre: 'Voz y datos', icono: 'datos', descripcion: null },
  { slug: 'muebles', nombre: 'Muebles', icono: 'muebles', descripcion: null },
];
