import { Router } from 'express';
import db from '../db.js';
import { askClaudeForJSON } from '../lib/claude.js';
import { buildComposePrompt } from '../lib/prompts.js';
import { handleAiError } from '../lib/errors.js';
import { generateImage } from '../lib/imageGen.js';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const { product_id, content_type = 'producto', format = 'Feed' } = req.body;
    const product = product_id ? db.prepare('SELECT * FROM products WHERE id = ?').get(product_id) : null;
    const settings = db.prepare('SELECT * FROM settings WHERE id = 1').get();
    const { system, prompt } = buildComposePrompt({ product, contentType: content_type, format, settings });
    const data = await askClaudeForJSON({ system, prompt, maxTokens: 2200 });
    const generatedImageUrl = await generateImage(data.visual_brief);
    res.json({ ...data, generated_image_url: generatedImageUrl, product, content_type, format });
  } catch (err) {
    handleAiError(res, err);
  }
});

router.post('/save', (req, res) => {
  const { product_id, content_type, format, caption, hashtags, visual_brief } = req.body;
  const result = db
    .prepare(
      `INSERT INTO content_items
        (product_id, title, content_type, format, caption, hashtags, visual_brief, why_it_works, status, source)
       VALUES (?, '', ?, ?, ?, ?, ?, '', 'ready', 'composer')`
    )
    .run(product_id || null, content_type || 'producto', format || 'Feed', caption || '', hashtags || '', visual_brief || '');
  const item = db.prepare('SELECT * FROM content_items WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(item);
});

export default router;
