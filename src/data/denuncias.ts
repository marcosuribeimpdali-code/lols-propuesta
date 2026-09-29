// Canal de denuncias. Armado como lo hacen las constructoras chilenas revisadas en 2026
// (Echeverría Izquierdo, Besalco, Ingevec, Inarco, Sigro, Precon): dos vías.
//   1. Delitos y faltas a la ética (Ley 20.393 y normas internas): admite denuncia anónima y se
//      sigue con folio + contraseña.
//   2. Ley Karin (21.643): acoso laboral, acoso sexual y violencia en el trabajo. Va identificada,
//      como en la mayoría de los sitios revisados, y también se puede presentar en la Inspección
//      del Trabajo.
// Todo el texto es un borrador: lo revisa quien vea lo legal en la empresa antes de publicar.

export const categoriasEtica = [
  'Cohecho o soborno',
  'Corrupción entre particulares',
  'Lavado de activos, financiamiento del terrorismo o receptación',
  'Administración desleal o apropiación indebida',
  'Fraude o adulteración de documentos',
  'Colusión o faltas a la libre competencia',
  'Conflicto de interés',
  'Mal uso de bienes o información de la empresa',
  'Condiciones inseguras en obra',
  'Daño al medio ambiente',
  'Discriminación',
  'Represalias por haber denunciado',
  'Otra falta a la ley o a las normas internas',
];

export const tiposKarin = [
  { valor: 'acoso-laboral', texto: 'Acoso laboral' },
  { valor: 'acoso-sexual', texto: 'Acoso sexual' },
  { valor: 'violencia', texto: 'Violencia en el trabajo (por ejemplo, de un cliente o de un tercero)' },
];

export const relaciones = [
  'Trabajador o trabajadora de LOLS',
  'Trabajador o trabajadora de un contratista o subcontratista',
  'Proveedor',
  'Cliente o mandante',
  'Vecino o comunidad',
  'Postulante',
  'Otra',
];

export const comoSupo = ['Lo vi o me pasó a mí', 'Me lo contaron', 'Por documentos o registros', 'Otra forma'];

export const quienesPueden =
  'Trabajadores de LOLS y de sus contratistas y subcontratistas, proveedores, clientes, vecinos de nuestras obras y cualquier persona que sepa de algo que va contra la ley o contra nuestras normas.';

export const garantias = [
  {
    titulo: 'Reserva',
    texto: 'Solo las personas a cargo de la investigación conocerán su denuncia, y sus datos se tratarán con estricta reserva.',
  },
  {
    titulo: 'Anonimato',
    texto: 'En las denuncias por delitos o faltas a la ética puede no identificarse. Si nos deja un medio de contacto, podremos investigar mejor.',
  },
  {
    titulo: 'Sin represalias',
    texto: 'Nadie será sancionado ni perjudicado por denunciar de buena fe. Cualquier represalia se investigará como falta grave.',
  },
  {
    titulo: 'Seguimiento',
    texto: 'Al enviar recibirá un folio. Guárdelo junto a su contraseña: si no se identificó, es la única forma de consultar su caso.',
  },
];

export const pasos = [
  { titulo: 'Recibe su folio', texto: 'Apenas envía la denuncia, con la fecha en que la recibimos.' },
  { titulo: 'Revisión inicial', texto: 'La persona a cargo revisa los antecedentes y decide si corresponde investigar.' },
  { titulo: 'Investigación', texto: 'Con reserva, escuchando a las partes y revisando la evidencia.' },
  { titulo: 'Resultado', texto: 'Le informamos el cierre. Puede consultarlo en cualquier momento con su folio.' },
];
