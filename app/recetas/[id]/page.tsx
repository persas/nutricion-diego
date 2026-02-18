'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CalendarPlus, BookOpen } from 'lucide-react';
import { Recipe, TAG_LABELS, TAG_COLORS, CATEGORY_ICONS, CATEGORY_ORDER } from '@/types';
import { getRecipeById } from '@/lib/recipes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Cargando receta...</div>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="text-muted-foreground">Receta no encontrada</div>
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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Link
            href="/recetas"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            <span className="text-sm">Volver a recetas</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {recipe.name}
          </h1>

          {recipe.description && (
            <p className="text-muted-foreground text-lg mb-4">{recipe.description}</p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium',
                  TAG_COLORS[tag] || 'bg-gray-500/15 text-gray-400 border-gray-500/30'
                )}
              >
                {TAG_LABELS[tag] || tag}
              </Badge>
            ))}
          </div>

          {/* Warning */}
          {recipe.warning_level !== 'none' && (
            <Badge
              variant="outline"
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium border-transparent',
                recipe.warning_level === 'avoid'
                  ? 'bg-[#d63031]/15 text-[#d63031]'
                  : 'bg-[#e17055]/15 text-[#e17055]'
              )}
            >
              {recipe.warning_level === 'avoid' ? '🔴' : '🟠'}{' '}
              {recipe.warning_reason || (recipe.warning_level === 'avoid' ? 'Evitar' : 'Precaucion')}
            </Badge>
          )}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Macros */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informacion Nutricional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                <div className="rounded-xl border border-border bg-muted/50 p-4 text-center">
                  <div className="text-2xl font-bold text-[#fdcb6e]">{recipe.kcal}</div>
                  <div className="text-xs text-muted-foreground mt-1">kcal</div>
                </div>
                <div className="rounded-xl border border-border bg-muted/50 p-4 text-center">
                  <div className="text-2xl font-bold text-[#00b894]">{recipe.protein}g</div>
                  <div className="text-xs text-muted-foreground mt-1">Proteina</div>
                </div>
                <div className="rounded-xl border border-border bg-muted/50 p-4 text-center">
                  <div className="text-2xl font-bold text-[#74b9ff]">{recipe.carbs}g</div>
                  <div className="text-xs text-muted-foreground mt-1">Carbos</div>
                </div>
                <div className="rounded-xl border border-border bg-muted/50 p-4 text-center">
                  <div className="text-2xl font-bold text-[#e17055]">{recipe.fat}g</div>
                  <div className="text-xs text-muted-foreground mt-1">Grasas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ingredientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderedCategories.map((cat) => (
                <div key={cat} className="rounded-xl border border-border overflow-hidden">
                  <div className="px-4 py-3 bg-muted/50 flex items-center gap-2">
                    <span>{CATEGORY_ICONS[cat] || '📦'}</span>
                    <span className="text-sm font-medium text-foreground">{cat}</span>
                  </div>
                  <div className="divide-y divide-border">
                    {groupedIngredients[cat].map((ing, i) => (
                      <div key={i} className="px-4 py-3 flex justify-between items-center">
                        <span className="text-foreground/80">{ing.name}</span>
                        <span className="text-muted-foreground text-sm">
                          {ing.qty} {ing.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button asChild size="lg" className="bg-[#6c5ce7] hover:bg-[#5b4bd6] text-white">
              <Link href="/planificador" className="flex items-center gap-2">
                <CalendarPlus className="size-5" />
                Agregar al Plan
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/recetas" className="flex items-center gap-2">
                <BookOpen className="size-5" />
                Ver Todas las Recetas
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
