'use client';

import Link from 'next/link';
import { Camera, Search, ChefHat, CalendarDays, UtensilsCrossed, Pill, Target, FlaskConical } from 'lucide-react';

const quickActions = [
  {
    href: '/scanner',
    icon: Camera,
    title: 'Scanner de Comida',
    description: 'Foto o texto para analisis IA',
    color: '#6c5ce7',
    bgColor: 'rgba(108,92,231,0.15)',
  },
  {
    href: '/alimentos',
    icon: Search,
    title: 'Buscar Alimentos',
    description: 'Busca cualquier alimento por tier',
    color: '#00b894',
    bgColor: 'rgba(0,184,148,0.15)',
  },
  {
    href: '/recetas',
    icon: ChefHat,
    title: 'Recetas',
    description: '36+ recetas anti-inflamatorias',
    color: '#00d2d3',
    bgColor: 'rgba(0,210,211,0.15)',
  },
  {
    href: '/planificador',
    icon: CalendarDays,
    title: 'Planificador',
    description: 'Planifica tu semana y genera lista',
    color: '#fdcb6e',
    bgColor: 'rgba(253,203,110,0.15)',
  },
];

const secondaryLinks = [
  { href: '/restaurante', icon: UtensilsCrossed, label: 'Comer Fuera', color: '#e17055' },
  { href: '/suplementos', icon: Pill, label: 'Suplementos', color: '#a29bfe' },
  { href: '/ciencia', icon: FlaskConical, label: 'Ciencia', color: '#74b9ff' },
  { href: '/objetivos', icon: Target, label: 'Objetivos', color: '#fd79a8' },
];

const macrosSummary = {
  rest: { kcal: 2000, protein: 170, carbs: 140, fat: 84, deficit: -650 },
  train: { kcal: 2300, protein: 173, carbs: 259, fat: 64, deficit: -350 },
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a2e]">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#6c5ce7]/15 text-[#6c5ce7] mb-4">
            Plan Anti-inflamatorio · Psoriasis
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Hola, Diego
          </h1>
          <p className="text-gray-400">
            Tu centro de control nutricional. Usa las herramientas de abajo para tu dia a dia.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Objetivo Diario</div>
              <div className="text-xl font-bold text-[#f59e0b]">2.000-2.300</div>
              <div className="text-xs text-gray-500">kcal</div>
            </div>
            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Proteina</div>
              <div className="text-xl font-bold text-[#10b981]">170g</div>
              <div className="text-xs text-gray-500">objetivo diario</div>
            </div>
            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Deficit</div>
              <div className="text-xl font-bold text-[#e17055]">-500</div>
              <div className="text-xs text-gray-500">kcal/dia</div>
            </div>
            <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Agua</div>
              <div className="text-xl font-bold text-[#74b9ff]">3.5L</div>
              <div className="text-xs text-gray-500">objetivo diario</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Acciones Rapidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-start gap-4 p-5 bg-[#12121a] border border-[#1a1a2e] rounded-xl hover:border-[#2a2a3e] transition-all group"
                  >
                    <div
                      className="p-3 rounded-xl shrink-0"
                      style={{ backgroundColor: action.bgColor }}
                    >
                      <Icon className="w-6 h-6" style={{ color: action.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-[#6c5ce7] transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">{action.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Macros Summary */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Resumen de Macros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🏖️</span>
                  <h3 className="text-white font-medium">Dia de Descanso</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Calorias</span>
                    <span className="text-white font-medium">{macrosSummary.rest.kcal} kcal</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Proteina</span>
                    <span className="text-[#10b981] font-medium">{macrosSummary.rest.protein}g (34%)</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Carbohidratos</span>
                    <span className="text-[#3b82f6] font-medium">{macrosSummary.rest.carbs}g (28%)</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Grasas</span>
                    <span className="text-[#eab308] font-medium">{macrosSummary.rest.fat}g (38%)</span>
                  </div>
                  <div className="flex justify-between text-gray-400 pt-1 border-t border-[#1a1a2e]">
                    <span>Deficit</span>
                    <span className="text-[#e17055] font-medium">{macrosSummary.rest.deficit} kcal</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🏋️</span>
                  <h3 className="text-white font-medium">Dia de Entrenamiento</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Calorias</span>
                    <span className="text-white font-medium">{macrosSummary.train.kcal} kcal</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Proteina</span>
                    <span className="text-[#10b981] font-medium">{macrosSummary.train.protein}g (30%)</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Carbohidratos</span>
                    <span className="text-[#3b82f6] font-medium">{macrosSummary.train.carbs}g (45%)</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Grasas</span>
                    <span className="text-[#eab308] font-medium">{macrosSummary.train.fat}g (25%)</span>
                  </div>
                  <div className="flex justify-between text-gray-400 pt-1 border-t border-[#1a1a2e]">
                    <span>Deficit</span>
                    <span className="text-[#e17055] font-medium">{macrosSummary.train.deficit} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Links */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Mas Secciones</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {secondaryLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex flex-col items-center gap-2 p-4 bg-[#12121a] border border-[#1a1a2e] rounded-xl hover:border-[#2a2a3e] transition-all"
                  >
                    <Icon className="w-5 h-5" style={{ color: link.color }} />
                    <span className="text-sm text-gray-400">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Protocol Reminder */}
          <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-5">
            <h3 className="text-white font-medium mb-3">Recordatorio del Protocolo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-[#00b894] font-medium">Priorizar</span>
                <p className="text-gray-400 mt-1">Pescado graso, AOVE, verduras verdes, curcuma, frutos secos</p>
              </div>
              <div>
                <span className="text-[#fdcb6e] font-medium">Moderar</span>
                <p className="text-gray-400 mt-1">Carne roja grass-fed, lacteos, cafe, gluten</p>
              </div>
              <div>
                <span className="text-[#d63031] font-medium">Evitar</span>
                <p className="text-gray-400 mt-1">Ultra procesados, aceites de semilla, azucar, frituras</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
