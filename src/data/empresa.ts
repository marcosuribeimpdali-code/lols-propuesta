// Datos de la empresa. Fuente: kit de propuesta (LEEME-PARA-LA-IA.md § 10).
// `revisar` = dato usable pero por confirmar con la jefatura: el sitio lo muestra marcado.
// No inventar datos: lo que falte va como `null` y el sitio pone un marcador [PENDIENTE].

export interface Dato {
  valor: string;
  revisar?: string;
}

export const empresa = {
  razonSocial: 'LOLS Ingeniería Limitada',
  nombreCorto: 'LOLS Ingeniería',
  lema: 'Sus proyectos en las mejores manos',
  directrices: 'Experiencia, seguridad y calidad son nuestras directrices.',
  direccion: {
    valor: 'El Mirador 112-150, Cerrillos, Santiago',
    revisar: 'que la dirección siga vigente',
  } satisfies Dato,
  telefono: {
    valor: '+56 652 710 609',
    revisar: 'el prefijo 65 es de Osorno, no de Santiago',
  } satisfies Dato,
  telefonoHref: 'tel:+56652710609',
  correo: {
    valor: 'lols@lols.cl',
    revisar: 'que la casilla siga activa',
  } satisfies Dato,
  experiencia: {
    valor: 'Más de 20 años de experiencia en el área de la construcción.',
    revisar: 'la cifra es del sitio de 2018: recalcular',
  } satisfies Dato,
  principios: [
    'Un esquema de trabajo basado en el esfuerzo, la creatividad y la responsabilidad.',
    'Compromiso con las normas de seguridad y el respeto por el medio ambiente.',
  ],
};

// Google Maps a partir de la dirección (sin API key). Si la dirección cambia, el mapa la sigue.
const q = encodeURIComponent(empresa.direccion.valor);
export const mapas = {
  /** abre la ubicación en Google Maps */
  ver: `https://www.google.com/maps/search/?api=1&query=${q}`,
  /** abre la ruta hasta la empresa (en el celular, en la app de Maps) */
  llegar: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  /** mapa incrustado en la página de contacto */
  embed: `https://maps.google.com/maps?q=${q}&z=16&hl=es&output=embed`,
};
