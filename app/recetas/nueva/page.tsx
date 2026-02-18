'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Recipe, TAG_LABELS, TIER_CONFIG, FoodTier } from '@/types';
import { addRecipe } from '@/lib/recipes';
import IngredientBuilder from '@/components/recipes/IngredientBuilder';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const AVAILABLE_TAGS = ['breakfast', 'lunch', 'dinner', 'snack', 'anti-inflam', 'omega-3', 'gut', 'quick', 'high-protein', 'low-carb', 'batch-cook'];
const WARNING_LEVELS = ['none', 'caution', 'avoid'] as const;
const TIERS: FoodTier[] = ['excelente', 'bueno', 'neutro', 'precaucion', 'evitar'];

export default function NuevaRecetaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    tags: [] as string[],
    warning_level: 'none' as 'none' | 'caution' | 'avoid',
    warning_reason: '',
    ingredients: [] as Recipe['ingredients'],
    preparation: [] as string[],
    tier: 'bueno' as FoodTier,
    is_custom: true,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleAddStep = () => {
    setFormData((prev) => ({
      ...prev,
      preparation: [...prev.preparation, ''],
    }));
  };

  const handleRemoveStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      preparation: prev.preparation.filter((_, i) => i !== index),
    }));
  };

  const handleStepChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      preparation: prev.preparation.map((step, i) => (i === index ? value : step)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name.trim()) {
        setError('El nombre de la receta es requerido');
        setLoading(false);
        return;
      }

      if (!formData.description.trim()) {
        setError('La descripcion es requerida');
        setLoading(false);
        return;
      }

      if (formData.ingredients.length === 0) {
        setError('Debes anadir al menos un ingrediente');
        setLoading(false);
        return;
      }

      // Filter out empty preparation steps
      const filteredPreparation = formData.preparation.filter((step) => step.trim() !== '');

      // Prepare recipe data
      const recipeData = {
        name: formData.name,
        description: formData.description,
        kcal: formData.kcal,
        protein: formData.protein,
        carbs: formData.carbs,
        fat: formData.fat,
        tags: formData.tags,
        warning_level: formData.warning_level,
        warning_reason: formData.warning_reason || null,
        ingredients: formData.ingredients,
        preparation: filteredPreparation.length > 0 ? filteredPreparation : null,
        tier: formData.tier,
        is_custom: true,
      };

      // Call API to add recipe
      const newRecipe = await addRecipe(recipeData);

      if (!newRecipe) {
        setError('Error al crear la receta. Intenta de nuevo.');
        setLoading(false);
        return;
      }

      // Redirect to recipes page on success
      router.push('/recetas');
    } catch (err) {
      console.error('Error creating recipe:', err);
      setError('Ocurrio un error al crear la receta. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Nueva Receta</h1>
        <p className="text-muted-foreground">
          Crea una nueva receta personalizada para tu plan
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
          <p className="text-destructive font-medium">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Informacion Basica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Nombre de la Receta *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ej: Salmon a la Mediterranea"
                className="h-11"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Descripcion *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe la receta, modo de preparacion, etc."
                rows={3}
                className="w-full bg-transparent border border-input rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] resize-none text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Informacion Nutricional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Kcal */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Calorias (kcal)
                </label>
                <Input
                  type="number"
                  value={formData.kcal}
                  onChange={(e) => handleInputChange('kcal', parseFloat(e.target.value) || 0)}
                  className="h-11"
                />
              </div>

              {/* Protein */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Proteina (g)
                </label>
                <Input
                  type="number"
                  value={formData.protein}
                  onChange={(e) => handleInputChange('protein', parseFloat(e.target.value) || 0)}
                  className="h-11"
                />
              </div>

              {/* Carbs */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Carbohidratos (g)
                </label>
                <Input
                  type="number"
                  value={formData.carbs}
                  onChange={(e) => handleInputChange('carbs', parseFloat(e.target.value) || 0)}
                  className="h-11"
                />
              </div>

              {/* Fat */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Grasas (g)
                </label>
                <Input
                  type="number"
                  value={formData.fat}
                  onChange={(e) => handleInputChange('fat', parseFloat(e.target.value) || 0)}
                  className="h-11"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={formData.tags.includes(tag) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer px-3 py-1.5 text-sm transition-all select-none',
                    formData.tags.includes(tag)
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={() => handleTagToggle(tag)}
                >
                  {TAG_LABELS[tag] || tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tier Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Tier del Alimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {TIERS.map((tier) => {
                const config = TIER_CONFIG[tier];
                const isActive = formData.tier === tier;
                return (
                  <Button
                    key={tier}
                    type="button"
                    variant="outline"
                    onClick={() => handleInputChange('tier', tier)}
                    className={cn(
                      'transition-all',
                      isActive && 'ring-2'
                    )}
                    style={
                      isActive
                        ? {
                            borderColor: config.color,
                            backgroundColor: config.bgColor,
                            color: config.color,
                            boxShadow: `0 0 0 2px ${config.bgColor}`,
                          }
                        : undefined
                    }
                  >
                    <span className="mr-1">{config.emoji}</span>
                    {config.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Warning Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Advertencias</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                Nivel de Advertencia
              </label>
              <select
                value={formData.warning_level}
                onChange={(e) =>
                  handleInputChange('warning_level', e.target.value as any)
                }
                className="w-full bg-transparent border border-input rounded-md px-3 py-2 text-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] mb-4 text-sm"
              >
                <option value="none">Ninguno</option>
                <option value="caution">Precaucion</option>
                <option value="avoid">Evitar</option>
              </select>

              {(formData.warning_level === 'caution' ||
                formData.warning_level === 'avoid') && (
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Razon de la Advertencia
                  </label>
                  <textarea
                    value={formData.warning_reason}
                    onChange={(e) => handleInputChange('warning_reason', e.target.value)}
                    placeholder="Explica por que esta receta requiere una advertencia..."
                    rows={2}
                    className="w-full bg-transparent border border-input rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] resize-none text-sm"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ingredients Section */}
        <IngredientBuilder
          ingredients={formData.ingredients}
          onChange={(ingredients) => handleInputChange('ingredients', ingredients)}
        />

        {/* Preparation Steps Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Preparacion (opcional)</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddStep}
            >
              + Anadir paso
            </Button>
          </CardHeader>
          <CardContent>
            {formData.preparation.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No hay pasos de preparacion. Haz clic en &quot;+ Anadir paso&quot; para agregar.
              </p>
            ) : (
              <div className="space-y-4">
                {formData.preparation.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Step number circle */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 text-primary border border-primary/30 flex items-center justify-center text-sm font-semibold mt-1">
                      {index + 1}
                    </div>
                    {/* Step textarea */}
                    <textarea
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      placeholder={`Describe el paso ${index + 1}...`}
                      rows={2}
                      className="flex-1 bg-transparent border border-input rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] resize-none text-sm"
                    />
                    {/* Delete button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleRemoveStep(index)}
                      className="mt-1 text-muted-foreground hover:text-destructive"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 h-11"
          >
            {loading ? 'Creando...' : 'Crear Receta'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            className="flex-1 h-11"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
