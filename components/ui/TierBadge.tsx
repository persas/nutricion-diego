'use client';

import { FoodTier, TIER_CONFIG } from '@/types';
import { cn } from '@/lib/utils';

interface TierBadgeProps {
  tier: FoodTier;
  size?: 'sm' | 'md' | 'lg';
}

export default function TierBadge({ tier, size = 'md' }: TierBadgeProps) {
  const config = TIER_CONFIG[tier];
  if (!config) return null;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1',
    lg: 'text-sm px-3 py-1.5 gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold border whitespace-nowrap',
        sizeClasses[size]
      )}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        borderColor: `${config.color}33`,
      }}
    >
      {config.emoji} {config.label}
    </span>
  );
}
