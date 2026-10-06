// Oficios y profesionales que LOLS suele necesitar ("Trabaja con nosotros"). Cada uno tiene un botón
// "Postular" que deja el formulario listo con su cargo y su área.
// DATOS DE EJEMPLO (06-10-2026): Marcos pidió algunos para ver cómo se ve; la lista real la confirma
// la jefatura o Recursos Humanos. Para cambiarla basta con editar esta lista: `area` tiene que ser
// una de las opciones del formulario (`areas` en src/propuestas/comun/FormPostulacion.astro).

export interface Oficio {
  nombre: string;
  /** área del formulario de postulación que se elige al apretar "Postular" */
  area: string;
  texto: string;
}

export interface GrupoOficios {
  grupo: string;
  oficios: Oficio[];
}

/** true mientras la lista sea de ejemplo: el sitio la marca "Datos de ejemplo" */
export const oficiosEjemplo = true;

export const oficios: GrupoOficios[] = [
  {
    grupo: 'En obra',
    oficios: [
      { nombre: 'Jefe de obra', area: 'Obra gruesa', texto: 'Dirige la obra en terreno: plazos, cuadrillas, calidad y seguridad.' },
      { nombre: 'Capataz', area: 'Obra gruesa', texto: 'Organiza las cuadrillas y el avance de cada día.' },
      { nombre: 'Maestro carpintero', area: 'Obra gruesa', texto: 'Moldajes, obra gruesa y terminaciones en madera.' },
      { nombre: 'Maestro albañil', area: 'Obra gruesa', texto: 'Albañilería, estucos y radieres.' },
      { nombre: 'Maestro de terminaciones', area: 'Terminaciones', texto: 'Pintura, cerámicas, tabiques y cielos.' },
      { nombre: 'Soldador', area: 'Montaje industrial', texto: 'Estructuras metálicas, soportes y pasarelas.' },
      { nombre: 'Electricista', area: 'Electricidad', texto: 'Alumbrado, fuerza y tableros; idealmente con licencia SEC.' },
      { nombre: 'Técnico en redes', area: 'Voz y datos', texto: 'Cableado estructurado, racks y certificación de puntos.' },
    ],
  },
  {
    grupo: 'Profesionales y oficina técnica',
    oficios: [
      { nombre: 'Arquitecto', area: 'Oficina técnica o administración', texto: 'Proyectos, planos y permisos municipales.' },
      { nombre: 'Prevencionista de riesgos', area: 'Prevención de riesgos', texto: 'Seguridad en obra: charlas, inspecciones y registros.' },
      { nombre: 'Administrativo de obra', area: 'Oficina técnica o administración', texto: 'Bodega, documentos y control de asistencia.' },
    ],
  },
];
