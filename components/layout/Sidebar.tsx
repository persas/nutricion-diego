'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/alimentos', label: 'Alimentos', icon: '🥗' },
  { href: '/planificador', label: 'Planificador', icon: '📋' },
  { href: '/recetas', label: 'Recetas', icon: '👨‍🍳' },
  { href: '/restaurante', label: 'Comer Fuera', icon: '🍽️' },
  { href: '/suplementos', label: 'Suplementos', icon: '💊' },
  { href: '/ciencia', label: 'Ciencia', icon: '🧬' },
  { href: '/objetivos', label: 'Objetivos', icon: '🎯' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[#12121a] border border-[#1a1a2e]"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-60 bg-[#12121a] border-r border-[#1a1a2e] z-40 transition-transform md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              <span className="text-white">Nutrición</span>
              <span className="text-[#00b894]">.</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.href)
                    ? 'bg-[#6c5ce7] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a2e]'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer Text */}
          <div className="pt-6 border-t border-[#1a1a2e]">
            <p className="text-xs text-gray-500 text-center">
              Plan Anti-inflamatorio · Psoriasis
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
