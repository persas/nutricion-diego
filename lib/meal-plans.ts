import { supabase } from './supabase';
import { MealPlan } from '@/types';

// ==========================================
// READ operations (public, direct Supabase)
// ==========================================

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

// ==========================================
// WRITE operations (admin-only, via API routes)
// ==========================================

export async function saveMealPlan(
  name: string,
  selectedIds: string[],
  notes?: string
): Promise<MealPlan | null> {
  try {
    const res = await fetch('/api/meal-plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, selectedIds, notes }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error('Error saving meal plan:', data.error || res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error in saveMealPlan:', error);
    return null;
  }
}

export async function deleteMealPlan(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/meal-plans/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error('Error deleting meal plan:', data.error || res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteMealPlan:', error);
    return false;
  }
}
