'use client'

import { TARGETS } from '@/lib/constants'

const getProgressColor = (current: number, target: number): string => {
  const percentage = (current / target) * 100
  if (percentage >= 100) return 'bg-[#00b894]'
  if (percentage >= 75) return 'bg-[#fdcb6e]'
  if (percentage >= 50) return 'bg-[#00d2d3]'
  return 'bg-[#6c5ce7]'
}

export default function ObjetivosPage() {
  const hydrationGoal = 3.5 // 3.5 liters
  const hydrationCurrent = 2.1 // Example current value
  const hydrationPercentage = (hydrationCurrent / hydrationGoal) * 100

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-[#1a1a2e] bg-[#12121a] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">Objetivos y Cronograma</h1>
          <p className="text-gray-400 mt-2">Rastreo de progreso hacia tus metas de salud</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hydration Section */}
        <div className="mb-12 bg-[#12121a] border border-[#1a1a2e] rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">💧</span>
            <h2 className="text-3xl font-bold text-[#00d2d3]">Hidratación Diaria</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Progress visualization */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold">Meta: {hydrationGoal}L</span>
                  <span className="text-2xl font-bold text-[#00b894]">{hydrationCurrent}L</span>
                </div>
                <div className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00d2d3] to-[#00b894] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(hydrationPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                <span className="text-[#00b894] font-semibold">{hydrationPercentage.toFixed(0)}%</span> completado
              </p>
            </div>

            {/* Hydration tips */}
            <div className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg p-5">
              <p className="text-xs font-semibold text-[#6c5ce7] uppercase tracking-wide mb-4">Recomendaciones</p>
              <ul className="space-y-3">
                <li className="flex gap-2 text-gray-300 text-sm">
                  <span className="text-[#00d2d3]">•</span>
                  <span>Bebe un vaso de agua al despertar</span>
                </li>
                <li className="flex gap-2 text-gray-300 text-sm">
                  <span className="text-[#00d2d3]">•</span>
                  <span>500ml con cada comida</span>
                </li>
                <li className="flex gap-2 text-gray-300 text-sm">
                  <span className="text-[#00d2d3]">•</span>
                  <span>Aumenta durante el ejercicio</span>
                </li>
                <li className="flex gap-2 text-gray-300 text-sm">
                  <span className="text-[#00d2d3]">•</span>
                  <span>Monitorea el color de tu orina</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Targets */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#6c5ce7]">Tus Objetivos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TARGETS.map((target) => {
              const progressPercentage = (target.current / target.target) * 100

              return (
                <div
                  key={target.id}
                  className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6 hover:border-[#6c5ce7] transition-colors duration-300 flex flex-col"
                >
                  {/* Target title */}
                  <h3 className="text-2xl font-bold text-[#6c5ce7] mb-2">{target.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-5">{target.description}</p>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-300">Progreso</span>
                        <span className="text-sm text-gray-400">({target.current}/{target.target})</span>
                      </div>
                      <span className={`text-sm font-bold ${getProgressColor(target.current, target.target)}`}>
                        {progressPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-full h-3 overflow-hidden">
                      <div
                        className={`${getProgressColor(target.current, target.target)} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg p-4">
                    <p className="text-xs font-semibold text-[#fdcb6e] uppercase tracking-wide mb-3">Métricas</p>
                    <ul className="space-y-2">
                      {target.metrics.map((metric, metricIndex) => (
                        <li key={metricIndex} className="flex gap-2 text-gray-300 text-sm">
                          <span className="text-[#00b894]">✓</span>
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
