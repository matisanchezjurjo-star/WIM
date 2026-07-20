export default function ImagePreview({ url, filename = 'wim-publicacion.png' }) {
  if (!url) return null;
  return (
    <div className="flex flex-col gap-2">
      <img src={url} alt="Imagen lista para publicar" className="rounded-xl border w-full object-cover aspect-[4/5]" />
      <a href={url} download={filename} className="btn-secondary !py-2 !px-4 !text-sm self-start">
        ⬇️ Descargar imagen
      </a>
    </div>
  );
}
