# Sitio web propuesto — LOLS Ingeniería

Propuesta de rediseño de [lols.cl](https://lols.cl), publicada para revisión en
**https://new.lols.cl**. No es el sitio oficial: está fuera de los buscadores (`robots.txt` +
`<meta name="robots" content="noindex">`) y muestra marcas amarillas donde falta contenido.

- `[PENDIENTE: …]` → texto, foto o dato que falta. No se inventa contenido: un hueco evidente es
  mejor que un relleno que parece real.
- `⚠ Por confirmar` → dato que se puede usar pero hay que validar con la jefatura.

## Propuestas

El proyecto guarda varias propuestas de diseño, con las mismas páginas y el mismo contenido; cambia
solo el diseño. **Hoy se publica solo Panorámica**, en la raíz de `new.lols.cl`.

| # | Propuesta | Idea |
|---|---|---|
| 1 | Plano técnico | Sobria y oscura: grilla de plano, rótulos técnicos, verde de marca |
| 2 | Panorámica ✅ | Fotográfica: portada con recorrido aéreo de una obra, verde de la marca |

**Qué se publica** lo decide una línea en `src/propuestas/registro.ts`:

```ts
export const principal: string | null = 'panoramica';
```

- `'panoramica'` (o el slug de otra) → esa propuesta es el sitio, en la raíz (`/quienes-somos/`,
  `/contacto/`…). Las demás no se publican, pero su código sigue en el repo.
- `null` → se publican todas bajo su prefijo (`/plano/`, `/panoramica/`) y la raíz muestra una
  portada para elegir; la barra amarilla permite saltar a la misma página en otra propuesta.

```
src/
  data/                contenido COMPARTIDO (empresa, servicios, obras, portada, rutas)
  assets/              fotos (portada/, obras/2018/) y capturas/ para la portada de elegir
  propuestas/
    registro.ts        lista de propuestas + `principal`
    paginas.ts         qué componente dibuja cada página en cada propuesta
    comun/             logo, marcas de revisión, formulario, política de privacidad
    plano/             propuesta 1: Base, components/, paginas/, config.ts (estilos en public/estilos/plano.css)
    panoramica/        propuesta 2
    selector/          portada para elegir y diseño neutro del 404
  pages/
    [...ruta].astro    ruta única: arma todas las páginas según `principal`
    404.astro
```

**Agregar una propuesta:** copiar `src/propuestas/plano/` con otro nombre, cambiar `SLUG` en su
`config.ts` y sumarla a `registro.ts` y `paginas.ts`. Nada de las otras se toca.

Las URLs internas son las mismas que el sitio actual tiene indexadas en Google (`/quienes-somos/`,
`/nuestros-servicios/`, `/proyectos-terminados/`, `/proyectos-en-construccion/`, `/contacto/`), así
que al pasar a lols.cl no hace falta redirigirlas. Las subpáginas de cada proyecto del sitio de
2018 sí necesitarán un 301 cuando existan las fichas nuevas.

## Stack

[Astro](https://astro.build) → sitio 100% estático. Las fotos se optimizan al compilar (WebP en
varios tamaños, con `sharp`). Las fuentes van empaquetadas con el sitio; lo único que se carga desde
un tercero es el mapa de Google de la página de contacto (declarado en la política de privacidad).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Dónde se edita el contenido

| Qué | Archivo |
|---|---|
| Razón social, dirección, teléfono, correo, textos institucionales | `src/data/empresa.ts` |
| Servicios y sus descripciones | `src/data/servicios.ts` |
| Obras (ficha por proyecto + imagen) | `src/data/proyectos.ts` (imágenes en `src/assets/obras/`) |
| Diapositivas de la portada giratoria | `src/data/portada.ts` (fotos en `src/assets/portada/`) |
| Capacidad técnica (equipos propios: cifras, usos, fotos) | `src/data/equipos.ts` (fotos en `src/assets/capacidad/`) |
| Colores y tipografía de cada propuesta | `public/estilos/<slug>.css` |
| Qué propuesta se publica | `principal` en `src/propuestas/registro.ts` |

Todo campo `null` se muestra en el sitio como `[PENDIENTE]`: basta con completarlo.

### Imágenes

- **Portada: obra anotada (opción G, 30-09-2026)**: la cámara recorre una foto aérea de una obra,
  como un dron, y se detiene en cinco puntos (obra gruesa, moldajes, alzaprimas, flota, edificio
  terminado), cada uno con su enlace (`PortadaObra.astro`, datos en `portadaObra` de
  `src/data/portada.ts`, foto en `src/assets/portada/obra-aerea.jpg`). Con una foto aérea real de
  LOLS: reemplazar el archivo (misma proporción) y volver a ubicar los puntos (en % de la foto). Las
  portadas anteriores siguen en `components/`: `PortadaFundido` (opción C) y `PortadaCubo`.
- **Contacto: del plano a la obra (opción H)**: la cabecera muestra una obra terminada y su plano
  de líneas, con una línea que el visitante arrastra (`BannerPlano.astro`). El plano sale de la
  misma foto: `node scripts/plano.mjs <foto> <plano>` (fotos en `src/assets/contacto/`). Se probó
  un "muro de obras" con las fotos de 2018 (30-09-2026) y no gustó: quedó en el historial de git.
- **Colores**: el verde de lols.cl (#168D3A) con sus tonos oscuros, negro y blanco. El lima
  (#81D742) del sitio 2018 se sacó (30-09-2026): no combinaba con el verde. Sobre fondo claro los
  acentos van en verde; sobre fotos o fondos oscuros, en blanco.
- **Tipografía**: Barlow (la misma de Bouygues Construction). Los títulos grandes van en minúsculas
  con Barlow Semi Condensed; antetítulos, botones, menú y rótulos siguen en mayúsculas condensadas.
- **Portada giratoria y fondos (`src/assets/portada/`)**: fotos de stock de
  [Unsplash](https://unsplash.com/license) (licencia libre), marcadas en el sitio como "Imagen
  referencial". Para usar fotos reales de LOLS: reemplazar el archivo con el mismo nombre (mín.
  2000 px de ancho) y en `src/data/portada.ts` poner `referencial: false` y `credito: null`.
  Autores: Frames For Your Heart, Jason Richard, Etienne Girardet, Toolmash Expo y Michael Bader.
- **Fichas de obra**: cada obra finalizada tiene su página en `/proyectos-terminados/<slug>/`,
  con el mismo slug que usaba en el sitio de 2018 (`bro_cam`, `renacer_bas`…), así esos links
  siguen funcionando. Muestran el **Antes → Durante → Después** con un comparador de arrastre
  (`ComparaObra.astro`, 30-09-2026): la foto de una etapa sobre la del después y una línea que
  se arrastra; al lado, las etapas con su fecha (al tocar una, la foto pasa a esa etapa). El
  marco toma la proporción de la foto del después. Abajo, una galería con visor a pantalla
  completa. Las obras **en ejecución** también tienen ficha (`/proyectos-en-construccion/<slug>/`)
  con su avance como recorrido con scroll (opción I, `RecorridoObra.astro`): Inicio de obra →
  Obra gruesa → Avance actual → Así quedará (el render de 2018), el % de avance y datos de ejemplo.
- **Futuros proyectos (30-09-2026)**: `/proyectos-futuros/`, tercera pestaña de Proyectos, con
  dos obras de EJEMPLO (inventadas y marcadas) que parten en 2027: Bodegas Cerrillos y Oficinas San
  Miguel (`ejemplosFuturos` en `src/data/proyectos.ts`). Cada ficha tiene el arrastre del plano a
  "así será" (imagen referencial de Unsplash en `src/assets/futuros/`; el plano sale de ella con
  `scripts/plano.mjs`), sus datos y un calendario previsto. Para cargar uno real: agregarlo a
  `ejemplosFuturos` con su foto o render, y generar su plano.
- **F5 en la portada**: al recargar, la portada vuelve siempre arriba (Chrome a veces la dejaba a
  media altura). Lo hace un script al comienzo de `Base.astro`, solo en la portada y solo al
  recargar: el botón "atrás" sigue devolviendo al mismo lugar. "Después" es la foto real de la obra; "Antes" y "Durante"
  son fotos de ejemplo (`src/assets/ejemplo/` y `src/assets/portada/`, marcadas "Foto de
  ejemplo"): reemplazarlas por las de cada obra en `etapas` de `src/data/proyectos.ts`, idealmente
  una foto por etapa tomada desde un ángulo parecido. Autores de las de ejemplo: Billy Freeman e
  Iain (Unsplash).
- **Tomas con dron (`src/assets/dron/`)**: fotos aéreas de ejemplo en los banners de Quiénes somos,
  Proyectos y Trabaja con nosotros, el llamado final, la vista previa al compartir y la
  presentación. Stock de Unsplash (Centar MURID, CHUTTERSNAP, Ivan Bandura, Jamie Street y Eli
  Williams), marcadas "Imagen referencial"; se cambian en `src/data/dron.ts`.
- **Servicios**: cada servicio es una franja con foto grande y el texto al lado. Construcción,
  montaje y electricidad usan fotos de la portada; mantención y voz y datos, las de
  `src/assets/servicios/` (Unsplash: Valentin Lacoste y Wonderlane). Todas "Imagen referencial".
- **Capacidad técnica (`src/assets/capacidad/`)**: la página muestra los equipos propios **por uso y
  en obra** (moldaje de muros, losas apuntaladas, andamios, maquinaria, faena, flota), como lo hacen
  las constructoras de referencia; no hay fichas de piezas en fondo blanco ni unidades por pieza
  (se leían como tienda de arriendo). Las fotos son de stock de Unsplash marcadas "Imagen
  referencial", salvo el contenedor de faena, que es real. Autores: Julia Taubitz, Di, Ray
  Donnelly, Etienne Girardet, Estefania Ruiz, Yurii Hetsko y Maaz Khan. El detalle pieza por pieza
  del inventario queda en `catalogo` (no se publica) para el listado que se envía a licitaciones.
  Fotos reales que hacen falta: moldaje de muros armado, losa apuntalada con alzaprimas, andamio
  de fachada con gente con EPP, la bomba de hormigón trabajando, la flota formada con el logo (sin
  patentes legibles) y la bodega ordenada; horizontales, con luz de día y sin fondo blanco.
- **Obras (`src/assets/obras/2018/`)**: imágenes del sitio lols.cl de 2018, sin el marco verde
  que traían pegado. Las terminadas son fotos; las "en construcción" son renders con el sello
  "Próximas entregas". Son de 500 px: se reemplazan cuando lleguen fotos actuales.
- **Capturas de la portada selectora (`src/assets/capturas/<slug>.jpg`)**: se sacan a mano
  (1440 × 900) si una propuesta cambia mucho.

## Presentación en PDF y vista previa al compartir

- **Presentación corporativa** (`public/descargas/presentacion-lols.pdf`, A4 horizontal, 6 hojas):
  se descarga desde Quiénes somos, el pie y Capacidad técnica. Es un **borrador**: usa los mismos
  datos del sitio (con las obras de ejemplo marcadas) y lo dice en cada hoja.
- **Vista previa al compartir** (`public/compartir.jpg`, 1200 × 630): la foto, el logo y el lema
  que aparecen al mandar el enlace por WhatsApp o correo (etiquetas `og:` en `Base.astro`).

Las dos se arman desde `src/pages/descargas/[pieza].astro` (páginas que solo existen con
`npm run dev`) y se "imprimen" con Chrome. Cuando cambien los datos o las fotos:

```bash
npm run dev          # en una terminal
npm run descargas    # en otra: regenera el PDF y la imagen; después subirlos
```

## Marcas de revisión ([PENDIENTE] y "Por confirmar")

El sitio se ve **limpio por defecto**: las marcas amarillas y la barra de arriba están escondidas.
Se muestran con **"Mostrar pendientes"** (al pie de cada página) o entrando con
`?pendientes=1` (por ejemplo `https://new.lols.cl/?pendientes=1`); queda recordado en ese
navegador hasta apretar "Ocultar pendientes" o entrar con `?pendientes=0`. La política de privacidad
muestra sus marcas siempre (es un borrador legal con huecos a mitad de frase). Detalles en
`src/propuestas/comun/marcas.css` (`.solo-marca`, `.si-limpio`, `.siempre-marcas`).

## Pendientes antes de salir de propuesta

- Contenido: validar los textos propuestos de los servicios (y qué es "Voz y datos"), nombres y
  datos reales de las obras con sus fotos, hitos reales de la historia, horario, m² construidos.
  Cifras confirmadas (2026): 31 años en el mercado, más de 50 obras; "300 y algo" se leyó como
  trabajadores (por confirmar). La empresa no tiene premios ni certificaciones: no se muestran.
- Datos confirmados (30-09-2026): dirección El Mirador 150, Cerrillos; teléfono y WhatsApp
  +56 652 710 609; correo lols@lols.cl; presupuesto estimado en pesos; cifras del inventario se
  publican solo redondeadas ("más de 500", "más de 1.000").
- Canal de denuncias: se sacó del sitio a pedido de Recursos Humanos (30-09-2026). El código
  quedó en el historial de git (commit anterior a su eliminación) por si se retoma.
- Fotos reales de LOLS para la portada y los servicios.
- Confirmar si las obras "en construcción" de 2018 ya se entregaron.
- Versión vigente del isotipo (tercer rectángulo relleno o en contorno).
- Formulario de contacto: hoy **no envía nada** (solo muestra un aviso). Definir a qué correo
  llegan los mensajes y cómo se envían. Las cotizaciones van al área comercial y a los
  arquitectos, con copia a gerencia (quién es quién se definió en reunión; no va en el repo).
- Contacto por área (Contacto → "¿Con quién hablar?"): cotizaciones, proveedores y facturación,
  compras y logística. Hoy todo va a lols@lols.cl con el asunto ya escrito; cuando haya correos
  por área, ponerlos en `areas` de `src/data/empresa.ts`.
- Política de privacidad (Ley 21.719, vigente desde el 1-12-2026): es un borrador de estructura;
  la revisa quien vea lo legal.

## Deploy

```
push a main ─► GitHub Actions: npm ci + npm run build ─► rama `deploy` (dist/ + scripts/)
                                                               │
cron de cPanel cada 5 min ─► git fetch de la rama deploy ◄─────┘
                          └► rsync dist/ ─► /home/lolscl/public_html/new.lols.cl
```

El FTP del hosting bloquea las IPs de GitHub Actions, así que es el servidor el que baja el sitio
con `git`. Detalle de los pasos en cPanel: [`docs/DEPLOY.md`](docs/DEPLOY.md).

Verificar un deploy: `https://new.lols.cl/deploy-status.txt` → `<fecha> · OK · <sha>`.
