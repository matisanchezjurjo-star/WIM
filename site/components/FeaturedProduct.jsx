import { featuredProduct } from '../content/products.js';
import PhotoPlaceholder from './PhotoPlaceholder.jsx';
import { whatsappQuoteLink } from '../content/business-info.js';

export default function FeaturedProduct() {
  const p = featuredProduct;
  return (
    <section className="bg-white border-y border-concrete-dark/60">
      <div className="content-width px-6 lg:px-10 py-20 sm:py-28 grid lg:grid-cols-[1.3fr_1fr] gap-14 items-center">
        <PhotoPlaceholder
          src={p.image || undefined}
          alt={p.name}
          label={`${p.name} — foto macro`}
          aspect="aspect-[16/11]"
        />

        <div>
          <span className="label-eyebrow text-wim-orange">Producto destacado</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight leading-tight">
            {p.name}
          </h2>

          <dl className="mt-8 flex flex-col gap-5">
            <div className="border-t border-concrete-dark/70 pt-4">
              <dt className="label-eyebrow text-graphite/70">Aplicación</dt>
              <dd className="mt-1.5 text-charcoal">{p.application}</dd>
            </div>
            <div className="border-t border-concrete-dark/70 pt-4">
              <dt className="label-eyebrow text-graphite/70">Materiales</dt>
              <dd className="mt-1.5 text-charcoal">{p.materials}</dd>
            </div>
            <div className="border-t border-concrete-dark/70 pt-4">
              <dt className="label-eyebrow text-graphite/70">Ventajas técnicas</dt>
              <dd className="mt-1.5 text-charcoal">
                <ul className="flex flex-col gap-1.5">
                  {p.advantages.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-wim-orange">—</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="border-t border-b border-concrete-dark/70 py-4">
              <dt className="label-eyebrow text-graphite/70">Versiones disponibles</dt>
              <dd className="mt-1.5 text-charcoal">{p.versions}</dd>
            </div>
          </dl>

          <a
            href={whatsappQuoteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center bg-wim-blue text-white font-semibold px-7 py-3.5 hover:bg-wim-blue-dark transition-colors"
          >
            Conocer producto
          </a>
        </div>
      </div>
    </section>
  );
}
