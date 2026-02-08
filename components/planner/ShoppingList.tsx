'use client';

import { useState } from 'react';
import { Recipe, Ingredient, CATEGORY_ICONS, CATEGORY_ORDER } from '@/types/index';
import { Check } from 'lucide-react';

interface ShoppingListProps {
  selectedRecipes: Recipe[];
}

interface AggregatedIngredient extends Ingredient {
  recipes: string[];
}

export default function ShoppingList({ selectedRecipes }: ShoppingListProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Aggregate ingredients by name and unit
  const aggregatedMap = new Map<string, AggregatedIngredient>();

  selectedRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const key = `${ingredient.name.toLowerCase()}|${ingredient.unit}|${ingredient.category}`;

      if (aggregatedMap.has(key)) {
        const existing = aggregatedMap.get(key)!;
        existing.qty += ingredient.qty;
        existing.recipes.push(recipe.name);
      } else {
        aggregatedMap.set(key, {
          ...ingredient,
          recipes: [recipe.name],
        });
      }
    });
  });

  // Group by category and sort
  const groupedByCategory = new Map<string, AggregatedIngredient[]>();

  aggregatedMap.forEach(ingredient => {
    if (!groupedByCategory.has(ingredient.category)) {
      groupedByCategory.set(ingredient.category, []);
    }
    groupedByCategory.get(ingredient.category)!.push(ingredient);
  });

  // Sort categories by CATEGORY_ORDER
  const sortedCategories = Array.from(groupedByCategory.keys()).sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  const toggleItem = (key: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(key)) {
      newChecked.delete(key);
    } else {
      newChecked.add(key);
    }
    setCheckedItems(newChecked);
  };

  if (selectedRecipes.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg overflow-hidden">
      <div className="bg-[#0a0a0f] px-6 py-4 border-b border-[#1a1a2e]">
        <h2 className="text-xl font-semibold text-white">Lista de compra</h2>
        <p className="text-sm text-gray-400 mt-1">
          {aggregatedMap.size} ingredientes únicos
        </p>
      </div>

      <div className="divide-y divide-[#1a1a2e] max-h-96 overflow-y-auto">
        {sortedCategories.map(category => {
          const icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || '📦';
          const items = groupedByCategory.get(category) || [];

          return (
            <div key={category}>
              <div className="sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-sm px-6 py-3 border-b border-[#2a2a3e]">
                <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <span className="text-lg">{icon}</span>
                  {category}
                </h3>
              </div>

              <div className="px-6 py-2">
                {items.map(ingredient => {
                  const itemKey = `${ingredient.name}|${ingredient.unit}|${ingredient.category}`;
                  const isChecked = checkedItems.has(itemKey);

                  return (
                    <div
                      key={itemKey}
                      className="flex items-center gap-3 py-2 hover:bg-[#12121a] rounded px-2 cursor-pointer transition-colors"
                      onClick={() => toggleItem(itemKey)}
                    >
                      <button
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-[#00b894] border-[#00b894]'
                            : 'border-[#2a2a3e] hover:border-[#6c5ce7]'
                        }`}
                        aria-label={`Toggle ${ingredient.name}`}
                      >
                        {isChecked && <Check size={14} className="text-[#0a0a0f]" />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm transition-colors ${
                            isChecked ? 'text-gray-500 line-through' : 'text-gray-200'
                          }`}
                        >
                          {ingredient.name}
                        </p>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-medium text-[#6c5ce7]">
                          {ingredient.qty % 1 === 0 ? ingredient.qty : ingredient.qty.toFixed(2)}
                          <span className="text-xs text-gray-500 ml-1">{ingredient.unit}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
