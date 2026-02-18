import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres un asesor nutricional experto para un usuario con psoriasis y artritis psoriasica.
Responde siempre en espanol. Se conciso y practico.

PROTOCOLO:
- Priorizar alimentos anti-inflamatorios: pescados grasos, verduras de hoja verde, AOVE, curcuma, bayas
- Evitar: azucares refinados, aceites de semillas, ultra procesados, gluten, alcohol en exceso
- Objetivo: deficit calorico moderado (~500 kcal/dia), alto en proteina
- Ayuno intermitente 16:8

Cuando te pregunten sobre restaurantes, da consejos especificos de que pedir y como modificar platos.
Cuando te pregunten sobre alimentos, clasifica en: Excelente, Bueno, Neutro, Precaucion, Evitar.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nUsuario: ${message}`);
    const text = result.response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Error processing message' },
      { status: 500 }
    );
  }
}
