import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(path.join(dataDir, 'wim.db'));
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT '',
  finish_color TEXT NOT NULL DEFAULT '',
  use_cases TEXT NOT NULL DEFAULT '',
  selling_points TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS product_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS content_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT '',
  content_type TEXT NOT NULL DEFAULT 'producto',
  format TEXT NOT NULL DEFAULT 'Feed',
  caption TEXT NOT NULL DEFAULT '',
  hashtags TEXT NOT NULL DEFAULT '',
  visual_brief TEXT NOT NULL DEFAULT '',
  why_it_works TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'idea',
  scheduled_date TEXT,
  source TEXT NOT NULL DEFAULT 'daily_idea',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  business_name TEXT NOT NULL DEFAULT 'WIM',
  tone TEXT NOT NULL DEFAULT 'profesional',
  audience_notes TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL DEFAULT 'es-AR'
);

CREATE TABLE IF NOT EXISTS competitor_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  note_text TEXT NOT NULL,
  ai_takeaway TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

// Fila única de configuración
db.exec(`INSERT OR IGNORE INTO settings (id, business_name, tone, audience_notes, language)
  VALUES (1, 'WIM', 'profesional', 'Electricistas, instaladores, ferreterías, decoradores y clientes finales que compran portalámparas y receptáculos en Argentina.', 'es-AR');`);

// Productos de ejemplo, para que la biblioteca no arranque vacía
const seedCount = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
if (seedCount === 0) {
  const insertProduct = db.prepare(`INSERT INTO products (name, type, finish_color, use_cases, selling_points) VALUES (?, ?, ?, ?, ?)`);
  insertProduct.run(
    'Portalámparas y Receptáculo Mignon E14',
    'Portalámpara rosca E14',
    'Negro',
    'Lámparas de mesa, apliques de pared, candelabros, iluminación decorativa, lámparas de sal',
    'Rosca E14 Mignon; material resistente; fácil instalación; diseño compacto y elegante'
  );
  insertProduct.run(
    'Portalámpara Hollywood E27 con Arandela',
    'Portalámpara rosca E27',
    'Negro y blanco',
    'Espejos tipo Hollywood, marquesinas, vidrieras, camarines',
    'Alta calidad y estética; material termoplástico resistente; compatible con lámparas E27'
  );
}

export default db;
