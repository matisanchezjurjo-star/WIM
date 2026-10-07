import PhotoPlaceholder from './PhotoPlaceholder.jsx';
import { whatsappWholesaleLink, whatsappLink } from '../content/business-info.js';

export default function Wholesale() {
  return (
    <section id="mayoristas" className="bg-charcoal scroll-mt-20">
      <div className="content-width px-6 lg:px-10 py-20 sm:py-28 grid lg:grid-cols-2 gap-14 items-center">
        <PhotoPlaceholder label="Stock / inventario WIM" aspect="aspect-[4/3]" />

        <div>
          <span className="label-eyebrow text-wim-orange">Para profesionales</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
            Precios y condiciones para compras mayoristas
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed max-w-md">
            Trabajamos con electricistas, ferreterías, distribuidores y fabricantes en todo el país.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={whatsappWholesaleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-wim-orange text-white font-semibold px-7 py-3.5 hover:bg-wim-orange-dark transition-colors"
            >
              Solicitar lista de precios
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white/30 text-white font-semibold px-7 py-3.5 hover:border-white transition-colors"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
