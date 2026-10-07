// Marcador de imagen "tipo plano técnico" para los lugares donde va una foto
// real de producto, fábrica o instalación. Mientras no haya foto, muestra una
// cuadrícula sutil (no un ícono) para que se vea intencional, no roto.
//
// Para poner la foto real: simplemente pasale `src` (una ruta dentro de
// /public, ej. "/products/e27.jpg") y automáticamente se muestra la imagen
// en vez del marcador. No hace falta tocar nada más del componente.
export default function PhotoPlaceholder({ src, alt = '', label = 'Foto', aspect = 'aspect-[4/5]', className = '' }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`${aspect} w-full object-cover ${className}`} />;
  }

  const gridStyle = {
    backgroundImage:
      'repeating-linear-gradient(0deg, rgba(11,58,117,0.08) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, rgba(11,58,117,0.08) 0 1px, transparent 1px 28px)',
  };

  return (
    <div className={`${aspect} w-full relative overflow-hidden bg-concrete ${className}`}>
      <div className="absolute inset-0" style={gridStyle} />
      <span className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-wim-blue/25" />
      <span className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-wim-blue/25" />
      <span className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-wim-blue/25" />
      <span className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-wim-blue/25" />
      <span className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <span className="label-eyebrow text-graphite/70">{label}</span>
      </span>
    </div>
  );
}
