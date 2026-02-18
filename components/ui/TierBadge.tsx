'use client';

import { FoodTier, TIER_CONFIG } from '@/types';

interface TierBadgeProps {
  tier: FoodTier;
  size?: 'sm' | 'md' | 'lg';
}

export default function TierBadge({ tier, size = 'md' }: TierBadgeProps) {
  const config = TIER_CONFIG[tier];
  if (!config) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${sizeClasses[size]}`}
      style={{ backgroundColor: config.bgColor, color: config.color }}
    >
      {config.emoji} {config.label}
    </span>
  );
}
