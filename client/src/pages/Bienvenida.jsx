import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';
import Logo from '../components/Logo.jsx';

function saludoSegunHora() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

export default function Bienvenida() {
  const [ownerName, setOwnerName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.settings.get().then((s) => setOwnerName(s.owner_name || 'Sergio'));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-16">
      <Logo className="h-24" />

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {saludoSegunHora()}{ownerName ? `, ${ownerName}` : ''}! 👋
        </h1>
        <p className="text-gray-500 mt-2 max-w-md">
          Esta es tu app de marketing de WIM. Todos los días te va a dar ideas de publicaciones listas para usar,
          con imagen, texto y hashtags.
        </p>
      </div>

      <button onClick={() => navigate('/ideas')} className="btn-primary text-xl !px-10 !py-5">
        💡 Ver las ideas de hoy
      </button>
    </div>
  );
}
