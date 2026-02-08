'use client'

import { SUPPLEMENTS } from '@/lib/constants'

export default function SupplementosPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-[#1a1a2e] bg-[#12121a] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">Protocolo de Suplementación</h1>
          <p className="text-gray-400 mt-2">Suplementos diseñados para optimizar tu salud y rendimiento</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Warning callout */}
        <div className="bg-[#e17055] bg-opacity-10 border border-[#e17055] border-opacity-30 rounded-lg p-5 mb-10">
          <div className="flex gap-3">
            <span className="text-[#e17055] font-bold text-lg mt-0.5">⚠</span>
            <p className="text-[#e17055]">
              <strong>Importante:</strong> Consulta con tu médico antes de iniciar cualquier protocolo de suplementación.
            </p>
          </div>
        </div>

        {/* Supplements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUPPLEMENTS.map((supplement, index) => (
            <div
              key={index}
              className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6 hover:border-[#6c5ce7] transition-colors duration-300 flex flex-col"
            >
              {/* Supplement name */}
              <h2 className="text-2xl font-bold text-[#6c5ce7] mb-5">{supplement.name}</h2>

              {/* Dosage */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-[#00d2d3] uppercase tracking-wide mb-2">Dosis Recomendada</p>
                <p className="text-gray-200 font-medium">{supplement.dosage}</p>
              </div>

              {/* Benefits */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-[#00b894] uppercase tracking-wide mb-2">Beneficios</p>
                <p className="text-gray-300 text-sm leading-relaxed">{supplement.benefits}</p>
              </div>

              {/* Recommendation */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-[#fdcb6e] uppercase tracking-wide mb-2">Recomendación</p>
                <p className="text-gray-200 text-sm">{supplement.recommendation}</p>
              </div>

              {/* Timing */}
              <div className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg p-4 mt-auto">
                <p className="text-xs font-semibold text-[#e17055] uppercase tracking-wide mb-2">Horario Óptimo</p>
                <p className="text-gray-200 text-sm">{supplement.timing}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
