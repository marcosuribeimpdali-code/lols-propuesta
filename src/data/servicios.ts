// Servicios confirmados. En el sitio de 2018 ninguno tenía descripción, solo el nombre: las de
// ahora son textos propuestos (generales, sin datos inventados) para validar con la jefatura.
// Muebles salió en 2026: la empresa ya no los fabrica.
// Cada servicio se cuenta distinto según dónde aparece, para no repetir lo mismo en todo el sitio:
//   - portada: nombre + `corto` (una línea);
//   - Servicios: `descripcion` + `detalle` + `incluye` (el que llega ahí quiere saber más).
// `descripcion: null` hace que la página muestre un marcador [PENDIENTE] en su lugar.

export type IconoServicio = 'construccion' | 'montaje' | 'mantencion' | 'electricidad' | 'datos';

export interface Servicio {
  slug: string;
  nombre: string;
  icono: IconoServicio;
  /** una línea, para la portada */
  corto: string;
  descripcion: string | null;
  /** segundo párrafo, solo en la página Servicios */
  detalle: string;
  /** qué incluye, solo en la página Servicios */
  incluye: string[];
  /** dato por confirmar con la jefatura */
  revisar?: string;
}

export const servicios: Servicio[] = [
  {
    slug: 'construccion',
    nombre: 'Construcción',
    icono: 'construccion',
    corto: 'Obra gruesa y terminaciones, de las fundaciones a la entrega.',
    descripcion: 'Obra gruesa y terminaciones: desde las fundaciones y la estructura hasta los revestimientos y la entrega de la obra.',
    detalle:
      'Podemos tomar la obra completa o solo la etapa que usted necesite. Trabajamos con los planos y especificaciones del proyecto y coordinamos en terreno a las distintas especialidades para cumplir el plazo acordado.',
    incluye: ['Excavaciones y fundaciones', 'Estructura y obra gruesa', 'Terminaciones', 'Ampliaciones y remodelaciones', 'Coordinación de especialidades'],
  },
  {
    slug: 'montaje-industrial',
    nombre: 'Montaje industrial',
    icono: 'montaje',
    corto: 'Estructuras metálicas, equipos y soportes.',
    descripcion: 'Montaje de estructuras metálicas, equipos y soportes en plantas, bodegas e instalaciones industriales.',
    detalle:
      'Planificamos cada maniobra con foco en la seguridad de las personas y en no interrumpir la operación del recinto: qué se monta, en qué orden, con qué equipos y en qué horario.',
    incluye: ['Estructuras metálicas', 'Montaje de equipos', 'Soportes, pasarelas y plataformas', 'Galpones y bodegas'],
  },
  {
    slug: 'mantencion',
    nombre: 'Mantención',
    icono: 'mantencion',
    corto: 'Preventiva y correctiva, para que todo siga funcionando.',
    descripcion: 'Mantención preventiva y correctiva de edificios e instalaciones, para que sigan funcionando de forma segura.',
    detalle:
      'Para edificios e instalaciones que ya están en uso: revisiones programadas para anticipar fallas y reparaciones cuando algo se daña. Así el recinto dura más y se evitan paradas imprevistas.',
    incluye: ['Mantención preventiva programada', 'Reparaciones y mantención correctiva', 'Mantención de edificios', 'Mantención de instalaciones eléctricas'],
  },
  {
    slug: 'electricidad',
    nombre: 'Electricidad',
    icono: 'electricidad',
    corto: 'Alumbrado, fuerza, tableros y canalizaciones.',
    descripcion: 'Instalaciones eléctricas de alumbrado y fuerza, tableros y canalizaciones, según la normativa eléctrica vigente.',
    detalle:
      'Ejecutamos instalaciones para obras nuevas, ampliaciones y regularizaciones, cuidando que cumplan la normativa y queden documentadas para su revisión.',
    incluye: ['Alumbrado', 'Fuerza', 'Tableros eléctricos', 'Canalizaciones', 'Regularización de instalaciones'],
  },
  {
    slug: 'voz-y-datos',
    nombre: 'Voz y datos',
    icono: 'datos',
    corto: 'Cableado estructurado, redes y telefonía.',
    descripcion: 'Cableado estructurado para redes de datos y telefonía: canalizaciones, puntos de red, racks y certificación de cada punto.',
    detalle:
      'Dejamos el recinto conectado: definimos el recorrido del cableado, instalamos los puntos de red y telefonía, ordenamos los racks y certificamos cada punto para asegurar que funcione.',
    incluye: ['Cableado estructurado', 'Puntos de red y telefonía', 'Racks y gabinetes', 'Certificación de puntos'],
    revisar: 'que se siga ofreciendo y qué incluye',
  },
];

/** aviso único para las descripciones propuestas */
export const revisarDescripciones = 'textos propuestos, a validar con la jefatura';

/** frase que presenta los servicios en conjunto (portada) */
export const fraseServicios =
  'Una obra no termina cuando se entrega: la construimos, la montamos, la dejamos con energía y conectada, y la mantenemos en el tiempo.';

/** "Construcción, montaje industrial, mantención, electricidad, y voz y datos." */
export const listaServicios = (() => {
  const nombres = servicios.map((s, i) => (i === 0 ? s.nombre : s.nombre.toLowerCase()));
  return `${nombres.slice(0, -1).join(', ')}, y ${nombres.at(-1)}.`;
})();
