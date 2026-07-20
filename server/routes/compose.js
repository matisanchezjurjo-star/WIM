import { Router } from 'express';
import db from '../db.js';
import { askClaudeForJSON } from '../lib/claude.js';
import { buildComposePrompt } from '../lib/prompts.js';
import { handleAiError } from '../lib/errors.js';
import { generateImage } from '../lib/imageGen.js';
import { CONTENT_TYPE_LABEL } from '../lib/labels.js';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const { product_id, content_type = 'producto', format = 'Feed' } = req.body;
    const product = product_id ? db.prepare('SELECT * FROM products WHERE id = ?').get(product_id) : null;
    const settings = db.prepare('SELECT * FROM settings WHERE id = 1').get();
    const { system, prompt } = buildComposePrompt({ product, contentType: content_type, format, settings });
    const data = await askClaudeForJSON({ system, prompt, maxTokens: 2200 });

    const photo = product
      ? db.prepare('SELECT filename FROM product_photos WHERE product_id = ? ORDER BY id DESC LIMIT 1').get(product.id)
      : null;
    const generatedImageUrl = await generateImage({
      headline: product?.name || settings.business_name,
      subtext: CONTENT_TYPE_LABEL[content_type] || content_type,
      photoFilename: photo?.filename || null,
    });

    res.json({ ...data, generated_image_url: generatedImageUrl, product, content_type, format });
  } catch (err) {
    handleAiError(res, err);
  }
});

router.post('/save', (req, res) => {
  const { product_id, content_type, format, caption, hashtags, visual_brief, image_url } = req.body;
  const result = db
    .prepare(
      `INSERT INTO content_items
        (product_id, title, content_type, format, caption, hashtags, visual_brief, why_it_works, status, source, image_url)
       VALUES (?, '', ?, ?, ?, ?, ?, '', 'ready', 'composer', ?)`
    )
    .run(
      product_id || null,
      content_type || 'producto',
      format || 'Feed',
      caption || '',
      hashtags || '',
      visual_brief || '',
      image_url || null
    );
  const item = db.prepare('SELECT * FROM content_items WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(item);
});

export default router;
