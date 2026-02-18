'use client';

import { useEffect, useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, Utensils } from 'lucide-react';
import { FoodItem, FoodTier, TIER_CONFIG } from '@/types';
import { getAllFoodItems } from '@/lib/food-items';
import TierBadge from '@/components/ui/TierBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const TIERS: FoodTier[] = ['excelente', 'bueno', 'neutro', 'precaucion', 'evitar'];

const CATEGORIES = [
  'Pescados y mariscos',
  'Carnes',
  'Verduras y hortalizas',
  'Frutas',
  'Legumbres',
  'Cereales y granos',
  'Lacteos y huevos',
  'Frutos secos y semillas',
  'Aceites y grasas',
  'Condimentos y especias',
  'Bebidas',
  'Procesados y preparados',
];

function normalizeSearch(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function AlimentosPage() {
  const [allItems, setAllItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTiers, setActiveTiers] = useState<Set<FoodTier>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const items = await getAllFoodItems();
      setAllItems(items);
      setLoading(false);
    }
    load();
  }, []);

  const filteredItems = useMemo(() => {
    let items = allItems;

    // Search filter
    if (searchQuery.trim()) {
      const normalized = normalizeSearch(searchQuery);
      items = items.filter((item) =>
        normalizeSearch(item.name).includes(normalized)
      );
    }

    // Tier filter
    if (activeTiers.size > 0) {
      items = items.filter((item) => activeTiers.has(item.tier as FoodTier));
    }

    // Category filter
    if (activeCategory) {
      items = items.filter((item) => item.category === activeCategory);
    }

    return items;
  }, [allItems, searchQuery, activeTiers, activeCategory]);

  // Group by tier for display when no search
  const groupedByTier = useMemo(() => {
    const groups: Record<FoodTier, FoodItem[]> = {
      excelente: [], bueno: [], neutro: [], precaucion: [], evitar: [],
    };
    filteredItems.forEach((item) => {
      if (groups[item.tier as FoodTier]) {
        groups[item.tier as FoodTier].push(item);
      }
    });
    return groups;
  }, [filteredItems]);

  const toggleTier = (tier: FoodTier) => {
    const newSet = new Set(activeTiers);
    if (newSet.has(tier)) {
      newSet.delete(tier);
    } else {
      newSet.add(tier);
    }
    setActiveTiers(newSet);
  };

  const hasActiveFilters = searchQuery.trim() || activeTiers.size > 0 || activeCategory;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <Utensils className="w-5 h-5 text-primary" />
            </div>
            <Badge variant="outline" className="text-xs font-semibold tracking-wider uppercase text-primary border-primary/30">
              Base de datos
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Clasificacion de Alimentos
          </h1>
          <p className="text-muted-foreground mt-2 text-base max-w-lg">
            Busca cualquier alimento para ver su clasificacion anti-inflamatoria
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <section className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto py-5 px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Buscar alimento... ej: "lentejas", "salmon", "chocolate"'
              className="pl-10 pr-10 h-11 text-base bg-card border-border rounded-lg"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>

          {/* Tier Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground mr-0.5 hidden sm:block" />
            {TIERS.map((tier) => {
              const config = TIER_CONFIG[tier];
              const isActive = activeTiers.has(tier);
              return (
                <Button
                  key={tier}
                  variant="outline"
                  size="sm"
                  onClick={() => toggleTier(tier)}
                  className={cn(
                    'rounded-full text-xs font-medium transition-all',
                    isActive
                      ? 'border-transparent'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  )}
                  style={
                    isActive
                      ? {
                          backgroundColor: config.bgColor,
                          borderColor: config.color,
                          color: config.color,
                        }
                      : undefined
                  }
                >
                  {config.emoji} {config.label}
                </Button>
              );
            })}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className={cn(
                  'cursor-pointer select-none transition-all text-xs font-medium px-2.5 py-0.5',
                  activeCategory === cat
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground'
                )}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Results count */}
          {!loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="tabular-nums font-medium">{filteredItems.length}</span>
              <span>alimentos</span>
              {hasActiveFilters && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTiers(new Set());
                    setActiveCategory(null);
                  }}
                  className="text-primary h-auto p-0 ml-1"
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm">Cargando alimentos...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium text-lg">No se encontraron alimentos</p>
              {searchQuery && (
                <p className="text-muted-foreground text-sm mt-1.5">
                  Prueba con otro termino de busqueda
                </p>
              )}
            </div>
          ) : searchQuery.trim() || activeTiers.size > 0 || activeCategory ? (
            /* Flat list when filtering */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredItems.map((item) => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            /* Grouped by tier when browsing */
            <div className="space-y-10">
              {TIERS.map((tier) => {
                const items = groupedByTier[tier];
                if (items.length === 0) return null;
                const config = TIER_CONFIG[tier];
                return (
                  <div key={tier}>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                      <h2 className="text-xl font-bold text-foreground">
                        {config.emoji} {config.label}
                      </h2>
                      <Badge variant="secondary" className="text-xs tabular-nums">
                        {items.length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {items.map((item) => (
                        <FoodItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FoodItemCard({ item }: { item: FoodItem }) {
  return (
    <Card className="py-0 gap-0 border-border bg-card hover:border-muted-foreground/25 transition-all duration-200 group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-foreground font-medium leading-snug group-hover:text-primary transition-colors">
            {item.emoji && <span className="mr-1.5">{item.emoji}</span>}
            {item.name}
          </h3>
          <TierBadge tier={item.tier as FoodTier} size="sm" />
        </div>
        {item.benefits && (
          <p className="text-muted-foreground text-sm leading-relaxed">{item.benefits}</p>
        )}
        {item.warnings && (
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: '#e17055' }}>
            {item.warnings}
          </p>
        )}
        <div className="mt-2.5 pt-2.5 border-t border-border">
          <Badge variant="secondary" className="text-[11px] font-normal">
            {item.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
