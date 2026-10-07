// Catálogo de productos — EDITÁ ESTE ARCHIVO para agregar, sacar o cambiar
// productos. No hace falta tocar ningún componente.
//
// Para poner una foto real de un producto: guardá el archivo en
// /public/products/ (ej. /public/products/hollywood-e27.jpg) y completá el
// campo `image` con esa ruta (ej. "/products/hollywood-e27.jpg"). Mientras
// `image` esté vacío, el sitio muestra un marcador prolijo en su lugar.

export const products = [
  {
    name: 'Portalámpara y Receptáculo Mignon E14',
    type: 'Rosca E14',
    finish: 'Negro',
    spec: 'Termoplástico · Mignon E14',
    description:
      'Compacto y resistente, pensado para lámparas de mesa, apliques de pared, candelabros y lámparas de sal.',
    uses: ['Lámparas de mesa', 'Apliques de pared', 'Candelabros', 'Lámparas de sal'],
    image: '',
  },
  {
    name: 'Portalámpara Hollywood E27 con Arandela',
    type: 'Rosca E27',
    finish: 'Negro y blanco',
    spec: 'Termoplástico de alta resistencia · E27 con arandela',
    description:
      'Diseñado para espejos tipo Hollywood, marquesinas y vidrieras. Material termoplástico de alta resistencia.',
    uses: ['Espejos Hollywood', 'Marquesinas', 'Vidrieras', 'Camarines'],
    image: '',
  },
  {
    name: 'Portalámpara E27 Estándar',
    type: 'Rosca E27',
    finish: 'Negro / blanco',
    spec: 'Termoplástico · E27 estándar',
    description: 'El clásico, para instalaciones domiciliarias e industriales de todo tipo.',
    uses: ['Iluminación domiciliaria', 'Instalaciones industriales', 'Artefactos en general'],
    image: '',
  },
  {
    name: 'Receptáculo con Chicote',
    type: 'Rosca E27',
    finish: 'Negro',
    spec: 'Termoplástico · con cable incorporado',
    description: 'Con cable incorporado, listo para colgar. Instalación rápida y prolija.',
    uses: ['Lámparas colgantes', 'Guirnaldas', 'Iluminación decorativa'],
    image: '',
  },
];

// El producto destacado en la sección editorial grande. Por defecto es el
// Hollywood E27 — cambiá `featuredProductName` si querés destacar otro.
const featuredProductName = 'Portalámpara Hollywood E27 con Arandela';

export const featuredProduct = {
  ...products.find((p) => p.name === featuredProductName),
  application: 'Espejos con marco de luces, marquesinas de camarín y vidrieras iluminadas.',
  materials: 'Cuerpo termoplástico de alta resistencia, con arandela de montaje incluida.',
  advantages: [
    'Resiste el uso frecuente de encendido y apagado típico de espejos Hollywood.',
    'Arandela incluida para una terminación prolija sobre el panel.',
    'Instalación simple, sin herramientas especiales.',
  ],
  versions: 'Disponible en negro y blanco.',
};
