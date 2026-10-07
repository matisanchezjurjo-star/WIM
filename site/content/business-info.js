// Datos de contacto y del negocio — EDITÁ ESTE ARCHIVO con los datos reales de WIM.
// Todo lo que está acá se usa en varias partes de la página, así que cambiarlo
// acá alcanza para actualizar todo el sitio.

export const businessInfo = {
  name: 'WIM',
  tagline: 'Portalámparas y receptáculos eléctricos, hechos para durar.',

  // TODO: reemplazar por el número real de WhatsApp (con código de país, sin
  // espacios ni signos: ej. 5491122334455 para +54 9 11 2233-4455)
  whatsappNumber: '5491100000000',
  whatsappMessage: 'Hola! Quería consultar por los productos de WIM.',

  // TODO: reemplazar por el usuario real de Instagram (sin @)
  instagramHandle: 'wim.electricidad',

  // TODO: reemplazar por el email real de contacto
  email: 'contacto@wim.com.ar',

  // TODO: ciudad / zona donde está el negocio
  location: 'Argentina',
};

export const whatsappLink = `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(
  businessInfo.whatsappMessage
)}`;

export const instagramLink = `https://instagram.com/${businessInfo.instagramHandle}`;
