import { Router } from 'express';
import db from '../db.js';

const router = Router();

function withProductName(item) {
  if (!item.product_id) return { ...item, product_name: null };
  const product = db.prepare('SELECT name FROM products WHERE id = ?').get(item.product_id);
  return { ...item, product_name: product?.name || null };
}

router.get('/', (_req, res) => {
  const items = db.prepare("SELECT * FROM content_items ORDER BY COALESCE(scheduled_date, '9999-99-99') ASC, created_at DESC").all();
  res.json(items.map(withProductName));
});

router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM content_items WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'No encontrado' });
  const { status, scheduled_date, caption, hashtags, title } = req.body;
  db.prepare(
    'UPDATE content_items SET status = ?, scheduled_date = ?, caption = ?, hashtags = ?, title = ? WHERE id = ?'
  ).run(
    status ?? existing.status,
    scheduled_date === undefined ? existing.scheduled_date : scheduled_date,
    caption ?? existing.caption,
    hashtags ?? existing.hashtags,
    title ?? existing.title,
    req.params.id
  );
  res.json(withProductName(db.prepare('SELECT * FROM content_items WHERE id = ?').get(req.params.id)));
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM content_items WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
