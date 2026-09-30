// Datos de la empresa. Fuente: kit de propuesta (LEEME-PARA-LA-IA.md § 10).
// `revisar` = dato usable pero por confirmar con la jefatura: el sitio lo muestra marcado.
// No inventar datos: lo que falte va como `null` y el sitio pone un marcador [PENDIENTE].

export interface Dato {
  valor: string;
  revisar?: string;
}

/** años en el mercado (dato de la empresa, 2026) */
const anios = 31;

export const empresa = {
  anios,
  /** cifras de la empresa (2026). No hay registro exacto de las obras de todos estos años: "más de 50" es
   *  lo seguro. Los m² construidos no se saben todavía. */
  cifras: { obras: 50, trabajadores: 300 },
  cifrasRevisar: 'que «300 y algo» sea la cantidad de trabajadores actual',
  razonSocial: 'LOLS Ingeniería Limitada',
  nombreCorto: 'LOLS Ingeniería',
  lema: 'Sus proyectos en las mejores manos',
  directrices: 'Experiencia, seguridad y calidad son nuestras directrices.',
  direccion: {
    valor: 'El Mirador 150, Cerrillos, Santiago',
  } satisfies Dato,
  telefono: {
    valor: '+56 652 710 609',
  } satisfies Dato,
  telefonoHref: 'tel:+56652710609',
  /** el mismo número del teléfono (confirmado por la empresa, 30-09-2026) */
  whatsapp: {
    valor: '+56 652 710 609',
  } satisfies Dato,
  correo: {
    valor: 'lols@lols.cl',
  } satisfies Dato,
  experiencia: {
    valor: `${anios} años de experiencia en el área de la construcción.`,
  } satisfies Dato,
  principios: [
    'Un esquema de trabajo basado en el esfuerzo, la creatividad y la responsabilidad.',
    'Compromiso con las normas de seguridad y el respeto por el medio ambiente.',
  ],
};

/** abre un chat de WhatsApp con la empresa y un saludo ya escrito (el visitante lo puede cambiar) */
export const whatsappHref = `https://wa.me/${empresa.whatsapp.valor.replace(/\D/g, '')}?text=${encodeURIComponent(
  'Hola, les escribo desde el sitio web de LOLS Ingeniería.',
)}`;

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
