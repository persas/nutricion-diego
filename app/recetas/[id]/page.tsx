'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CalendarPlus } from 'lucide-react';
import { Recipe, TAG_LABELS, TAG_COLORS, CATEGORY_ICONS, CATEGORY_ORDER } from '@/types';
import { getRecipeById } from '@/lib/recipes';

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (params.id) {
        const data = await getRecipeById(params.id as string);
        setRecipe(data);
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-gray-500">Cargando receta...</div>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-4">
        <div className="text-gray-500">Receta no encontrada</div>
        <Link href="/recetas" className="text-[#6c5ce7] hover:underline">
          Volver a recetas
        </Link>
      </main>
    );
  }

  // Group ingredients by category
  const groupedIngredients: Record<string, typeof recipe.ingredients> = {};
  recipe.ingredients.forEach((ing) => {
    const cat = ing.category || 'Otros';
    if (!groupedIngredients[cat]) groupedIngredients[cat] = [];
    groupedIngredients[cat].push(ing);
  });

  const orderedCategories = CATEGORY_ORDER.filter((cat) => groupedIngredients[cat]);

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a2e]">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/recetas"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver a recetas</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {recipe.name}
          </h1>

          {recipe.description && (
            <p className="text-gray-400 text-lg mb-4">{recipe.description}</p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${TAG_COLORS[tag] || 'bg-gray-500/15 text-gray-400 border-gray-500/30'}`}
              >
                {TAG_LABELS[tag] || tag}
              </span>
            ))}
          </div>

          {/* Warning */}
          {recipe.warning_level !== 'none' && (
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                recipe.warning_level === 'avoid'
                  ? 'bg-[#d63031]/15 text-[#d63031]'
                  : 'bg-[#e17055]/15 text-[#e17055]'
              }`}
            >
              {recipe.warning_level === 'avoid' ? '🔴' : '🟠'}
              {recipe.warning_reason || (recipe.warning_level === 'avoid' ? 'Evitar' : 'Precaucion')}
            </div>
          )}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Macros */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Informacion Nutricional</h2>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#f59e0b]">{recipe.kcal}</div>
                <div className="text-xs text-gray-500 mt-1">kcal</div>
              </div>
              <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#10b981]">{recipe.protein}g</div>
                <div className="text-xs text-gray-500 mt-1">Proteina</div>
              </div>
              <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#3b82f6]">{recipe.carbs}g</div>
                <div className="text-xs text-gray-500 mt-1">Carbos</div>
              </div>
              <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#eab308]">{recipe.fat}g</div>
                <div className="text-xs text-gray-500 mt-1">Grasas</div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Ingredientes</h2>
            <div className="space-y-4">
              {orderedCategories.map((cat) => (
                <div key={cat} className="bg-[#12121a] border border-[#1a1a2e] rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-[#1a1a2e]/50 flex items-center gap-2">
                    <span>{CATEGORY_ICONS[cat] || '📦'}</span>
                    <span className="text-sm font-medium text-white">{cat}</span>
                  </div>
                  <div className="divide-y divide-[#1a1a2e]">
                    {groupedIngredients[cat].map((ing, i) => (
                      <div key={i} className="px-4 py-3 flex justify-between items-center">
                        <span className="text-gray-300">{ing.name}</span>
                        <span className="text-gray-500 text-sm">
                          {ing.qty} {ing.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/planificador"
              className="flex items-center gap-2 px-5 py-3 bg-[#6c5ce7] text-white rounded-xl font-medium hover:bg-[#5b4bd6] transition-colors"
            >
              <CalendarPlus className="w-5 h-5" />
              Agregar al Plan
            </Link>
            <Link
              href="/recetas"
              className="flex items-center gap-2 px-5 py-3 bg-[#1a1a2e] text-gray-400 rounded-xl hover:bg-[#2a2a3e] transition-colors"
            >
              Ver Todas las Recetas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
