import Anthropic from '@anthropic-ai/sdk';

let client = null;

function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return null;
  }
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export function isConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';

/**
 * Pide a Claude una respuesta y espera un único objeto/array JSON de vuelta.
 * Los prompts le piden a Claude que responda SOLO con JSON; igual buscamos
 * el primer bloque { } o [ ] por si agrega texto alrededor.
 */
export async function askClaudeForJSON({ system, prompt, maxTokens = 2000 }) {
  const anthropic = getClient();
  if (!anthropic) {
    const err = new Error('Falta configurar la clave de Anthropic (ANTHROPIC_API_KEY) en el archivo .env');
    err.code = 'NO_API_KEY';
    throw err;
  }

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n');

  return extractJSON(text);
}

function extractJSON(text) {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // Buscar el primer bloque { ... } o [ ... ] dentro del texto
    const objMatch = trimmed.match(/\{[\s\S]*\}/);
    const arrMatch = trimmed.match(/\[[\s\S]*\]/);
    const candidate = arrMatch && (!objMatch || arrMatch.index < objMatch.index) ? arrMatch[0] : objMatch?.[0];
    if (candidate) {
      return JSON.parse(candidate);
    }
    throw new Error('No se pudo interpretar la respuesta de la IA como JSON: ' + trimmed.slice(0, 300));
  }
}
