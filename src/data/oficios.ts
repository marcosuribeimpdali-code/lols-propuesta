// Cargos de "Trabaja con nosotros" (06-10-2026): dos grupos (botones "En obra" y "Profesionales y
// oficina técnica"); al elegir uno se ven sus cargos, y al apretar "Postular" aparece el formulario
// con el cargo ya puesto y SUS preguntas, para que las postulaciones lleguen separadas y filtradas.
// En obra el CV y el correo son opcionales (muchos maestros no tienen); en profesionales, el CV es
// obligatorio. Cada cargo tiene su enlace: /trabaja-con-nosotros/#<id> abre su postulación.
// DATOS DE EJEMPLO: los cargos, requisitos y preguntas reales los define la jefatura o Recursos
// Humanos. `area` tiene que ser una de las opciones del formulario (`areas` en
// src/propuestas/comun/FormPostulacion.astro).

export interface Pregunta {
  texto: string;
  opciones: string[];
  /** true = puede marcar varias (casillas); si no, una sola y es obligatoria */
  varias?: boolean;
}

export interface Oficio {
  /** se usa en el enlace del cargo (#id) */
  id: string;
  nombre: string;
  area: string;
  texto: string;
  preguntas: Pregunta[];
}

export interface GrupoOficios {
  id: 'en-obra' | 'profesionales';
  grupo: string;
  /** lo que dice el botón del grupo */
  bajada: string;
  /** el CV (y el correo) se piden obligatorios o no */
  cvObligatorio: boolean;
  oficios: Oficio[];
}

/** true mientras la lista sea de ejemplo: el sitio la marca "Datos de ejemplo" */
export const oficiosEjemplo = true;

export const oficios: GrupoOficios[] = [
  {
    id: 'en-obra',
    grupo: 'En obra',
    bajada: 'Maestros, capataces, soldadores, electricistas y técnicos. No necesita CV.',
    cvObligatorio: false,
    oficios: [
      { id: 'capataz', nombre: 'Capataz', area: 'Obra gruesa', texto: 'Organiza las cuadrillas y el avance de cada día.', preguntas: [{ texto: '¿Cuántas personas ha tenido a cargo?', opciones: ['Hasta 5', '6 a 15', 'Más de 15'] }] },
      { id: 'maestro-carpintero', nombre: 'Maestro carpintero', area: 'Obra gruesa', texto: 'Moldajes, obra gruesa y terminaciones en madera.', preguntas: [{ texto: '¿En qué se especializa?', opciones: ['Moldajes', 'Obra gruesa', 'Terminaciones'], varias: true }, { texto: '¿Tiene herramientas propias?', opciones: ['Sí', 'No'] }] },
      { id: 'maestro-albanil', nombre: 'Maestro albañil', area: 'Obra gruesa', texto: 'Albañilería, estucos y radieres.', preguntas: [{ texto: '¿En qué se especializa?', opciones: ['Albañilería', 'Estucos', 'Radieres'], varias: true }] },
      { id: 'maestro-terminaciones', nombre: 'Maestro de terminaciones', area: 'Terminaciones', texto: 'Pintura, cerámicas, tabiques y cielos.', preguntas: [{ texto: '¿En qué se especializa?', opciones: ['Pintura', 'Cerámica', 'Tabiques', 'Cielos'], varias: true }] },
      { id: 'soldador', nombre: 'Soldador', area: 'Montaje industrial', texto: 'Estructuras metálicas, soportes y pasarelas.', preguntas: [{ texto: '¿Qué procesos domina?', opciones: ['Arco manual', 'MIG', 'TIG'], varias: true }, { texto: '¿Tiene certificación de soldadura?', opciones: ['Sí', 'No'] }] },
      { id: 'electricista', nombre: 'Electricista', area: 'Electricidad', texto: 'Alumbrado, fuerza y tableros; idealmente con licencia SEC.', preguntas: [{ texto: '¿Tiene licencia SEC?', opciones: ['Clase A', 'Clase B', 'Clase C', 'Clase D', 'No tengo'] }] },
      { id: 'tecnico-redes', nombre: 'Técnico en redes', area: 'Voz y datos', texto: 'Cableado estructurado, racks y certificación de puntos.', preguntas: [{ texto: '¿Ha certificado puntos de red?', opciones: ['Sí, con certificador', 'No'] }] },
    ],
  },
  {
    id: 'profesionales',
    grupo: 'Profesionales y oficina técnica',
    bajada: 'Jefe de obra, arquitecto, prevencionista y administración. Con CV.',
    cvObligatorio: true,
    oficios: [
      { id: 'jefe-de-obra', nombre: 'Jefe de obra', area: 'Obra gruesa', texto: 'Dirige la obra en terreno: plazos, cuadrillas, calidad y seguridad.', preguntas: [{ texto: '¿Qué título tiene?', opciones: ['Constructor civil', 'Ingeniero constructor', 'Arquitecto', 'Otro'] }, { texto: '¿Cuántos años ha dirigido obras?', opciones: ['Menos de 2', '2 a 5', 'Más de 5'] }] },
      { id: 'arquitecto', nombre: 'Arquitecto', area: 'Oficina técnica o administración', texto: 'Proyectos, planos y permisos municipales.', preguntas: [{ texto: '¿Ha tramitado permisos en la DOM?', opciones: ['Sí', 'No'] }, { texto: '¿Qué programas usa?', opciones: ['AutoCAD', 'Revit', 'SketchUp'], varias: true }] },
      { id: 'prevencionista', nombre: 'Prevencionista de riesgos', area: 'Prevención de riesgos', texto: 'Seguridad en obra: charlas, inspecciones y registros.', preguntas: [{ texto: '¿Está inscrito en la SEREMI de Salud?', opciones: ['Sí', 'En trámite', 'No'] }] },
      { id: 'administrativo-de-obra', nombre: 'Administrativo de obra', area: 'Oficina técnica o administración', texto: 'Bodega, documentos y control de asistencia.', preguntas: [{ texto: '¿Qué ha hecho antes?', opciones: ['Bodega', 'Asistencia', 'Documentos de obra'], varias: true }] },
    ],
  },
];
