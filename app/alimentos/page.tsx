'use client';

import { FOOD_CATEGORIES } from '@/lib/constants';
import { CheckCircle, AlertCircle, Circle } from 'lucide-react';

export default function AlimentosPage() {
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="w-5 h-5 text-[#00b894]" />;
      case 'caution':
      case 'avoid':
        return <AlertCircle className="w-5 h-5 text-[#e17055]" />;
      case 'neutral':
      default:
        return <Circle className="w-5 h-5 text-[#fdcb6e]" />;
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Clasificación de Alimentos
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Sistema de 5 niveles para guiar tu alimentación. Cada categoría está basada en el impacto nutricional y antiinflamatorio de los alimentos para optimizar tu salud.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {FOOD_CATEGORIES.map((category) => (
            <div
              key={category.level}
              className="bg-[#12121a] rounded-lg overflow-hidden border border-[#1a1a2e] hover:border-[#2a2a3e] transition-colors"
            >
              {/* Category Header with Colored Border */}
              <div
                className="h-1"
                style={{ backgroundColor: category.color }}
              />

              <div className="p-6 sm:p-8">
                {/* Category Title and Description */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getLevelIcon(category.level)}
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        {category.title}
                      </h2>
                    </div>
                    <p className="text-gray-300 text-lg">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Foods Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.foods.map((food, index) => (
                    <div
                      key={index}
                      className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-lg p-4 hover:border-[#2a2a3e] transition-colors"
                    >
                      <h3 className="text-white font-semibold mb-2">
                        {food.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {food.benefits}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legend Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6">Guía de Niveles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: '#00b894' }}
                />
                <p className="text-white font-semibold">Excelentes</p>
              </div>
              <p className="text-gray-400 text-sm">
                Base de tu alimentación
              </p>
            </div>

            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: '#00d2d3' }}
                />
                <p className="text-white font-semibold">Buenos</p>
              </div>
              <p className="text-gray-400 text-sm">
                Incluir frecuentemente
              </p>
            </div>

            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: '#fdcb6e' }}
                />
                <p className="text-white font-semibold">Neutros</p>
              </div>
              <p className="text-gray-400 text-sm">
                Moderar ocasionalmente
              </p>
            </div>

            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: '#e17055' }}
                />
                <p className="text-white font-semibold">Precaución</p>
              </div>
              <p className="text-gray-400 text-sm">
                Minimizar o evitar
              </p>
            </div>

            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: '#d63031' }}
                />
                <p className="text-white font-semibold">Evitar</p>
              </div>
              <p className="text-gray-400 text-sm">
                Prohibidos o máxima restricción
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
