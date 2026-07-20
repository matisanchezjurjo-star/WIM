export default function ErrorNotice({ error }) {
  if (!error) return null;
  const isKeyMissing = error.code === 'NO_API_KEY';
  return (
    <div className="card border-2 border-red-200 bg-red-50 text-red-800">
      <p className="font-semibold mb-1">{isKeyMissing ? '🔑 Falta configurar la clave de IA' : '⚠️ Ocurrió un problema'}</p>
      <p className="text-sm">
        {isKeyMissing
          ? 'Todavía no se cargó la clave de Anthropic en el archivo .env. Revisá el README para saber cómo conseguirla y pegarla.'
          : error.message}
      </p>
    </div>
  );
}
