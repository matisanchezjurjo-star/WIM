import PhotoPlaceholder from './PhotoPlaceholder.jsx';

const PRINCIPLES = [
  {
    n: '01',
    title: 'Resistencia',
    body: 'Termoplásticos seleccionados para uso cotidiano.',
  },
  {
    n: '02',
    title: 'Instalación',
    body: 'Diseños simples y prácticos para el profesional.',
  },
  {
    n: '03',
    title: 'Terminación',
    body: 'Productos funcionales con terminaciones cuidadas.',
  },
];

export default function About() {
  return (
    <section id="nosotros" className="bg-white border-y border-concrete-dark/60 scroll-mt-20">
      <div className="content-width px-6 lg:px-10 py-20 sm:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <PhotoPlaceholder label="Taller / producción WIM" aspect="aspect-[4/3]" />

        <div>
          <span className="label-eyebrow text-wim-blue">WIM</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight leading-tight">
            Soluciones eléctricas pensadas para el trabajo real.
          </h2>
          <p className="mt-6 text-graphite leading-relaxed">
            WIM fabrica y distribuye portalámparas y receptáculos eléctricos en Argentina. Trabajamos para que
            electricistas, ferreterías, decoradores y fabricantes de iluminación tengan un producto confiable,
            resistente y con buena terminación en cada instalación.
          </p>

          <div className="mt-10 flex flex-col">
            {PRINCIPLES.map((item) => (
              <div key={item.n} className="flex gap-6 border-t border-concrete-dark/70 py-5 last:border-b">
                <span className="text-sm text-wim-orange font-semibold tabular-nums pt-0.5">{item.n}</span>
                <div>
                  <h3 className="label-eyebrow text-charcoal">{item.title}</h3>
                  <p className="mt-1.5 text-graphite text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
