import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import db from '../db.js';
import { uploadsDir } from '../lib/paths.js';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('Solo se pueden subir imágenes'));
  },
});

const router = Router();

function withPhotos(product) {
  const photos = db
    .prepare('SELECT id, filename FROM product_photos WHERE product_id = ? ORDER BY id DESC')
    .all(product.id)
    .map((p) => ({ id: p.id, url: `/uploads/${p.filename}` }));
  return { ...product, photos };
}

router.get('/', (_req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
  res.json(products.map(withPhotos));
});

router.get('/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(withPhotos(product));
});

router.post('/', (req, res) => {
  const { name, type = '', finish_color = '', use_cases = '', selling_points = '' } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: 'El nombre del producto es obligatorio' });
  const result = db
    .prepare('INSERT INTO products (name, type, finish_color, use_cases, selling_points) VALUES (?, ?, ?, ?, ?)')
    .run(name.trim(), type, finish_color, use_cases, selling_points);
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(withPhotos(product));
});

router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Producto no encontrado' });
  const { name, type, finish_color, use_cases, selling_points } = req.body;
  db.prepare(
    'UPDATE products SET name = ?, type = ?, finish_color = ?, use_cases = ?, selling_points = ? WHERE id = ?'
  ).run(
    name ?? existing.name,
    type ?? existing.type,
    finish_color ?? existing.finish_color,
    use_cases ?? existing.use_cases,
    selling_points ?? existing.selling_points,
    req.params.id
  );
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.json(withPhotos(product));
});

router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Producto no encontrado' });
  const photos = db.prepare('SELECT filename FROM product_photos WHERE product_id = ?').all(req.params.id);
  for (const photo of photos) {
    const filePath = path.join(uploadsDir, photo.filename);
    fs.rm(filePath, { force: true }, () => {});
  }
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

router.post('/:id/photos', upload.single('photo'), (req, res) => {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Producto no encontrado' });
  if (!req.file) return res.status(400).json({ error: 'No se recibió ninguna imagen' });
  db.prepare('INSERT INTO product_photos (product_id, filename) VALUES (?, ?)').run(req.params.id, req.file.filename);
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.status(201).json(withPhotos(product));
});

router.delete('/:id/photos/:photoId', (req, res) => {
  const photo = db
    .prepare('SELECT * FROM product_photos WHERE id = ? AND product_id = ?')
    .get(req.params.photoId, req.params.id);
  if (!photo) return res.status(404).json({ error: 'Foto no encontrada' });
  fs.rm(path.join(uploadsDir, photo.filename), { force: true }, () => {});
  db.prepare('DELETE FROM product_photos WHERE id = ?').run(req.params.photoId);
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.json(withPhotos(product));
});

export default router;
