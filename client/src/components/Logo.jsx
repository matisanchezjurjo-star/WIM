// Recreación simple del logo de WIM (texto en azul + óvalo naranja).
// Si tenés el archivo real del logo (PNG/SVG), reemplazá este componente:
// 1) Poné el archivo en client/src/assets/logo.png
// 2) Cambiá este componente por: <img src={logoUrl} alt="WIM" className={className} />
export default function Logo({ className = 'h-10' }) {
  return (
    <svg viewBox="0 0 220 90" className={className} role="img" aria-label="WIM">
      <text
        x="4"
        y="66"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="64"
        fill="#0b3a75"
        letterSpacing="-2"
      >
        WIM
      </text>
      <ellipse
        cx="110"
        cy="45"
        rx="100"
        ry="26"
        fill="none"
        stroke="#e8622c"
        strokeWidth="7"
        transform="rotate(-8 110 45)"
      />
    </svg>
  );
}
