import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Bienvenida from './pages/Bienvenida.jsx';
import Inicio from './pages/Inicio.jsx';
import Productos from './pages/Productos.jsx';
import Crear from './pages/Crear.jsx';
import Calendario from './pages/Calendario.jsx';
import Angulos from './pages/Angulos.jsx';
import Competencia from './pages/Competencia.jsx';
import Configuracion from './pages/Configuracion.jsx';

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Nav />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/ideas" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/angulos" element={<Angulos />} />
          <Route path="/competencia" element={<Competencia />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </main>
    </div>
  );
}
