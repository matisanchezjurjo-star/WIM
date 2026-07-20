import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import CopyButton from '../components/CopyButton.jsx';
import ErrorNotice from '../components/ErrorNotice.jsx';
import ImagePreview from '../components/ImagePreview.jsx';

const FORMAT_LABEL = { Feed: '📷 Feed', Historia: '⏱ Historia', Reel: '🎬 Reel', Anuncio: '📢 Anuncio' };
const TYPE_LABEL = {
  producto: 'Foto de producto',
  uso: 'Caso de uso',
  promo: 'Promoción',
  educativo: 'Educativo',
  detras_de_escena: 'Detrás de escena',
};

function IdeaCard({ idea, onSave, saved }) {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="inline-block rounded-full bg-blue-50 text-wim-blue text-xs font-bold px-3 py-1">
          {TYPE_LABEL[idea.content_type] || idea.content_type}
        </span>
        <span className="inline-block rounded-full bg-orange-50 text-wim-orange text-xs font-bold px-3 py-1">
          {FORMAT_LABEL[idea.format] || idea.format}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-800">{idea.title}</h3>
      {idea.product_name && <p className="text-sm text-gray-500">Producto: {idea.product_name}</p>}

      <ImagePreview url={idea.image_url} filename={`wim-${idea.content_type}.png`} />

      <p className="whitespace-pre-wrap text-gray-700">{idea.caption}</p>
      <p className="text-sm text-blue-700 break-words">{idea.hashtags}</p>

      <p className="text-sm text-gray-500 italic">💡 {idea.why_it_works}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        <CopyButton text={idea.caption} label="Copiar texto" />
        <CopyButton text={idea.hashtags} label="Copiar hashtags" />
        <button type="button" onClick={() => onSave(idea)} disabled={saved} className="btn-primary !py-2 !px-4 !text-sm">
          {saved ? '✅ Guardada' : '📅 Guardar en calendario'}
        </button>
      </div>
    </div>
  );
}

export default function Inicio() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedTitles, setSavedTitles] = useState([]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.ideas.generate();
      setIdeas(data.ideas || []);
      setSavedTitles([]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(idea) {
    try {
      await api.ideas.save(idea);
      setSavedTitles((prev) => [...prev, idea.title]);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ideas de publicaciones para hoy</h1>
          <p className="text-gray-500">Tres ideas listas para usar, pensadas con tus productos.</p>
        </div>
        <button onClick={load} disabled={loading} className="btn-secondary">
          🔄 Generar otras ideas
        </button>
      </div>

      <ErrorNotice error={error} />

      {loading && (
        <div className="card text-center text-gray-500 py-12">Pensando ideas para hoy… un momento.</div>
      )}

      {!loading && !error && (
        <div className="grid md:grid-cols-3 gap-4">
          {ideas.map((idea, i) => (
            <IdeaCard key={i} idea={idea} onSave={handleSave} saved={savedTitles.includes(idea.title)} />
          ))}
        </div>
      )}
    </div>
  );
}
