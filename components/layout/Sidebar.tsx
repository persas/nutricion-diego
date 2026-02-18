'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Camera, Apple, ChefHat, CalendarDays,
  UtensilsCrossed, Pill, FlaskConical, Target, Lock, ShieldCheck, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/components/providers/AdminProvider';

const mainNav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/scanner', label: 'Scanner', icon: Camera },
  { href: '/alimentos', label: 'Alimentos', icon: Apple },
  { href: '/recetas', label: 'Recetas', icon: ChefHat },
  { href: '/planificador', label: 'Planificador', icon: CalendarDays },
  { href: '/restaurante', label: 'Comer Fuera', icon: UtensilsCrossed },
];

const secondaryNav = [
  { href: '/suplementos', label: 'Suplementos', icon: Pill },
  { href: '/ciencia', label: 'Ciencia', icon: FlaskConical },
  { href: '/objetivos', label: 'Objetivos', icon: Target },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isAdmin, isLoading: adminLoading, login, logout } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoginLoading(true);
    setLoginError(false);
    const success = await login(password);
    if (success) {
      setShowLogin(false);
      setPassword('');
    } else {
      setLoginError(true);
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    setShowLogin(false);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside className="hidden md:flex flex-col w-[220px] border-r border-border bg-sidebar h-screen shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-bold text-sm">N</span>
        </div>
        <div>
          <h1 className="text-sm font-bold text-foreground tracking-tight">
            NutriTrack
          </h1>
          <p className="text-[10px] text-muted-foreground leading-none">
            Anti-inflamatorio
          </p>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-3">
        <div className="space-y-1">
          <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Principal
          </p>
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Button
                key={item.href}
                variant={active ? 'secondary' : 'ghost'}
                size="sm"
                className={cn(
                  'w-full justify-start gap-2.5 h-9 text-[13px] font-medium',
                  active
                    ? 'bg-primary/15 text-primary hover:bg-primary/20 border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>

        <Separator className="my-3" />

        <div className="space-y-1">
          <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Referencia
          </p>
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Button
                key={item.href}
                variant={active ? 'secondary' : 'ghost'}
                size="sm"
                className={cn(
                  'w-full justify-start gap-2.5 h-8 text-xs font-medium',
                  active
                    ? 'bg-primary/15 text-primary hover:bg-primary/20 border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#00b894]/20 flex items-center justify-center text-xs font-bold text-[#00b894]">
            D
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Diego</p>
            <p className="text-[10px] text-muted-foreground">Protocolo Psoriasis</p>
          </div>
          {!adminLoading && (
            <button
              onClick={() => isAdmin ? handleLogout() : setShowLogin(!showLogin)}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                isAdmin
                  ? 'text-[#00b894] hover:bg-[#00b894]/15'
                  : 'text-muted-foreground hover:bg-muted'
              )}
              title={isAdmin ? 'Admin activo — click para cerrar sesion' : 'Login admin'}
            >
              {isAdmin ? <ShieldCheck className="size-4" /> : <Lock className="size-4" />}
            </button>
          )}
        </div>

        {/* Inline login form */}
        {showLogin && !isAdmin && (
          <form onSubmit={handleLogin} className="space-y-1.5">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
              disabled={loginLoading}
              className="h-7 text-xs"
              autoFocus
            />
            {loginError && (
              <p className="text-destructive text-[10px]">Password incorrecto</p>
            )}
            <Button type="submit" size="sm" className="w-full h-7 text-xs" disabled={loginLoading || !password.trim()}>
              {loginLoading ? <Loader2 className="size-3 animate-spin" /> : 'Entrar'}
            </Button>
          </form>
        )}
      </div>
    </aside>
  );
}
