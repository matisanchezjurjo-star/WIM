import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';

import './db.js';
import productsRouter from './routes/products.js';
import ideasRouter from './routes/ideas.js';
import composeRouter from './routes/compose.js';
import adAnglesRouter from './routes/adAngles.js';
import calendarRouter from './routes/calendar.js';
import settingsRouter from './routes/settings.js';
import competitorsRouter from './routes/competitors.js';
import { isConfigured } from './lib/claude.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/status', (_req, res) => {
  res.json({ ok: true, ai_configured: isConfigured() });
});

app.use('/api/products', productsRouter);
app.use('/api/ideas', ideasRouter);
app.use('/api/compose', composeRouter);
app.use('/api/ad-angles', adAnglesRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/competitors', competitorsRouter);

// Servir el frontend ya compilado (client/dist), así el dueño del negocio
// solo tiene que abrir una única URL.
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
  res.sendFile(path.join(clientDist, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\nWIM Marketing Studio corriendo en http://localhost:${PORT}\n`);
  if (!isConfigured()) {
    console.log('AVISO: todavía no configuraste ANTHROPIC_API_KEY en el archivo .env. Las funciones con IA no van a andar hasta que lo hagas.\n');
  }
});
