'use client';

import Link from 'next/link';
import { Recipe, TAG_LABELS, TAG_COLORS } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
  href?: string;
  selected?: boolean;
  selectable?: boolean;
  disabled?: boolean;
}

export default function RecipeCard({
  recipe,
  onClick,
  href,
  selected = false,
  selectable = false,
  disabled = false,
}: RecipeCardProps) {
  const truncatedDescription =
    recipe.description.length > 80
      ? recipe.description.slice(0, 80) + '...'
      : recipe.description;

  const getWarningColor = () => {
    if (recipe.warning_level === 'avoid') return '#d63031';
    if (recipe.warning_level === 'caution') return '#e17055';
    return 'transparent';
  };

  const content = (
    <Card
      onClick={disabled ? undefined : onClick}
      className={cn(
        'transition-all',
        selected
          ? 'border-2 border-[#00b894] shadow-lg shadow-[#00b894]/20'
          : disabled
            ? 'border-2 border-border opacity-50'
            : selectable
              ? 'border-2 border-border hover:border-[#6c5ce7] transition-colors'
              : 'border border-border hover:border-[#6c5ce7]/50 transition-colors',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        selectable && !disabled ? 'hover:shadow-lg hover:shadow-[#6c5ce7]/10' : ''
      )}
    >
      <CardHeader className="pb-0">
        {/* Header with title and warning indicator */}
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg flex-1 pr-2">{recipe.name}</CardTitle>
          {recipe.warning_level !== 'none' && (
            <div
              className="size-3 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: getWarningColor() }}
              title={recipe.warning_reason || `Nivel: ${recipe.warning_level}`}
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground">{truncatedDescription}</p>

        {/* Macros row */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">kcal:</span>
            <span className="text-[#6c5ce7] font-semibold">{recipe.kcal}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">P:</span>
            <span className="text-[#00d2d3] font-semibold">{recipe.protein}g</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">C:</span>
            <span className="text-[#6c5ce7] font-semibold">{recipe.carbs}g</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">G:</span>
            <span className="text-[#00b894] font-semibold">{recipe.fat}g</span>
          </div>
        </div>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn(
                  'rounded-full text-xs px-2.5 py-0.5',
                  TAG_COLORS[tag] || 'bg-gray-500/15 text-gray-400 border-gray-500/30'
                )}
              >
                {TAG_LABELS[tag] || tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Selection indicator */}
        {selectable && selected && (
          <>
            <Separator />
            <div className="flex items-center justify-end">
              <div className="text-[#00b894] text-sm font-semibold">✓ Seleccionado</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  // Wrap in Link when href is provided and not in selectable mode
  if (href && !selectable) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
