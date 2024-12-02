import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useWishStore } from '../store/wishStore';
import { CATEGORIES } from '../data/mockData';
import { WishCategory } from '../types';
import { formatCurrency } from '../lib/utils';

interface WishFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: 'price-asc' | 'price-desc' | 'progress';
  setSortBy: (sort: 'price-asc' | 'price-desc' | 'progress') => void;
  selectedCategories: WishCategory[];
  setSelectedCategories: (categories: WishCategory[]) => void;
}

export function WishFilters({
  search,
  setSearch,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  selectedCategories,
  setSelectedCategories
}: WishFiltersProps) {
  const { users } = useWishStore();
  const allWishes = users.flatMap(user => user.wishlist);
  const maxPrice = Math.max(...allWishes.map(wish => wish.price));

  const handleCategoryToggle = (category: WishCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar deseos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => handleCategoryToggle(value)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCategories.includes(value)
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rango de Precio (€0 - €{maxPrice})
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <span>hasta</span>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="flex-1"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{formatCurrency(priceRange[0])}</span>
              <span>{formatCurrency(priceRange[1])}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="progress">Progreso</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}