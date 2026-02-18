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

export type RecipeTag = 'snack' | 'anti-inflam' | 'omega-3' | 'gut' | 'quick';
export type WarningLevel = 'none' | 'caution' | 'avoid';

// Food tier system
export type FoodTier = 'excelente' | 'bueno' | 'neutro' | 'precaucion' | 'evitar';
export type ScanMode = 'general' | 'shopping' | 'restaurant';

export interface FoodItem {
  id: string;
  name: string;
  tier: FoodTier;
  category: string;
  benefits: string | null;
  warnings: string | null;
  emoji: string | null;
}

export interface FoodScanResult {
  food_name: string;
  tier: string;
  score: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  advice: string;
  inflammation_notes: string;
}

export const TIER_CONFIG: Record<FoodTier, { label: string; color: string; bgColor: string; emoji: string }> = {
  excelente:  { label: 'Excelente',   color: '#00b894', bgColor: 'rgba(0,184,148,0.15)', emoji: '🟢' },
  bueno:      { label: 'Bueno',       color: '#00d2d3', bgColor: 'rgba(0,210,211,0.15)', emoji: '🔵' },
  neutro:     { label: 'Neutro',      color: '#fdcb6e', bgColor: 'rgba(253,203,110,0.15)', emoji: '🟡' },
  precaucion: { label: 'Precaucion',  color: '#e17055', bgColor: 'rgba(225,112,85,0.15)', emoji: '🟠' },
  evitar:     { label: 'Evitar',      color: '#d63031', bgColor: 'rgba(214,48,49,0.15)', emoji: '🔴' },
};

export const TAG_LABELS: Record<string, string> = {
  'lunch': 'Almuerzo',
  'dinner': 'Cena',
  'snack': 'Merienda',
  'anti-inflam': 'Anti-inflam.',
  'omega-3': 'Omega-3',
  'gut': 'Salud intestinal',
  'quick': 'Rapido',
  'caution': 'Precaucion',
};

export const TAG_COLORS: Record<string, string> = {
  'lunch': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'dinner': 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
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
  caution_message: 'Has seleccionado {count} recetas con carne roja/procesada. Se recomienda max 1-2 por semana para tu psoriasis.',
  avoid_message: 'Esta receta contiene alimentos que deberias evitar para tu psoriasis.',
};
