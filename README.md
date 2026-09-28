# Propuestas de sitio web — LOLS Ingeniería

Propuestas de rediseño de [lols.cl](https://lols.cl), publicadas para revisión en
**https://new.lols.cl**. No es el sitio oficial: está fuera de los buscadores (`robots.txt` +
`<meta name="robots" content="noindex">`) y muestra marcas amarillas donde falta contenido.

- `[PENDIENTE: …]` → texto, foto o dato que falta. No se inventa contenido: un hueco evidente es
  mejor que un relleno que parece real.
- `⚠ Por confirmar` → dato que se puede usar pero hay que validar con la jefatura.

## Varias propuestas en un mismo sitio

`new.lols.cl` abre una portada que lista las propuestas. Cada una es un sitio completo bajo su
prefijo, con las mismas páginas y el mismo contenido; cambia solo el diseño. La barra amarilla de
arriba permite saltar a la misma página en otra propuesta.

| # | Propuesta | URL | Idea |
|---|---|---|---|
| 1 | Plano técnico | `/plano/` | Sobria y oscura: grilla de plano, rótulos técnicos, verde de marca |
| 2 | Panorámica | `/panoramica/` | Fotográfica: portada que gira en cubo 3D, colores del sitio 2018 |

```
src/
  data/             contenido COMPARTIDO por todas las propuestas (empresa, servicios, obras…)
  assets/           fotos (portada/, obras/2018/) y capturas/ para la portada selectora
  propuestas/
    registro.ts     lista de propuestas (la usan la portada y la barra de cambio)
    comun/          logo, marcas de revisión, formulario, política de privacidad
    plano/          diseño de la propuesta 1 (Base, components/, estilos.css, config.ts)
    panoramica/     diseño de la propuesta 2
    selector/       diseño neutro de la portada y del 404
  pages/
    index.astro     portada que lista las propuestas
    plano/…         páginas de la propuesta 1
    panoramica/…    páginas de la propuesta 2
```

**Agregar una propuesta:** copiar `src/propuestas/plano/` y `src/pages/plano/` con un nombre
nuevo, cambiar `BASE` y `SLUG` en su `config.ts` y sumarla a `src/propuestas/registro.ts`.
Nada de las otras se toca.

**Cuando la jefatura elija una:** en su `config.ts` dejar `BASE = ''`, mover sus páginas de
`src/pages/<slug>/` a `src/pages/` y borrar las demás. Los enlaces internos se arman con esa
`BASE`, así que no hay que editarlos uno por uno.

Las URLs internas son las mismas que el sitio actual tiene indexadas en Google (`/quienes-somos/`,
`/nuestros-servicios/`, `/proyectos-terminados/`, `/proyectos-en-construccion/`, `/contacto/`), así
que al pasar a lols.cl no hace falta redirigirlas. Las subpáginas de cada proyecto del sitio de
2018 sí necesitarán un 301 cuando existan las fichas nuevas.

## Stack

[Astro](https://astro.build) → sitio 100% estático. Las fotos se optimizan al compilar (WebP en
varios tamaños, con `sharp`). Las fuentes van empaquetadas con el sitio: ninguna visita carga
nada de terceros.

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
| Colores y tipografía de cada propuesta | `src/propuestas/<slug>/estilos.css` |

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
