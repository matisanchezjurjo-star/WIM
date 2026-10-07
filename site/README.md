# Sitio web de WIM

Sitio público de WIM (catálogo, info de la empresa, contacto), hecho con
Next.js. Pensado para desplegarse gratis en **Vercel**, directo desde este
repositorio de GitHub.

Esto es un proyecto totalmente aparte de la carpeta `/server` y `/client`
(que son la app interna "WIM Marketing Studio"). No hace falta tocar nada de
eso para este sitio.

## Antes de publicarlo: completá tus datos reales

Dos archivos para editar (nada de código, solo texto):

- **`content/business-info.js`**: WhatsApp, Instagram y email reales.
- **`content/products.js`**: el catálogo de productos — agregá, sacá o
  cambiá los que quieras, cada uno con nombre, tipo, descripción y usos.

## Fotos reales: lo único que le falta al sitio

El diseño del sitio está pensado para fotografía real de producto (no
íconos ni dibujos). Hoy, donde debería ir una foto, se ve un marcador con
una cuadrícula tipo "plano técnico" — es intencional, no es un error, pero
el sitio va a verse mucho mejor en cuanto se agreguen las fotos reales.

**Cómo agregar una foto** (no hace falta tocar código):

1. Sacá la foto (ver consejos abajo) y guardala en `public/products/` (para
   fotos de producto) o `public/applications/` (para fotos de ambientes).
   Ejemplo: `public/products/hollywood-e27.jpg`.
2. Abrí `content/products.js` (o `content/applications.js`) y completá el
   campo `image` de ese producto con la ruta, por ejemplo:
   `image: '/products/hollywood-e27.jpg'`.
3. Listo — la foto reemplaza automáticamente al marcador en todo el sitio
   (catálogo, producto destacado, etc.).

**Consejos para que la foto quede bien** (no hace falta un fotógrafo
profesional, pero sí un poco de cuidado):

- Fondo liso y simple (una mesa blanca o gris, sin objetos alrededor).
- Luz natural de día, cerca de una ventana, sin flash directo (el flash
  aplana el producto y se ve plástico/falso).
- Acercate lo suficiente para que se vea bien el material (el plástico, la
  rosca, los detalles), pero sin que la foto salga borrosa — probá varias
  distancias.
- Sacá varias fotos del mismo producto y elegí la más nítida.
- Para las fotos de "aplicaciones" (`content/applications.js`), una foto
  real de una lámpara instalada y encendida vale más que una perfecta: no
  hace falta que sea de estudio.

Con el celular alcanza siempre que haya buena luz — lo que más se nota es
un fondo prolijo y que la imagen no esté borrosa, no la calidad de la
cámara.

## Verlo en tu computadora antes de publicar (opcional)

```
cd site
npm install
npm run dev
```

Abrí `http://localhost:3000`.

## Publicarlo en Vercel (gratis)

1. Entrá a **vercel.com** y creá una cuenta (podés entrar directo con tu
   cuenta de GitHub, es lo más simple).
2. Hacé clic en **"Add New..."** → **"Project"**.
3. Elegí **"Import Git Repository"** y seleccioná este repositorio
   (`matisanchezjurjo-star/WIM`). Si no aparece, puede que primero tengas que
   darle permiso a Vercel para ver tus repos de GitHub (te lo va a pedir ahí
   mismo).
4. **Importante**: en la pantalla de configuración, abrí **"Root Directory"**
   (o "Directorio raíz") y elegí la carpeta **`site`** — si no, Vercel va a
   intentar levantar todo el repo entero, que no es lo que querés.
5. Vercel va a detectar que es un proyecto Next.js solo. No hace falta
   cambiar nada más.
6. Hacé clic en **"Deploy"**. En 1 o 2 minutos el sitio va a estar publicado
   en una dirección como `wim-xxxx.vercel.app`.

## Actualizar el sitio después de publicado

Cada vez que se suban cambios a este repositorio (a la carpeta `site`),
Vercel vuelve a publicar el sitio automáticamente — no hay que hacer nada
manual.

## Dominio propio (opcional)

Si más adelante quieren un dominio propio (ej. `www.wim.com.ar`) en vez de
`vercel.app`, se compra en cualquier proveedor (ej. NIC Argentina) y se
conecta desde el panel del proyecto en Vercel → **Settings** → **Domains**.
