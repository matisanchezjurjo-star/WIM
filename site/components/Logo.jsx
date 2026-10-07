// Logo real de WIM (public/logo.png). En fondos oscuros (light=true) lo
// mostramos dentro de una placa blanca para que se lea bien, porque el
// archivo tiene fondo blanco sólido.
export default function Logo({ className = 'h-10', light = false }) {
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src="/logo.png" alt="WIM — Productos Eléctricos" className={`${className} w-auto object-contain`} />;

  if (!light) return img;

  return <span className="inline-flex bg-white rounded-xl px-3 py-1.5 shadow-sm">{img}</span>;
}
