'use client'

import { SCIENCE_CARDS } from '@/lib/constants'

export default function CienciaPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-[#1a1a2e] bg-[#12121a] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">Fundamentos Científicos</h1>
          <p className="text-gray-400 mt-2">Investigaciones respaldadas que fundamentan nuestras recomendaciones</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SCIENCE_CARDS.map((card, index) => (
            <div
              key={index}
              className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6 hover:border-[#6c5ce7] transition-colors duration-300 flex flex-col"
            >
              {/* Title */}
              <h2 className="text-2xl font-bold text-[#6c5ce7] mb-2">{card.title}</h2>

              {/* Subtitle */}
              <p className="text-[#00d2d3] font-semibold text-sm mb-5">{card.subtitle}</p>

              {/* Content paragraph */}
              <p className="text-gray-300 leading-relaxed mb-6 flex-grow">{card.content}</p>

              {/* Research finding */}
              <div className="bg-gradient-to-r from-[#6c5ce7] from-10% to-[#00d2d3] to-90% p-0.5 rounded-lg">
                <div className="bg-[#0a0a0f] rounded-lg p-4">
                  <p className="text-xs font-semibold text-[#fdcb6e] uppercase tracking-wide mb-2">Hallazgo de Investigación</p>
                  <p className="text-gray-200 text-sm">{card.research}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
