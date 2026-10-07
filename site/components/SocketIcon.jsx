// Ícono simple y prolijo de un portalámparas, usado como imagen de relleno en
// las tarjetas de producto hasta que haya fotos reales.
export default function SocketIcon({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 10h20v10a10 10 0 0 1-10 10 10 10 0 0 1-10-10V10z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M26 30v6h12v-6" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <rect x="22" y="36" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="3" />
      <path d="M24 44v4a8 8 0 0 0 16 0v-4" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="18" r="4" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
