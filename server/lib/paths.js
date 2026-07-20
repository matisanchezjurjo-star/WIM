import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadsDir = path.join(__dirname, '..', 'uploads');
export const generatedDir = path.join(uploadsDir, 'generated');

fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(generatedDir, { recursive: true });
