'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Camera, Apple, ChefHat, CalendarDays } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Inicio', icon: LayoutDashboard },
  { href: '/scanner', label: 'Scanner', icon: Camera },
  { href: '/alimentos', label: 'Alimentos', icon: Apple },
  { href: '/recetas', label: 'Recetas', icon: ChefHat },
  { href: '/planificador', label: 'Plan', icon: CalendarDays },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#12121a] border-t border-[#1a1a2e]">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-[#6c5ce7]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
