'use client';

import { useState } from 'react';
import { Send, Loader2, ShoppingCart, UtensilsCrossed, Scan } from 'lucide-react';
import PhotoUpload from '@/components/scanner/PhotoUpload';
import ScanResult from '@/components/scanner/ScanResult';
import { FoodScanResult, ScanMode } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const MODES = [
  { id: 'general' as ScanMode, label: 'General', icon: Scan, description: 'Evaluar cualquier comida' },
  { id: 'shopping' as ScanMode, label: 'Supermercado', icon: ShoppingCart, description: 'Evaluar productos del super' },
  { id: 'restaurant' as ScanMode, label: 'Restaurante', icon: UtensilsCrossed, description: 'Que pedir y como' },
];

export default function ScannerPage() {
  const [mode, setMode] = useState<ScanMode>('general');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FoodScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!imagePreview && !textInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imagePreview || undefined,
          message: textInput.trim() || undefined,
          mode,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al analizar');
      }

      const data = await response.json();

      if (data.analysis && data.analysis.food_name) {
        setResult(data.analysis);
      } else if (data.analysis?.raw) {
        setError('No se pudo parsear la respuesta. Intenta de nuevo.');
      } else {
        setError('Respuesta inesperada del servidor.');
      }
    } catch {
      setError('Error al conectar con el servidor. Verifica tu conexion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setImagePreview(null);
    setTextInput('');
    setResult(null);
    setError(null);
  };

  const canAnalyze = (imagePreview || textInput.trim()) && !isLoading;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-gradient-to-b from-[#6c5ce7]/5 to-transparent">
        <div className="max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-3 border-[#6c5ce7]/30 bg-[#6c5ce7]/10 text-[#6c5ce7]">
            <Scan className="size-3" />
            Scanner IA
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Scanner de Comida
          </h1>
          <p className="text-muted-foreground">
            Sube una foto o describe lo que vas a comer para obtener un analisis nutricional
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Mode Selector */}
          <div className="grid grid-cols-3 gap-3">
            {MODES.map((m) => {
              const Icon = m.icon;
              const isActive = mode === m.id;
              return (
                <Card
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    'cursor-pointer py-4 transition-all duration-200',
                    isActive
                      ? 'border-[#6c5ce7] bg-[#6c5ce7]/10 shadow-[0_0_15px_rgba(108,92,231,0.15)]'
                      : 'hover:border-[#6c5ce7]/30 hover:bg-card/80'
                  )}
                >
                  <CardContent className="flex flex-col items-center gap-2 px-3">
                    <Icon className={cn('w-5 h-5', isActive ? 'text-[#6c5ce7]' : 'text-muted-foreground')} />
                    <span className={cn('text-sm font-medium', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                      {m.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground hidden sm:block">{m.description}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Photo Upload */}
          <PhotoUpload
            onImageSelect={setImagePreview}
            preview={imagePreview}
            onClear={() => setImagePreview(null)}
          />

          {/* Text Input */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              {imagePreview ? 'Contexto adicional (opcional)' : 'O describe lo que quieres analizar'}
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && canAnalyze && handleAnalyze()}
                placeholder="ej: lentejas con chorizo y patatas"
                className="h-11 flex-1 rounded-xl bg-card border-border placeholder:text-muted-foreground/50 focus-visible:border-[#6c5ce7] focus-visible:ring-[#6c5ce7]/30"
              />
              <Button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                size="lg"
                className="h-11 rounded-xl bg-[#6c5ce7] hover:bg-[#5b4bd6] text-white px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Analizar</span>
              </Button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <Card className="border-[#d63031]/30 bg-[#d63031]/10 py-0">
              <CardContent className="py-4">
                <p className="text-[#d63031] text-sm">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center gap-3 py-12">
              <div className="p-4 rounded-full bg-[#6c5ce7]/10">
                <Loader2 className="w-8 h-8 animate-spin text-[#6c5ce7]" />
              </div>
              <p className="text-muted-foreground text-sm">Analizando con IA...</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-4">
              <ScanResult result={result} />
              <Button
                onClick={handleClear}
                variant="secondary"
                className="w-full rounded-xl h-11"
              >
                Nuevo analisis
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
