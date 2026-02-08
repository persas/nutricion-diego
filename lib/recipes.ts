import { supabase } from './supabase';
import { Recipe } from '@/types';

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

    if (filters?.tags && filters.tags.length > 0) {
      query = query.contains('tags', filters.tags);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }

    return data || [];
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

    return data || null;
  } catch (error) {
    console.error('Error in getRecipeById:', error);
    return null;
  }
}

export async function addRecipe(
  recipe: Omit<Recipe, 'id' | 'created_at'>
): Promise<Recipe | null> {
  if (!supabase) {
    console.warn('Supabase not configured.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('recipes')
      .insert([recipe])
      .select()
      .single();

    if (error) {
      console.error('Error adding recipe:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error in addRecipe:', error);
    return null;
  }
}

export async function updateRecipe(
  id: string,
  updates: Partial<Recipe>
): Promise<Recipe | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('recipes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating recipe:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error in updateRecipe:', error);
    return null;
  }
}

export async function deleteRecipe(id: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const recipe = await getRecipeById(id);
    if (!recipe?.is_custom) {
      console.error('Can only delete custom recipes');
      return false;
    }

    const { error } = await supabase.from('recipes').delete().eq('id', id);

    if (error) {
      console.error('Error deleting recipe:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteRecipe:', error);
    return false;
  }
}
