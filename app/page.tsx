'use client';

import Link from 'next/link';
import { Camera, Search, ChefHat, CalendarDays, UtensilsCrossed, Pill, Target, FlaskConical, ArrowRight, Flame, Droplets, Dumbbell, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const quickActions = [
  {
    href: '/scanner',
    icon: Camera,
    title: 'Scanner de Comida',
    description: 'Analiza con IA cualquier comida',
    gradient: 'from-[#6c5ce7]/20 to-[#6c5ce7]/5',
    iconColor: 'text-[#6c5ce7]',
    iconBg: 'bg-[#6c5ce7]/15',
  },
  {
    href: '/alimentos',
    icon: Search,
    title: 'Buscar Alimentos',
    description: '300+ alimentos clasificados',
    gradient: 'from-[#00b894]/20 to-[#00b894]/5',
    iconColor: 'text-[#00b894]',
    iconBg: 'bg-[#00b894]/15',
  },
  {
    href: '/recetas',
    icon: ChefHat,
    title: 'Recetas',
    description: 'Recetas anti-inflamatorias',
    gradient: 'from-[#00d2d3]/20 to-[#00d2d3]/5',
    iconColor: 'text-[#00d2d3]',
    iconBg: 'bg-[#00d2d3]/15',
  },
  {
    href: '/planificador',
    icon: CalendarDays,
    title: 'Planificador',
    description: 'Planifica tu semana',
    gradient: 'from-[#fdcb6e]/20 to-[#fdcb6e]/5',
    iconColor: 'text-[#fdcb6e]',
    iconBg: 'bg-[#fdcb6e]/15',
  },
];

const secondaryLinks = [
  { href: '/restaurante', icon: UtensilsCrossed, label: 'Comer Fuera', color: 'text-[#e17055]', bg: 'bg-[#e17055]/10' },
  { href: '/suplementos', icon: Pill, label: 'Suplementos', color: 'text-[#a29bfe]', bg: 'bg-[#a29bfe]/10' },
  { href: '/ciencia', icon: FlaskConical, label: 'Ciencia', color: 'text-[#74b9ff]', bg: 'bg-[#74b9ff]/10' },
  { href: '/objetivos', icon: Target, label: 'Objetivos', color: 'text-[#fd79a8]', bg: 'bg-[#fd79a8]/10' },
];

const macros = {
  rest: { kcal: 2000, protein: 170, carbs: 140, fat: 84, deficit: -650 },
  train: { kcal: 2300, protein: 173, carbs: 259, fat: 64, deficit: -350 },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Badge variant="secondary" className="mb-4 text-primary border-primary/20 bg-primary/10">
            Plan Anti-inflamatorio
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Hola, Diego
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg">
            Tu centro de control nutricional. Usa las herramientas de abajo para tu dia a dia.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Objetivo', value: '2.000-2.300', unit: 'kcal', icon: Flame, color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10' },
            { label: 'Proteina', value: '170g', unit: 'diario', icon: Dumbbell, color: 'text-[#10b981]', bg: 'bg-[#10b981]/10' },
            { label: 'Deficit', value: '-500', unit: 'kcal/dia', icon: TrendingDown, color: 'text-[#e17055]', bg: 'bg-[#e17055]/10' },
            { label: 'Agua', value: '3.5L', unit: 'diario', icon: Droplets, color: 'text-[#74b9ff]', bg: 'bg-[#74b9ff]/10' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md ${stat.bg}`}>
                      <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                  </div>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground">{stat.unit}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Acciones Rapidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <Card className={`group cursor-pointer border-border/50 hover:border-border transition-all bg-gradient-to-br ${action.gradient}`}>
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className={`p-2.5 rounded-xl ${action.iconBg} shrink-0`}>
                        <Icon className={`w-5 h-5 ${action.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Macros Summary */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Resumen de Macros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Dia de Descanso', emoji: '🏖️', data: macros.rest },
              { label: 'Dia de Entrenamiento', emoji: '🏋️', data: macros.train },
            ].map((day) => (
              <Card key={day.label} className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <span>{day.emoji}</span> {day.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2.5">
                  {[
                    { label: 'Calorias', value: `${day.data.kcal} kcal`, color: 'text-foreground' },
                    { label: 'Proteina', value: `${day.data.protein}g`, color: 'text-[#10b981]' },
                    { label: 'Carbohidratos', value: `${day.data.carbs}g`, color: 'text-[#3b82f6]' },
                    { label: 'Grasas', value: `${day.data.fat}g`, color: 'text-[#eab308]' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className={`font-semibold ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Deficit</span>
                    <span className="font-semibold text-[#e17055]">{day.data.deficit} kcal</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Secondary Links */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Mas Secciones</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {secondaryLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Card className="group cursor-pointer border-border/50 hover:border-border transition-all">
                    <CardContent className="flex flex-col items-center gap-2 p-4">
                      <div className={`p-2 rounded-lg ${link.bg}`}>
                        <Icon className={`w-4 h-4 ${link.color}`} />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {link.label}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Protocol Reminder */}
        <Card className="border-border/50 bg-gradient-to-br from-[#00b894]/5 to-[#6c5ce7]/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Recordatorio del Protocolo</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <Badge variant="secondary" className="bg-[#00b894]/15 text-[#00b894] border-[#00b894]/20 mb-2">
                  Priorizar
                </Badge>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Pescado graso, AOVE, verduras verdes, curcuma, frutos secos
                </p>
              </div>
              <div>
                <Badge variant="secondary" className="bg-[#fdcb6e]/15 text-[#fdcb6e] border-[#fdcb6e]/20 mb-2">
                  Moderar
                </Badge>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Carne roja grass-fed, lacteos, cafe, gluten
                </p>
              </div>
              <div>
                <Badge variant="secondary" className="bg-[#d63031]/15 text-[#d63031] border-[#d63031]/20 mb-2">
                  Evitar
                </Badge>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Ultra procesados, aceites de semilla, azucar, frituras
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
