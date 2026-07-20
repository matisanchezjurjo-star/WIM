import { Router } from 'express';
import db from '../db.js';
import { INSIGHT_CARDS } from '../lib/industryInsights.js';
import { askClaudeForJSON } from '../lib/claude.js';
import { buildCompetitorAnalysisPrompt } from '../lib/prompts.js';
import { handleAiError } from '../lib/errors.js';

const router = Router();

router.get('/insights', (_req, res) => {
  res.json({ cards: INSIGHT_CARDS });
});

router.get('/notes', (_req, res) => {
  res.json(db.prepare('SELECT * FROM competitor_notes ORDER BY created_at DESC').all());
});

router.post('/analyze', async (req, res) => {
  try {
    const { note_text } = req.body;
    if (!note_text || !note_text.trim()) return res.status(400).json({ error: 'Escribí algo primero' });
    const settings = db.prepare('SELECT * FROM settings WHERE id = 1').get();
    const { system, prompt } = buildCompetitorAnalysisPrompt({ noteText: note_text, settings });
    const data = await askClaudeForJSON({ system, prompt, maxTokens: 800 });
    const result = db
      .prepare('INSERT INTO competitor_notes (note_text, ai_takeaway) VALUES (?, ?)')
      .run(note_text, JSON.stringify(data));
    const saved = db.prepare('SELECT * FROM competitor_notes WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ ...saved, ai_takeaway: data });
  } catch (err) {
    handleAiError(res, err);
  }
});

export default router;
