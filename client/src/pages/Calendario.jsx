import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';
import CopyButton from '../components/CopyButton.jsx';

const STATUS_LABEL = { idea: 'Idea', ready: 'Lista', posted: 'Publicada' };
const STATUS_COLOR = { idea: 'bg-gray-400', ready: 'bg-wim-orange', posted: 'bg-green-600' };
const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function toISODate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function buildMonthGrid(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Lunes = 0 ... Domingo = 6
  const startOffset = (firstDay.getDay() + 6) % 7;
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
  return days;
}

function ItemRow({ item, onChanged }) {
  async function setStatus(status) {
    await api.calendar.update(item.id, { status });
    onChanged();
  }
  async function setDate(date) {
    await api.calendar.update(item.id, { scheduled_date: date || null });
    onChanged();
  }
  async function remove() {
    if (!confirm('¿Borrar esta publicación del calendario?')) return;
    await api.calendar.remove(item.id);
    onChanged();
  }

  return (
    <div className="card flex flex-col gap-2">
      <div className="flex justify-between items-start gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          {item.image_url && (
            <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg object-cover border shrink-0" />
          )}
          <div>
            <p className="font-bold text-gray-800">{item.title || item.content_type}</p>
            {item.product_name && <p className="text-xs text-gray-500">{item.product_name}</p>}
          </div>
        </div>
        <span className={`text-xs text-white font-semibold px-2 py-1 rounded-full ${STATUS_COLOR[item.status]}`}>
          {STATUS_LABEL[item.status]}
        </span>
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.caption}</p>
      <div className="flex flex-wrap gap-2 items-center">
        <CopyButton text={item.caption} label="Copiar" />
        <select className="input !w-auto !py-2" value={item.status} onChange={(e) => setStatus(e.target.value)}>
          <option value="idea">Idea</option>
          <option value="ready">Lista</option>
          <option value="posted">Publicada</option>
        </select>
        <input type="date" className="input !w-auto !py-2" value={item.scheduled_date || ''} onChange={(e) => setDate(e.target.value)} />
        <button onClick={remove} className="btn-secondary !py-2 !px-3 !text-sm">🗑️</button>
      </div>
    </div>
  );
}

export default function Calendario() {
  const [items, setItems] = useState([]);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);

  async function load() {
    setItems(await api.calendar.list());
  }

  useEffect(() => {
    load();
  }, []);

  const itemsByDate = useMemo(() => {
    const map = {};
    for (const item of items) {
      if (!item.scheduled_date) continue;
      (map[item.scheduled_date] ||= []).push(item);
    }
    return map;
  }, [items]);

  const unscheduled = items.filter((i) => !i.scheduled_date);
  const days = buildMonthGrid(month);
  const todayISO = toISODate(new Date());

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Calendario de publicaciones</h1>
        <p className="text-gray-500">Tocá un día para asignarle una idea guardada.</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <button className="btn-secondary !py-2 !px-4" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>◀</button>
          <h2 className="font-bold text-lg">{MONTH_NAMES[month.getMonth()]} {month.getFullYear()}</h2>
          <button className="btn-secondary !py-2 !px-4" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>▶</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-1">
          {WEEKDAYS.map((w) => <div key={w}>{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (!day) return <div key={i} />;
            const iso = toISODate(day);
            const dayItems = itemsByDate[iso] || [];
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(iso)}
                className={`aspect-square rounded-lg border-2 p-1 flex flex-col items-center justify-start text-xs ${
                  selectedDate === iso ? 'border-wim-blue bg-blue-50' : iso === todayISO ? 'border-wim-orange' : 'border-gray-100'
                }`}
              >
                <span className="font-semibold">{day.getDate()}</span>
                <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                  {dayItems.slice(0, 4).map((it) => (
                    <span key={it.id} className={`w-2 h-2 rounded-full ${STATUS_COLOR[it.status]}`} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-gray-700">Publicaciones para el {selectedDate}</h3>
          {(itemsByDate[selectedDate] || []).length === 0 && <p className="text-gray-500 text-sm">Sin publicaciones asignadas todavía.</p>}
          {(itemsByDate[selectedDate] || []).map((item) => (
            <ItemRow key={item.id} item={item} onChanged={load} />
          ))}

          {unscheduled.length > 0 && (
            <div className="card">
              <p className="label mb-2">Asignar una idea guardada a este día</p>
              <div className="flex flex-col gap-2">
                {unscheduled.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 border-b last:border-0 pb-2">
                    <span className="text-sm text-gray-700">{item.title || item.content_type}</span>
                    <button
                      className="btn-secondary !py-1 !px-3 !text-xs"
                      onClick={async () => {
                        await api.calendar.update(item.id, { scheduled_date: selectedDate });
                        load();
                      }}
                    >
                      Asignar acá
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <h3 className="font-bold text-gray-700 mb-3">Ideas guardadas sin fecha ({unscheduled.length})</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {unscheduled.map((item) => (
            <ItemRow key={item.id} item={item} onChanged={load} />
          ))}
        </div>
      </div>
    </div>
  );
}
