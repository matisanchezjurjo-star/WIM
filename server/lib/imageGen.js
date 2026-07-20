import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { uploadsDir, generatedDir } from './paths.js';

const WIDTH = 1080;
const HEIGHT = 1350; // formato 4:5, el que mejor entra en el feed de Instagram
const WIM_BLUE = '#0b3a75';
const WIM_ORANGE = '#e8622c';

export function imageGenConfigured() {
  return true;
}

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Corta un texto largo en varias líneas cortas para que entre en la imagen.
function wrapText(text, maxCharsPerLine) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = (line ? line + ' ' : '') + word;
    if (candidate.length > maxCharsPerLine && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4); // no más de 4 líneas, si no queda enorme
}

function buildOverlaySvg({ headline, subtext }) {
  const headlineLines = wrapText(headline, 22);
  const lineHeight = 64;
  const subtextHeight = subtext ? 44 : 0;
  const textBlockHeight = headlineLines.length * lineHeight + subtextHeight + 30;
  const gradientTop = HEIGHT - textBlockHeight - 140;
  const firstLineY = HEIGHT - textBlockHeight + lineHeight - 10;

  const headlineSvg = headlineLines
    .map(
      (line, i) =>
        `<text x="64" y="${firstLineY + i * lineHeight}" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="54" fill="white">${escapeXml(line)}</text>`
    )
    .join('');

  const subtextSvg = subtext
    ? `<text x="64" y="${firstLineY + headlineLines.length * lineHeight + 4}" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#e5e7eb">${escapeXml(subtext)}</text>`
    : '';

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.8"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${gradientTop}" width="${WIDTH}" height="${HEIGHT - gradientTop}" fill="url(#fade)" />
      <rect x="56" y="56" width="176" height="76" rx="12" fill="white" opacity="0.94" />
      <text x="76" y="108" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-style="italic" font-size="42" fill="${WIM_BLUE}" letter-spacing="-1">WIM</text>
      ${headlineSvg}
      ${subtextSvg}
      <rect x="64" y="${HEIGHT - 54}" width="120" height="9" fill="${WIM_ORANGE}" rx="4"/>
    </svg>
  `;
}

/**
 * Genera una imagen 1080x1350 lista para publicar: la foto del producto (si
 * hay una cargada) o un fondo con los colores de WIM, con el logo y un texto
 * superpuestos. Devuelve la ruta pública (/uploads/generated/xxx.png) o null
 * si algo sale mal (la app sigue funcionando igual sin la imagen).
 */
export async function generateImage({ headline, subtext, photoFilename }) {
  try {
    let base;
    const photoPath = photoFilename ? path.join(uploadsDir, photoFilename) : null;

    if (photoPath && fs.existsSync(photoPath)) {
      base = sharp(photoPath).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' });
    } else {
      base = sharp({
        create: { width: WIDTH, height: HEIGHT, channels: 4, background: WIM_BLUE },
      });
    }

    const overlay = Buffer.from(buildOverlaySvg({ headline, subtext }));
    const outputBuffer = await base
      .composite([{ input: overlay, top: 0, left: 0 }])
      .png()
      .toBuffer();

    const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.png`;
    fs.writeFileSync(path.join(generatedDir, filename), outputBuffer);
    return `/uploads/generated/${filename}`;
  } catch (err) {
    console.error('No se pudo generar la imagen:', err);
    return null;
  }
}
