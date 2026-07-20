import { useState } from 'react';

export default function CopyButton({ text, label = 'Copiar' }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      alert('No se pudo copiar. Seleccioná el texto manualmente.');
    }
  }

  return (
    <button type="button" onClick={handleCopy} className="btn-secondary !py-2 !px-4 !text-sm">
      {copied ? '✅ Copiado' : `📋 ${label}`}
    </button>
  );
}
