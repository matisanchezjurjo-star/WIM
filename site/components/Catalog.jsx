import { products } from '../content/products.js';
import SocketIcon from './SocketIcon.jsx';

function ProductCard({ product }) {
  return (
    <div className="group rounded-2xl bg-white border border-gray-200 hover:border-wim-blue/30 hover:shadow-lg transition-all overflow-hidden flex flex-col">
      {/* Imagen de relleno: reemplazar por una foto real del producto cuando esté disponible */}
      <div className="h-36 bg-slate-50 flex items-center justify-center border-b border-gray-100">
        <SocketIcon className="w-14 h-14 text-wim-blue/70 group-hover:text-wim-orange transition-colors" />
      </div>
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-bold text-wim-blue bg-blue-50 rounded-full px-3 py-1">{product.type}</span>
          <span className="text-xs text-gray-400">{product.finish}</span>
        </div>
        <h3 className="font-bold text-gray-800 text-lg leading-snug">{product.name}</h3>
        <p className="text-sm text-gray-500 flex-1 leading-relaxed">{product.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-1 pt-3 border-t border-gray-100">
          {product.uses.map((use) => (
            <span key={use} className="text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
              {use}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  return (
    <section id="catalogo" className="max-w-6xl mx-auto px-5 py-20 scroll-mt-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-gray-800">Nuestro catálogo</h2>
        <p className="text-gray-500 mt-3">
          Portalámparas y receptáculos para cada necesidad. Consultanos por stock, precios y envíos.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
