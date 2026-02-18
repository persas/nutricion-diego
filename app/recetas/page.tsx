'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Recipe } from '@/types';
import { getRecipes } from '@/lib/recipes';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters from '@/components/recipes/RecipeFilters';

export default function RecetasPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        console.error('Error loading recipes:', err);
        setError('No se pudieron cargar las recetas. Intenta mas tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  useEffect(() => {
    let filtered = recipes;

    if (activeTags.length > 0) {
      filtered = filtered.filter((recipe) =>
        activeTags.some((tag) => recipe.tags.includes(tag))
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query)
      );
    }

    setFilteredRecipes(filtered);
  }, [recipes, activeTags, searchQuery]);

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a2e]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Recetas</h1>
            <p className="text-gray-400">
              Explora y gestiona tus recetas anti-inflamatorias
            </p>
          </div>
          <Link href="/recetas/nueva">
            <button className="bg-[#00b894] hover:bg-[#00a382] text-white px-6 py-3 rounded-lg font-medium transition-colors">
              + Nueva Receta
            </button>
          </Link>
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RecipeFilters
            activeTags={activeTags}
            onTagToggle={handleTagToggle}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Cargando recetas...</p>
            </div>
          ) : error ? (
            <div className="bg-[#d63031]/10 border border-[#d63031]/30 rounded-lg p-6 text-center">
              <p className="text-[#d63031] font-medium">{error}</p>
              <p className="text-gray-400 text-sm mt-2">
                Asegurate de tener Supabase configurado correctamente.
              </p>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">
                {recipes.length === 0
                  ? 'No hay recetas disponibles aun.'
                  : 'No se encontraron recetas que coincidan con tu busqueda.'}
              </p>
              <Link href="/recetas/nueva">
                <button className="bg-[#6c5ce7] hover:bg-[#5f4ccf] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Crear primera receta
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  href={`/recetas/${recipe.id}`}
                />
              ))}
            </div>
          )}

          {!loading && !error && recipes.length > 0 && (
            <div className="mt-8 text-center text-sm text-gray-400">
              Mostrando {filteredRecipes.length} de {recipes.length} recetas
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
