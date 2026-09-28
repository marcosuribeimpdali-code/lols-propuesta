# Deploy en cPanel (new.lols.cl)

Valores de este proyecto:

| Valor | |
|---|---|
| Subdominio | `new.lols.cl` (docroot `/home/lolscl/public_html/new.lols.cl`) |
| Repo | `marcosuribeimpdali-code/lols-propuesta` (público: el servidor clona sin credenciales) |
| Clone en el servidor | `/home/lolscl/deploy-new.lols.cl` |
| Log del cron | `/home/lolscl/deploy-new.lols.cl.log` |

Este cPanel no tiene Terminal ni "Git Version Control": todo se hace con **Cron Jobs** y
**File Manager**. En Cron Jobs hay trabajos de otros sistemas de la empresa: **no se editan ni se
borran**; solo se agregan los dos de abajo (y se borra el primero cuando termina).

## 1. Primer clone (cron temporal)

Requiere que la rama `deploy` ya exista (la crea el workflow tras el primer push a `main`).

cPanel → **Cron Jobs** → Añadir → **"Once Per Minute"** (`* * * * *`) → Comando:

```
GIT_TERMINAL_PROMPT=0 sh -c 'test -d /home/lolscl/deploy-new.lols.cl/.git || git clone --branch deploy https://github.com/marcosuribeimpdali-code/lols-propuesta.git /home/lolscl/deploy-new.lols.cl' >> /home/lolscl/deploy-new.lols.cl-bootstrap.log 2>&1
```

1. Esperar 2 minutos.
2. En File Manager, confirmar que existe `/home/lolscl/deploy-new.lols.cl/dist/index.html`
   (en la carpeta principal, **no** dentro de `public_html`).
3. **Borrar ese cron** (solo ese: el que dice `git clone … lols-propuesta`).
4. Si la carpeta no aparece: leer `/home/lolscl/deploy-new.lols.cl-bootstrap.log`.

## 2. Cron de deploy (permanente)

Cron Jobs → Añadir → **"Once Per Five Minutes"** (`*/5 * * * *`) → Comando:

```
cd /home/lolscl/deploy-new.lols.cl && git fetch -q origin deploy && git checkout -q -f origin/deploy -- scripts/cpanel-deploy.sh 2>/dev/null; HOME=/home/lolscl GIT_TERMINAL_PROMPT=0 /bin/bash /home/lolscl/deploy-new.lols.cl/scripts/cpanel-deploy.sh >> /home/lolscl/deploy-new.lols.cl.log 2>&1
```

El preámbulo (`git checkout … -- scripts/cpanel-deploy.sh`) carga la versión más nueva del script
antes de ejecutarlo.

## 3. Verificar

- `https://new.lols.cl/deploy-status.txt` → `<fecha> · OK · <sha>`; el sha coincide con
  `git ls-remote origin deploy`.
- `https://new.lols.cl/una-url-que-no-existe` → **404** (no 500; si da 500, falta el `.htaccess`).
- Log `/home/lolscl/deploy-new.lols.cl.log` → última línea `deploy OK` o `sin cambios`.

Desde ahí: **push a `main` → el sitio se actualiza en 5 minutos como máximo.**

## Problemas conocidos

| Síntoma | Causa | Arreglo |
|---|---|---|
| `bad interpreter: /bin/bash^M` | script con CRLF | `.gitattributes` ya fuerza LF; re-clonar |
| `git: command not found` | PATH mínimo del cron | anteponer `PATH=/usr/local/bin:/usr/bin:/bin:$PATH` |
| workflow verde pero el sitio no cambia | cron no creado o clone de otra rama | revisar Cron Jobs y que el clone sea de `deploy` |
| URLs inexistentes dan 500 | falta el `.htaccess` propio | está en `public/.htaccess` |
| el sitio muestra la versión vieja | caché del navegador | Ctrl+Shift+R |
