# Propuesta de sitio web — LOLS Ingeniería

Propuesta de rediseño de [lols.cl](https://lols.cl), publicada para revisión en
**https://new.lols.cl**. No es el sitio oficial: está fuera de los buscadores (`robots.txt` +
`<meta name="robots" content="noindex">`) y muestra marcas amarillas donde falta contenido.

- `[PENDIENTE: …]` → texto, foto o dato que falta. No se inventa contenido: un hueco evidente es
  mejor que un relleno que parece real.
- `⚠ Por confirmar` → dato que se puede usar pero hay que validar con la jefatura.

## Stack

[Astro](https://astro.build) → sitio 100% estático (HTML + CSS, casi sin JS). Fuentes DM Sans
(la del logo) e IBM Plex Mono empaquetadas con el sitio: ninguna visita carga nada de terceros.

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
| Obras (ficha por proyecto + fotos) | `src/data/proyectos.ts` (fotos en `public/obras/`) |
| Colores, tipografía, espaciados | `src/styles/global.css` |

Todo campo `null` se muestra en el sitio como `[PENDIENTE]`: basta con completarlo.

Las URLs son las mismas que el sitio actual tiene indexadas en Google (`/quienes-somos/`,
`/nuestros-servicios/`, `/proyectos-terminados/`, `/proyectos-en-construccion/`, `/contacto/`), así
que al pasar a lols.cl no hace falta redirigirlas. Las subpáginas de cada proyecto del sitio de
2018 sí necesitarán un 301 cuando existan las fichas nuevas.

## Pendientes antes de salir de propuesta

- Contenido: descripciones de servicios, listado y fotos de obras, historia, horario.
- Validar dirección, teléfono (el prefijo 65 es de Osorno) y correo.
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
