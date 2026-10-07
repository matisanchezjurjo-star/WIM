import Logo from './Logo.jsx';
import { businessInfo } from '../content/business-info.js';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo className="h-7" light />
        <p className="text-sm">
          © {new Date().getFullYear()} {businessInfo.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
