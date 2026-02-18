'use client';

import { TAG_LABELS, TAG_COLORS } from '@/types';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RecipeFiltersProps {
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const MEAL_TAGS = ['breakfast', 'lunch', 'dinner', 'snack'];
const BENEFIT_TAGS = ['anti-inflam', 'omega-3', 'gut', 'high-protein', 'low-carb'];
const UTILITY_TAGS = ['quick', 'batch-cook'];

export default function RecipeFilters({
  activeTags,
  onTagToggle,
  searchQuery,
  onSearchChange,
}: RecipeFiltersProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5">
      {/* Search Input */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Buscar recetas
        </label>
        <Input
          type="text"
          placeholder="Escribe el nombre de una receta..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 bg-background border-border"
        />
      </div>

      {/* Tag Filters - grouped */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Filtrar por tags
        </label>

        {/* Meal type */}
        <div className="flex flex-wrap gap-2">
          {MEAL_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              onClick={() => onTagToggle(tag)}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all select-none',
                activeTags.includes(tag)
                  ? TAG_COLORS[tag]
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
            >
              {TAG_LABELS[tag] || tag}
            </Badge>
          ))}
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-2">
          {BENEFIT_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              onClick={() => onTagToggle(tag)}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all select-none',
                activeTags.includes(tag)
                  ? TAG_COLORS[tag]
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
            >
              {TAG_LABELS[tag] || tag}
            </Badge>
          ))}
        </div>

        {/* Utility */}
        <div className="flex flex-wrap gap-2">
          {UTILITY_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              onClick={() => onTagToggle(tag)}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all select-none',
                activeTags.includes(tag)
                  ? TAG_COLORS[tag]
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
            >
              {TAG_LABELS[tag] || tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
