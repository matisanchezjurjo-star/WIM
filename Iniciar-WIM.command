#!/bin/bash
# Doble clic en este archivo prende la aplicación WIM Marketing Studio.
# No hace falta escribir nada en la Terminal: este archivo hace todo solo.
set -e
cd "$(dirname "$0")"

echo ""
echo "=================================================="
echo "   WIM Marketing Studio"
echo "=================================================="
echo ""

# 1) Node.js instalado?
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js no está instalado en esta computadora todavía."
  echo "Se va a abrir la página para descargarlo (nodejs.org)."
  echo "Instalalo (la versión que dice 'LTS'), reiniciá la compu si te lo pide,"
  echo "y después volvé a hacer doble clic en este mismo archivo."
  open "https://nodejs.org" 2>/dev/null || true
  echo ""
  read -p "Presioná Enter para cerrar esta ventana..." _
  exit 1
fi

# 2) Archivo .env con la clave de Anthropic
if [ ! -f .env ]; then
  cp .env.example .env
fi

if ! grep -q "^ANTHROPIC_API_KEY=sk-" .env 2>/dev/null; then
  echo "Todavía no cargaste tu clave de Anthropic (hace falta para que la IA escriba los textos)."
  echo "Si no tenés una, conseguila gratis en: https://console.anthropic.com (sección 'API Keys')."
  echo ""
  read -p "Pegá acá tu clave (empieza con sk-ant-) y apretá Enter: " apikey
  if [ -n "$apikey" ]; then
    tmpfile=$(mktemp)
    grep -v "^ANTHROPIC_API_KEY=" .env > "$tmpfile" 2>/dev/null || true
    printf 'ANTHROPIC_API_KEY=%s\n' "$apikey" >> "$tmpfile"
    mv "$tmpfile" .env
    echo "Clave guardada. La próxima vez no te la va a volver a pedir."
  else
    echo "No se cargó ninguna clave. Vas a poder usar la app, pero las funciones con IA no van a andar"
    echo "hasta que edites el archivo .env con tu clave."
  fi
  echo ""
fi

# 3) Instalar dependencias la primera vez
if [ ! -d node_modules ]; then
  echo "Preparando la aplicación por primera vez (puede tardar un par de minutos)..."
  npm install
  echo ""
fi

echo "Compilando y abriendo la aplicación..."
echo "IMPORTANTE: dejá esta ventana abierta mientras usás la app."
echo "Para cerrarla, simplemente cerrá esta ventana de Terminal."
echo ""

npm run build

( sleep 2 && open "http://localhost:3001" 2>/dev/null || true ) &

exec node server/index.js
