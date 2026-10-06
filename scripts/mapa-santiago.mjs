// Arma el mapa de comunas para "Obras en Santiago" (portada, 06-10-2026): proyecta los límites
// comunales a un SVG de 1000 px de ancho y guarda los trazos en src/data/mapa-santiago.json.
// Fuente de los límites: Biblioteca del Congreso Nacional (BCN), en el GeoJSON de la Región
// Metropolitana de github.com/caracena/chile-geojson (archivo 13.geojson).
// uso: node scripts/mapa-santiago.mjs <ruta a 13.geojson>
// Si cambia el encuadre (BBOX), los puntos de src/data/obras-mapa.ts se reubican solos (usan el
// mismo encuadre, que queda guardado en el JSON).
import fs from 'node:fs';

const BBOX = { oeste: -70.752, este: -70.638, sur: -33.512, norte: -33.432 };
// etiquetas puestas a mano (en lat/lon) donde la automática queda tapada por las obras
const ETIQUETAS = { Santiago: [-70.652, -33.47], 'Pedro Aguirre Cerda': [-70.67, -33.4935] };
const ANCHO = 1000;
const lat0 = ((BBOX.sur + BBOX.norte) / 2) * (Math.PI / 180);
const kx = Math.cos(lat0);
const escala = ANCHO / ((BBOX.este - BBOX.oeste) * kx);
const ALTO = Math.round((BBOX.norte - BBOX.sur) * escala);
const proy = ([lon, lat]) => [(lon - BBOX.oeste) * kx * escala, (BBOX.norte - lat) * escala];
const r1 = (n) => Math.round(n * 10) / 10;

const geo = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const comunas = [];
for (const f of geo.features) {
  const g = f.geometry;
  const poligonos = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
  let d = '';
  let mayor = null;
  let dentro = false;
  for (const pol of poligonos) {
    for (const anillo of pol) {
      const pts = [];
      for (const c of anillo) {
        const [x, y] = proy(c);
        const ult = pts[pts.length - 1];
        if (!ult || Math.hypot(x - ult[0], y - ult[1]) > 1.5) pts.push([x, y]);
        if (x > -50 && x < ANCHO + 50 && y > -50 && y < ALTO + 50) dentro = true;
      }
      if (pts.length < 3) continue;
      d += 'M' + pts.map(([x, y]) => `${r1(x)},${r1(y)}`).join('L') + 'Z';
      if (!mayor || pts.length > mayor.length) mayor = pts;
    }
  }
  if (!dentro || !d) continue;
  // etiqueta en el centro de la parte que se ve del anillo más grande (si se ve lo suficiente)
  const vis = mayor.filter(([x, y]) => x > 70 && x < ANCHO - 70 && y > 40 && y < ALTO - 40);
  const cx = vis.reduce((s, p) => s + p[0], 0) / (vis.length || 1);
  const cy = vis.reduce((s, p) => s + p[1], 0) / (vis.length || 1);
  const fija = ETIQUETAS[f.properties.Comuna];
  const etiqueta = fija ? proy(fija).map(r1) : vis.length >= 12 ? [r1(cx), r1(cy)] : null;
  comunas.push({ nombre: f.properties.Comuna, d, etiqueta });
}
fs.writeFileSync('src/data/mapa-santiago.json', JSON.stringify({ ancho: ANCHO, alto: ALTO, bbox: BBOX, comunas }));
console.log('comunas', comunas.length, 'tamaño', ANCHO, 'x', ALTO, Math.round(fs.statSync('src/data/mapa-santiago.json').size / 1024), 'KB');
