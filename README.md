# WIM Marketing Studio

Una aplicación simple para ayudar a manejar el marketing de Instagram de
**WIM** (portalámparas, receptáculos E14/E27, modelos Hollywood, etc.).

Te da todos los días 3 ideas de publicaciones listas para usar, te arma el
texto y los hashtags de cualquier publicación o anuncio en segundos, y te
ayuda a organizar un calendario de contenido. Todo el texto lo escribe una
Inteligencia Artificial (Claude, de Anthropic), pero **vos sos quien decide
qué publicar** — la app no publica nada sola en Instagram.

Esta guía está pensada para que la puedas usar sin ayuda de nadie, paso a
paso.

---

## Forma más fácil de arrancar (recomendada)

Si te complica escribir comandos en la Terminal, no hace falta: en la carpeta
principal del proyecto hay un archivo que hace todo solo.

- **Mac**: hacé doble clic en **`Iniciar-WIM.command`**. La primera vez, si
  Mac muestra un aviso de seguridad ("no se puede abrir porque es de un
  desarrollador no identificado"), hacé clic derecho sobre el archivo →
  **Abrir**, y confirmá.
- **Windows**: hacé doble clic en **`Iniciar-WIM.bat`**.

Se va a abrir una ventana de Terminal que instala todo lo necesario (solo la
primera vez, tarda un par de minutos), te va a pedir que pegues tu clave de
Anthropic la primera vez, y después abre la app solo en el navegador. Las
próximas veces, doble clic de nuevo y ya arranca directo.

Dejá esa ventana de Terminal abierta mientras usás la app; para cerrarla,
cerrá esa ventana.

Si preferís (o necesitás) hacerlo a mano paso a paso, seguí la guía de abajo.

---

## 1. Qué necesitás antes de empezar

Solo dos cosas:

1. **Tener este proyecto (esta carpeta) en tu computadora.**
2. **Tener instalado Node.js** (es un programa gratis, se instala una sola vez).
3. **Tener una clave (API key) de Anthropic** — te explico abajo cómo
   conseguirla, es gratis crear la cuenta y solo se paga por lo que se usa
   (muy poca plata por mes para el uso de una sola persona, ver sección de
   costos).

No hace falta saber programar ni instalar ninguna base de datos: todo se
guarda solo, dentro de esta misma carpeta, en tu computadora.

### Instalar Node.js (una sola vez)

1. Entrá a **https://nodejs.org**.
2. Descargá la versión que dice **"LTS"** (es la recomendada) — necesitás la
   versión **22 o más nueva**.
3. Abrí el instalador descargado y aceptá todo lo que te propone por
   defecto ("Next", "Next", "Install").
4. Reiniciá la computadora si el instalador te lo pide.

Para confirmar que se instaló bien, abrí una terminal (en Windows buscá
"Símbolo del sistema" o "PowerShell"; en Mac buscá "Terminal") y escribí:

```
node --version
```

Si te muestra algo como `v22.x.x`, está listo.

---

## 2. Conseguir tu clave de Anthropic (para que la IA funcione)

1. Entrá a **https://console.anthropic.com** y creá una cuenta (con tu
   email).
2. Una vez adentro, buscá en el menú algo que diga **"API Keys"** (claves de
   API).
3. Hacé clic en **"Create Key"** (crear clave) y ponele un nombre, por
   ejemplo "WIM".
4. Te va a mostrar una clave larga que empieza con `sk-ant-...`.
   **Copiala** (no la vas a poder ver de nuevo después, así que copiala en
   ese momento).
5. Anthropic también te va a pedir que cargues un método de pago y un
   crédito mínimo (esto es porque cada vez que la IA escribe un texto,
   cuesta una fracción de centavo). Para el uso normal de esta app
   (generar ideas y publicaciones todos los días), el gasto mensual es muy
   bajo — habitualmente menos de lo que cuesta un café por mes.

Guardá esa clave, la vas a necesitar en el paso siguiente.

---

## 3. Instalación de la app (una sola vez)

1. Abrí la carpeta del proyecto en una terminal. En Windows: hacé clic
   derecho dentro de la carpeta y elegí "Abrir en Terminal" (o "Abrir
   PowerShell aquí"). En Mac: arrastrá la carpeta sobre el ícono de
   "Terminal".

2. Buscá el archivo llamado **`.env.example`** dentro de la carpeta
   principal. Hacé una copia de ese archivo y renombrala a **`.env`**
   (sin ".example"). Ese archivo se ve así:

   ```
   ANTHROPIC_API_KEY=
   ANTHROPIC_MODEL=claude-sonnet-5
   PORT=3001
   ```

3. Abrí el archivo `.env` con el Bloc de notas (o cualquier editor de
   texto) y pegá tu clave después del signo `=`, sin espacios ni comillas:

   ```
   ANTHROPIC_API_KEY=sk-ant-tu-clave-pegada-aca
   ```

   Guardá el archivo.

4. Volvé a la terminal y escribí este comando (solo una vez):

   ```
   npm install
   ```

   Va a tardar un par de minutos la primera vez — está descargando todo lo
   necesario.

5. Ahora, cada vez que quieras usar la app, escribí:

   ```
   npm run start
   ```

6. Cuando la terminal te muestre algo como
   `WIM Marketing Studio corriendo en http://localhost:3001`, abrí tu
   navegador (Chrome, Edge, el que uses) y entrá a esa dirección:

   **http://localhost:3001**

   ¡Ya está! Ahí ves la app funcionando.

> Para volver a usarla otro día: abrí la terminal en la misma carpeta,
> escribí `npm run start` de nuevo, y abrí esa misma dirección en el
> navegador. Para cerrarla, volvé a la terminal y apretá `Ctrl + C`.

---

## 4. Cómo usar la app todos los días (guía simple)

1. **La primera vez**, entrá a "Productos" y cargá tus productos (nombre,
   para qué sirven, qué los hace buenos, y si querés, una foto). Esto lo
   hacés una sola vez por producto; después la IA los usa siempre.

2. **Todos los días**, entrá a "Ideas de hoy" (la pantalla de inicio). Vas a
   ver 3 ideas de publicaciones ya escritas. Si no te convencen, apretá
   "Generar otras ideas". Cuando una te guste:
   - Apretá "Copiar texto" y "Copiar hashtags".
   - Andá a Instagram, creá la publicación, y pegá (mantené presionado y
     elegí "Pegar").
   - Si querés guardarla para otro día, apretá "Guardar en calendario".

3. **Si querés armar algo puntual** (una promoción, un producto nuevo, un
   anuncio pago), andá a "Crear publicación" o "Ángulos de anuncio", elegí
   el producto, y la IA te da el texto y las fotos/videos sugeridos.

4. **Para organizarte**, andá a "Calendario": ahí ves todo lo que guardaste,
   podés asignarle un día y marcar si ya está "Publicada".

5. **Para inspirarte con lo que hace la competencia**, andá a "La
   competencia": vas a ver consejos ya armados, y también podés escribir lo
   que viste que publicó otra marca para que la IA te diga qué aprovechar.

6. **En "Configuración"** podés cambiar el nombre del negocio, el tono con
   el que escribe la IA (profesional, cálido o audaz) y notas sobre tus
   clientes.

**Importante:** esta app no publica nada en Instagram por vos. Prepara el
texto y te dice qué foto o video sacar, pero la publicación la subís vos
mismo desde el celular o la compu, copiando y pegando. Esto es así a
propósito, para no depender de permisos ni configuraciones complicadas de
Meta/Instagram.

---

## 5. Problemas comunes

- **"Falta configurar la clave de IA"**: revisá que el archivo `.env` tenga
  tu clave pegada correctamente (sin espacios, sin comillas) y que hayas
  vuelto a ejecutar `npm run start` después de guardarlo.
- **La página no abre**: fijate que la terminal siga abierta y mostrando
  el mensaje de "corriendo en http://localhost:3001". Si la cerraste, volvé
  a escribir `npm run start`.
- **Quiero cambiar el puerto**: cambiá el número `PORT=3001` en el archivo
  `.env` por otro (por ejemplo `3005`) y usá esa dirección en el navegador.
- **Se me llenó de productos de prueba**: entrá a "Productos" y borralos con
  el botón de la papelera 🗑️.

---

## Para quien programe esto en el futuro (detalles técnicos)

- **Frontend**: React + Vite + Tailwind, en `/client`.
- **Backend**: Node.js + Express, en `/server`. Usa el módulo nativo
  `node:sqlite` (viene con Node 22+) para guardar todo en un archivo
  `server/data/wim.db` — no hace falta instalar ninguna base de datos aparte.
- **IA**: SDK oficial de Anthropic (`@anthropic-ai/sdk`), toda la lógica de
  prompts está en `server/lib/prompts.js` y `server/lib/industryInsights.js`.
  El modelo se puede cambiar con la variable `ANTHROPIC_MODEL` en `.env`.
- **Fotos de producto**: se guardan en `server/uploads/` (no se suben a
  ningún lado).
- **Generación de imágenes con IA**: no está incluida (no era parte del
  pedido), pero hay un punto de integración limpio en
  `server/lib/imageGen.js` (`generateImage(visualBrief)`) por si en el
  futuro se quiere conectar una API de generación de imágenes.
- **Logo**: `client/src/components/Logo.jsx` tiene una recreación en SVG del
  logo de WIM. Si tenés el archivo original (PNG/SVG), guardalo en
  `client/src/assets/logo.png` y reemplazá ese componente por un `<img>`.
- Scripts útiles: `npm run dev` (servidor + Vite con recarga automática,
  para desarrollo) vs. `npm run start` (compila el frontend y lo sirve
  desde Express — es el que usa el dueño del negocio).
