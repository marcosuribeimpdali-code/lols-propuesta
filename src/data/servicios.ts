// Servicios confirmados. En el sitio de 2018 ninguno tenía descripción, solo el nombre: las de
// ahora son textos propuestos (generales, sin datos inventados) para validar con la jefatura.
// Muebles salió en 2026: la empresa ya no los fabrica.
// `descripcion: null` hace que la página muestre un marcador [PENDIENTE] en su lugar.

export type IconoServicio = 'construccion' | 'montaje' | 'mantencion' | 'electricidad' | 'datos';

export interface Servicio {
  slug: string;
  nombre: string;
  icono: IconoServicio;
  descripcion: string | null;
  /** dato por confirmar con la jefatura */
  revisar?: string;
}

export const servicios: Servicio[] = [
  {
    slug: 'construccion',
    nombre: 'Construcción',
    icono: 'construccion',
    descripcion: 'Obra gruesa y terminaciones: desde las fundaciones y la estructura hasta los revestimientos y la entrega de la obra.',
  },
  {
    slug: 'montaje-industrial',
    nombre: 'Montaje industrial',
    icono: 'montaje',
    descripcion: 'Montaje de estructuras metálicas, equipos y soportes en plantas, bodegas e instalaciones industriales.',
  },
  {
    slug: 'mantencion',
    nombre: 'Mantención',
    icono: 'mantencion',
    descripcion: 'Mantención preventiva y correctiva de edificios e instalaciones, para que sigan funcionando de forma segura.',
  },
  {
    slug: 'electricidad',
    nombre: 'Electricidad',
    icono: 'electricidad',
    descripcion: 'Instalaciones eléctricas de alumbrado y fuerza, tableros y canalizaciones, según la normativa eléctrica vigente.',
  },
  {
    slug: 'voz-y-datos',
    nombre: 'Voz y datos',
    icono: 'datos',
    descripcion: 'Cableado estructurado para redes de datos y telefonía: canalizaciones, puntos de red, racks y certificación de cada punto.',
    revisar: 'que se siga ofreciendo y qué incluye',
  },
];

/** aviso único para las descripciones propuestas */
export const revisarDescripciones = 'textos propuestos, a validar con la jefatura';

/** "Construcción, montaje industrial, mantención, electricidad, y voz y datos." */
export const listaServicios = (() => {
  const nombres = servicios.map((s, i) => (i === 0 ? s.nombre : s.nombre.toLowerCase()));
  return `${nombres.slice(0, -1).join(', ')}, y ${nombres.at(-1)}.`;
})();
