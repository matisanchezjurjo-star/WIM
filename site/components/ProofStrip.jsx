const ITEMS = ['Fabricación nacional', 'Venta mayorista', 'Amplio catálogo', 'Atención directa'];

export default function ProofStrip() {
  return (
    <div className="bg-charcoal">
      <div className="content-width px-6 lg:px-10 py-5 flex flex-wrap items-center justify-center gap-5">
        {ITEMS.map((item, i) => (
          <span key={item} className="flex items-center gap-5">
            {i > 0 && <span className="w-px h-3 bg-white/15" />}
            <span className="label-eyebrow text-white/70 whitespace-nowrap">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
