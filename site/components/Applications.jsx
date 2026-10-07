import { applications } from '../content/applications.js';
import PhotoPlaceholder from './PhotoPlaceholder.jsx';

export default function Applications() {
  return (
    <section className="content-width px-6 lg:px-10 py-20 sm:py-28">
      <div className="max-w-xl mb-12">
        <span className="label-eyebrow text-wim-blue">Dónde se usan</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight">
          Un producto, muchas aplicaciones
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {applications.map((app) => (
          <div key={app.label} className="relative overflow-hidden group">
            <PhotoPlaceholder
              src={app.image || undefined}
              alt={app.label}
              label={app.label}
              aspect="aspect-[3/4]"
              className="transition-transform duration-300 group-hover:scale-[1.03]"
            />
            {app.image && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 label-eyebrow text-white">{app.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
