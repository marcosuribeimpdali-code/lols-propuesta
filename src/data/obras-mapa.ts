// "Obras en Santiago" (portada, 06-10-2026): dónde están las obras que LOLS tiene registradas en
// Bóveda (respaldo de octubre de 2026: activas = en ejecución; las dos finalizadas en 2026 =
// terminadas). Para cuidar a los clientes NO se guarda ni se publica la dirección: cada obra va
// redondeada a unos 300 m (0,003°) y sin nombre. Ubicadas con OpenStreetMap (Nominatim).
// Para actualizar: sumar o quitar filas; el mapa (src/data/mapa-santiago.json) no cambia.
import mapa from './mapa-santiago.json';

export type EstadoMapa = 'ejecucion' | 'terminada';

export interface ObraMapa {
  lat: number;
  lon: number;
  comuna: string;
  estado: EstadoMapa;
}

export const obrasMapa: ObraMapa[] = [
  { lat: -33.486, lon: -70.695, comuna: 'Cerrillos', estado: 'ejecucion' },
  { lat: -33.459, lon: -70.671, comuna: 'Santiago', estado: 'terminada' },
  { lat: -33.459, lon: -70.677, comuna: 'Santiago', estado: 'ejecucion' },
  { lat: -33.459, lon: -70.674, comuna: 'Santiago', estado: 'ejecucion' },
  { lat: -33.462, lon: -70.671, comuna: 'Santiago', estado: 'terminada' },
  { lat: -33.45, lon: -70.674, comuna: 'Santiago', estado: 'ejecucion' },
  { lat: -33.456, lon: -70.674, comuna: 'Santiago', estado: 'ejecucion' },
  { lat: -33.447, lon: -70.677, comuna: 'Santiago', estado: 'ejecucion' },
  { lat: -33.456, lon: -70.677, comuna: 'Santiago', estado: 'ejecucion' },
  { lat: -33.453, lon: -70.665, comuna: 'Santiago', estado: 'ejecucion' },
];

/** la oficina sí va en su dirección (es pública: está en Contacto) */
export const oficinaMapa = { lat: -33.5022, lon: -70.7316 };

/** mismo encuadre y escala que el mapa de comunas (scripts/mapa-santiago.mjs) */
export const proyectar = (lat: number, lon: number): [number, number] => {
  const { bbox, ancho } = mapa;
  const kx = Math.cos((((bbox.sur + bbox.norte) / 2) * Math.PI) / 180);
  const escala = ancho / ((bbox.este - bbox.oeste) * kx);
  return [Math.round((lon - bbox.oeste) * kx * escala * 10) / 10, Math.round((bbox.norte - lat) * escala * 10) / 10];
};
