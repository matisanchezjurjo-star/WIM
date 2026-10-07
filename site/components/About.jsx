const POINTS = [
  { icon: '🛡️', title: 'Material resistente', body: 'Termoplástico de alta calidad, pensado para durar en uso diario.' },
  { icon: '🔧', title: 'Fácil instalación', body: 'Diseño práctico para que cualquier instalador trabaje rápido y seguro.' },
  { icon: '✨', title: 'Diseño cuidado', body: 'Terminaciones prolijas, aptas tanto para lo industrial como para lo decorativo.' },
];

export default function About() {
  return (
    <section id="nosotros" className="bg-white border-y border-gray-100 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Quiénes somos</h2>
          <p className="text-gray-600 leading-relaxed">
            WIM fabrica y distribuye portalámparas y receptáculos eléctricos en Argentina. Trabajamos para que
            electricistas, ferreterías, decoradores y fabricantes de iluminación tengan un producto confiable,
            resistente y con buena terminación en cada instalación.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Elegí calidad, elegí WIM.
          </p>
        </div>
        <div className="grid gap-4">
          {POINTS.map((point) => (
            <div key={point.title} className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5">
              <span className="text-3xl">{point.icon}</span>
              <div>
                <h3 className="font-bold text-gray-800">{point.title}</h3>
                <p className="text-sm text-gray-500">{point.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
