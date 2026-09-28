#!/bin/bash
# Deploy "pull-side" para cPanel. Lo ejecuta un cron del servidor cada 5 minutos.
# GitHub Actions compila el sitio y lo publica en la rama `deploy`; este script baja esa
# rama con git (conexión saliente: el FTP de este hosting bloquea las IPs de GitHub) y
# copia la carpeta compilada al docroot del subdominio.
#
# Configurado para new.lols.cl (repo marcosuribeimpdali-code/lols-propuesta).
set -euo pipefail

SUBDOMINIO="new.lols.cl"
REPO_DIR="/home/lolscl/deploy-$SUBDOMINIO"         # clone del repo en el servidor
BRANCH="deploy"
BUILD_DIR="dist"                                   # carpeta compilada dentro de la rama deploy
DEST="/home/lolscl/public_html/$SUBDOMINIO"        # docroot del subdominio (ver cPanel → Dominios)
TESTIGO="$HOME/.deploy-$SUBDOMINIO-ok"             # sha del último deploy exitoso
LOCK="$HOME/.deploy-$SUBDOMINIO.lock"

log() { echo "$(date '+%F %T') · $*"; }

# public_html contiene los docroots de OTROS sitios de la empresa: un rsync --delete ahí
# los borraría. Este script se niega a desplegar en public_html directamente.
case "${DEST%/}" in
    */public_html) log "ABORTO: DEST=$DEST es public_html; el --delete borraría otros sitios"; exit 1 ;;
esac
if [ "$SUBDOMINIO" = "SUBDOMINIO" ]; then
    log "ABORTO: falta configurar SUBDOMINIO en el script"; exit 1
fi

# Lock anti-solape entre ticks; uno de más de 30 min se considera colgado y se libera.
if [ -d "$LOCK" ] && [ -n "$(find "$LOCK" -maxdepth 0 -mmin +30 2>/dev/null)" ]; then
    rmdir "$LOCK" 2>/dev/null || true
fi
if ! mkdir "$LOCK" 2>/dev/null; then
    log "otro deploy en curso (lock) — salto"
    exit 0
fi
trap 'rmdir "$LOCK" 2>/dev/null || true' EXIT

cd "$REPO_DIR"
git fetch origin "$BRANCH" --quiet
REMOTE="$(git rev-parse "origin/$BRANCH")"
ULTIMO="$(cat "$TESTIGO" 2>/dev/null || true)"

# Se compara contra el testigo y no contra HEAD: tras el clone inicial HEAD ya es REMOTE
# y el primer deploy nunca ocurriría.
if [ "$REMOTE" = "$ULTIMO" ]; then
    log "sin cambios (${REMOTE:0:7})"
    exit 0
fi

log "desplegando ${REMOTE:0:7} (antes ${ULTIMO:0:7})"
git reset --hard "origin/$BRANCH" --quiet

if [ ! -s "$REPO_DIR/$BUILD_DIR/index.html" ]; then
    log "ABORTO: $BUILD_DIR/index.html no existe en la rama $BRANCH"
    exit 1
fi

# Espejo exacto del build, preservando lo que no es del build:
#   .well-known/ → validación del certificado SSL (AutoSSL / Let's Encrypt)
#   cgi-bin/     → lo crea cPanel en cada docroot
mkdir -p "$DEST"
if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete \
        --exclude '.well-known/' \
        --exclude 'cgi-bin/' \
        --exclude 'deploy-status.txt' \
        "$REPO_DIR/$BUILD_DIR/" "$DEST/"
else
    find "$DEST" -mindepth 1 -maxdepth 1 ! -name '.well-known' ! -name 'cgi-bin' ! -name 'deploy-status.txt' -exec rm -rf {} +
    cp -a "$REPO_DIR/$BUILD_DIR/." "$DEST/"
fi

echo "$REMOTE" > "$TESTIGO"
printf '%s · OK · %s\n' "$(date '+%F %T')" "${REMOTE:0:7}" > "$DEST/deploy-status.txt"
log "deploy OK → ${REMOTE:0:7}"
