import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import CopyButton from '../components/CopyButton.jsx';
import ErrorNotice from '../components/ErrorNotice.jsx';

const STYLE_LABEL = {
  dolor_solucion: '🩹 Problema → Solución',
  antes_despues: '🔄 Antes y después',
  prueba_social: '👍 Prueba social',
};

export default function Angulos() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [angles, setAngles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.products.list().then(setProducts);
  }, []);

  async function handleGenerate() {
    if (!productId) {
      setError({ message: 'Elegí un producto primero.' });
      return;
    }
    setLoading(true);
    setError(null);
    setAngles(null);
    try {
      const data = await api.adAngles.generate({ product_id: productId });
      setAngles(data.angles);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Ángulos de anuncio</h1>
        <p className="text-gray-500">Elegí un producto y te damos 3 formas distintas de anunciarlo en Instagram/Meta.</p>
      </div>

      <div className="card flex flex-col gap-4">
        <div>
          <label className="label">Producto</label>
          <select className="input" value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="">Elegí un producto…</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <button onClick={handleGenerate} disabled={loading} className="btn-primary self-start">
          {loading ? 'Generando…' : '🎯 Generar ángulos de anuncio'}
        </button>
      </div>

      <ErrorNotice error={error} />

      {angles && (
        <div className="grid md:grid-cols-3 gap-4">
          {angles.map((angle, i) => (
            <div key={i} className="card flex flex-col gap-3">
              <span className="inline-block rounded-full bg-blue-50 text-wim-blue text-xs font-bold px-3 py-1 self-start">
                {STYLE_LABEL[angle.style] || angle.style}
              </span>
              <h3 className="text-lg font-bold text-gray-800">{angle.headline}</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{angle.primary_text}</p>
              <p className="font-semibold text-wim-orange">{angle.cta}</p>
              <CopyButton text={`${angle.headline}\n\n${angle.primary_text}\n\n${angle.cta}`} label="Copiar anuncio" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
