import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import ErrorNotice from '../components/ErrorNotice.jsx';

export default function Competencia() {
  const [cards, setCards] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.competitors.insights().then((data) => setCards(data.cards));
  }, []);

  async function handleAnalyze() {
    if (!noteText.trim()) return;
    setAnalyzing(true);
    setError(null);
    setResult(null);
    try {
      const data = await api.competitors.analyze(noteText);
      setResult(data.ai_takeaway);
    } catch (err) {
      setError(err);
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Qué hace la competencia</h1>
        <p className="text-gray-500">
          Un resumen de cómo se manejan en redes otras empresas del rubro eléctrico/iluminación en Argentina, para que WIM
          gane más visibilidad y seguidores.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="card">
            <h3 className="font-bold text-gray-800 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.body}</p>
          </div>
        ))}
      </div>

      <div className="card flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">¿Viste algo que hizo otra marca?</h2>
        <p className="text-sm text-gray-500">
          Contanos con tus palabras qué publicó una competencia (una foto, un video, una promoción) y te decimos qué
          aprovechar y una idea para que WIM haga algo mejor.
        </p>
        <textarea
          className="input"
          rows={3}
          placeholder="Ej: Vi que tal empresa subió un video mostrando cómo instalan un portalámparas paso a paso…"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button onClick={handleAnalyze} disabled={analyzing} className="btn-primary self-start">
          {analyzing ? 'Analizando…' : '🔎 Analizar'}
        </button>

        <ErrorNotice error={error} />

        {result && (
          <div className="flex flex-col gap-3 mt-2">
            <div>
              <h4 className="font-semibold text-gray-700">Qué está funcionando</h4>
              <p className="text-sm text-gray-600">{result.takeaway}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Idea para WIM</h4>
              <p className="text-sm text-gray-600">{result.wim_idea}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
