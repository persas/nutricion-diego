'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { RESTAURANT_GUIDE } from '@/lib/constants';

export default function RestaurantePage() {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setAiResponse(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Estoy en un restaurante / voy a comer fuera. ${query}. Dame recomendaciones especificas de que pedir y que evitar, teniendo en cuenta mi psoriasis y protocolo anti-inflamatorio.`,
        }),
      });

      if (!response.ok) throw new Error('Error');
      const data = await response.json();
      setAiResponse(data.response);
    } catch {
      setAiResponse('Error al conectar con el asistente. Verifica tu conexion.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-[#1a1a2e]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Guia para Comer Fuera
          </h1>
          <p className="text-gray-400">
            Estrategias para mantener tu protocolo en cualquier restaurante
          </p>
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* AI Assistant */}
          <div className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">
              Asistente de Restaurante
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Describe el restaurante o el menu y te digo que pedir
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleAsk()}
                placeholder='ej: "Restaurante italiano, tienen pasta, pizza, ensaladas y carne"'
                className="flex-1 bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
              <button
                onClick={handleAsk}
                disabled={!query.trim() || isLoading}
                className="px-5 py-3 bg-[#6c5ce7] text-white rounded-xl font-medium hover:bg-[#5b4bd6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {isLoading && (
              <div className="mt-4 flex items-center gap-2 text-gray-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Pensando...
              </div>
            )}

            {aiResponse && (
              <div className="mt-4 bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl p-4">
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                    {aiResponse}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Static Guide */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Guia por Tipo de Restaurante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESTAURANT_GUIDE.map((restaurant, index) => (
                <div
                  key={index}
                  className="bg-[#12121a] border border-[#1a1a2e] rounded-xl p-5 hover:border-[#2a2a3e] transition-colors"
                >
                  <h3 className="text-lg font-bold text-[#6c5ce7] mb-3">
                    {restaurant.category}
                  </h3>
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-[#00d2d3] uppercase tracking-wide mb-2">
                      Consejos
                    </h4>
                    <p className="text-gray-400 text-sm">{restaurant.tips}</p>
                  </div>
                  <div className="bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg p-3">
                    <p className="text-xs font-semibold text-[#fdcb6e] uppercase tracking-wide mb-1">
                      Pedido Recomendado
                    </p>
                    <p className="text-gray-300 text-sm">{restaurant.order}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
