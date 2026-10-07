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
