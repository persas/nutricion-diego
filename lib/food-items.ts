import { supabase } from './supabase';
import { FoodItem, FoodTier } from '@/types';

export async function getAllFoodItems(): Promise<FoodItem[]> {
  if (!supabase) {
    console.warn('Supabase not configured.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching food items:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllFoodItems:', error);
    return [];
  }
}

export async function getFoodItemsByTier(tier: FoodTier): Promise<FoodItem[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .eq('tier', tier)
      .order('name');

    if (error) {
      console.error('Error fetching food items by tier:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFoodItemsByTier:', error);
    return [];
  }
}
