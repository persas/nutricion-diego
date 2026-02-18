import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME, isAdminFromCookies } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verify admin
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!isAdminFromCookies(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
  }

  try {
    const { id } = await params;

    const { error } = await supabase.from('meal_plans').delete().eq('id', id);

    if (error) {
      console.error('Error deleting meal plan:', error);
      return NextResponse.json({ error: 'Error borrando plan' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/meal-plans/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
