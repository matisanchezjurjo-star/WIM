import WhatsAppButton from './WhatsAppButton.jsx';
import { businessInfo, instagramLink } from '../content/business-info.js';

export default function Contact() {
  return (
    <section id="contacto" className="bg-white border-t border-gray-100 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 py-20 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl font-extrabold text-gray-800">Hablemos</h2>
        <p className="text-gray-500 max-w-md">
          Consultas, pedidos o listas de precios: escribinos por el medio que te quede más cómodo.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <WhatsAppButton />
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-wim-blue text-wim-blue font-bold px-6 py-3.5 hover:bg-blue-50 transition"
          >
            📷 Seguinos en Instagram
          </a>
          <a
            href={`mailto:${businessInfo.email}`}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 text-gray-600 font-bold px-6 py-3.5 hover:bg-gray-50 transition"
          >
            ✉️ {businessInfo.email}
          </a>
        </div>
      </div>
    </section>
  );
}
