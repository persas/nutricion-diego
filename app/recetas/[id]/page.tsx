'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, CalendarPlus, BookOpen, ChefHat, Sparkles, Loader2,
  Plus, X, RotateCcw, Shuffle
} from 'lucide-react';
import { Recipe, Ingredient, TAG_LABELS, TAG_COLORS, CATEGORY_ICONS, CATEGORY_ORDER, FoodTier } from '@/types';
import { getRecipeById } from '@/lib/recipes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import TierBadge from '@/components/ui/TierBadge';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/components/providers/AdminProvider';

interface Substitution {
  ingredient: string;
  alternatives: string[];
}

interface AdaptedRecipe extends Recipe {
  changes_summary?: string;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const { isAdmin } = useAdmin();
  const [originalRecipe, setOriginalRecipe] = useState<Recipe | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  // Adapt state
  const [showAdaptPanel, setShowAdaptPanel] = useState(false);
  const [substitutions, setSubstitutions] = useState<Substitution[]>([]);
  const [adapting, setAdapting] = useState(false);
  const [adaptError, setAdaptError] = useState<string | null>(null);
  const [isAdapted, setIsAdapted] = useState(false);
  const [changesSummary, setChangesSummary] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (params.id) {
        const data = await getRecipeById(params.id as string);
        setRecipe(data);
        setOriginalRecipe(data);
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  // --- Substitution management ---
  const addSubstitution = () => {
    setSubstitutions([...substitutions, { ingredient: '', alternatives: [''] }]);
  };

  const removeSubstitution = (index: number) => {
    setSubstitutions(substitutions.filter((_, i) => i !== index));
  };

  const setIngredient = (index: number, value: string) => {
    const updated = [...substitutions];
    updated[index].ingredient = value;
    setSubstitutions(updated);
  };

  const addAlternative = (subIndex: number) => {
    const updated = [...substitutions];
    if (updated[subIndex].alternatives.length < 3) {
      updated[subIndex].alternatives.push('');
      setSubstitutions(updated);
    }
  };

  const removeAlternative = (subIndex: number, altIndex: number) => {
    const updated = [...substitutions];
    updated[subIndex].alternatives = updated[subIndex].alternatives.filter((_, i) => i !== altIndex);
    setSubstitutions(updated);
  };

  const setAlternative = (subIndex: number, altIndex: number, value: string) => {
    const updated = [...substitutions];
    updated[subIndex].alternatives[altIndex] = value;
    setSubstitutions(updated);
  };

  const handleAdapt = async () => {
    const validSubs = substitutions.filter(
      (s) => s.ingredient.trim() && s.alternatives.some((a) => a.trim())
    ).map((s) => ({
      ingredient: s.ingredient.trim(),
      alternatives: s.alternatives.filter((a) => a.trim()),
    }));

    if (validSubs.length === 0) return;

    setAdapting(true);
    setAdaptError(null);

    try {
      const res = await fetch('/api/recipes/adapt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipe: originalRecipe,
          substitutions: validSubs,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Error adaptando receta');
      }

      const data = await res.json();
      const adapted = data.recipe as AdaptedRecipe;

      setRecipe({
        ...originalRecipe!,
        name: adapted.name || originalRecipe!.name,
        description: adapted.description || originalRecipe!.description,
        kcal: adapted.kcal || originalRecipe!.kcal,
        protein: adapted.protein || originalRecipe!.protein,
        carbs: adapted.carbs || originalRecipe!.carbs,
        fat: adapted.fat || originalRecipe!.fat,
        tags: adapted.tags || originalRecipe!.tags,
        warning_level: adapted.warning_level || originalRecipe!.warning_level,
        warning_reason: adapted.warning_reason ?? originalRecipe!.warning_reason,
        ingredients: adapted.ingredients || originalRecipe!.ingredients,
        preparation: adapted.preparation || originalRecipe!.preparation,
        tier: adapted.tier || originalRecipe!.tier,
      });
      setChangesSummary(adapted.changes_summary || null);
      setIsAdapted(true);
      setShowAdaptPanel(false);
    } catch (err) {
      setAdaptError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setAdapting(false);
    }
  };

  const handleRestore = () => {
    setRecipe(originalRecipe);
    setIsAdapted(false);
    setChangesSummary(null);
    setSubstitutions([]);
  };

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
  const groupedIngredients: Record<string, Ingredient[]> = {};
  recipe.ingredients.forEach((ing) => {
    const cat = ing.category || 'Otros';
    if (!groupedIngredients[cat]) groupedIngredients[cat] = [];
    groupedIngredients[cat].push(ing);
  });
  const orderedCategories = CATEGORY_ORDER.filter((cat) => groupedIngredients[cat]);

  const hasValidSubstitution = substitutions.some(
    (s) => s.ingredient.trim() && s.alternatives.some((a) => a.trim())
  );

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

          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {recipe.name}
            </h1>
            {recipe.tier && <TierBadge tier={recipe.tier as FoodTier} size="lg" />}
          </div>

          {recipe.description && (
            <p className="text-muted-foreground text-lg mb-4">{recipe.description}</p>
          )}

          {/* Adapted banner */}
          {isAdapted && (
            <div className="rounded-lg border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 p-4 mb-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-[#6c5ce7]" />
                  <span className="text-sm font-medium text-[#6c5ce7]">Receta adaptada temporalmente</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRestore}
                  className="h-7 text-xs border-[#6c5ce7]/30 text-[#6c5ce7] hover:bg-[#6c5ce7]/10"
                >
                  <RotateCcw className="size-3" />
                  Restaurar original
                </Button>
              </div>
              {changesSummary && (
                <p className="text-sm text-muted-foreground mt-2">{changesSummary}</p>
              )}
            </div>
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
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Ingredientes</CardTitle>
                {isAdmin && !isAdapted && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAdaptPanel(!showAdaptPanel);
                      if (!showAdaptPanel && substitutions.length === 0) {
                        addSubstitution();
                      }
                    }}
                    className="text-xs border-[#6c5ce7]/30 text-[#6c5ce7] hover:bg-[#6c5ce7]/10"
                  >
                    <Shuffle className="size-3.5" />
                    Adaptar ingredientes
                  </Button>
                )}
              </div>
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

          {/* Adapt Panel */}
          {showAdaptPanel && isAdmin && (
            <Card className="border-[#6c5ce7]/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="size-5 text-[#6c5ce7]" />
                  Adaptar receta con AI
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Indica que ingredientes quieres sustituir y sugiere 1-3 alternativas. La AI elegira la mejor opcion y adaptara toda la receta.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {substitutions.map((sub, subIdx) => (
                  <div key={subIdx} className="rounded-xl border border-border p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground shrink-0">Sustituir:</span>
                      <Input
                        placeholder="Ej: Salmon fresco"
                        value={sub.ingredient}
                        onChange={(e) => setIngredient(subIdx, e.target.value)}
                        className="flex-1"
                      />
                      {substitutions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubstitution(subIdx)}
                          className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                        >
                          <X className="size-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2 ml-4 sm:ml-16">
                      {sub.alternatives.map((alt, altIdx) => (
                        <div key={altIdx} className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-10 shrink-0">Alt {altIdx + 1}:</span>
                          <Input
                            placeholder="Ej: Merluza, Lubina..."
                            value={alt}
                            onChange={(e) => setAlternative(subIdx, altIdx, e.target.value)}
                            className="flex-1 h-8 text-sm"
                          />
                          {sub.alternatives.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAlternative(subIdx, altIdx)}
                              className="text-muted-foreground h-6 w-6 p-0"
                            >
                              <X className="size-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                      {sub.alternatives.length < 3 && (
                        <button
                          onClick={() => addAlternative(subIdx)}
                          className="text-xs text-[#6c5ce7] hover:underline flex items-center gap-1"
                        >
                          <Plus className="size-3" /> Anadir alternativa
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={addSubstitution}
                  className="text-sm text-[#6c5ce7] hover:underline flex items-center gap-1.5"
                >
                  <Plus className="size-4" /> Anadir otra sustitucion
                </button>

                {adaptError && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                    <p className="text-destructive text-sm">{adaptError}</p>
                  </div>
                )}

                <Separator />

                <div className="flex gap-3">
                  <Button
                    onClick={handleAdapt}
                    disabled={adapting || !hasValidSubstitution}
                    className="bg-[#6c5ce7] hover:bg-[#5b4bd6] text-white"
                  >
                    {adapting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Adaptando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4" />
                        Adaptar con AI
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAdaptPanel(false);
                      setSubstitutions([]);
                      setAdaptError(null);
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preparation */}
          {recipe.preparation && recipe.preparation.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ChefHat className="size-5 text-[#6c5ce7]" />
                  Preparacion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.preparation.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 size-7 rounded-full bg-[#6c5ce7]/15 text-[#6c5ce7] text-sm font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-foreground/80">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}

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
