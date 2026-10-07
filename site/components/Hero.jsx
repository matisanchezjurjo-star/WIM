import WhatsAppButton from './WhatsAppButton.jsx';
import PhotoPlaceholder from './PhotoPlaceholder.jsx';
import { whatsappQuoteLink } from '../content/business-info.js';

export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-20 relative overflow-hidden">
      <div className="content-width px-6 lg:px-10 py-16 sm:py-24 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-wim-orange" />
            <span className="label-eyebrow text-wim-blue">Industria eléctrica argentina</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-charcoal leading-[1.08] tracking-tight">
            Portalámparas y receptáculos hechos para durar.
          </h1>

          <p className="mt-6 text-lg text-graphite leading-relaxed max-w-md">
            Soluciones eléctricas confiables para instaladores, ferreterías y fabricantes.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#catalogo"
              className="inline-flex items-center bg-wim-orange text-white font-semibold px-7 py-3.5 hover:bg-wim-orange-dark transition-colors"
            >
              Ver catálogo
            </a>
            <WhatsAppButton
              href={whatsappQuoteLink}
              variant="ghost"
            >
              Solicitar presupuesto
            </WhatsAppButton>
          </div>
        </div>

        <div className="relative">
          <span className="hidden lg:block absolute -top-6 -right-6 w-full h-full border border-wim-blue/15" />
          <PhotoPlaceholder label="Foto de producto — close-up" aspect="aspect-[4/5]" className="relative" />
        </div>
      </div>
    </section>
  );
}
