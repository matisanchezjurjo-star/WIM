import { products } from '../content/products.js';
import PhotoPlaceholder from './PhotoPlaceholder.jsx';

function ProductEntry({ product }) {
  return (
    <div className="group border-t border-concrete-dark/70 pt-5">
      <div className="overflow-hidden">
        <PhotoPlaceholder
          src={product.image || undefined}
          alt={product.name}
          label={product.name}
          aspect="aspect-[4/5]"
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <span className="label-eyebrow text-wim-orange">{product.type}</span>
        <h3 className="font-semibold text-charcoal text-lg leading-snug">{product.name}</h3>
        <p className="text-sm text-graphite leading-relaxed">{product.description}</p>
        <p className="text-xs text-graphite/70 mt-1">{product.spec}</p>
        <a
          href="#contacto"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-wim-blue hover:gap-2.5 transition-all"
        >
          Ver producto <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

export default function Catalog() {
  return (
    <section id="catalogo" className="content-width px-6 lg:px-10 py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-xl mb-14">
        <span className="label-eyebrow text-wim-blue">Catálogo</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight">
          Portalámparas y receptáculos para cada necesidad
        </h2>
        <p className="mt-4 text-graphite leading-relaxed">
          Consultanos por stock, precios y envíos.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product) => (
          <ProductEntry key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
