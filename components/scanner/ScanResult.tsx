'use client';

import { FoodScanResult, FoodTier } from '@/types';
import TierBadge from '@/components/ui/TierBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ScanResultProps {
  result: FoodScanResult;
}

export default function ScanResult({ result }: ScanResultProps) {
  const scoreColor =
    result.score >= 7
      ? '#00b894'
      : result.score >= 5
        ? '#fdcb6e'
        : result.score >= 3
          ? '#e17055'
          : '#d63031';

  const macros = [
    { label: 'kcal', value: result.kcal, unit: '', color: '#fdcb6e' },
    { label: 'Proteina', value: result.protein, unit: 'g', color: '#00b894' },
    { label: 'Carbos', value: result.carbs, unit: 'g', color: '#74b9ff' },
    { label: 'Grasas', value: result.fat, unit: 'g', color: '#e17055' },
  ];

  return (
    <Card className="rounded-xl">
      {/* Header: Name + Tier + Score */}
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-foreground">
              {result.food_name}
            </CardTitle>
            <TierBadge tier={result.tier as FoodTier} size="md" />
          </div>
          {/* Score circle */}
          <div className="flex flex-col items-center shrink-0">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                borderWidth: '3px',
                borderStyle: 'solid',
                borderColor: scoreColor,
                color: scoreColor,
                boxShadow: `0 0 15px ${scoreColor}25`,
              }}
            >
              {result.score}
            </div>
            <span className="text-xs text-muted-foreground mt-1">/10</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Macros Grid */}
        <div className="grid grid-cols-4 gap-3">
          {macros.map((macro) => (
            <Card key={macro.label} className="py-3 bg-secondary/50 border-border/50">
              <CardContent className="px-2 py-0 text-center">
                <div className="text-lg font-bold" style={{ color: macro.color }}>
                  {macro.value}{macro.unit}
                </div>
                <div className="text-xs text-muted-foreground">{macro.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advice */}
        <Card className="bg-secondary/50 border-border/50 py-4">
          <CardContent className="px-4 py-0 space-y-2">
            <Badge variant="outline" className="border-[#6c5ce7]/30 bg-[#6c5ce7]/10 text-[#6c5ce7] text-xs">
              Consejo
            </Badge>
            <p className="text-foreground/80 text-sm leading-relaxed">{result.advice}</p>
          </CardContent>
        </Card>

        {/* Inflammation Notes */}
        {result.inflammation_notes && (
          <Card className="bg-secondary/50 border-border/50 py-4">
            <CardContent className="px-4 py-0 space-y-2">
              <Badge variant="outline" className="border-[#e17055]/30 bg-[#e17055]/10 text-[#e17055] text-xs">
                Impacto Inflamatorio
              </Badge>
              <p className="text-foreground/80 text-sm leading-relaxed">{result.inflammation_notes}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
