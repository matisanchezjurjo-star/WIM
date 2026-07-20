export function handleAiError(res, err) {
  if (err.code === 'NO_API_KEY') {
    return res.status(400).json({ error: err.message, code: 'NO_API_KEY' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Ocurrió un error generando el contenido con la IA. Probá de nuevo en un momento.' });
}
