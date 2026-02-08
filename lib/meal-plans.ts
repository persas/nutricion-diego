import { supabase } from './supabase';
import { MealPlan } from '@/types';

export async function getMealPlans(): Promise<MealPlan[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching meal plans:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getMealPlans:', error);
    return [];
  }
}

export async function saveMealPlan(
  name: string,
  selectedIds: string[],
  notes?: string
): Promise<MealPlan | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .insert([
        {
          name,
          selected_ids: selectedIds,
          notes: notes || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving meal plan:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error in saveMealPlan:', error);
    return null;
  }
}

export async function deleteMealPlan(id: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('meal_plans').delete().eq('id', id);

    if (error) {
      console.error('Error deleting meal plan:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteMealPlan:', error);
    return false;
  }
}
