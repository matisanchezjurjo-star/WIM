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
    <header className="sticky top-0 z-30 bg-paper border-b border-concrete-dark/60">
      <div className="content-width px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
        <a href="#inicio" onClick={() => setOpen(false)} className="shrink-0">
          <Logo className="h-9" />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-eyebrow text-charcoal/70 hover:text-wim-blue transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-wim-orange transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:inline-flex items-center border border-wim-blue text-wim-blue label-eyebrow px-5 py-2.5 hover:bg-wim-blue hover:text-white transition-colors"
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
          <span className={`block h-px w-6 bg-charcoal transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-charcoal transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-charcoal transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-concrete-dark/60 bg-paper px-6 py-5 flex flex-col gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-charcoal/80 hover:text-wim-blue"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
