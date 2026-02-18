import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME, isAdminFromCookies } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  // Verify admin
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!isAdminFromCookies(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
  }

  try {
    const recipe = await request.json();

    // Generate unique ID
    const id = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Serialize arrays to JSON strings for TEXT columns
    const payload = {
      id,
      name: recipe.name,
      description: recipe.description,
      kcal: recipe.kcal,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      tags: JSON.stringify(recipe.tags || []),
      warning_level: recipe.warning_level || 'none',
      warning_reason: recipe.warning_reason || null,
      ingredients: JSON.stringify(recipe.ingredients || []),
      preparation: recipe.preparation ? JSON.stringify(recipe.preparation) : null,
      tier: recipe.tier || 'bueno',
      is_custom: recipe.is_custom ?? true,
    };

    const { data, error } = await supabase
      .from('recipes')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error adding recipe:', error);
      return NextResponse.json({ error: 'Error guardando receta' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/recipes:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
