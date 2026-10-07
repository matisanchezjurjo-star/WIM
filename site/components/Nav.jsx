'use client';

import { useState } from 'react';
import Logo from './Logo.jsx';

const LINKS = [
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#mayoristas', label: 'Mayoristas' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <a href="#inicio" onClick={() => setOpen(false)}>
          <Logo className="h-8" />
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-600">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-wim-blue transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:inline-flex rounded-lg bg-wim-blue text-white text-sm font-bold px-4 py-2.5 hover:bg-wim-blue-dark transition-colors"
        >
          Contactar
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span className={`block h-0.5 w-6 bg-gray-700 transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-700 transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-700 transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-base font-semibold text-gray-700 hover:text-wim-blue"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
