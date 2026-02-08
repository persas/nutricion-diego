'use client';

import { TAG_LABELS, TAG_COLORS } from '@/types';

interface RecipeFiltersProps {
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const AVAILABLE_TAGS = [
  'lunch',
  'dinner',
  'snack',
  'anti-inflam',
  'omega-3',
  'gut',
  'quick',
];

export default function RecipeFilters({
  activeTags,
  onTagToggle,
  searchQuery,
  onSearchChange,
}: RecipeFiltersProps) {
  return (
    <div className="bg-[#12121a] border border-[#2a2a3e] rounded-lg p-6 mb-8">
      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Buscar recetas
        </label>
        <input
          type="text"
          placeholder="Escribe el nombre de una receta..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6c5ce7] transition-colors"
        />
      </div>

      {/* Tag Filters */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Filtrar por tags
        </label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-2 rounded-full text-sm font-medium border transition-all ${
                activeTags.includes(tag)
                  ? TAG_COLORS[tag] + ' opacity-100'
                  : 'bg-[#0a0a0f] border-[#2a2a3e] text-gray-400 hover:border-[#6c5ce7]'
              }`}
            >
              {TAG_LABELS[tag] || tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
