import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api.js';
import ErrorNotice from '../components/ErrorNotice.jsx';

const EMPTY = { name: '', type: '', finish_color: '', use_cases: '', selling_points: '' };

function ProductForm({ initial, onSaved, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const isEditing = Boolean(initial?.id);

  useEffect(() => setForm(initial || EMPTY), [initial]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError({ message: 'Ponele un nombre al producto.' });
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (isEditing) {
        await api.products.update(initial.id, form);
      } else {
        await api.products.create(form);
      }
      onSaved();
      setForm(EMPTY);
    } catch (err) {
      setError(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-800">{isEditing ? 'Editar producto' : 'Agregar un producto nuevo'}</h2>
      <ErrorNotice error={error} />
      <div>
        <label className="label">Nombre del producto *</label>
        <input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Ej: Portalámpara Hollywood E27" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Tipo</label>
          <input className="input" value={form.type} onChange={(e) => update('type', e.target.value)} placeholder="Ej: rosca E27" />
        </div>
        <div>
          <label className="label">Terminación / color</label>
          <input className="input" value={form.finish_color} onChange={(e) => update('finish_color', e.target.value)} placeholder="Ej: negro y blanco" />
        </div>
      </div>
      <div>
        <label className="label">¿Para qué se usa?</label>
        <textarea className="input" rows={2} value={form.use_cases} onChange={(e) => update('use_cases', e.target.value)} placeholder="Ej: lámparas de mesa, apliques, candelabros" />
      </div>
      <div>
        <label className="label">¿Qué lo hace bueno? (puntos fuertes)</label>
        <textarea className="input" rows={2} value={form.selling_points} onChange={(e) => update('selling_points', e.target.value)} placeholder="Ej: material resistente, fácil instalación" />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Guardando…' : isEditing ? '💾 Guardar cambios' : '➕ Agregar producto'}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

function ProductCard({ product, onChanged, onEdit }) {
  const fileInput = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await api.products.uploadPhoto(product.id, file);
      onChanged();
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleRemovePhoto(photoId) {
    await api.products.removePhoto(product.id, photoId);
    onChanged();
  }

  async function handleDelete() {
    if (!confirm(`¿Borrar "${product.name}"? Esta acción no se puede deshacer.`)) return;
    await api.products.remove(product.id);
    onChanged();
  }

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.type} · {product.finish_color}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => onEdit(product)} className="btn-secondary !py-2 !px-3 !text-sm">✏️</button>
          <button onClick={handleDelete} className="btn-secondary !py-2 !px-3 !text-sm">🗑️</button>
        </div>
      </div>
      <p className="text-sm text-gray-600"><strong>Usos:</strong> {product.use_cases || '—'}</p>
      <p className="text-sm text-gray-600"><strong>Puntos fuertes:</strong> {product.selling_points || '—'}</p>

      {product.photos.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {product.photos.map((photo) => (
            <div key={photo.id} className="relative">
              <img src={photo.url} alt={product.name} className="h-20 w-20 object-cover rounded-lg border" />
              <button
                onClick={() => handleRemovePhoto(photo.id)}
                className="absolute -top-2 -right-2 bg-white border rounded-full w-6 h-6 text-xs shadow"
                title="Quitar foto"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <input type="file" accept="image/*" ref={fileInput} onChange={handleFile} className="hidden" />
        <button onClick={() => fileInput.current?.click()} disabled={uploading} className="btn-secondary !py-2 !px-4 !text-sm">
          {uploading ? 'Subiendo…' : '📷 Agregar foto'}
        </button>
      </div>
    </div>
  );
}

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await api.products.list();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function handleSaved() {
    setEditing(null);
    load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Biblioteca de productos</h1>
        <p className="text-gray-500">Cargá tus productos acá una sola vez: después las ideas y publicaciones se generan solas usando esta información.</p>
      </div>

      <ProductForm initial={editing} onSaved={handleSaved} onCancel={() => setEditing(null)} />

      {loading ? (
        <p className="text-gray-500">Cargando…</p>
      ) : products.length === 0 ? (
        <div className="card text-center text-gray-500 py-10">Todavía no cargaste ningún producto.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onChanged={load} onEdit={setEditing} />
          ))}
        </div>
      )}
    </div>
  );
}
