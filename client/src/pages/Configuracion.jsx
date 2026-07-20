import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

const TONES = [
  { value: 'profesional', label: 'Profesional' },
  { value: 'cálido/cercano', label: 'Cálido / cercano' },
  { value: 'audaz/atrevido', label: 'Audaz / atrevido' },
];

export default function Configuracion() {
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.settings.get().then(setForm);
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    await api.settings.update(form);
    setSaved(true);
  }

  if (!form) return <p className="text-gray-500">Cargando…</p>;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Configuración</h1>
        <p className="text-gray-500">Estos datos se usan para que la IA escriba con el tono correcto.</p>
      </div>

      <form onSubmit={handleSave} className="card flex flex-col gap-4">
        <div>
          <label className="label">Tu nombre (para el saludo de bienvenida)</label>
          <input className="input" value={form.owner_name} onChange={(e) => update('owner_name', e.target.value)} />
        </div>

        <div>
          <label className="label">Nombre del negocio</label>
          <input className="input" value={form.business_name} onChange={(e) => update('business_name', e.target.value)} />
        </div>

        <div>
          <label className="label">Tono de voz</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => update('tone', t.value)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold border-2 ${
                  form.tone === t.value ? 'bg-wim-blue border-wim-blue text-white' : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Notas sobre el público / clientes</label>
          <textarea
            className="input"
            rows={3}
            value={form.audience_notes}
            onChange={(e) => update('audience_notes', e.target.value)}
            placeholder="Ej: electricistas, ferreterías, clientes finales que arman lámparas"
          />
        </div>

        <div>
          <label className="label">Idioma</label>
          <input className="input" value={form.language} disabled />
          <p className="text-xs text-gray-400 mt-1">Por ahora la app siempre escribe en español de Argentina.</p>
        </div>

        <button type="submit" className="btn-primary self-start">
          {saved ? '✅ Guardado' : '💾 Guardar cambios'}
        </button>
      </form>
    </div>
  );
}
