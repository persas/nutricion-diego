'use client';

import { useState } from 'react';
import { Send, Loader2, Utensils, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { RESTAURANT_GUIDE } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Utensils className="size-7 text-[#6c5ce7]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Guia para Comer Fuera
            </h1>
          </div>
          <p className="text-muted-foreground ml-10">
            Estrategias para mantener tu protocolo en cualquier restaurante
          </p>
        </div>
      </section>

      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* AI Assistant */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-[#6c5ce7]" />
                <CardTitle className="text-lg">Asistente de Restaurante</CardTitle>
              </div>
              <p className="text-muted-foreground text-sm">
                Describe el restaurante o el menu y te digo que pedir
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleAsk()}
                  placeholder='ej: "Restaurante italiano, tienen pasta, pizza, ensaladas y carne"'
                  className="h-11 flex-1"
                />
                <Button
                  onClick={handleAsk}
                  disabled={!query.trim() || isLoading}
                  size="lg"
                  className="bg-[#6c5ce7] hover:bg-[#5b4bd6] text-white px-5"
                >
                  {isLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Send className="size-5" />
                  )}
                </Button>
              </div>

              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="size-4 animate-spin" />
                  Pensando...
                </div>
              )}

              {aiResponse && (
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="prose prose-invert prose-sm max-w-none text-foreground/80">
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Static Guide */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Guia por Tipo de Restaurante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESTAURANT_GUIDE.map((restaurant, index) => (
                <Card
                  key={index}
                  className="transition-colors hover:border-[#6c5ce7]/40"
                >
                  <CardHeader className="pb-0">
                    <CardTitle className="text-lg text-[#6c5ce7]">
                      {restaurant.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-[#00d2d3] uppercase tracking-wide mb-2">
                        Consejos
                      </h4>
                      <p className="text-muted-foreground text-sm">{restaurant.tips}</p>
                    </div>
                    <Separator />
                    <div className="rounded-lg border border-border bg-muted/50 p-3">
                      <p className="text-xs font-semibold text-[#fdcb6e] uppercase tracking-wide mb-1">
                        Pedido Recomendado
                      </p>
                      <p className="text-foreground/80 text-sm">{restaurant.order}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
