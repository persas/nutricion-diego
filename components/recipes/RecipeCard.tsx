'use client';

import { Recipe, TAG_LABELS, TAG_COLORS } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
  selected?: boolean;
  selectable?: boolean;
}

export default function RecipeCard({
  recipe,
  onClick,
  selected = false,
  selectable = false,
}: RecipeCardProps) {
  const truncatedDescription =
    recipe.description.length > 80
      ? recipe.description.slice(0, 80) + '...'
      : recipe.description;

  const getWarningColor = () => {
    if (recipe.warning_level === 'avoid') return '#d63031';
    if (recipe.warning_level === 'caution') return '#e17055';
    return 'transparent';
  };

  const borderClass = selected
    ? 'border-2 border-[#00b894] shadow-lg shadow-[#00b894]/20'
    : selectable
      ? 'border-2 border-[#2a2a3e] hover:border-[#6c5ce7] transition-colors'
      : 'border border-[#2a2a3e]';

  return (
    <div
      onClick={onClick}
      className={`bg-[#12121a] rounded-lg p-6 cursor-pointer transition-all ${borderClass} ${selectable ? 'hover:shadow-lg hover:shadow-[#6c5ce7]/10' : ''}`}
    >
      {/* Header with title and warning indicator */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white flex-1 pr-2">{recipe.name}</h3>
        {recipe.warning_level !== 'none' && (
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: getWarningColor() }}
            title={recipe.warning_reason || `Nivel: ${recipe.warning_level}`}
          />
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4">{truncatedDescription}</p>

      {/* Macros row */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">kcal:</span>
          <span className="text-[#6c5ce7] font-semibold">{recipe.kcal}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">P:</span>
          <span className="text-[#00d2d3] font-semibold">{recipe.protein}g</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">C:</span>
          <span className="text-[#6c5ce7] font-semibold">{recipe.carbs}g</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">G:</span>
          <span className="text-[#00b894] font-semibold">{recipe.fat}g</span>
        </div>
      </div>

      {/* Tags */}
      {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2.5 py-1 rounded-full border ${TAG_COLORS[tag] || 'bg-gray-500/15 text-gray-400 border-gray-500/30'}`}
            >
              {TAG_LABELS[tag] || tag}
            </span>
          ))}
        </div>
      )}

      {/* Selection indicator */}
      {selectable && selected && (
        <div className="mt-4 pt-4 border-t border-[#2a2a3e] flex items-center justify-end">
          <div className="text-[#00b894] text-sm font-semibold">✓ Seleccionado</div>
        </div>
      )}
    </div>
  );
}
