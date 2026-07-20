import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/', (_req, res) => {
  const settings = db.prepare('SELECT * FROM settings WHERE id = 1').get();
  res.json(settings);
});

router.put('/', (req, res) => {
  const existing = db.prepare('SELECT * FROM settings WHERE id = 1').get();
  const { business_name, tone, audience_notes, language } = req.body;
  db.prepare('UPDATE settings SET business_name = ?, tone = ?, audience_notes = ?, language = ? WHERE id = 1').run(
    business_name ?? existing.business_name,
    tone ?? existing.tone,
    audience_notes ?? existing.audience_notes,
    language ?? existing.language
  );
  res.json(db.prepare('SELECT * FROM settings WHERE id = 1').get());
});

export default router;
