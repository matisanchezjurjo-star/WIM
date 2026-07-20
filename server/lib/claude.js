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

  let response;
  try {
    response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: prompt }],
    });
  } catch (err) {
    throw describeAnthropicError(err);
  }

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n');

  return extractJSON(text);
}

// Convierte los errores del SDK de Anthropic (que suelen ser técnicos y en
// inglés) en un mensaje claro en español, para que quien use la app entienda
// qué pasó sin tener que leer el log del servidor.
function describeAnthropicError(err) {
  const status = err?.status;
  const errType = err?.error?.error?.type || err?.error?.type;
  const raw = err?.error?.error?.message || err?.message || String(err);

  let message;
  let code = 'AI_ERROR';

  if (status === 401 || errType === 'authentication_error') {
    message = 'La clave de Anthropic (ANTHROPIC_API_KEY) no es válida. Revisá que la hayas copiado completa y sin espacios en el archivo .env.';
    code = 'INVALID_API_KEY';
  } else if (status === 404 || errType === 'not_found_error') {
    message = `El modelo de IA configurado no existe o no está disponible para tu cuenta ("${MODEL}"). Probá borrar la línea ANTHROPIC_MODEL del archivo .env para usar el valor por defecto.`;
    code = 'MODEL_NOT_FOUND';
  } else if (status === 429 || errType === 'rate_limit_error') {
    message = 'Se hicieron demasiadas consultas seguidas a la IA. Esperá un minuto y probá de nuevo.';
    code = 'RATE_LIMIT';
  } else if (status === 400 && errType === 'invalid_request_error' && /credit|billing/i.test(raw)) {
    message = 'Tu cuenta de Anthropic no tiene crédito cargado. Entrá a console.anthropic.com y cargá un método de pago.';
    code = 'NO_CREDIT';
  } else if (status === 529 || errType === 'overloaded_error') {
    message = 'Los servidores de Anthropic están saturados en este momento. Probá de nuevo en un rato.';
    code = 'OVERLOADED';
  } else if (!status && /fetch|network|ENOTFOUND|ECONNREFUSED/i.test(raw)) {
    message = 'No se pudo conectar a internet para hablar con la IA. Revisá tu conexión y probá de nuevo.';
    code = 'NETWORK';
  } else {
    message = `Ocurrió un error hablando con la IA: ${raw}`;
  }

  const wrapped = new Error(message);
  wrapped.code = code;
  wrapped.cause = err;
  return wrapped;
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
