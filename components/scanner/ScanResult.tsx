'use client';

import { FoodScanResult, FoodTier } from '@/types';
import TierBadge from '@/components/ui/TierBadge';

interface ScanResultProps {
  result: FoodScanResult;
}

export default function ScanResult({ result }: ScanResultProps) {
  const scoreColor = result.score >= 7 ? '#00b894' : result.score >= 5 ? '#fdcb6e' : result.score >= 3 ? '#e17055' : '#d63031';

  return (
    <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">{result.food_name}</h3>
          <div className="mt-2">
            <TierBadge tier={result.tier as FoodTier} size="md" />
          </div>
        </div>
        {/* Score */}
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-3"
            style={{ borderColor: scoreColor, color: scoreColor }}
          >
            {result.score}
          </div>
          <span className="text-xs text-gray-500 mt-1">/10</span>
        </div>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[#0a0a0f] rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-[#f59e0b]">{result.kcal}</div>
          <div className="text-xs text-gray-500">kcal</div>
        </div>
        <div className="bg-[#0a0a0f] rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-[#10b981]">{result.protein}g</div>
          <div className="text-xs text-gray-500">Proteina</div>
        </div>
        <div className="bg-[#0a0a0f] rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-[#3b82f6]">{result.carbs}g</div>
          <div className="text-xs text-gray-500">Carbos</div>
        </div>
        <div className="bg-[#0a0a0f] rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-[#eab308]">{result.fat}g</div>
          <div className="text-xs text-gray-500">Grasas</div>
        </div>
      </div>

      {/* Advice */}
      <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1a1a2e]">
        <h4 className="text-sm font-semibold text-[#6c5ce7] mb-2">Consejo</h4>
        <p className="text-gray-300 text-sm leading-relaxed">{result.advice}</p>
      </div>

      {/* Inflammation Notes */}
      {result.inflammation_notes && (
        <div className="bg-[#0a0a0f] rounded-lg p-4 border border-[#1a1a2e]">
          <h4 className="text-sm font-semibold text-[#e17055] mb-2">Impacto Inflamatorio</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{result.inflammation_notes}</p>
        </div>
      )}
    </div>
  );
}
