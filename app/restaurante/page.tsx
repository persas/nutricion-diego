'use client'

import { RESTAURANT_GUIDE } from '@/lib/constants'

const restaurantEmojis: Record<string, string> = {
  'Fast Food': '🍔',
  'Italiano': '🍝',
  'Asiático': '🥢',
  'Mexicano': '🌮',
  'Mediterráneo': '🥗',
  'Sushi': '🍣',
  'Steak House': '🥩',
  'Vegano': '🥬',
}

export default function RestaurantePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-[#1a1a2e] bg-[#12121a] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">Guía para Comer Fuera</h1>
          <p className="text-gray-400 mt-2">Estrategias para mantener tus objetivos nutricionales en cualquier restaurante</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESTAURANT_GUIDE.map((restaurant, index) => (
            <div
              key={index}
              className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6 hover:border-[#6c5ce7] transition-colors duration-300"
            >
              {/* Header with emoji */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{restaurantEmojis[restaurant.category] || '🍽️'}</span>
                <h2 className="text-2xl font-bold text-[#6c5ce7]">{restaurant.category}</h2>
              </div>

              {/* Tips section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#00d2d3] uppercase tracking-wide mb-3">Consejos</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{restaurant.tips}</p>
              </div>

              {/* Order recommendation */}
              <div className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg p-4">
                <p className="text-xs font-semibold text-[#fdcb6e] uppercase tracking-wide mb-2">Orden Recomendada</p>
                <p className="text-gray-200">{restaurant.order}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
