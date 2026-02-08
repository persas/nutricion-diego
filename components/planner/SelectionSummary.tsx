'use client';

import { Recipe } from '@/types/index';
import { Trash2 } from 'lucide-react';

interface SelectionSummaryProps {
  selectedRecipes: Recipe[];
  onClear: () => void;
}

export default function SelectionSummary({ selectedRecipes, onClear }: SelectionSummaryProps) {
  const totalKcal = selectedRecipes.reduce((sum, r) => sum + r.kcal, 0);
  const totalProtein = selectedRecipes.reduce((sum, r) => sum + r.protein, 0);
  const totalCarbs = selectedRecipes.reduce((sum, r) => sum + r.carbs, 0);
  const totalFat = selectedRecipes.reduce((sum, r) => sum + r.fat, 0);

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[#2a2a3e]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <p className="text-gray-300 text-sm mb-2">
              <span className="font-semibold text-white">{selectedRecipes.length}</span> recetas seleccionadas
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <p className="text-xs text-gray-500">Calorías</p>
                <p className="text-lg font-semibold text-white">{totalKcal}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Proteína</p>
                <p className="text-lg font-semibold text-white">{totalProtein.toFixed(1)}g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Carbohidratos</p>
                <p className="text-lg font-semibold text-white">{totalCarbs.toFixed(1)}g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Grasas</p>
                <p className="text-lg font-semibold text-white">{totalFat.toFixed(1)}g</p>
              </div>
            </div>
          </div>

          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 bg-[#d63031] hover:bg-[#d63031]/80 text-white rounded-lg font-medium text-sm transition-colors self-end sm:self-auto whitespace-nowrap"
          >
            <Trash2 size={16} />
            Limpiar todo
          </button>
        </div>
      </div>
    </div>
  );
}
