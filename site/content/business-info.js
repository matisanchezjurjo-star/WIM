// Datos de contacto y del negocio — EDITÁ ESTE ARCHIVO con los datos reales de WIM.
// Todo lo que está acá se usa en varias partes de la página, así que cambiarlo
// acá alcanza para actualizar todo el sitio.

export const businessInfo = {
  name: 'WIM',
  tagline: 'Portalámparas y receptáculos hechos para durar.',

  // TODO: reemplazar por el número real de WhatsApp (con código de país, sin
  // espacios ni signos: ej. 5491122334455 para +54 9 11 2233-4455)
  whatsappNumber: '5491100000000',

  // TODO: reemplazar por el usuario real de Instagram (sin @)
  instagramHandle: 'wim.electricidad',

  // TODO: reemplazar por el email real de contacto
  email: 'contacto@wim.com.ar',

  // TODO: ciudad / zona donde está el negocio (se usa solo si se completa)
  location: '',
};

function waLink(message) {
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Distintos mensajes prearmados según desde dónde se escribe, para que la
// conversación de WhatsApp ya arranque con contexto.
export const whatsappLink = waLink('Hola! Quería consultar por los productos de WIM.');
export const whatsappQuoteLink = waLink('Hola! Quería pedir un presupuesto.');
export const whatsappWholesaleLink = waLink('Hola! Quería pedir la lista de precios mayorista.');

export const instagramLink = `https://instagram.com/${businessInfo.instagramHandle}`;
