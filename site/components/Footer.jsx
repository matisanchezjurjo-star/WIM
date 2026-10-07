import Logo from './Logo.jsx';
import { products } from '../content/products.js';
import { businessInfo, instagramLink } from '../content/business-info.js';

export default function Footer() {
  return (
    <footer className="bg-wim-blue-dark text-white/70">
      <div className="content-width px-6 lg:px-10 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Logo className="h-8" light />
          <p className="mt-5 text-sm leading-relaxed max-w-[22ch]">
            Portalámparas y receptáculos eléctricos fabricados en Argentina.
          </p>
        </div>

        <div>
          <h3 className="label-eyebrow text-white/50">Catálogo</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {products.map((p) => (
              <li key={p.name}>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  {p.type}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label-eyebrow text-white/50">Empresa</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
            <li><a href="#mayoristas" className="hover:text-white transition-colors">Mayoristas</a></li>
            <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h3 className="label-eyebrow text-white/50">Contacto</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li>
              <a href={`mailto:${businessInfo.email}`} className="hover:text-white transition-colors">
                {businessInfo.email}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${businessInfo.whatsappNumber}`} className="hover:text-white transition-colors">
                WhatsApp
              </a>
            </li>
            {businessInfo.location && <li>{businessInfo.location}</li>}
            <li>
              <a href={instagramLink} className="hover:text-white transition-colors">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="content-width px-6 lg:px-10 py-6 text-xs text-white/40">
          © {new Date().getFullYear()} {businessInfo.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
