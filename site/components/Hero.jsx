import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { businessInfo } from '../content/business-info.js';

export default function Hero() {
  return (
    <section id="inicio" className="bg-wim-blue relative overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-wim-blue to-wim-blue-dark" />
      <div className="relative max-w-6xl mx-auto px-5 py-20 sm:py-28 flex flex-col items-center text-center gap-6">
        <Logo className="h-20 sm:h-24" light />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white max-w-3xl leading-tight">
          {businessInfo.tagline}
        </h1>
        <p className="text-blue-100 text-lg max-w-xl">
          Portalámparas y receptáculos E14, E27 y Hollywood para instaladores, ferreterías, decoradores y
          fabricantes de iluminación en {businessInfo.location}.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <a
            href="#catalogo"
            className="rounded-xl bg-wim-orange text-white font-bold px-6 py-3.5 hover:brightness-95 transition"
          >
            Ver catálogo
          </a>
          <WhatsAppButton>Pedir presupuesto</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
