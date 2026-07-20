export function handleAiError(res, err) {
  if (err.code === 'NO_API_KEY') {
    return res.status(400).json({ error: err.message, code: 'NO_API_KEY' });
  }
  // Errores conocidos de la IA (clave inválida, modelo no encontrado, sin
  // crédito, etc.): ya vienen con un mensaje en español listo para mostrar.
  if (err.code && err.code !== 'AI_ERROR') {
    console.error(err.cause || err);
    return res.status(400).json({ error: err.message, code: err.code });
  }
  console.error(err);
  return res.status(500).json({ error: err.message || 'Ocurrió un error generando el contenido con la IA. Probá de nuevo en un momento.' });
}
