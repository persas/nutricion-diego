'use client';

import { useEffect, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { FoodItem, FoodTier, TIER_CONFIG } from '@/types';
import { getAllFoodItems } from '@/lib/food-items';
import TierBadge from '@/components/ui/TierBadge';

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
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a2e]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Clasificacion de Alimentos
          </h1>
          <p className="text-gray-400">
            Busca cualquier alimento para ver su clasificacion anti-inflamatoria
          </p>
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a2e] sticky top-0 z-10 bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Buscar alimento... ej: "lentejas", "salmon", "chocolate"'
              className="w-full pl-12 pr-4 py-3 bg-[#12121a] border border-[#1a1a2e] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-[#6c5ce7] transition-colors text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tier Filters */}
          <div className="flex flex-wrap gap-2">
            {TIERS.map((tier) => {
              const config = TIER_CONFIG[tier];
              const isActive = activeTiers.has(tier);
              return (
                <button
                  key={tier}
                  onClick={() => toggleTier(tier)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all"
                  style={{
                    backgroundColor: isActive ? config.bgColor : 'transparent',
                    borderColor: isActive ? config.color : '#2a2a3e',
                    color: isActive ? config.color : '#6b7280',
                  }}
                >
                  {config.emoji} {config.label}
                </button>
              );
            })}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  activeCategory === cat
                    ? 'border-[#6c5ce7] bg-[#6c5ce7]/15 text-[#6c5ce7]'
                    : 'border-[#2a2a3e] text-gray-500 hover:border-[#3a3a4e] hover:text-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          {!loading && (
            <div className="text-sm text-gray-500">
              {filteredItems.length} alimentos
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTiers(new Set());
                    setActiveCategory(null);
                  }}
                  className="ml-3 text-[#6c5ce7] hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Cargando alimentos...</div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron alimentos</p>
              {searchQuery && (
                <p className="text-gray-600 text-sm mt-2">
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
            <div className="space-y-8">
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
                      <h2 className="text-xl font-bold text-white">
                        {config.emoji} {config.label}
                      </h2>
                      <span className="text-sm text-gray-500">{items.length} alimentos</span>
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
    <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4 hover:border-[#2a2a3e] transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-white font-medium">
          {item.emoji && <span className="mr-1.5">{item.emoji}</span>}
          {item.name}
        </h3>
        <TierBadge tier={item.tier as FoodTier} size="sm" />
      </div>
      {item.benefits && (
        <p className="text-gray-400 text-sm">{item.benefits}</p>
      )}
      {item.warnings && (
        <p className="text-[#e17055] text-xs mt-1">{item.warnings}</p>
      )}
      <div className="mt-2">
        <span className="text-xs text-gray-600">{item.category}</span>
      </div>
    </div>
  );
}
