'use client';

import { useState } from 'react';
import { Recipe, Ingredient, CATEGORY_ICONS, CATEGORY_ORDER } from '@/types/index';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  selectedRecipes: Recipe[];
}

export default function CopyButton({ selectedRecipes }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const generateShoppingListText = (): string => {
    // Aggregate ingredients
    const aggregatedMap = new Map<string, Ingredient>();

    selectedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const key = `${ingredient.name.toLowerCase()}|${ingredient.unit}|${ingredient.category}`;

        if (aggregatedMap.has(key)) {
          const existing = aggregatedMap.get(key)!;
          existing.qty += ingredient.qty;
        } else {
          aggregatedMap.set(key, { ...ingredient });
        }
      });
    });

    // Group by category
    const groupedByCategory = new Map<string, Ingredient[]>();

    aggregatedMap.forEach(ingredient => {
      if (!groupedByCategory.has(ingredient.category)) {
        groupedByCategory.set(ingredient.category, []);
      }
      groupedByCategory.get(ingredient.category)!.push(ingredient);
    });

    // Sort categories
    const sortedCategories = Array.from(groupedByCategory.keys()).sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a);
      const indexB = CATEGORY_ORDER.indexOf(b);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    // Build text
    let text = '🛒 LISTA DE COMPRA\n\n';

    sortedCategories.forEach(category => {
      const icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || '📦';
      const items = groupedByCategory.get(category) || [];

      text += `${icon} ${category}\n`;
      items.forEach(ingredient => {
        const qty = ingredient.qty % 1 === 0 ? ingredient.qty : ingredient.qty.toFixed(2);
        text += `  • ${ingredient.name}: ${qty} ${ingredient.unit}\n`;
      });
      text += '\n';
    });

    return text;
  };

  const handleCopy = async () => {
    try {
      const text = generateShoppingListText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  if (selectedRecipes.length === 0) {
    return null;
  }

  return (
    <button
      onClick={handleCopy}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all ${
        copied
          ? 'bg-[#00b894] text-white'
          : 'bg-[#6c5ce7] hover:bg-[#6c5ce7]/90 text-white'
      }`}
    >
      {copied ? (
        <>
          <Check size={18} />
          ¡Copiado!
        </>
      ) : (
        <>
          <Copy size={18} />
          Copiar lista de compra
        </>
      )}
    </button>
  );
}
