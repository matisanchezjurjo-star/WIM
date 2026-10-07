import { whatsappLink } from '../content/business-info.js';

const VARIANTS = {
  solid: 'bg-[#2fae5b] text-white hover:bg-[#268f4a]',
  ghost: 'border border-charcoal/25 text-charcoal hover:border-wim-blue hover:text-wim-blue',
};

export default function WhatsAppButton({ children, href, variant = 'solid', className = '' }) {
  return (
    <a
      href={href || whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 transition-colors ${VARIANTS[variant]} ${className}`}
    >
      {children || 'Escribinos por WhatsApp'}
    </a>
  );
}
