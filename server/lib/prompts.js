import { INDUSTRY_CONTEXT } from './industryInsights.js';

function settingsBlock(settings) {
  return `
Datos del negocio:
- Nombre: ${settings.business_name}
- Tono de voz preferido: ${settings.tone} (opciones posibles: profesional, cálido/cercano, audaz/atrevido)
- Público objetivo / notas: ${settings.audience_notes || 'Sin notas adicionales.'}
- Idioma: español rioplatense (Argentina) - usar "vos", nunca "tú".
`.trim();
}

function productBlock(product) {
  if (!product) return 'No se especificó un producto puntual: elegí vos uno o hablá de la marca WIM en general.';
  return `
Producto:
- Nombre: ${product.name}
- Tipo: ${product.type}
- Terminación/color: ${product.finish_color}
- Usos: ${product.use_cases}
- Puntos fuertes de venta: ${product.selling_points}
`.trim();
}

const BASE_SYSTEM = `
Sos un asistente de marketing en redes sociales para WIM, una empresa argentina que
fabrica y vende portalámparas y receptáculos eléctricos (rosca E14, E27, tipo
Hollywood, etc.) usados en lámparas de mesa, apliques de pared, candelabros,
iluminación decorativa y lámparas de sal.

Escribís siempre en español rioplatense (Argentina), usando "vos". Nunca en
inglés. El dueño del negocio que va a usar este texto no es un experto en
marketing: el contenido tiene que quedar 100% listo para copiar y pegar,
sin necesidad de retocarlo.

${INDUSTRY_CONTEXT}

Respondé SIEMPRE y ÚNICAMENTE con JSON válido, sin texto antes ni después,
sin marcado de código (nada de \`\`\`), siguiendo exactamente la forma pedida.
`.trim();

export function buildDailyIdeasPrompt({ products, settings }) {
  const productsList = products.length
    ? products
        .map(
          (p, i) =>
            `${i + 1}. ${p.name} (${p.type}, ${p.finish_color}) - usos: ${p.use_cases}. Puntos fuertes: ${p.selling_points}`
        )
        .join('\n')
    : 'Todavía no hay productos cargados en la biblioteca. Sugerí ideas genéricas sobre portalámparas y receptáculos eléctricos.';

  const prompt = `
${settingsBlock(settings)}

Biblioteca de productos disponible:
${productsList}

Generá 3 ideas de contenido para hoy, cada una basada en un producto real de la
lista de arriba (si hay productos). Las 3 ideas tienen que ser de tipos
DIFERENTES entre sí, elegidos de esta lista: "producto" (foto de producto),
"uso" (caso de uso / aplicación real), "promo" (oferta o promoción),
"educativo" (tip útil, ej. cómo elegir la rosca correcta), "detras_de_escena"
(detrás de escena del taller/local).

Devolvé un JSON con esta forma exacta:
{
  "ideas": [
    {
      "content_type": "producto" | "uso" | "promo" | "educativo" | "detras_de_escena",
      "product_name": "nombre del producto elegido de la biblioteca, o null",
      "title": "título corto de la idea (máx 8 palabras)",
      "format": "Feed" | "Historia" | "Reel" | "Anuncio",
      "caption": "texto de la publicación, listo para pegar en Instagram, 2 a 5 líneas",
      "hashtags": "10 a 15 hashtags separados por espacio, sin numerar",
      "why_it_works": "una sola frase explicando por qué esta idea funciona para WIM"
    }
  ]
}
`.trim();

  return { system: BASE_SYSTEM, prompt };
}

export function buildComposePrompt({ product, contentType, format, settings }) {
  const prompt = `
${settingsBlock(settings)}

${productBlock(product)}

Tipo de contenido pedido: ${contentType}
Formato pedido: ${format} (Feed post, Historia, Anuncio o Carrusel)

Generá el contenido para esta publicación:
1. Tres variantes de texto/caption con tonos distintos: "informativo" (directo,
   cuenta características y usos), "promocional" (invita a comprar, puede
   mencionar oferta genérica u urgencia suave), "estilo_de_vida" (emocional,
   muestra cómo queda el ambiente terminado).
2. Un set de hashtags (10 a 15) mezclando amplios, específicos del producto y
   locales de Argentina, según la estrategia del rubro.
3. Un brief visual: instrucciones claras y simples de qué foto o video sacar
   con el celular (encuadre, qué mostrar, luz, si conviene mostrar antes/después
   o el producto instalado, y qué texto superponer si corresponde).

Devolvé un JSON con esta forma exacta:
{
  "captions": {
    "informativo": "texto listo para pegar",
    "promocional": "texto listo para pegar",
    "estilo_de_vida": "texto listo para pegar"
  },
  "hashtags": "hashtags separados por espacio",
  "visual_brief": "instrucciones para la foto o video, en 3 a 5 líneas"
}
`.trim();

  return { system: BASE_SYSTEM, prompt };
}

export function buildAdAnglesPrompt({ product, settings }) {
  const prompt = `
${settingsBlock(settings)}

${productBlock(product)}

Generá 3 ángulos distintos de anuncio (para Instagram/Meta Ads) para este
producto, usando estos 3 estilos, uno para cada ángulo:
1. "dolor_solucion": parte de un problema común (lámpara rota, portalámparas
   quemado, instalación vieja) y lo resuelve con el producto.
2. "antes_despues": contraste visual/textual entre el antes y el después de
   usar el producto.
3. "prueba_social": apela a que "muchos electricistas/clientes ya lo usan y
   confían", credibilidad y calidad comprobada.

Cada ángulo tiene que tener un título (headline corto, máx 8 palabras), un
texto principal (primary text, 2 a 4 líneas, listo para pegar en el
administrador de anuncios de Meta) y un llamado a la acción (CTA) corto.

Devolvé un JSON con esta forma exacta:
{
  "angles": [
    {
      "style": "dolor_solucion" | "antes_despues" | "prueba_social",
      "headline": "...",
      "primary_text": "...",
      "cta": "..."
    }
  ]
}
`.trim();

  return { system: BASE_SYSTEM, prompt };
}

export function buildCompetitorAnalysisPrompt({ noteText, settings }) {
  const prompt = `
${settingsBlock(settings)}

El dueño de WIM vio esta publicación o práctica de otra marca/competencia y la
anotó así (puede ser una descripción libre, no hace falta que sea texto
perfecto):
"""
${noteText}
"""

Analizá brevemente qué está haciendo bien esa competencia (si algo), y
proponé una idea concreta y distinta para que WIM haga algo parecido pero
mejor o más auténtico, usando productos WIM (portalámparas y receptáculos).

Devolvé un JSON con esta forma exacta:
{
  "takeaway": "2 a 3 líneas: qué funciona de lo que vio y por qué",
  "wim_idea": "una idea concreta para que WIM haga una publicación inspirada en esto, lista para llevar a la pantalla de Crear Publicación"
}
`.trim();

  return { system: BASE_SYSTEM, prompt };
}
