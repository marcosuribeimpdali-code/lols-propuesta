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
| 2 | Panorámica ✅ | Fotográfica: portada que gira en cubo 3D, colores del sitio 2018 |

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
| Colores y tipografía de cada propuesta | `public/estilos/<slug>.css` |
| Qué propuesta se publica | `principal` en `src/propuestas/registro.ts` |

Todo campo `null` se muestra en el sitio como `[PENDIENTE]`: basta con completarlo.

### Imágenes

- **Portada giratoria y fondos (`src/assets/portada/`)**: fotos de stock de
  [Unsplash](https://unsplash.com/license) (licencia libre), marcadas en el sitio como "Imagen
  referencial". Para usar fotos reales de LOLS: reemplazar el archivo con el mismo nombre (mín.
  2000 px de ancho) y en `src/data/portada.ts` poner `referencial: false` y `credito: null`.
  Autores: Frames For Your Heart, Jason Richard, Etienne Girardet, Toolmash Expo y Michael Bader.
- **Obras (`src/assets/obras/2018/`)**: imágenes del sitio lols.cl de 2018, sin el marco verde
  que traían pegado. Las terminadas son fotos; las "en construcción" son renders con el sello
  "Próximas entregas". Son de 500 px: se reemplazan cuando lleguen fotos actuales.
- **Capturas de la portada selectora (`src/assets/capturas/<slug>.jpg`)**: se sacan a mano
  (1440 × 900) si una propuesta cambia mucho.

## Pendientes antes de salir de propuesta

- Contenido: descripciones de servicios, nombres y datos de las obras, historia, horario.
- Fotos reales de LOLS para la portada y los servicios.
- Validar dirección, teléfono (el prefijo 65 es de Osorno) y correo.
- Confirmar si las obras "en construcción" de 2018 ya se entregaron.
- Versión vigente del isotipo (tercer rectángulo relleno o en contorno).
- Formulario de contacto: hoy **no envía nada** (solo muestra un aviso). Definir a qué correo
  llegan los mensajes y cómo se envían.
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
