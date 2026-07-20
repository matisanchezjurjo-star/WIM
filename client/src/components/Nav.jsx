import { NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';

const ITEMS = [
  { to: '/', label: 'Ideas de hoy', icon: '💡' },
  { to: '/productos', label: 'Productos', icon: '📦' },
  { to: '/crear', label: 'Crear publicación', icon: '✍️' },
  { to: '/calendario', label: 'Calendario', icon: '📅' },
  { to: '/angulos', label: 'Ángulos de anuncio', icon: '🎯' },
  { to: '/competencia', label: 'La competencia', icon: '🔎' },
  { to: '/configuracion', label: 'Configuración', icon: '⚙️' },
];

export default function Nav() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Logo className="h-9 shrink-0" />
        <nav className="flex-1 flex flex-wrap gap-2 justify-end">
          {ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center rounded-xl px-3 py-2 min-w-[84px] text-xs font-semibold transition ${
                  isActive ? 'bg-wim-blue text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="text-2xl leading-none mb-1">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
