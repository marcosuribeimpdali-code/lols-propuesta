// Convierte una foto en su "plano": solo las líneas (bordes) en blanco verdoso sobre el verde noche
// de LOLS. Lo usa la cabecera de Contacto ("Del plano a la obra"): foto y plano deben tener el mismo
// tamaño para que calcen al arrastrar la línea.
//
// Uso:  node scripts/plano.mjs <foto.jpg> <plano.jpg> [umbral]
//   umbral (por defecto 16): más alto = menos líneas (para fotos con mucha textura).
// Para cambiar la foto de Contacto: reemplazar src/assets/contacto/obra-terminada.jpg y correr
//   node scripts/plano.mjs src/assets/contacto/obra-terminada.jpg src/assets/contacto/obra-terminada-plano.jpg
import fs from 'node:fs';
import sharp from 'sharp';

const [entrada, salida, umbralTxt] = process.argv.slice(2);
if (!entrada || !salida) {
  console.error('uso: node scripts/plano.mjs <foto.jpg> <plano.jpg> [umbral]');
  process.exit(1);
}
const umbral = Number(umbralTxt || 16);
const FONDO = [11, 45, 24]; // verde noche
const LINEA = [214, 240, 196]; // blanco verdoso

sharp.cache(false);
const { width: W, height: H } = await sharp(fs.readFileSync(entrada)).metadata();
// Laplaciano 3×3 sobre la foto en gris y apenas desenfocada: resalta los contornos
const { data } = await sharp(fs.readFileSync(entrada))
  .greyscale()
  .blur(1.1)
  .convolve({ width: 3, height: 3, kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1] })
  .raw()
  .toBuffer({ resolveWithObject: true });
const rgb = Buffer.alloc(W * H * 3);
for (let i = 0; i < W * H; i++) {
  const e = data[i] < umbral ? 0 : Math.min(1, (data[i] - umbral) / 60);
  for (let k = 0; k < 3; k++) rgb[i * 3 + k] = Math.round(FONDO[k] + e * (LINEA[k] - FONDO[k]));
}
await sharp(rgb, { raw: { width: W, height: H, channels: 3 } }).jpeg({ quality: 82, mozjpeg: true }).toFile(salida);
console.log(`listo ${salida} (${W} × ${H})`);
