import './globals.css';

export const metadata = {
  title: 'WIM — Portalámparas y receptáculos eléctricos',
  description:
    'WIM fabrica y distribuye portalámparas y receptáculos eléctricos (E14, E27, Hollywood) en Argentina. Calidad, resistencia y diseño para instaladores, ferreterías y fabricantes de iluminación.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
