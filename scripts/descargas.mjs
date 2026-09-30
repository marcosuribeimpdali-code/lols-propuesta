// Genera las piezas que se descargan o comparten, a partir de las páginas /descargas/* del servidor
// de desarrollo (src/pages/descargas/[pieza].astro), con Chrome sin ventana:
//   public/compartir.jpg                   vista previa al compartir el enlace (1200 × 630)
//   public/descargas/presentacion-lols.pdf presentación corporativa (A4 horizontal)
//
// Uso: con `npm run dev` corriendo, en otra terminal:  node scripts/descargas.mjs
// Volver a correrlo cada vez que cambien los datos o las fotos, y subir los dos archivos.
// CHROME=<ruta> si Chrome no está en la ruta de siempre; BASE=<url> si el servidor no es :4321.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const CHROME =
  process.env.CHROME ??
  (process.platform === 'win32'
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    : process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : 'google-chrome');
const PUERTO = 9345;
const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'lols-descargas-'));
const raiz = path.resolve(import.meta.dirname, '..');

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PUERTO}`, `--user-data-dir=${perfil}`, '--hide-scrollbars', 'about:blank']);
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
let pagina;
for (let i = 0; i < 40 && !pagina; i++) {
  await esperar(250);
  try {
    pagina = (await (await fetch(`http://127.0.0.1:${PUERTO}/json`)).json()).find((t) => t.type === 'page');
  } catch {}
}
if (!pagina) throw new Error('No se pudo abrir Chrome');
const ws = new WebSocket(pagina.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pendientes = new Map();
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pendientes.has(d.id)) (pendientes.get(d.id)(d), pendientes.delete(d.id));
};
const cdp = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pendientes.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
// espera a que carguen las fuentes y todas las fotos (las de abajo vienen en "lazy" y no cargarían
// nunca sin scroll: se pasan a "eager"), con tope de 30 s; y saca la barra de desarrollo de Astro
const lista = () =>
  cdp('Runtime.evaluate', {
    expression: `(async () => {
      document.querySelector('astro-dev-toolbar')?.remove();
      for (const i of document.images) i.loading = 'eager';
      await document.fonts.ready;
      const fotos = Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; })));
      await Promise.race([fotos, new Promise((r) => setTimeout(r, 30000))]);
      return [...document.images].filter((i) => !i.complete || !i.naturalWidth).length;
    })()`,
    awaitPromise: true,
    returnByValue: true,
  });

try {
  await cdp('Page.enable');

  // vista previa al compartir
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await cdp('Page.navigate', { url: `${BASE}/descargas/compartir/` });
  await esperar(1500);
  await lista();
  const foto = await cdp('Page.captureScreenshot', { format: 'jpeg', quality: 86 });
  fs.writeFileSync(path.join(raiz, 'public/compartir.jpg'), Buffer.from(foto.result.data, 'base64'));
  console.log('listo public/compartir.jpg');

  // presentación en PDF
  await cdp('Emulation.clearDeviceMetricsOverride');
  await cdp('Emulation.setEmulatedMedia', { media: 'print' });
  await cdp('Page.navigate', { url: `${BASE}/descargas/presentacion/` });
  await esperar(2000);
  await lista();
  // el PDF sale por partes (stream): entero en un solo mensaje puede ser demasiado grande
  const pdf = await cdp('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, transferMode: 'ReturnAsStream' });
  const partes = [];
  for (;;) {
    const { result } = await cdp('IO.read', { handle: pdf.result.stream, size: 1 << 20 });
    partes.push(Buffer.from(result.data, result.base64Encoded ? 'base64' : 'utf8'));
    if (result.eof) break;
  }
  await cdp('IO.close', { handle: pdf.result.stream });
  fs.mkdirSync(path.join(raiz, 'public/descargas'), { recursive: true });
  fs.writeFileSync(path.join(raiz, 'public/descargas/presentacion-lols.pdf'), Buffer.concat(partes));
  console.log('listo public/descargas/presentacion-lols.pdf');
} finally {
  ws.close();
  chrome.kill();
}
