'use client';

import React, { useState, useMemo } from 'react';
import './page.css';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Ingredient {
  n: string;
  q: number;
  u: string;
  cat: string;
}

interface Meal {
  id: string;
  name: string;
  tags: string[];
  kcal: number;
  p: number;
  c: number;
  f: number;
  desc?: string;
  ingredients: Ingredient[];
}

interface DaySchedule {
  kcal: number;
  deficit: number;
  p: number;
  pPct: number;
  c: number;
  cPct: number;
  f: number;
  fPct: number;
}

interface FoodCategory {
  title: string;
  icon: string;
  items: string[];
  className: string;
}

interface RestaurantGuide {
  emoji: string;
  name: string;
  dos: string[];
  donts: string[];
}

interface Supplement {
  name: string;
  dose: string;
  when: string;
  priority: string;
  evidence: string;
}

interface Target {
  weeks: string;
  goals: string[];
}

interface CustomRecipe {
  id: string;
  name: string;
  desc: string;
  kcal: number;
  p: number;
  c: number;
  f: number;
  tags: string[];
  warning: string;
  ingredients: Ingredient[];
}

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const tagLabels: Record<string, string> = {
  anti: 'Anti-inflam.',
  omega: 'Omega-3',
  gut: 'Salud intestinal',
  quick: 'Rápido',
};

const tagClass: Record<string, string> = {
  anti: 'anti',
  omega: 'omega',
  gut: 'gut',
  quick: 'quick',
};

const catIcons: Record<string, string> = {
  Pescados: '🐟',
  Carnes: '🍗',
  'Verduras y frutas': '🥬',
  'Cereales y legumbres': '🫘',
  'Lácteos y huevos': '🥚',
  'Frutos secos y semillas': '🥜',
  'Aceites y condimentos': '🫒',
  Suplementos: '💊',
};

const catOrder = [
  'Pescados',
  'Carnes',
  'Lácteos y huevos',
  'Verduras y frutas',
  'Cereales y legumbres',
  'Frutos secos y semillas',
  'Aceites y condimentos',
  'Suplementos',
];

// LUNCHES (12 meals)
const lunches: Meal[] = [
  {
    id: 'l1',
    name: 'Salmón a la plancha con arroz integral',
    tags: ['omega', 'anti'],
    kcal: 810,
    p: 52,
    c: 62,
    f: 38,
    desc: 'Salmón, arroz integral, ensalada de espinacas con aguacate y AOVE',
    ingredients: [
      { n: 'Salmón fresco', q: 200, u: 'g', cat: 'Pescados' },
      { n: 'Arroz integral', q: 80, u: 'g (seco)', cat: 'Cereales y legumbres' },
      { n: 'Espinacas frescas', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aguacate', q: 80, u: 'g (medio)', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
      { n: 'Nueces', q: 15, u: 'g', cat: 'Frutos secos y semillas' },
    ],
  },
  {
    id: 'l2',
    name: 'Bowl de quinoa con pollo y aguacate',
    tags: ['anti'],
    kcal: 790,
    p: 55,
    c: 65,
    f: 32,
    desc: 'Quinoa, pechuga de pollo, aguacate, verduras asadas, semillas de lino',
    ingredients: [
      { n: 'Quinoa', q: 80, u: 'g (seca)', cat: 'Cereales y legumbres' },
      { n: 'Pechuga de pollo', q: 200, u: 'g', cat: 'Carnes' },
      { n: 'Aguacate', q: 80, u: 'g (medio)', cat: 'Verduras y frutas' },
      { n: 'Calabacín', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Zanahoria', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Cebolla', q: 50, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Semillas de lino molidas', q: 10, u: 'g', cat: 'Frutos secos y semillas' },
      { n: 'Aceite de oliva virgen extra', q: 10, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'l3',
    name: 'Sardinas con ensalada de garbanzos',
    tags: ['omega', 'gut'],
    kcal: 780,
    p: 48,
    c: 52,
    f: 40,
    desc: 'Sardinas en AOVE, garbanzos, rúcula, tomate cherry, pepino, limón',
    ingredients: [
      { n: 'Sardinas en aceite de oliva (latas)', q: 2, u: 'latas (80g c/u)', cat: 'Pescados' },
      { n: 'Garbanzos cocidos', q: 150, u: 'g', cat: 'Cereales y legumbres' },
      { n: 'Rúcula', q: 60, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Tomate cherry', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Pepino', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 10, u: 'ml', cat: 'Aceites y condimentos' },
      { n: 'Limón', q: 1, u: 'ud', cat: 'Verduras y frutas' },
    ],
  },
  {
    id: 'l4',
    name: 'Lentejas estofadas con verduras',
    tags: ['gut', 'anti'],
    kcal: 750,
    p: 42,
    c: 82,
    f: 22,
    desc: 'Lentejas con zanahoria, pimiento, cebolla, ajo, cúrcuma, AOVE',
    ingredients: [
      { n: 'Lentejas', q: 100, u: 'g (secas)', cat: 'Cereales y legumbres' },
      { n: 'Zanahoria', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Cebolla', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ajo', q: 2, u: 'dientes', cat: 'Verduras y frutas' },
      { n: 'Cúrcuma en polvo', q: 3, u: 'g', cat: 'Aceites y condimentos' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'l5',
    name: 'Poke bowl de salmón',
    tags: ['omega', 'quick'],
    kcal: 820,
    p: 48,
    c: 72,
    f: 36,
    desc: 'Arroz integral, salmón crudo, aguacate, edamame, alga, sésamo',
    ingredients: [
      { n: 'Salmón fresco (sashimi)', q: 150, u: 'g', cat: 'Pescados' },
      { n: 'Arroz integral', q: 80, u: 'g (seco)', cat: 'Cereales y legumbres' },
      { n: 'Aguacate', q: 80, u: 'g (medio)', cat: 'Verduras y frutas' },
      { n: 'Edamame', q: 60, u: 'g', cat: 'Cereales y legumbres' },
      { n: 'Alga wakame', q: 10, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Semillas de sésamo', q: 5, u: 'g', cat: 'Frutos secos y semillas' },
      { n: 'Salsa soja baja en sodio', q: 10, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'l6',
    name: 'Revuelto de huevos con boniato y espinacas',
    tags: ['anti'],
    kcal: 760,
    p: 42,
    c: 58,
    f: 38,
    desc: '3 huevos + 1 clara, boniato asado, espinacas, aguacate',
    ingredients: [
      { n: 'Huevos', q: 3, u: 'ud', cat: 'Lácteos y huevos' },
      { n: 'Clara de huevo', q: 1, u: 'ud', cat: 'Lácteos y huevos' },
      { n: 'Boniato', q: 200, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Espinacas frescas', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aguacate', q: 60, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Pan integral', q: 1, u: 'rebanada', cat: 'Cereales y legumbres' },
      { n: 'Aceite de oliva virgen extra', q: 10, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'l7',
    name: 'Caballa al horno con patata y brócoli',
    tags: ['omega', 'anti'],
    kcal: 790,
    p: 50,
    c: 55,
    f: 40,
    desc: 'Caballa con limón y hierbas, patata al horno, brócoli al vapor',
    ingredients: [
      { n: 'Caballa fresca', q: 250, u: 'g', cat: 'Pescados' },
      { n: 'Patata', q: 200, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Brócoli', q: 150, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Limón', q: 1, u: 'ud', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 10, u: 'ml', cat: 'Aceites y condimentos' },
      { n: 'Ajo', q: 2, u: 'dientes', cat: 'Verduras y frutas' },
    ],
  },
  {
    id: 'l8',
    name: 'Ensalada templada de pollo con quinoa',
    tags: ['anti', 'quick'],
    kcal: 770,
    p: 55,
    c: 56,
    f: 34,
    desc: 'Pollo a la plancha, quinoa, espinacas, nueces, arándanos',
    ingredients: [
      { n: 'Pechuga de pollo', q: 200, u: 'g', cat: 'Carnes' },
      { n: 'Quinoa', q: 60, u: 'g (seca)', cat: 'Cereales y legumbres' },
      { n: 'Espinacas frescas', q: 60, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Nueces', q: 20, u: 'g', cat: 'Frutos secos y semillas' },
      { n: 'Arándanos', q: 50, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'l9',
    name: 'Guiso de garbanzos con espinacas y cúrcuma',
    tags: ['gut', 'anti'],
    kcal: 740,
    p: 38,
    c: 78,
    f: 26,
    desc: 'Garbanzos con espinacas, tomate, cebolla, ajo, cúrcuma',
    ingredients: [
      { n: 'Garbanzos cocidos', q: 200, u: 'g', cat: 'Cereales y legumbres' },
      { n: 'Espinacas frescas', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Tomate triturado', q: 150, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Cebolla', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ajo', q: 3, u: 'dientes', cat: 'Verduras y frutas' },
      { n: 'Cúrcuma en polvo', q: 3, u: 'g', cat: 'Aceites y condimentos' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'l10',
    name: 'Dorada al horno con verduras asadas',
    tags: ['anti'],
    kcal: 720,
    p: 52,
    c: 42,
    f: 36,
    desc: 'Dorada entera al horno con calabacín, cebolla, boniato',
    ingredients: [
      { n: 'Dorada fresca', q: 300, u: 'g (entera)', cat: 'Pescados' },
      { n: 'Calabacín', q: 120, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Cebolla', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Boniato', q: 120, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
      { n: 'Limón', q: 1, u: 'ud', cat: 'Verduras y frutas' },
    ],
  },
  {
    id: 'l11',
    name: 'Bowl de arroz con atún y aguacate',
    tags: ['omega', 'quick'],
    kcal: 800,
    p: 50,
    c: 68,
    f: 34,
    desc: 'Arroz integral, atún fresco a la plancha, aguacate, pepino',
    ingredients: [
      { n: 'Atún fresco', q: 180, u: 'g', cat: 'Pescados' },
      { n: 'Arroz integral', q: 80, u: 'g (seco)', cat: 'Cereales y legumbres' },
      { n: 'Aguacate', q: 80, u: 'g (medio)', cat: 'Verduras y frutas' },
      { n: 'Pepino', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Semillas de sésamo', q: 5, u: 'g', cat: 'Frutos secos y semillas' },
      { n: 'Salsa soja baja en sodio', q: 10, u: 'ml', cat: 'Aceites y condimentos' },
      { n: 'Jengibre fresco', q: 5, u: 'g', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'l12',
    name: 'Crema de lentejas rojas con huevo cocido',
    tags: ['gut'],
    kcal: 730,
    p: 44,
    c: 70,
    f: 28,
    desc: 'Crema de lentejas rojas con cebolla, ajo, jengibre, cúrcuma + 2 huevos cocidos',
    ingredients: [
      { n: 'Lentejas rojas', q: 100, u: 'g (secas)', cat: 'Cereales y legumbres' },
      { n: 'Huevos', q: 2, u: 'ud', cat: 'Lácteos y huevos' },
      { n: 'Cebolla', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ajo', q: 2, u: 'dientes', cat: 'Verduras y frutas' },
      { n: 'Jengibre fresco', q: 5, u: 'g', cat: 'Aceites y condimentos' },
      { n: 'Cúrcuma en polvo', q: 3, u: 'g', cat: 'Aceites y condimentos' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
];

// DINNERS (12 meals)
const dinners: Meal[] = [
  {
    id: 'd1',
    name: 'Pollo a la plancha con brócoli y boniato',
    tags: ['anti'],
    kcal: 780,
    p: 58,
    c: 62,
    f: 30,
    desc: '',
    ingredients: [
      { n: 'Pechuga de pollo', q: 220, u: 'g', cat: 'Carnes' },
      { n: 'Boniato', q: 200, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Brócoli', q: 180, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ajo', q: 2, u: 'dientes', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 12, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'd2',
    name: 'Merluza al horno con coliflor asada',
    tags: ['anti'],
    kcal: 680,
    p: 52,
    c: 38,
    f: 34,
    desc: '',
    ingredients: [
      { n: 'Merluza fresca', q: 250, u: 'g', cat: 'Pescados' },
      { n: 'Coliflor', q: 200, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aguacate', q: 60, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Cúrcuma en polvo', q: 2, u: 'g', cat: 'Aceites y condimentos' },
      { n: 'Ajo', q: 2, u: 'dientes', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
      { n: 'Limón', q: 1, u: 'ud', cat: 'Verduras y frutas' },
    ],
  },
  {
    id: 'd3',
    name: 'Salmón al horno con quinoa y judías verdes',
    tags: ['omega', 'anti'],
    kcal: 820,
    p: 54,
    c: 58,
    f: 40,
    desc: '',
    ingredients: [
      { n: 'Salmón fresco', q: 200, u: 'g', cat: 'Pescados' },
      { n: 'Quinoa', q: 70, u: 'g (seca)', cat: 'Cereales y legumbres' },
      { n: 'Judías verdes', q: 150, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 12, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'd4',
    name: 'Tortilla de espinacas con ensalada',
    tags: ['quick'],
    kcal: 710,
    p: 44,
    c: 32,
    f: 44,
    desc: '',
    ingredients: [
      { n: 'Huevos', q: 3, u: 'ud', cat: 'Lácteos y huevos' },
      { n: 'Clara de huevo', q: 1, u: 'ud', cat: 'Lácteos y huevos' },
      { n: 'Espinacas frescas', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ensalada mezclum', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aguacate', q: 80, u: 'g (medio)', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'd5',
    name: 'Lubina a la plancha con verduras salteadas',
    tags: ['anti'],
    kcal: 700,
    p: 52,
    c: 35,
    f: 36,
    desc: '',
    ingredients: [
      { n: 'Lubina fresca', q: 250, u: 'g', cat: 'Pescados' },
      { n: 'Calabacín', q: 120, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Champiñones', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Espinacas frescas', q: 60, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
      { n: 'Ajo', q: 2, u: 'dientes', cat: 'Verduras y frutas' },
    ],
  },
  {
    id: 'd6',
    name: 'Pollo al curry de cúrcuma con arroz integral',
    tags: ['anti', 'gut'],
    kcal: 800,
    p: 56,
    c: 72,
    f: 28,
    desc: '',
    ingredients: [
      { n: 'Pechuga de pollo', q: 200, u: 'g', cat: 'Carnes' },
      { n: 'Arroz integral', q: 80, u: 'g (seco)', cat: 'Cereales y legumbres' },
      { n: 'Leche de coco light', q: 80, u: 'ml', cat: 'Aceites y condimentos' },
      { n: 'Cúrcuma en polvo', q: 4, u: 'g', cat: 'Aceites y condimentos' },
      { n: 'Jengibre fresco', q: 5, u: 'g', cat: 'Aceites y condimentos' },
      { n: 'Cebolla', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ajo', q: 2, u: 'dientes', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 10, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'd7',
    name: 'Sardinas al horno con ensalada mediterránea',
    tags: ['omega', 'gut'],
    kcal: 750,
    p: 46,
    c: 40,
    f: 44,
    desc: '',
    ingredients: [
      { n: 'Sardinas frescas', q: 300, u: 'g', cat: 'Pescados' },
      { n: 'Tomate', q: 120, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Pepino', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Cebolla', q: 50, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aceitunas negras', q: 30, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'd8',
    name: 'Pavo a la plancha con boniato y kale',
    tags: ['anti'],
    kcal: 760,
    p: 56,
    c: 60,
    f: 30,
    desc: '',
    ingredients: [
      { n: 'Pechuga de pavo', q: 220, u: 'g', cat: 'Carnes' },
      { n: 'Boniato', q: 200, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Kale', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ajo', q: 2, u: 'dientes', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 12, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'd9',
    name: 'Bacalao con garbanzos y espinacas',
    tags: ['anti', 'gut'],
    kcal: 740,
    p: 50,
    c: 55,
    f: 32,
    desc: '',
    ingredients: [
      { n: 'Bacalao fresco', q: 220, u: 'g', cat: 'Pescados' },
      { n: 'Garbanzos cocidos', q: 150, u: 'g', cat: 'Cereales y legumbres' },
      { n: 'Espinacas frescas', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ajo', q: 3, u: 'dientes', cat: 'Verduras y frutas' },
      { n: 'Cúrcuma en polvo', q: 2, u: 'g', cat: 'Aceites y condimentos' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'd10',
    name: 'Revuelto de huevos con champiñones y aguacate',
    tags: ['quick'],
    kcal: 720,
    p: 40,
    c: 28,
    f: 48,
    desc: '',
    ingredients: [
      { n: 'Huevos', q: 3, u: 'ud', cat: 'Lácteos y huevos' },
      { n: 'Champiñones', q: 120, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Espinacas frescas', q: 60, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Aguacate', q: 120, u: 'g (entero)', cat: 'Verduras y frutas' },
      { n: 'Pan integral', q: 1, u: 'rebanada', cat: 'Cereales y legumbres' },
      { n: 'Aceite de oliva virgen extra', q: 10, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'd11',
    name: 'Caballa con ensalada y boniato',
    tags: ['omega', 'anti'],
    kcal: 800,
    p: 48,
    c: 56,
    f: 42,
    desc: '',
    ingredients: [
      { n: 'Caballa fresca', q: 250, u: 'g', cat: 'Pescados' },
      { n: 'Boniato', q: 180, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ensalada mezclum', q: 80, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Nueces', q: 15, u: 'g', cat: 'Frutos secos y semillas' },
      { n: 'Aceite de oliva virgen extra', q: 15, u: 'ml', cat: 'Aceites y condimentos' },
    ],
  },
  {
    id: 'd12',
    name: 'Gambas al ajillo con quinoa y brócoli',
    tags: ['anti'],
    kcal: 740,
    p: 52,
    c: 54,
    f: 32,
    desc: '',
    ingredients: [
      { n: 'Gambas peladas', q: 250, u: 'g', cat: 'Pescados' },
      { n: 'Quinoa', q: 70, u: 'g (seca)', cat: 'Cereales y legumbres' },
      { n: 'Brócoli', q: 180, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Ajo', q: 4, u: 'dientes', cat: 'Verduras y frutas' },
      { n: 'Aceite de oliva virgen extra', q: 20, u: 'ml', cat: 'Aceites y condimentos' },
      { n: 'Guindilla', q: 1, u: 'ud (opcional)', cat: 'Aceites y condimentos' },
    ],
  },
];

// SNACKS (10 meals)
const snacks: Meal[] = [
  {
    id: 's1',
    name: 'Yogur griego con arándanos y nueces',
    tags: ['gut'],
    kcal: 310,
    p: 22,
    c: 26,
    f: 14,
    desc: '',
    ingredients: [
      { n: 'Yogur griego natural', q: 200, u: 'g', cat: 'Lácteos y huevos' },
      { n: 'Arándanos', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Nueces', q: 20, u: 'g', cat: 'Frutos secos y semillas' },
    ],
  },
  {
    id: 's2',
    name: 'Hummus con crudités',
    tags: ['gut', 'quick'],
    kcal: 280,
    p: 14,
    c: 28,
    f: 14,
    desc: '',
    ingredients: [
      { n: 'Hummus', q: 100, u: 'g', cat: 'Cereales y legumbres' },
      { n: 'Zanahoria', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Pepino', q: 80, u: 'g', cat: 'Verduras y frutas' },
    ],
  },
  {
    id: 's3',
    name: 'Manzana con crema de almendras',
    tags: ['quick'],
    kcal: 290,
    p: 8,
    c: 34,
    f: 16,
    desc: '',
    ingredients: [
      { n: 'Manzana', q: 1, u: 'ud', cat: 'Verduras y frutas' },
      { n: 'Crema de almendras', q: 20, u: 'g', cat: 'Frutos secos y semillas' },
    ],
  },
  {
    id: 's4',
    name: 'Batido proteico verde',
    tags: ['anti'],
    kcal: 320,
    p: 30,
    c: 30,
    f: 8,
    desc: '',
    ingredients: [
      { n: 'Proteína whey', q: 30, u: 'g (1 scoop)', cat: 'Suplementos' },
      { n: 'Plátano', q: 1, u: 'ud', cat: 'Verduras y frutas' },
      { n: 'Espinacas frescas', q: 40, u: 'g', cat: 'Verduras y frutas' },
    ],
  },
  {
    id: 's5',
    name: 'Almendras con fruta de temporada',
    tags: ['quick'],
    kcal: 270,
    p: 10,
    c: 24,
    f: 16,
    desc: '',
    ingredients: [
      { n: 'Almendras crudas', q: 30, u: 'g', cat: 'Frutos secos y semillas' },
      { n: 'Fruta de temporada', q: 1, u: 'pieza', cat: 'Verduras y frutas' },
    ],
  },
  {
    id: 's6',
    name: 'Tostada de aguacate con semillas',
    tags: ['anti'],
    kcal: 310,
    p: 10,
    c: 28,
    f: 20,
    desc: '',
    ingredients: [
      { n: 'Pan integral', q: 1, u: 'rebanada', cat: 'Cereales y legumbres' },
      { n: 'Aguacate', q: 80, u: 'g (medio)', cat: 'Verduras y frutas' },
      { n: 'Semillas de chía', q: 8, u: 'g', cat: 'Frutos secos y semillas' },
    ],
  },
  {
    id: 's7',
    name: 'Kéfir con moras y semillas de lino',
    tags: ['gut'],
    kcal: 280,
    p: 16,
    c: 28,
    f: 12,
    desc: '',
    ingredients: [
      { n: 'Kéfir natural', q: 200, u: 'ml', cat: 'Lácteos y huevos' },
      { n: 'Moras / Frambuesas', q: 100, u: 'g', cat: 'Verduras y frutas' },
      { n: 'Semillas de lino molidas', q: 10, u: 'g', cat: 'Frutos secos y semillas' },
    ],
  },
  {
    id: 's8',
    name: 'Dátiles con nueces',
    tags: ['quick'],
    kcal: 260,
    p: 6,
    c: 38,
    f: 12,
    desc: '',
    ingredients: [
      { n: 'Dátiles medjool', q: 3, u: 'ud', cat: 'Verduras y frutas' },
      { n: 'Nueces', q: 15, u: 'g', cat: 'Frutos secos y semillas' },
    ],
  },
  {
    id: 's9',
    name: 'Huevos cocidos con zanahoria',
    tags: ['quick'],
    kcal: 260,
    p: 18,
    c: 12,
    f: 14,
    desc: '',
    ingredients: [
      { n: 'Huevos', q: 2, u: 'ud', cat: 'Lácteos y huevos' },
      { n: 'Zanahoria', q: 120, u: 'g', cat: 'Verduras y frutas' },
    ],
  },
  {
    id: 's10',
    name: 'Yogur griego con semillas y naranja',
    tags: ['gut'],
    kcal: 300,
    p: 20,
    c: 30,
    f: 12,
    desc: '',
    ingredients: [
      { n: 'Yogur griego natural', q: 200, u: 'g', cat: 'Lácteos y huevos' },
      { n: 'Naranja', q: 1, u: 'ud', cat: 'Verduras y frutas' },
      { n: 'Semillas de lino molidas', q: 10, u: 'g', cat: 'Frutos secos y semillas' },
    ],
  },
];

// Food categories (Tab 2: Alimentos)
const foodCategories: FoodCategory[] = [
  {
    title: 'Excelente',
    icon: '✓',
    className: 'cat-supergreen',
    items: [
      'Salmón salvaje 🐟',
      'Sardinas 🐟',
      'Caballa 🐟',
      'AOVE 🫒',
      'Aguacate 🥑',
      'Arándanos 🫐',
      'Brócoli 🥦',
      'Espinacas/Kale 🥬',
      'Nueces 🌰',
      'Lentejas 🫘',
      'Ajo/Cebolla 🧄',
      'Cúrcuma+pimienta 🍵',
      'Jengibre 🫚',
      'Chucrut/Kimchi 🥒',
    ],
  },
  {
    title: 'Bueno',
    icon: '✓',
    className: 'cat-green',
    items: [
      'Pollo/Pavo 🍗',
      'Huevos 🥚',
      'Merluza/Lubina/Dorada 🐟',
      'Boniato 🍠',
      'Arroz integral 🍚',
      'Avena 🥣',
      'Garbanzos 🫘',
      'Quinoa 🥗',
      'Zanahoria 🥕',
      'Naranja 🍊',
      'Almendras 🥜',
      'Semillas chía/lino 🫛',
      'Yogur griego 🥛',
      'Gambas 🦐',
    ],
  },
  {
    title: 'Neutro',
    icon: '○',
    className: 'cat-neutral',
    items: [
      'Pan integral 🍞',
      'Pasta integral 🍝',
      'Patata 🥔',
      'Tomate 🍅',
      'Pimiento 🌶️',
      'Café ☕',
      'Chocolate >85% 🍫',
      'Vino tinto 🍷',
    ],
  },
  {
    title: 'Precaución',
    icon: '!',
    className: 'cat-caution',
    items: [
      'Carne roja 🥩',
      'Leche entera 🥛',
      'Mantequilla 🧈',
      'Pan blanco 🍞',
      'Pizza/Comida rápida 🍕',
      'Cerveza 🍺',
    ],
  },
  {
    title: 'Evitar',
    icon: '✗',
    className: 'cat-avoid',
    items: [
      'Azúcar 🍬',
      'Refrescos 🥤',
      'Aceites de semilla 🌻',
      'Embutidos 🥓',
      'Bollería 🍩',
      'Frituras 🍟',
      'Snacks 🍿',
      'Alcohol exceso 🍸',
    ],
  },
];

// Restaurant guides (Tab 4: Comer Fuera)
const restaurantGuides: RestaurantGuide[] = [
  {
    emoji: '🍣',
    name: 'Japonés/Sushi',
    dos: [
      'Sashimi de salmón o atún',
      'Nigiri (sin salsas pesadas)',
      'Edamame',
      'Ensalada de wakame',
    ],
    donts: [
      'Tempura/Rolls empanados',
      'Salsas dulces (teriyaki)',
      'Rolls con queso crema',
    ],
  },
  {
    emoji: '🥘',
    name: 'Mediterráneo/Español',
    dos: [
      'Pescado a la plancha/horno',
      'Ensaladas con AOVE',
      'Verduras a la parrilla',
      'Gazpacho/Salmorejo',
    ],
    donts: [
      'Frituras en aceite de girasol',
      'Embutidos y quesos curados',
      'Pan blanco',
    ],
  },
  {
    emoji: '🥗',
    name: 'Healthy/Poke/Bowls',
    dos: [
      'Base de arroz integral o quinoa',
      'Proteína: salmón/pollo/tofu',
      'Aguacate/edamame/alga',
      'Aliño AOVE/sésamo',
    ],
    donts: [
      'Salsas cremosas/dulces',
      'Base fideos fritos',
      'Toppings fritos',
    ],
  },
  {
    emoji: '🛒',
    name: 'Mercadona/Preparada',
    dos: [
      'Pechuga de pollo al natural',
      'Ensaladas (sin salsa, usar AOVE)',
      'Hummus+crudités',
      'Salmón ahumado/sardinas lata',
      'Yogur griego natural',
    ],
    donts: [
      'Platos con salsas',
      'Empanadillas/croquetas',
      'Bollería y zumos envasados',
    ],
  },
  {
    emoji: '🍔',
    name: 'Sin otra opción',
    dos: [
      'Hamburguesa sin pan+ensalada',
      'Pollo a la parrilla',
      'Pedir sin salsas',
      'Agua',
    ],
    donts: [
      'Patatas fritas',
      'Refrescos azucarados',
      'Postres',
    ],
  },
  {
    emoji: '🍷',
    name: 'Eventos Sociales',
    dos: [
      '1-2 copas vino tinto max',
      'Picotear aceitunas/frutos secos',
      'Comer proteína antes de ir',
      'Agua entre copas',
    ],
    donts: [
      'Cocktails azucarados',
      'Cerveza (gluten+calorías)',
      'Llegar con hambre',
      'La piel lo nota en 48-72h',
    ],
  },
];

// Supplements (Tab 5: Suplementación)
const supplements: Supplement[] = [
  {
    name: 'Omega-3 (EPA/DHA)',
    dose: '2000mg EPA+DHA',
    when: 'Con comida (almuerzo)',
    priority: 'Crítica',
    evidence: 'Reduce inflamación, mejora ratio omega 3:6',
  },
  {
    name: 'Vitamina D3',
    dose: '2000-4000 IU',
    when: 'Desayuno (con grasa)',
    priority: 'Crítica',
    evidence: 'Deficiencia común en España, inmunidad, inflamación',
  },
  {
    name: 'Cúrcuma (Curcumina)',
    dose: '500-1000mg + pimienta negra',
    when: 'Con comida (almuerzo o cena)',
    priority: 'Alta',
    evidence: 'MEDIPSO trial: -15% inflamación, biodisponibilidad con pimienta',
  },
  {
    name: 'Zinc + Selenio',
    dose: '15-25mg Zn, 200mcg Se',
    when: 'Almuerzo',
    priority: 'Alta',
    evidence: 'Piel, inmunidad, inflamación intestinal',
  },
  {
    name: 'Glutamina',
    dose: '5g',
    when: 'Post-entreno + antes dormir',
    priority: 'Media',
    evidence: 'Salud barrera intestinal, permeabilidad',
  },
  {
    name: 'Probióticos',
    dose: 'CFU 10-50 billones',
    when: 'En ayunas o antes de dormir',
    priority: 'Alta',
    evidence: 'Eje intestino-piel, inflamación sistémica',
  },
  {
    name: 'Fibra soluble (psilio)',
    dose: '5-10g',
    when: 'Noche (disuelto)',
    priority: 'Media',
    evidence: 'Microbiota, triglicéridos, saciedad',
  },
  {
    name: 'Vitamina C',
    dose: '500-1000mg',
    when: 'Desayuno + Almuerzo',
    priority: 'Media',
    evidence: 'Colágeno, inmunidad, antioxidante',
  },
  {
    name: 'Magnesio',
    dose: '300-400mg',
    when: 'Antes de dormir',
    priority: 'Media',
    evidence: 'Sueño, inflamación, recuperación',
  },
  {
    name: 'Inositol + Myo-inositol',
    dose: '2-4g',
    when: 'Con comida',
    priority: 'Media',
    evidence: 'Insulina, PCOS risk, salud reproductiva',
  },
];

// Science tips (Tab 6: Ciencia)
const scienceTips = [
  {
    title: 'MEDIPSO Trial (2024)',
    desc: 'Estudio randomizado sobre psoriasis: curcumina (500mg + pimienta) redujo síntomas 15% más que placebo en 12 semanas.',
  },
  {
    title: 'Déficit Calórico Sostenible',
    desc: 'Perder 0.5kg/semana es óptimo: preserva masa muscular, mantiene metabolismo, evita adaptación.',
  },
  {
    title: 'Eje Intestino-Piel',
    desc: 'Disbacteriosis → Leaky Gut → Inflamación sistémica → Psoriasis/Artritis. Probióticos + fibra son claves.',
  },
  {
    title: 'Ratio Omega-3:6',
    desc: 'Occidentales: 1:15 (proinflamatorio). Objetivo: 1:4 o mejor. Salmón, sardinas, AOVE son claves.',
  },
  {
    title: 'Ayuno Intermitente 16:8',
    desc: 'Autofagia, estabilidad insulínica, reducción inflamación. Compatible con protocolo. Empieza con 13:11.',
  },
  {
    title: 'Alimentos Probióticos',
    desc: 'Fermentados vivos: chucrut, kimchi, kéfir, yogur griego son mejores que suplementos en biodisponibilidad.',
  },
  {
    title: 'Nightshades (Cuidado)',
    desc: 'Tomate, pimiento, patata pueden inflamar en susceptibles. Prueba 2 semanas sin y observa reacción cutánea.',
  },
  {
    title: 'Gluten & Permeabilidad',
    desc: 'Incluso sin celíaca, el gluten (especialmente modernizado) aumenta zonulina → leaky gut. Considera eliminar.',
  },
];

// Targets (Tab 7: Objetivos)
const targets: Target[] = [
  {
    weeks: '1-4',
    goals: [
      'Adaptación al ayuno 16:8 (puedes empezar 14:10)',
      'Incorporar 80% de comidas del plan',
      'Agua 3L+ diarios',
      'Establecer medidas basales (fotos, peso, perímetros)',
    ],
  },
  {
    weeks: '4-8',
    goals: [
      'Pérdida esperada: -2kg',
      'Ajustes de saciedad y energía',
      '90% de comidas del plan',
      'Primeros cambios cutáneos observables',
    ],
  },
  {
    weeks: '8-12',
    goals: [
      'Pérdida esperada: -4kg total',
      'Estabilización de energía, digestión clara',
      'Inflamación articular reducida 30-50%',
      'Retest de suplementación (ajustar dosis)',
    ],
  },
  {
    weeks: 'Mes 4+',
    goals: [
      'Pérdida esperada: -5-7kg a los 4 meses',
      'Síntomas cutáneos muy reducidos',
      'Incorporar "comidas libres" 1-2x/semana',
      'Transición a mantenimiento (2000-2200 kcal)',
    ],
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function NutritionDashboard() {
  // ========== STATE ==========
  const [activeTab, setActiveTab] = useState<string>('macros');
  const [dayType, setDayType] = useState<'rest' | 'train'>('rest');
  const [selectedLunches, setSelectedLunches] = useState<Set<string>>(new Set());
  const [selectedDinners, setSelectedDinners] = useState<Set<string>>(new Set());
  const [selectedSnacks, setSelectedSnacks] = useState<Set<string>>(new Set());
  const [copyStatus, setCopyStatus] = useState<string>('');
  const [customRecipes, setCustomRecipes] = useState<CustomRecipe[]>([]);

  // Add Recipe form state
  const [recipeForm, setRecipeForm] = useState({
    name: '',
    desc: '',
    kcal: '',
    p: '',
    c: '',
    f: '',
    tags: [] as string[],
    warning: 'bueno',
    ingredients: [{ n: '', q: '', u: 'g', cat: 'Verduras y frutas' }] as Array<{
      n: string;
      q: string;
      u: string;
      cat: string;
    }>,
  });
  const [recipeSubmitStatus, setRecipeSubmitStatus] = useState<string>('');

  // ========== HELPER FUNCTIONS ==========

  const toggleMeal = (mealId: string, type: 'lunch' | 'dinner' | 'snack') => {
    if (type === 'lunch') {
      const newSet = new Set(selectedLunches);
      if (newSet.has(mealId)) {
        newSet.delete(mealId);
      } else if (newSet.size < 5) {
        newSet.add(mealId);
      }
      setSelectedLunches(newSet);
    } else if (type === 'dinner') {
      const newSet = new Set(selectedDinners);
      if (newSet.has(mealId)) {
        newSet.delete(mealId);
      } else if (newSet.size < 5) {
        newSet.add(mealId);
      }
      setSelectedDinners(newSet);
    } else {
      const newSet = new Set(selectedSnacks);
      if (newSet.has(mealId)) {
        newSet.delete(mealId);
      } else if (newSet.size < 5) {
        newSet.add(mealId);
      }
      setSelectedSnacks(newSet);
    }
  };

  const generateShoppingList = () => {
    const ingredients: Record<string, Record<string, number>> = {};

    [
      ...lunches.filter((m) => selectedLunches.has(m.id)),
      ...dinners.filter((m) => selectedDinners.has(m.id)),
      ...snacks.filter((m) => selectedSnacks.has(m.id)),
    ].forEach((meal) => {
      meal.ingredients.forEach((ing) => {
        if (!ingredients[ing.cat]) {
          ingredients[ing.cat] = {};
        }
        if (!ingredients[ing.cat][ing.n]) {
          ingredients[ing.cat][ing.n] = 0;
        }
        ingredients[ing.cat][ing.n] += ing.q;
      });
    });

    let text = 'LISTA DE COMPRA\n==================\n\n';
    catOrder.forEach((cat) => {
      if (ingredients[cat]) {
        text += `${catIcons[cat] || ''} ${cat}\n`;
        Object.entries(ingredients[cat]).forEach(([name, qty]) => {
          const sampleMeal = lunches.find((m) => m.ingredients.find((i) => i.n === name));
          const unit = sampleMeal?.ingredients.find((i) => i.n === name)?.u || '';
          text += `  - ${name}: ${qty}${unit}\n`;
        });
        text += '\n';
      }
    });

    return text;
  };

  const copyShoppingList = () => {
    const text = generateShoppingList();
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus('Copiado!');
      setTimeout(() => setCopyStatus(''), 2000);
    });
  };

  const handleRecipeIngredientChange = (
    idx: number,
    field: string,
    value: string | number
  ) => {
    const newIng = [...recipeForm.ingredients];
    newIng[idx] = { ...newIng[idx], [field]: value };
    setRecipeForm({ ...recipeForm, ingredients: newIng });
  };

  const addRecipeIngredient = () => {
    setRecipeForm({
      ...recipeForm,
      ingredients: [
        ...recipeForm.ingredients,
        { n: '', q: '', u: 'g', cat: 'Verduras y frutas' },
      ],
    });
  };

  const removeRecipeIngredient = (idx: number) => {
    const newIng = recipeForm.ingredients.filter((_, i) => i !== idx);
    setRecipeForm({ ...recipeForm, ingredients: newIng });
  };

  const submitRecipe = async () => {
    if (!recipeForm.name.trim()) {
      setRecipeSubmitStatus('error: Nombre obligatorio');
      return;
    }
    if (!recipeForm.kcal || !recipeForm.p || !recipeForm.c || !recipeForm.f) {
      setRecipeSubmitStatus('error: Macros incompletos');
      return;
    }

    const newRecipe: CustomRecipe = {
      id: `custom_${Date.now()}`,
      name: recipeForm.name,
      desc: recipeForm.desc,
      kcal: parseInt(recipeForm.kcal),
      p: parseInt(recipeForm.p),
      c: parseInt(recipeForm.c),
      f: parseInt(recipeForm.f),
      tags: recipeForm.tags,
      warning: recipeForm.warning,
      ingredients: recipeForm.ingredients.map((ing) => ({
        n: ing.n,
        q: ing.q ? parseInt(ing.q) : 0,
        u: ing.u,
        cat: ing.cat,
      })),
    };

    setCustomRecipes([...customRecipes, newRecipe]);
    setRecipeForm({
      name: '',
      desc: '',
      kcal: '',
      p: '',
      c: '',
      f: '',
      tags: [],
      warning: 'bueno',
      ingredients: [{ n: '', q: '', u: 'g', cat: 'Verduras y frutas' }],
    });
    setRecipeSubmitStatus('success');
    setTimeout(() => setRecipeSubmitStatus(''), 3000);
  };

  // ========== COMPUTED VALUES ==========

  const restDayMacros: DaySchedule = {
    kcal: 2000,
    deficit: -650,
    p: 170,
    pPct: 34,
    c: 140,
    cPct: 28,
    f: 84,
    fPct: 38,
  };

  const trainDayMacros: DaySchedule = {
    kcal: 2300,
    deficit: -350,
    p: 173,
    pPct: 30,
    c: 259,
    cPct: 45,
    f: 64,
    fPct: 25,
  };

  const selectedMacros = dayType === 'rest' ? restDayMacros : trainDayMacros;

  const weeklyPlan = [
    { day: 'Lun', type: 'train', kcal: 2300 },
    { day: 'Mar', type: 'rest', kcal: 2000 },
    { day: 'Mié', type: 'train', kcal: 2300 },
    { day: 'Jue', type: 'rest', kcal: 2000 },
    { day: 'Vie', type: 'train', kcal: 2300 },
    { day: 'Sáb', type: 'rest', kcal: 2000 },
    { day: 'Dom', type: 'rest', kcal: 2000 },
  ];

  const weeklyAvgKcal = weeklyPlan.reduce((sum, d) => sum + d.kcal, 0) / 7;
  const weeklyDeficit = (2650 - weeklyAvgKcal) * 7;
  const weeklyLossKg = weeklyDeficit / 7700;

  // ========== RENDER ==========

  return (
    <div className="dashboard">
      {/* Header (Always Visible) */}
      <header className="header">
        <div className="header-badge">Plan Nutricional Personalizado</div>
        <h1>Dashboard Nutricional</h1>
        <p>Protocolo anti-inflamatorio para psoriasis y artritis psoriasica</p>
      </header>

      {/* Stats Row (Always Visible) */}
      <div className="stats-row">
        <div className="stat-card accent">
          <div className="stat-label">Calorías</div>
          <div className="stat-value">2.150 kcal</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Proteína</div>
          <div className="stat-value">161g</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-label">Carbohidratos</div>
          <div className="stat-value">204g</div>
        </div>
        <div className="stat-card yellow">
          <div className="stat-label">Grasas</div>
          <div className="stat-value">76g</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Déficit</div>
          <div className="stat-value">-500 kcal</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Agua</div>
          <div className="stat-value">3.5L</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <nav className="tab-nav">
        {[
          { key: 'macros', label: 'Macros y Calorías' },
          { key: 'alimentos', label: 'Alimentos' },
          { key: 'planificador', label: 'Planificador de Comidas' },
          { key: 'comerFuera', label: 'Comer Fuera' },
          { key: 'suplementacion', label: 'Suplementación' },
          { key: 'ciencia', label: 'Ciencia' },
          { key: 'objetivos', label: 'Objetivos' },
          { key: 'receta', label: 'Añadir Receta' },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB CONTENT */}
      <div className="tab-content">
        {/* TAB 1: MACROS Y CALORÍAS */}
        {activeTab === 'macros' && (
          <div className="tab-pane">
            <div className="callout info">
              <strong>BMR: 1600 kcal</strong> | <strong>TDEE: 2650 kcal</strong> |{' '}
              <strong>Objetivo: 2150 kcal</strong> (déficit ~500 kcal/día)
            </div>

            <div className="day-toggle">
              <label>
                <input
                  type="radio"
                  name="dayType"
                  value="rest"
                  checked={dayType === 'rest'}
                  onChange={(e) => setDayType(e.target.value as 'rest' | 'train')}
                />
                Día de Descanso
              </label>
              <label>
                <input
                  type="radio"
                  name="dayType"
                  value="train"
                  checked={dayType === 'train'}
                  onChange={(e) => setDayType(e.target.value as 'rest' | 'train')}
                />
                Día de Entrenamiento
              </label>
            </div>

            <div className="macros-grid">
              <div className="macro-card">
                <div className="macro-header" style={{ borderTopColor: '#f59e0b' }}>
                  Calorías
                </div>
                <div className="macro-value">{selectedMacros.kcal}</div>
                <div className="macro-unit">kcal</div>
                <div className="macro-deficit">
                  {selectedMacros.deficit > 0 ? '+' : ''}
                  {selectedMacros.deficit} kcal
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: '75%',
                      backgroundColor: '#f59e0b',
                    }}
                  />
                </div>
              </div>

              <div className="macro-card">
                <div className="macro-header" style={{ borderTopColor: '#10b981' }}>
                  Proteína
                </div>
                <div className="macro-value">{selectedMacros.p}</div>
                <div className="macro-unit">g ({selectedMacros.pPct}%)</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${selectedMacros.pPct}%`,
                      backgroundColor: '#10b981',
                    }}
                  />
                </div>
              </div>

              <div className="macro-card">
                <div className="macro-header" style={{ borderTopColor: '#3b82f6' }}>
                  Carbohidratos
                </div>
                <div className="macro-value">{selectedMacros.c}</div>
                <div className="macro-unit">g ({selectedMacros.cPct}%)</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${selectedMacros.cPct}%`,
                      backgroundColor: '#3b82f6',
                    }}
                  />
                </div>
              </div>

              <div className="macro-card">
                <div className="macro-header" style={{ borderTopColor: '#eab308' }}>
                  Grasas
                </div>
                <div className="macro-value">{selectedMacros.f}</div>
                <div className="macro-unit">g ({selectedMacros.fPct}%)</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${selectedMacros.fPct}%`,
                      backgroundColor: '#eab308',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="section-title">Vista Semanal</div>
            <div className="weekly-grid">
              {weeklyPlan.map((day, idx) => (
                <div key={idx} className="weekly-col">
                  <div className="weekly-day">{day.day}</div>
                  <div className="weekly-type">
                    {day.type === 'train' ? '🏋️ Train' : '🏖️ Rest'}
                  </div>
                  <div className="weekly-kcal">{day.kcal}</div>
                </div>
              ))}
            </div>

            <div className="callout success">
              <strong>Promedio:</strong> ~{weeklyAvgKcal.toFixed(0)} kcal/día |{' '}
              <strong>Déficit:</strong> ~{weeklyDeficit.toFixed(0)} kcal/semana |{' '}
              <strong>Pérdida esperada:</strong> ~{weeklyLossKg.toFixed(2)} kg/semana
            </div>
          </div>
        )}

        {/* TAB 2: ALIMENTOS */}
        {activeTab === 'alimentos' && (
          <div className="tab-pane">
            <div className="callout info">
              <strong>Leyenda:</strong> Usa alimentos{' '}
              <span className="badge-excelente">Excelente</span> y{' '}
              <span className="badge-bueno">Bueno</span> como base. Los{' '}
              <span className="badge-neutro">Neutro</span> son ocasionales.{' '}
              <span className="badge-precaucion">Precaución</span> y{' '}
              <span className="badge-evitar">Evitar</span> son inflamatorios.
            </div>

            {foodCategories.map((cat, idx) => (
              <div key={idx} className={`food-category ${cat.className}`}>
                <h3 className="food-title">
                  {cat.icon} {cat.title}
                </h3>
                <ul className="food-items">
                  {cat.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: PLANIFICADOR DE COMIDAS */}
        {activeTab === 'planificador' && (
          <div className="tab-pane">
            <div className="callout info">
              <strong>Estructura diaria (Ayuno 16:8):</strong> Comida 12:00 (~800 kcal) + Merienda
              16:00 (~300 kcal) + Cena 20:00 (~800 kcal)
            </div>

            <div className="sticky-summary">
              <div className="summary-item">
                Comidas {selectedLunches.size}/5
              </div>
              <div className="summary-item">
                Cenas {selectedDinners.size}/5
              </div>
              <div className="summary-item">
                Meriendas {selectedSnacks.size}/5
              </div>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSelectedLunches(new Set());
                  setSelectedDinners(new Set());
                  setSelectedSnacks(new Set());
                }}
              >
                Limpiar
              </button>
            </div>

            {/* LUNCHES */}
            <div className="meal-section">
              <h3>Comidas (Almuerzo 12:00 - ~800 kcal)</h3>
              <div className="meal-grid">
                {lunches.map((meal) => {
                  const isSelected = selectedLunches.has(meal.id);
                  const isDisabled = selectedLunches.size >= 5 && !isSelected;
                  return (
                    <div
                      key={meal.id}
                      className={`meal-card ${isSelected ? 'selected' : ''} ${
                        isDisabled ? 'disabled' : ''
                      }`}
                      onClick={() => !isDisabled && toggleMeal(meal.id, 'lunch')}
                      style={{
                        borderColor: isSelected ? '#a855f7' : 'transparent',
                        opacity: isDisabled ? 0.5 : 1,
                      }}
                    >
                      {isSelected && <div className="meal-checkmark">✓</div>}
                      <div className="meal-name">{meal.name}</div>
                      <div className="meal-macros">
                        {meal.kcal} kcal | P: {meal.p}g | C: {meal.c}g | F: {meal.f}g
                      </div>
                      {meal.tags && meal.tags.length > 0 && (
                        <div className="meal-tags">
                          {meal.tags.map((tag) => (
                            <span key={tag} className={`tag tag-${tagClass[tag]}`}>
                              {tagLabels[tag]}
                            </span>
                          ))}
                        </div>
                      )}
                      {meal.ingredients && (
                        <div className="meal-ingredients">
                          {meal.ingredients.map((ing, i) => (
                            <div key={i} className="ingredient">
                              {ing.n}: {ing.q}{ing.u}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DINNERS */}
            <div className="meal-section">
              <h3>Cenas (20:00 - ~800 kcal)</h3>
              <div className="meal-grid">
                {dinners.map((meal) => {
                  const isSelected = selectedDinners.has(meal.id);
                  const isDisabled = selectedDinners.size >= 5 && !isSelected;
                  return (
                    <div
                      key={meal.id}
                      className={`meal-card ${isSelected ? 'selected' : ''} ${
                        isDisabled ? 'disabled' : ''
                      }`}
                      onClick={() => !isDisabled && toggleMeal(meal.id, 'dinner')}
                      style={{
                        borderColor: isSelected ? '#a855f7' : 'transparent',
                        opacity: isDisabled ? 0.5 : 1,
                      }}
                    >
                      {isSelected && <div className="meal-checkmark">✓</div>}
                      <div className="meal-name">{meal.name}</div>
                      <div className="meal-macros">
                        {meal.kcal} kcal | P: {meal.p}g | C: {meal.c}g | F: {meal.f}g
                      </div>
                      {meal.tags && meal.tags.length > 0 && (
                        <div className="meal-tags">
                          {meal.tags.map((tag) => (
                            <span key={tag} className={`tag tag-${tagClass[tag]}`}>
                              {tagLabels[tag]}
                            </span>
                          ))}
                        </div>
                      )}
                      {meal.ingredients && (
                        <div className="meal-ingredients">
                          {meal.ingredients.map((ing, i) => (
                            <div key={i} className="ingredient">
                              {ing.n}: {ing.q}{ing.u}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SNACKS */}
            <div className="meal-section">
              <h3>Meriendas (16:00 - ~300 kcal)</h3>
              <div className="meal-grid">
                {snacks.map((meal) => {
                  const isSelected = selectedSnacks.has(meal.id);
                  const isDisabled = selectedSnacks.size >= 5 && !isSelected;
                  return (
                    <div
                      key={meal.id}
                      className={`meal-card ${isSelected ? 'selected' : ''} ${
                        isDisabled ? 'disabled' : ''
                      }`}
                      onClick={() => !isDisabled && toggleMeal(meal.id, 'snack')}
                      style={{
                        borderColor: isSelected ? '#a855f7' : 'transparent',
                        opacity: isDisabled ? 0.5 : 1,
                      }}
                    >
                      {isSelected && <div className="meal-checkmark">✓</div>}
                      <div className="meal-name">{meal.name}</div>
                      <div className="meal-macros">
                        {meal.kcal} kcal | P: {meal.p}g | C: {meal.c}g | F: {meal.f}g
                      </div>
                      {meal.tags && meal.tags.length > 0 && (
                        <div className="meal-tags">
                          {meal.tags.map((tag) => (
                            <span key={tag} className={`tag tag-${tagClass[tag]}`}>
                              {tagLabels[tag]}
                            </span>
                          ))}
                        </div>
                      )}
                      {meal.ingredients && (
                        <div className="meal-ingredients">
                          {meal.ingredients.map((ing, i) => (
                            <div key={i} className="ingredient">
                              {ing.n}: {ing.q}{ing.u}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SHOPPING LIST */}
            {(selectedLunches.size > 0 || selectedDinners.size > 0 || selectedSnacks.size > 0) && (
              <div className="shopping-section">
                <h3>Lista de Compra</h3>
                <button className="btn-primary" onClick={copyShoppingList}>
                  {copyStatus || 'Copiar Lista'}
                </button>
                <pre className="shopping-list">{generateShoppingList()}</pre>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: COMER FUERA */}
        {activeTab === 'comerFuera' && (
          <div className="tab-pane">
            <div className="callout warning">
              <strong>Regla de oro:</strong> Proteína a la plancha/horno + verduras/ensalada +
              aceite de oliva = éxito. Evita frituras, salsas cremosas y refrescos azucarados.
            </div>

            <div className="restaurant-grid">
              {restaurantGuides.map((guide, idx) => (
                <div key={idx} className="restaurant-card">
                  <div className="restaurant-header">
                    <span className="restaurant-emoji">{guide.emoji}</span>
                    <h4>{guide.name}</h4>
                  </div>

                  <div className="dos-donts">
                    <div className="do-section">
                      <strong className="do-label">✓ HACER</strong>
                      <ul>
                        {guide.dos.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="dont-section">
                      <strong className="dont-label">✗ EVITAR</strong>
                      <ul>
                        {guide.donts.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SUPLEMENTACIÓN */}
        {activeTab === 'suplementacion' && (
          <div className="tab-pane">
            <div className="section-title">Protocolo de Suplementación</div>

            <table className="supplement-table">
              <thead>
                <tr>
                  <th>Suplemento</th>
                  <th>Dosis</th>
                  <th>Cuándo</th>
                  <th>Prioridad</th>
                  <th>Evidencia</th>
                </tr>
              </thead>
              <tbody>
                {supplements.map((sup, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{sup.name}</strong>
                    </td>
                    <td>{sup.dose}</td>
                    <td>{sup.when}</td>
                    <td>
                      <span
                        className={`priority ${sup.priority === 'Crítica' ? 'critical' : 'high'}`}
                      >
                        {sup.priority}
                      </span>
                    </td>
                    <td>{sup.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="section-title">Rutina Diaria Suplementos</div>
            <div className="routine-grid">
              <div className="routine-item">
                <div className="routine-time">🌅 Desayuno (8:00)</div>
                <div className="routine-supplements">
                  Vitamina D3 (4000 IU), Vitamina C (500mg)
                </div>
              </div>
              <div className="routine-item">
                <div className="routine-time">🍽️ Almuerzo (12:00)</div>
                <div className="routine-supplements">
                  Omega-3 (2000mg), Cúrcuma+Pimienta (500mg), Zinc+Selenio
                </div>
              </div>
              <div className="routine-item">
                <div className="routine-time">🏋️ Post-Entreno</div>
                <div className="routine-supplements">Glutamina (5g)</div>
              </div>
              <div className="routine-item">
                <div className="routine-time">🌙 Noche (22:00)</div>
                <div className="routine-supplements">
                  Probióticos, Fibra soluble, Magnesio (400mg)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CIENCIA */}
        {activeTab === 'ciencia' && (
          <div className="tab-pane">
            <div className="section-title">Base Científica del Protocolo</div>
            <div className="tips-grid">
              {scienceTips.map((tip, idx) => (
                <div key={idx} className="tip-card">
                  <div className="tip-title">{tip.title}</div>
                  <div className="tip-desc">{tip.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: OBJETIVOS */}
        {activeTab === 'objetivos' && (
          <div className="tab-pane">
            <div className="section-title">Plan a Largo Plazo (16 Semanas)</div>
            <div className="targets-grid">
              {targets.map((target, idx) => (
                <div key={idx} className="target-card">
                  <div className="target-header">Semanas {target.weeks}</div>
                  <ul className="target-goals">
                    {target.goals.map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="section-title">Hidratación Diaria</div>
            <div className="hydration-section">
              <div className="hydration-info">
                <strong>Objetivo: 3-3.5L de agua/día</strong>
              </div>
              <div className="hydration-tips">
                <div className="hydration-tip">
                  <strong>08:00</strong> - 500ml (desayuno)
                </div>
                <div className="hydration-tip">
                  <strong>12:00</strong> - 500ml (comida)
                </div>
                <div className="hydration-tip">
                  <strong>16:00</strong> - 500ml (merienda)
                </div>
                <div className="hydration-tip">
                  <strong>20:00</strong> - 500ml (cena)
                </div>
                <div className="hydration-tip">
                  <strong>Post-entreno</strong> - 500-750ml
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: AÑADIR RECETA */}
        {activeTab === 'receta' && (
          <div className="tab-pane">
            <div className="section-title">Añadir Nueva Receta Personalizada</div>

            <div className="recipe-form">
              <div className="form-group">
                <label>Nombre de la Receta*</label>
                <input
                  type="text"
                  placeholder="ej: Salmón con rúcula casero"
                  value={recipeForm.name}
                  onChange={(e) => setRecipeForm({ ...recipeForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <input
                  type="text"
                  placeholder="ej: Salmón a la mantequilla con ensalada de rúcula"
                  value={recipeForm.desc}
                  onChange={(e) => setRecipeForm({ ...recipeForm, desc: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Calorías*</label>
                  <input
                    type="number"
                    placeholder="800"
                    value={recipeForm.kcal}
                    onChange={(e) => setRecipeForm({ ...recipeForm, kcal: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Proteína (g)*</label>
                  <input
                    type="number"
                    placeholder="50"
                    value={recipeForm.p}
                    onChange={(e) => setRecipeForm({ ...recipeForm, p: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Carbohidratos (g)*</label>
                  <input
                    type="number"
                    placeholder="65"
                    value={recipeForm.c}
                    onChange={(e) => setRecipeForm({ ...recipeForm, c: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Grasas (g)*</label>
                  <input
                    type="number"
                    placeholder="35"
                    value={recipeForm.f}
                    onChange={(e) => setRecipeForm({ ...recipeForm, f: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tags (selecciona los aplicables)</label>
                <div className="tag-checkboxes">
                  {Object.entries(tagLabels).map(([key, label]) => (
                    <label key={key} className="checkbox">
                      <input
                        type="checkbox"
                        checked={recipeForm.tags.includes(key)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRecipeForm({
                              ...recipeForm,
                              tags: [...recipeForm.tags, key],
                            });
                          } else {
                            setRecipeForm({
                              ...recipeForm,
                              tags: recipeForm.tags.filter((t) => t !== key),
                            });
                          }
                        }}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Nivel de Precaución</label>
                <select
                  value={recipeForm.warning}
                  onChange={(e) => setRecipeForm({ ...recipeForm, warning: e.target.value })}
                >
                  <option value="excelente">Excelente</option>
                  <option value="bueno">Bueno</option>
                  <option value="neutro">Neutro</option>
                  <option value="precaucion">Precaución</option>
                  <option value="evitar">Evitar</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ingredientes</label>
                {recipeForm.ingredients.map((ing, idx) => (
                  <div key={idx} className="ingredient-row">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={ing.n}
                      onChange={(e) => handleRecipeIngredientChange(idx, 'n', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Cantidad"
                      value={ing.q}
                      onChange={(e) => handleRecipeIngredientChange(idx, 'q', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Unidad"
                      value={ing.u}
                      onChange={(e) => handleRecipeIngredientChange(idx, 'u', e.target.value)}
                    />
                    <select
                      value={ing.cat}
                      onChange={(e) => handleRecipeIngredientChange(idx, 'cat', e.target.value)}
                    >
                      {catOrder.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn-small"
                      onClick={() => removeRecipeIngredient(idx)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button type="button" className="btn-secondary" onClick={addRecipeIngredient}>
                  + Añadir Ingrediente
                </button>
              </div>

              <button className="btn-primary" onClick={submitRecipe}>
                Guardar Receta
              </button>

              {recipeSubmitStatus && (
                <div
                  className={`alert ${
                    recipeSubmitStatus.startsWith('error') ? 'alert-error' : 'alert-success'
                  }`}
                >
                  {recipeSubmitStatus}
                </div>
              )}
            </div>

            {customRecipes.length > 0 && (
              <div className="custom-recipes-section">
                <div className="section-title">Tus Recetas Personalizadas</div>
                <div className="meal-grid">
                  {customRecipes.map((recipe) => (
                    <div key={recipe.id} className="meal-card custom-recipe">
                      <div className="meal-name">{recipe.name}</div>
                      <div className="meal-macros">
                        {recipe.kcal} kcal | P: {recipe.p}g | C: {recipe.c}g | F: {recipe.f}g
                      </div>
                      {recipe.tags.length > 0 && (
                        <div className="meal-tags">
                          {recipe.tags.map((tag) => (
                            <span key={tag} className={`tag tag-${tagClass[tag]}`}>
                              {tagLabels[tag]}
                            </span>
                          ))}
                        </div>
                      )}
                      <div
                        className={`recipe-warning recipe-${recipe.warning}`}
                        style={{ marginTop: '8px' }}
                      >
                        {recipe.warning.charAt(0).toUpperCase() + recipe.warning.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
