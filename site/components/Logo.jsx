// Recreación del logo de WIM en SVG. Si tenés el archivo real (PNG/SVG),
// ponelo en /public/logo.png y cambiá este componente por <img src="/logo.png" />.
export default function Logo({ className = 'h-10', light = false }) {
  const textColor = light ? '#ffffff' : '#0b3a75';
  return (
    <svg viewBox="0 0 220 90" className={className} role="img" aria-label="WIM">
      <text
        x="4"
        y="66"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="64"
        fill={textColor}
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
