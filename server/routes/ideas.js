import { Router } from 'express';
import db from '../db.js';
import { askClaudeForJSON } from '../lib/claude.js';
import { buildDailyIdeasPrompt } from '../lib/prompts.js';
import { handleAiError } from '../lib/errors.js';

const router = Router();

router.post('/generate', async (_req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    const settings = db.prepare('SELECT * FROM settings WHERE id = 1').get();
    const { system, prompt } = buildDailyIdeasPrompt({ products, settings });
    const data = await askClaudeForJSON({ system, prompt, maxTokens: 2000 });
    res.json(data);
  } catch (err) {
    handleAiError(res, err);
  }
});

router.post('/save', (req, res) => {
  const { product_name, content_type, title, format, caption, hashtags, why_it_works } = req.body;
  let product_id = null;
  if (product_name) {
    const product = db.prepare('SELECT id FROM products WHERE name = ?').get(product_name);
    if (product) product_id = product.id;
  }
  const result = db
    .prepare(
      `INSERT INTO content_items
        (product_id, title, content_type, format, caption, hashtags, visual_brief, why_it_works, status, source)
       VALUES (?, ?, ?, ?, ?, ?, '', ?, 'idea', 'daily_idea')`
    )
    .run(product_id, title || '', content_type || 'producto', format || 'Feed', caption || '', hashtags || '', why_it_works || '');
  const item = db.prepare('SELECT * FROM content_items WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(item);
});

export default router;
