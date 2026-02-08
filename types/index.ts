export interface Ingredient {
  name: string;
  qty: number;
  unit: string;
  category: 'Pescados' | 'Carnes' | 'Lacteos y huevos' | 'Verduras y frutas' | 'Cereales y legumbres' | 'Frutos secos y semillas' | 'Aceites y condimentos' | 'Suplementos';
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  warning_level: 'none' | 'caution' | 'avoid';
  warning_reason: string | null;
  ingredients: Ingredient[];
  is_custom: boolean;
  created_at: string;
}

export interface MealPlan {
  id: string;
  name: string;
  selected_ids: string[];
  notes: string | null;
  created_at: string;
}

export type RecipeTag = 'lunch' | 'dinner' | 'snack' | 'anti-inflam' | 'omega-3' | 'gut' | 'quick';
export type WarningLevel = 'none' | 'caution' | 'avoid';

export const TAG_LABELS: Record<string, string> = {
  'lunch': 'Comida',
  'dinner': 'Cena',
  'snack': 'Merienda',
  'anti-inflam': 'Anti-inflam.',
  'omega-3': 'Omega-3',
  'gut': 'Salud intestinal',
  'quick': 'Rápido',
  'caution': 'Precaución',
};

export const TAG_COLORS: Record<string, string> = {
  'lunch': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'dinner': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'snack': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  'anti-inflam': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'omega-3': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  'gut': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  'quick': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

export const CATEGORY_ICONS: Record<string, string> = {
  'Pescados': '🐟',
  'Carnes': '🍗',
  'Verduras y frutas': '🥬',
  'Cereales y legumbres': '🫘',
  'Lacteos y huevos': '🥚',
  'Frutos secos y semillas': '🥜',
  'Aceites y condimentos': '🫒',
  'Suplementos': '💊',
};

export const CATEGORY_ORDER = ['Pescados','Carnes','Lacteos y huevos','Verduras y frutas','Cereales y legumbres','Frutos secos y semillas','Aceites y condimentos','Suplementos'];

export const WARNING_CONFIG = {
  caution_max: 2,
  caution_message: 'Has seleccionado {count} recetas con carne roja/procesada. Se recomienda máx 1-2 por semana para tu psoriasis.',
  avoid_message: 'Esta receta contiene alimentos que deberías evitar para tu psoriasis.',
};
