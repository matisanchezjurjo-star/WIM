import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import CopyButton from '../components/CopyButton.jsx';
import ErrorNotice from '../components/ErrorNotice.jsx';

const CONTENT_TYPES = [
  { value: 'producto', label: 'Foto de producto' },
  { value: 'uso', label: 'Caso de uso' },
  { value: 'promo', label: 'Promoción' },
  { value: 'educativo', label: 'Educativo' },
  { value: 'detras_de_escena', label: 'Detrás de escena' },
];
const FORMATS = ['Feed', 'Historia', 'Anuncio', 'Carrusel'];
const TONES = [
  { key: 'informativo', label: 'Informativo' },
  { key: 'promocional', label: 'Promocional' },
  { key: 'estilo_de_vida', label: 'Estilo de vida' },
];

export default function Crear() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [contentType, setContentType] = useState('producto');
  const [format, setFormat] = useState('Feed');
  const [result, setResult] = useState(null);
  const [activeTone, setActiveTone] = useState('informativo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.products.list().then(setProducts);
  }, []);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);
    try {
      const data = await api.compose.generate({ product_id: productId || null, content_type: contentType, format });
      setResult(data);
      setActiveTone('informativo');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    try {
      await api.compose.save({
        product_id: productId || null,
        content_type: contentType,
        format,
        caption: result.captions[activeTone],
        hashtags: result.hashtags,
        visual_brief: result.visual_brief,
      });
      setSaved(true);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Crear una publicación</h1>
        <p className="text-gray-500">Elegí un producto y el tipo de contenido, y generamos el texto y las hashtags listos para pegar.</p>
      </div>

      <div className="card flex flex-col gap-4">
        <div>
          <label className="label">Producto</label>
          <select className="input" value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="">General / marca WIM</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Tipo de contenido</label>
          <div className="flex flex-wrap gap-2">
            {CONTENT_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setContentType(t.value)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold border-2 ${
                  contentType === t.value ? 'bg-wim-blue border-wim-blue text-white' : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Formato</label>
          <div className="flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold border-2 ${
                  format === f ? 'bg-wim-orange border-wim-orange text-white' : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleGenerate} disabled={loading} className="btn-primary self-start">
          {loading ? 'Generando…' : '✨ Generar contenido'}
        </button>
      </div>

      <ErrorNotice error={error} />

      {result && (
        <div className="card flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {TONES.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTone(t.key)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold border-2 ${
                  activeTone === t.key ? 'bg-wim-blue border-wim-blue text-white' : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <p className="whitespace-pre-wrap text-gray-700 text-lg">{result.captions[activeTone]}</p>
          <CopyButton text={result.captions[activeTone]} label="Copiar este texto" />

          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Hashtags sugeridos</h4>
            <p className="text-sm text-blue-700 break-words">{result.hashtags}</p>
            <CopyButton text={result.hashtags} label="Copiar hashtags" />
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-1">🎥 Qué foto o video sacar</h4>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{result.visual_brief}</p>
          </div>

          <button onClick={handleSave} disabled={saved} className="btn-accent self-start">
            {saved ? '✅ Guardada en el calendario' : '📅 Guardar en el calendario'}
          </button>
        </div>
      )}
    </div>
  );
}
