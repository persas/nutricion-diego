import { supabase } from './supabase';
import { Recipe } from '@/types';

// Parse JSON string fields that come as TEXT from Supabase
function parseRecipe(raw: Record<string, unknown>): Recipe {
  return {
    ...raw,
    tags: typeof raw.tags === 'string' ? JSON.parse(raw.tags) : (raw.tags || []),
    ingredients: typeof raw.ingredients === 'string' ? JSON.parse(raw.ingredients) : (raw.ingredients || []),
    preparation: typeof raw.preparation === 'string' ? JSON.parse(raw.preparation) : (raw.preparation || null),
    tier: raw.tier || 'bueno',
  } as Recipe;
}

// ==========================================
// READ operations (public, direct Supabase)
// ==========================================

export async function getRecipes(filters?: {
  tags?: string[];
  warning_level?: string;
}): Promise<Recipe[]> {
  if (!supabase) {
    console.warn('Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
    return [];
  }

  try {
    let query = supabase.from('recipes').select('*');

    if (filters?.warning_level) {
      query = query.eq('warning_level', filters.warning_level);
    }

    // Note: contains won't work on TEXT columns storing JSON strings,
    // so we filter tags client-side after fetching
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }

    let recipes = (data || []).map(parseRecipe);

    // Client-side tag filtering since tags is stored as TEXT
    if (filters?.tags && filters.tags.length > 0) {
      recipes = recipes.filter((r) =>
        filters.tags!.every((tag) => r.tags.includes(tag))
      );
    }

    return recipes;
  } catch (error) {
    console.error('Error in getRecipes:', error);
    return [];
  }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching recipe:', error);
      return null;
    }

    return data ? parseRecipe(data as Record<string, unknown>) : null;
  } catch (error) {
    console.error('Error in getRecipeById:', error);
    return null;
  }
}

// ==========================================
// WRITE operations (admin-only, via API routes)
// ==========================================

export async function addRecipe(
  recipe: Omit<Recipe, 'id' | 'created_at'>
): Promise<Recipe | null> {
  try {
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error('Error adding recipe:', data.error || res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error in addRecipe:', error);
    return null;
  }
}

export async function updateRecipe(
  id: string,
  updates: Partial<Recipe>
): Promise<Recipe | null> {
  try {
    const res = await fetch(`/api/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error('Error updating recipe:', data.error || res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error in updateRecipe:', error);
    return null;
  }
}

export async function deleteRecipe(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error('Error deleting recipe:', data.error || res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteRecipe:', error);
    return false;
  }
}
