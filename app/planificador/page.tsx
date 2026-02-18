'use client';

import { useEffect, useState } from 'react';
import { Recipe } from '@/types/index';
import { getRecipes } from '@/lib/recipes';
import RecipeFilters from '@/components/recipes/RecipeFilters';
import RecipeCard from '@/components/recipes/RecipeCard';
import WarningBanner from '@/components/planner/WarningBanner';
import SelectionSummary from '@/components/planner/SelectionSummary';
import ShoppingList from '@/components/planner/ShoppingList';
import CopyButton from '@/components/planner/CopyButton';

export default function PlanificadorPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error loading recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !recipe.name.toLowerCase().includes(q) &&
        !recipe.description.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    if (activeTags.length > 0) {
      if (!activeTags.some(tag => recipe.tags.includes(tag))) {
        return false;
      }
    }

    return true;
  });

  const selectedRecipes = recipes.filter(r => selectedIds.has(r.id));

  const toggleRecipeSelection = (recipeId: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(recipeId)) {
      newSelected.delete(recipeId);
    } else {
      // Limit selection to 10 recipes
      if (newSelected.size >= 10) {
        return;
      }
      newSelected.add(recipeId);
    }
    setSelectedIds(newSelected);
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleTagToggle = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Planificador Semanal</h1>
        <p className="text-gray-400">
          Selecciona hasta 10 platos para generar tu lista de la compra personalizada
        </p>
      </div>

      {/* Warning Banner */}
      {selectedRecipes.length > 0 && (
        <WarningBanner selectedRecipes={selectedRecipes} />
      )}

      {/* Filters */}
      <RecipeFilters
        activeTags={activeTags}
        onTagToggle={handleTagToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Results count */}
      {!loading && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filteredRecipes.length} recetas encontradas
            {selectedIds.size > 0 && ` · ${selectedIds.size} seleccionadas`}
          </p>
          {selectedIds.size >= 10 && (
            <p className="text-sm text-yellow-400 font-medium">
              Límite alcanzado (10/10)
            </p>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#6c5ce7]"></div>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredRecipes.length === 0 && (
        <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg mb-2">No se encontraron recetas</p>
          <p className="text-gray-500 text-sm">Conecta Supabase o añade recetas para comenzar</p>
        </div>
      )}

      {/* Recipe grid */}
      {!loading && filteredRecipes.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${selectedRecipes.length > 0 ? 'pb-64' : ''}`}>
          {filteredRecipes.map(recipe => {
            const isSelected = selectedIds.has(recipe.id);
            const isDisabled = selectedIds.size >= 10 && !isSelected;

            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                selectable={true}
                selected={isSelected}
                disabled={isDisabled}
                onClick={() => toggleRecipeSelection(recipe.id)}
              />
            );
          })}
        </div>
      )}

      {/* Shopping list section */}
      {selectedRecipes.length > 0 && (
        <div className="space-y-6 pb-24">
          <h2 className="text-2xl font-bold text-white">Lista de la Compra</h2>
          <ShoppingList selectedRecipes={selectedRecipes} />
          <CopyButton selectedRecipes={selectedRecipes} />
        </div>
      )}

      {/* Selection Summary Bar */}
      {selectedRecipes.length > 0 && (
        <SelectionSummary
          selectedRecipes={selectedRecipes}
          onClear={handleClearSelection}
        />
      )}
    </div>
  );
}
