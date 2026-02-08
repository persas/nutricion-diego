'use client';

import { useState } from 'react';
import { Recipe } from '@/types/index';
import { WARNING_CONFIG } from '@/types/index';
import { X } from 'lucide-react';

interface WarningBannerProps {
  selectedRecipes: Recipe[];
}

export default function WarningBanner({ selectedRecipes }: WarningBannerProps) {
  const [dismissedCaution, setDismissedCaution] = useState(false);
  const [dismissedAvoid, setDismissedAvoid] = useState(false);

  const cautionCount = selectedRecipes.filter(r => r.warning_level === 'caution').length;
  const avoidCount = selectedRecipes.filter(r => r.warning_level === 'avoid').length;

  const showCautionWarning = !dismissedCaution && cautionCount > WARNING_CONFIG.caution_max;
  const showAvoidWarning = !dismissedAvoid && avoidCount > 0;

  if (!showCautionWarning && !showAvoidWarning) {
    return null;
  }

  return (
    <div className="space-y-3">
      {showCautionWarning && (
        <div className="bg-[#e17055]/10 border border-[#e17055] rounded-lg p-4 flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-[#e17055] font-medium text-sm">
              {WARNING_CONFIG.caution_message.replace('{count}', cautionCount.toString())}
            </p>
          </div>
          <button
            onClick={() => setDismissedCaution(true)}
            className="flex-shrink-0 p-1 hover:bg-[#e17055]/20 rounded transition-colors"
            aria-label="Descartar advertencia"
          >
            <X size={18} className="text-[#e17055]" />
          </button>
        </div>
      )}

      {showAvoidWarning && (
        <div className="bg-[#d63031]/10 border border-[#d63031] rounded-lg p-4 flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-[#d63031] font-medium text-sm">
              {WARNING_CONFIG.avoid_message}
            </p>
          </div>
          <button
            onClick={() => setDismissedAvoid(true)}
            className="flex-shrink-0 p-1 hover:bg-[#d63031]/20 rounded transition-colors"
            aria-label="Descartar advertencia"
          >
            <X size={18} className="text-[#d63031]" />
          </button>
        </div>
      )}
    </div>
  );
}
