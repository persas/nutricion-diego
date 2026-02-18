import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres un asesor nutricional experto para un usuario con psoriasis y artritis psoriasica que sigue un protocolo anti-inflamatorio estricto.

CONTEXTO DEL USUARIO:
- 32 anos, 97kg, 178cm, CTO de startup con ritmo alto
- Objetivo: reducir inflamacion, mejorar piel, perder peso
- Entrena BJJ/MMA 2-3 veces por semana
- Ayuno intermitente 16:8
- Deficit calorico objetivo: ~500 kcal/dia

SISTEMA DE TIERS DE ALIMENTOS:
- EXCELENTE (base de alimentacion): Pescados grasos (salmon, sardinas, caballa), verduras de hoja verde, aguacate, huevos, bayas, AOVE, frutos secos, caldo de hueso
- BUENO (incluir frecuentemente): Pollo organico, cruciferas, tuberculos, legumbres, hongos medicinales, te verde, curcuma, jengibre
- NEUTRO (moderar): Pan integral, arroz blanco, queso artesanal, chocolate negro 70%+, cafe, lacteos fermentados
- PRECAUCION (minimizar): Aceites refinados, azucares refinados, harinas blancas, gluten, lacteos convencionales, carnes procesadas, fritos
- EVITAR (prohibidos): Grasas trans, aditivos artificiales, MSG, edulcorantes sinteticos, ultra procesados, alcohol en exceso

Analiza lo que se te presenta y responde SIEMPRE en JSON valido con este formato exacto:
{
  "food_name": "nombre del alimento o plato",
  "tier": "excelente|bueno|neutro|precaucion|evitar",
  "score": 1-10,
  "kcal": estimacion calorica,
  "protein": gramos estimados,
  "carbs": gramos estimados,
  "fat": gramos estimados,
  "advice": "consejo breve y directo sobre si comerlo o no y por que",
  "inflammation_notes": "impacto en inflamacion y psoriasis"
}

Si es un plato compuesto, evalua el impacto global. Se directo y practico.`;

const SHOPPING_PROMPT = `${SYSTEM_PROMPT}

MODO SUPERMERCADO: Estas evaluando un producto que el usuario esta considerando comprar.
Presta especial atencion a:
- Lista de ingredientes (aditivos, conservantes, aceites usados)
- Contenido de azucar y sodio
- Si hay alternativas mejores en el super
En el "advice", sugiere siempre una alternativa si el producto no es ideal.`;

const RESTAURANT_PROMPT = `${SYSTEM_PROMPT}

MODO RESTAURANTE: El usuario esta en un restaurante y quiere saber que pedir o si lo que va a pedir es bueno.
Presta especial atencion a:
- Como podria estar cocinado (aceites, salsas ocultas)
- Modificaciones que puede pedir al camarero
- Que acompanamiento elegir
En el "advice", da instrucciones claras de como pedir para hacerlo mas saludable.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const { image, message, mode } = await request.json();

    if (!image && !message) {
      return NextResponse.json({ error: 'Provide an image or message' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    let prompt: string;
    switch (mode) {
      case 'shopping':
        prompt = SHOPPING_PROMPT;
        break;
      case 'restaurant':
        prompt = RESTAURANT_PROMPT;
        break;
      default:
        prompt = SYSTEM_PROMPT;
    }

    if (message) {
      prompt += `\n\nEl usuario dice: "${message}"`;
    }

    const parts: Array<string | { inlineData: { data: string; mimeType: string } }> = [prompt];

    if (image) {
      // Remove data URL prefix if present
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      parts.push({
        inlineData: { data: base64Data, mimeType: 'image/jpeg' },
      });
    }

    const result = await model.generateContent(parts);
    const text = result.response.text();

    // Try to parse as JSON
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]);
        return NextResponse.json({ analysis });
      }
    } catch {
      // If JSON parsing fails, return raw text
    }

    return NextResponse.json({ analysis: { raw: text } });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Error analyzing food' },
      { status: 500 }
    );
  }
}
