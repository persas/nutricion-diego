'use client';

import { useState } from 'react';
import { Send, Loader2, ShoppingCart, UtensilsCrossed, Scan } from 'lucide-react';
import PhotoUpload from '@/components/scanner/PhotoUpload';
import ScanResult from '@/components/scanner/ScanResult';
import { FoodScanResult, ScanMode } from '@/types';

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
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a2e]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Scanner de Comida
          </h1>
          <p className="text-gray-400">
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
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    mode === m.id
                      ? 'border-[#6c5ce7] bg-[#6c5ce7]/10 text-white'
                      : 'border-[#1a1a2e] bg-[#12121a] text-gray-400 hover:border-[#2a2a3e]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{m.label}</span>
                  <span className="text-[10px] text-gray-500 hidden sm:block">{m.description}</span>
                </button>
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
            <label className="text-sm text-gray-400">
              {imagePreview ? 'Contexto adicional (opcional)' : 'O describe lo que quieres analizar'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && canAnalyze && handleAnalyze()}
                placeholder="ej: lentejas con chorizo y patatas"
                className="flex-1 bg-[#12121a] border border-[#1a1a2e] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className="px-6 py-3 bg-[#6c5ce7] text-white rounded-xl font-medium hover:bg-[#5b4bd6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Analizar</span>
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-[#d63031]/10 border border-[#d63031]/30 rounded-xl p-4 text-[#d63031] text-sm">
              {error}
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center gap-3 py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#6c5ce7]" />
              <p className="text-gray-400 text-sm">Analizando con IA...</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-4">
              <ScanResult result={result} />
              <button
                onClick={handleClear}
                className="w-full py-3 bg-[#1a1a2e] text-gray-400 rounded-xl hover:bg-[#2a2a3e] transition-colors text-sm"
              >
                Nuevo analisis
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
