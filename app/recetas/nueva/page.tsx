'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Recipe, TAG_LABELS } from '@/types';
import { addRecipe } from '@/lib/recipes';
import IngredientBuilder from '@/components/recipes/IngredientBuilder';

const AVAILABLE_TAGS = ['snack', 'anti-inflam', 'omega-3', 'gut', 'quick'];
const WARNING_LEVELS = ['none', 'caution', 'avoid'] as const;

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
        setError('La descripción es requerida');
        setLoading(false);
        return;
      }

      if (formData.ingredients.length === 0) {
        setError('Debes añadir al menos un ingrediente');
        setLoading(false);
        return;
      }

      // Prepare recipe data
      const recipeData = {
        ...formData,
        created_at: new Date().toISOString(),
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
      setError('Ocurrió un error al crear la receta. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Nueva Receta</h1>
        <p className="text-gray-400">
          Crea una nueva receta personalizada para tu plan
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-[#d63031]/10 border border-[#d63031]/30 rounded-lg p-4 mb-6">
          <p className="text-[#d63031] font-medium">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="bg-[#12121a] border border-[#2a2a3e] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Información Básica</h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre de la Receta *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ej: Salmón a la Mediterránea"
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe la receta, modo de preparación, etc."
                rows={3}
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6c5ce7] transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Nutrition Section */}
        <div className="bg-[#12121a] border border-[#2a2a3e] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Información Nutricional</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Kcal */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Calorías (kcal)
              </label>
              <input
                type="number"
                value={formData.kcal}
                onChange={(e) => handleInputChange('kcal', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
            </div>

            {/* Protein */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Proteína (g)
              </label>
              <input
                type="number"
                value={formData.protein}
                onChange={(e) => handleInputChange('protein', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
            </div>

            {/* Carbs */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Carbohidratos (g)
              </label>
              <input
                type="number"
                value={formData.carbs}
                onChange={(e) => handleInputChange('carbs', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
            </div>

            {/* Fat */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Grasas (g)
              </label>
              <input
                type="number"
                value={formData.fat}
                onChange={(e) => handleInputChange('fat', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="bg-[#12121a] border border-[#2a2a3e] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Tags</h2>

          <div className="flex flex-wrap gap-3">
            {AVAILABLE_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  formData.tags.includes(tag)
                    ? 'bg-[#6c5ce7] border-[#6c5ce7] text-white'
                    : 'bg-[#0a0a0f] border-[#2a2a3e] text-gray-400 hover:border-[#6c5ce7]'
                }`}
              >
                {TAG_LABELS[tag] || tag}
              </button>
            ))}
          </div>
        </div>

        {/* Warning Section */}
        <div className="bg-[#12121a] border border-[#2a2a3e] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Advertencias</h2>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Nivel de Advertencia
            </label>
            <select
              value={formData.warning_level}
              onChange={(e) =>
                handleInputChange('warning_level', e.target.value as any)
              }
              className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6c5ce7] transition-colors mb-4"
            >
              <option value="none">Ninguno</option>
              <option value="caution">Precaución</option>
              <option value="avoid">Evitar</option>
            </select>

            {(formData.warning_level === 'caution' ||
              formData.warning_level === 'avoid') && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Razón de la Advertencia
                </label>
                <textarea
                  value={formData.warning_reason}
                  onChange={(e) => handleInputChange('warning_reason', e.target.value)}
                  placeholder="Explica por qué esta receta requiere una advertencia..."
                  rows={2}
                  className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6c5ce7] transition-colors resize-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Ingredients Section */}
        <IngredientBuilder
          ingredients={formData.ingredients}
          onChange={(ingredients) => handleInputChange('ingredients', ingredients)}
        />

        {/* Form Actions */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#00b894] hover:bg-[#00a382] disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Creando...' : 'Crear Receta'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-[#2a2a3e] hover:bg-[#3a3a4e] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
