// Punto de integración para generación de imágenes con IA.
//
// Hoy esta función no hace nada: devuelve null y el resto de la app simplemente
// no muestra una imagen generada (usa el "brief" visual en texto, que sí
// funciona siempre). El día de mañana, si se agrega una API de generación de
// imágenes (por ejemplo con su propia API key en el .env), esta es la única
// función que hay que completar: recibe el brief visual en texto y debe
// devolver una URL o un path a la imagen generada.
export async function generateImage(_visualBrief) {
  return null;
}

export function imageGenConfigured() {
  return false;
}
