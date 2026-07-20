@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ==================================================
echo    WIM Marketing Studio
echo ==================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js no esta instalado en esta computadora todavia.
  echo Se va a abrir la pagina para descargarlo (nodejs.org).
  echo Instalalo (la version que dice "LTS"), reiniciando si te lo pide,
  echo y despues volve a hacer doble clic en este mismo archivo.
  start "" "https://nodejs.org"
  pause
  exit /b 1
)

if not exist .env (
  copy .env.example .env >nul
)

findstr /B /C:"ANTHROPIC_API_KEY=sk-" .env >nul 2>nul
if errorlevel 1 (
  echo Todavia no cargaste tu clave de Anthropic ^(hace falta para que la IA escriba los textos^).
  echo Si no tenes una, consiguela gratis en: https://console.anthropic.com ^(seccion "API Keys"^).
  echo.
  set /p apikey="Pega aca tu clave (empieza con sk-ant-) y apreta Enter: "
  if not "!apikey!"=="" (
    findstr /V /B "ANTHROPIC_API_KEY=" .env > .env.tmp
    echo ANTHROPIC_API_KEY=!apikey!>> .env.tmp
    move /y .env.tmp .env >nul
    echo Clave guardada. La proxima vez no te la va a volver a pedir.
  )
  echo.
)

if not exist node_modules (
  echo Preparando la aplicacion por primera vez ^(puede tardar un par de minutos^)...
  call npm install
  echo.
)

echo Compilando y abriendo la aplicacion...
echo IMPORTANTE: deja esta ventana abierta mientras usas la app.
echo Para cerrarla, simplemente cerra esta ventana.
echo.

call npm run build

start "" http://localhost:3001

node server\index.js
