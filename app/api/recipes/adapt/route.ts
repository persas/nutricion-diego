import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME, isAdminFromCookies } from '@/lib/admin-auth';

const SYSTEM_PROMPT = `Eres un chef y nutricionista experto. El usuario tiene una receta y quiere sustituir uno o mas ingredientes por alternativas que no tiene disponibles.

CONTEXTO DEL USUARIO:
- 32 anos, psoriasis y artritis psoriasica, protocolo anti-inflamatorio estricto
- Entrena BJJ/MMA 2-3 veces por semana
- Prioriza ingredientes anti-inflamatorios (pescado graso, verduras verdes, curcuma, jengibre, AOVE)

CATEGORIAS VALIDAS DE INGREDIENTES:
Pescados, Carnes, Lacteos y huevos, Verduras y frutas, Cereales y legumbres, Frutos secos y semillas, Aceites y condimentos, Suplementos

UNIDADES VALIDAS:
g, ml, unidad, cucharada, cucharadita, diente, punado

Tu tarea:
1. Recibiras la receta original completa y los ingredientes a sustituir con sus alternativas sugeridas
2. Elige la mejor alternativa para cada ingrediente (o sugiere una si las alternativas no son buenas)
3. Adapta TODA la receta: ingredientes, preparacion, macros y descripcion
4. Mantén el mismo formato JSON de la receta original

Responde SIEMPRE en JSON valido con este formato exacto:
{
  "name": "nombre de la receta (puede incluir 'adaptada' si cambio mucho)",
  "description": "descripcion actualizada",
  "kcal": estimacion calorica,
  "protein": gramos,
  "carbs": gramos,
  "fat": gramos,
  "tags": ["tags originales, ajustar si aplica"],
  "warning_level": "none|caution|avoid",
  "warning_reason": "razon o null",
  "ingredients": [{"name":"nombre","qty":cantidad,"unit":"unidad","category":"categoria"}],
  "preparation": ["Paso 1", "Paso 2"],
  "tier": "tier global de la receta adaptada",
  "changes_summary": "Resumen breve de los cambios realizados y por que se eligio cada alternativa"
}`;

export async function POST(request: NextRequest) {
  // Verify admin
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!isAdminFromCookies(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const { recipe, substitutions } = await request.json();

    if (!recipe || !substitutions || !Array.isArray(substitutions) || substitutions.length === 0) {
      return NextResponse.json({ error: 'Provide recipe and substitutions' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const substitutionText = substitutions.map((s: { ingredient: string; alternatives: string[] }) =>
      `- Sustituir "${s.ingredient}" por una de estas alternativas: ${s.alternatives.join(', ')}`
    ).join('\n');

    const prompt = `${SYSTEM_PROMPT}

RECETA ORIGINAL:
${JSON.stringify(recipe, null, 2)}

SUSTITUCIONES SOLICITADAS:
${substitutionText}

Adapta la receta con las mejores alternativas, recalcula macros y ajusta la preparacion.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const adapted = JSON.parse(jsonMatch[0]);
        return NextResponse.json({ recipe: adapted });
      }
    } catch {
      // JSON parse failed
    }

    return NextResponse.json({ error: 'No se pudo parsear la respuesta de la AI' }, { status: 500 });
  } catch (error) {
    console.error('Gemini API error (adapt):', error);
    return NextResponse.json({ error: 'Error adaptando receta' }, { status: 500 });
  }
}
