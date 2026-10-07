import { whatsappLink } from '../content/business-info.js';

export default function WhatsAppButton({ children, className = '' }) {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 text-white font-bold px-6 py-3.5 hover:bg-green-700 transition ${className}`}
    >
      💬 {children || 'Escribinos por WhatsApp'}
    </a>
  );
}
