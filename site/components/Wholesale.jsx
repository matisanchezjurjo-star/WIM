import WhatsAppButton from './WhatsAppButton.jsx';

export default function Wholesale() {
  return (
    <section id="mayoristas" className="max-w-6xl mx-auto px-5 py-20 scroll-mt-16">
      <div className="rounded-3xl bg-wim-blue text-white px-6 py-14 sm:px-14 text-center flex flex-col items-center gap-5">
        <h2 className="text-3xl font-extrabold">¿Sos electricista, ferretería o fabricante?</h2>
        <p className="text-blue-100 max-w-xl">
          Trabajamos con precios y condiciones especiales para compras por mayor. Pedinos la lista de precios
          mayorista sin compromiso.
        </p>
        <WhatsAppButton className="!bg-wim-orange hover:!brightness-95">Pedir lista de precios</WhatsAppButton>
      </div>
    </section>
  );
}
