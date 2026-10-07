import { businessInfo, instagramLink } from '../content/business-info.js';

export default function Contact() {
  return (
    <section id="contacto" className="bg-white scroll-mt-20">
      <div className="content-width px-6 lg:px-10 py-20 sm:py-28 flex flex-col items-start gap-6 max-w-xl">
        <span className="label-eyebrow text-wim-blue">Contacto</span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight">Hablemos</h2>
        <p className="text-graphite leading-relaxed">
          Consultas, pedidos o listas de precios. Estamos para ayudarte.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-2">
          <a
            href={`https://wa.me/${businessInfo.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-wim-blue text-white font-semibold px-7 py-3.5 hover:bg-wim-blue-dark transition-colors"
          >
            Escribinos por WhatsApp
          </a>
          <a
            href={`mailto:${businessInfo.email}`}
            className="inline-flex items-center border border-charcoal/25 text-charcoal font-semibold px-7 py-3.5 hover:border-wim-blue hover:text-wim-blue transition-colors"
          >
            {businessInfo.email}
          </a>
        </div>

        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-graphite hover:text-wim-blue transition-colors mt-1"
        >
          @{businessInfo.instagramHandle} en Instagram
        </a>
      </div>
    </section>
  );
}
