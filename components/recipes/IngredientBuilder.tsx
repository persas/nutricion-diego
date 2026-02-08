'use client';

import { Ingredient } from '@/types';

interface IngredientBuilderProps {
  ingredients: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
}

const UNITS = ['g', 'ml', 'unidad', 'cucharada', 'cucharadita', 'diente', 'puñado'];
const CATEGORIES = [
  'Pescados',
  'Carnes',
  'Lacteos y huevos',
  'Verduras y frutas',
  'Cereales y legumbres',
  'Frutos secos y semillas',
  'Aceites y condimentos',
  'Suplementos',
];

export default function IngredientBuilder({
  ingredients,
  onChange,
}: IngredientBuilderProps) {
  const handleAddRow = () => {
    const newIngredient: Ingredient = {
      name: '',
      qty: 0,
      unit: 'g',
      category: 'Verduras y frutas',
    };
    onChange([...ingredients, newIngredient]);
  };

  const handleRemoveRow = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Ingredient, value: any) => {
    const updated = [...ingredients];
    if (field === 'qty') {
      updated[index] = { ...updated[index], [field]: parseFloat(value) || 0 };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    onChange(updated);
  };

  return (
    <div className="border border-[#2a2a3e] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Ingredientes</h3>
        <button
          onClick={handleAddRow}
          className="bg-[#6c5ce7] hover:bg-[#5f4ccf] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Añadir Ingrediente
        </button>
      </div>

      {ingredients.length === 0 ? (
        <p className="text-gray-400 text-sm py-4">No hay ingredientes. Haz clic en "Añadir Ingrediente" para empezar.</p>
      ) : (
        <div className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-3 items-end bg-[#0a0a0f] p-4 rounded-lg">
              {/* Name Input */}
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">Nombre</label>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder="Ej: Salmón"
                  className="w-full bg-[#12121a] border border-[#2a2a3e] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#6c5ce7] transition-colors text-sm"
                />
              </div>

              {/* Quantity Input */}
              <div className="w-20">
                <label className="block text-xs text-gray-400 mb-1">Cantidad</label>
                <input
                  type="number"
                  value={ingredient.qty}
                  onChange={(e) => handleChange(index, 'qty', e.target.value)}
                  placeholder="0"
                  className="w-full bg-[#12121a] border border-[#2a2a3e] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#6c5ce7] transition-colors text-sm"
                />
              </div>

              {/* Unit Select */}
              <div className="w-28">
                <label className="block text-xs text-gray-400 mb-1">Unidad</label>
                <select
                  value={ingredient.unit}
                  onChange={(e) => handleChange(index, 'unit', e.target.value)}
                  className="w-full bg-[#12121a] border border-[#2a2a3e] rounded px-3 py-2 text-white focus:outline-none focus:border-[#6c5ce7] transition-colors text-sm"
                >
                  {UNITS.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Select */}
              <div className="w-32">
                <label className="block text-xs text-gray-400 mb-1">Categoría</label>
                <select
                  value={ingredient.category}
                  onChange={(e) => handleChange(index, 'category', e.target.value)}
                  className="w-full bg-[#12121a] border border-[#2a2a3e] rounded px-3 py-2 text-white focus:outline-none focus:border-[#6c5ce7] transition-colors text-sm"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveRow(index)}
                className="bg-[#d63031] hover:bg-[#c72c24] text-white px-3 py-2 rounded text-sm font-medium transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
