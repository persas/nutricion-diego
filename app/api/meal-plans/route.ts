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
    const { name, selectedIds, notes } = await request.json();

    const { data, error } = await supabase
      .from('meal_plans')
      .insert([{
        name,
        selected_ids: selectedIds,
        notes: notes || null,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error saving meal plan:', error);
      return NextResponse.json({ error: 'Error guardando plan' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/meal-plans:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
