'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Loader2, Save, RefreshCw } from 'lucide-react';
import { FoodTier, Ingredient, TAG_LABELS, TAG_COLORS, CATEGORY_ICONS, CATEGORY_ORDER } from '@/types';
import { addRecipe } from '@/lib/recipes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import TierBadge from '@/components/ui/TierBadge';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/components/providers/AdminProvider';
import AdminRequired from '@/components/admin/AdminRequired';

interface GeneratedRecipe {
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
  preparation: string[];
  tier: FoodTier;
}

export default function NuevaRecetaAIPage() {
  const { isAdmin, isLoading: adminLoading } = useAdmin();

  if (adminLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <AdminRequired
        message="Solo el administrador puede generar recetas con AI."
        backHref="/recetas"
        backLabel="Volver a recetas"
      />
    );
  }

  return <NuevaRecetaAIForm />;
}

function NuevaRecetaAIForm() {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);

  const generateRecipe = async () => {
    if (!recipeName.trim()) return;

    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeName: recipeName.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error generando receta');
      }

      setRecipe(data.recipe);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!recipe) return;

    setSaving(true);
    try {
      const saved = await addRecipe({
        name: recipe.name,
        description: recipe.description,
        kcal: recipe.kcal,
        protein: recipe.protein,
        carbs: recipe.carbs,
        fat: recipe.fat,
        tags: recipe.tags,
        warning_level: recipe.warning_level,
        warning_reason: recipe.warning_reason,
        ingredients: recipe.ingredients,
        preparation: recipe.preparation,
        tier: recipe.tier,
        is_custom: true,
      });

      if (saved) {
        router.push('/recetas');
      } else {
        setError('Error guardando la receta. Intenta de nuevo.');
      }
    } catch {
      setError('Error guardando la receta.');
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerate = () => {
    generateRecipe();
  };

  // Group ingredients by category
  const groupedIngredients: Record<string, Ingredient[]> = {};
  if (recipe) {
    recipe.ingredients.forEach((ing) => {
      const cat = ing.category || 'Otros';
      if (!groupedIngredients[cat]) groupedIngredients[cat] = [];
      groupedIngredients[cat].push(ing);
    });
  }
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

          <div className="flex items-start gap-3 mb-6">
            <Sparkles className="size-7 text-[#6c5ce7] mt-1" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                Generar Receta con AI
              </h1>
              <p className="text-muted-foreground">
                Describe que receta quieres y la IA la generara optimizada para tu protocolo anti-inflamatorio
              </p>
            </div>
          </div>

          {/* Input phase */}
          <div className="flex gap-3">
            <Input
              placeholder="Ej: Bowl de salmon con aguacate y quinoa..."
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading) generateRecipe();
              }}
              disabled={loading}
              className="flex-1"
            />
            <Button
              onClick={generateRecipe}
              disabled={loading || !recipeName.trim()}
              className="bg-[#6c5ce7] hover:bg-[#5b4bd6] text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Generar
                </>
              )}
            </Button>
          </div>

          {loading && (
            <div className="flex items-center gap-2 mt-4 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              <span className="text-sm">Generando receta...</span>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Recipe Preview */}
      {recipe && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Name + Tier + Description */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 flex-wrap">
                  <CardTitle className="text-2xl">{recipe.name}</CardTitle>
                  <TierBadge tier={recipe.tier} size="lg" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{recipe.description}</p>

                {/* Warning */}
                {recipe.warning_level !== 'none' && (
                  <div className="mt-4">
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
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Nutrition Grid */}
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

            {/* Tags */}
            {recipe.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
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
                </CardContent>
              </Card>
            )}

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

            {/* Preparation */}
            {recipe.preparation && recipe.preparation.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preparacion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recipe.preparation.map((step, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6c5ce7] text-white flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </div>
                        <p className="text-foreground/80 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={saving}
                size="lg"
                className="bg-[#00b894] hover:bg-[#00a382] text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Guardar Receta
                  </>
                )}
              </Button>
              <Button
                onClick={handleRegenerate}
                disabled={loading}
                variant="outline"
                size="lg"
              >
                <RefreshCw className="size-4" />
                Regenerar
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
