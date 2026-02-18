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

    // Only allow deletion of custom recipes
    const { data: recipe } = await supabase
      .from('recipes')
      .select('is_custom')
      .eq('id', id)
      .single();

    if (!recipe?.is_custom) {
      return NextResponse.json(
        { error: 'Solo se pueden borrar recetas custom' },
        { status: 403 }
      );
    }

    const { error } = await supabase.from('recipes').delete().eq('id', id);

    if (error) {
      console.error('Error deleting recipe:', error);
      return NextResponse.json({ error: 'Error borrando receta' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/recipes/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function PUT(
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
    const updates = await request.json();

    // Serialize arrays to JSON strings for TEXT columns
    const payload: Record<string, unknown> = { ...updates };
    if (updates.tags) payload.tags = JSON.stringify(updates.tags);
    if (updates.ingredients) payload.ingredients = JSON.stringify(updates.ingredients);
    if (updates.preparation) payload.preparation = JSON.stringify(updates.preparation);

    const { data, error } = await supabase
      .from('recipes')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating recipe:', error);
      return NextResponse.json({ error: 'Error actualizando receta' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PUT /api/recipes/[id]:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
