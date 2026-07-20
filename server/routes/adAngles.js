import { Router } from 'express';
import db from '../db.js';
import { askClaudeForJSON } from '../lib/claude.js';
import { buildAdAnglesPrompt } from '../lib/prompts.js';
import { handleAiError } from '../lib/errors.js';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const { product_id } = req.body;
    const product = product_id ? db.prepare('SELECT * FROM products WHERE id = ?').get(product_id) : null;
    const settings = db.prepare('SELECT * FROM settings WHERE id = 1').get();
    const { system, prompt } = buildAdAnglesPrompt({ product, settings });
    const data = await askClaudeForJSON({ system, prompt, maxTokens: 1500 });
    res.json(data);
  } catch (err) {
    handleAiError(res, err);
  }
});

export default router;
