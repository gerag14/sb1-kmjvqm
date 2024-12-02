import React, { useState } from 'react';
import { WishCard } from './WishCard';
import { WishFilters } from './WishFilters';
import { useWishStore } from '../store/wishStore';
import { WishCategory } from '../types';

interface WishListProps {
  onUserClick: (userId: string) => void;
}

export function WishList({ onUserClick }: WishListProps) {
  const { users } = useWishStore();
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'progress'>('price-asc');
  const [selectedCategories, setSelectedCategories] = useState<WishCategory[]>([]);

  const allWishes = users.flatMap((user) =>
    user.wishlist
      .filter(wish => 
        (wish.title.toLowerCase().includes(search.toLowerCase()) ||
        wish.description.toLowerCase().includes(search.toLowerCase())) &&
        wish.price >= priceRange[0] && 
        wish.price <= priceRange[1] &&
        (selectedCategories.length === 0 || selectedCategories.includes(wish.category))
      )
  );

  const sortedWishes = [...allWishes].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'progress':
        return (b.progress / b.price) - (a.progress / a.price);
      default:
        return 0;
    }
  });

  return (
    <div>
      <WishFilters
        search={search}
        setSearch={setSearch}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedWishes.map((wish) => (
          <WishCard 
            key={wish.id} 
            wish={wish}
            onUserClick={onUserClick}
          />
        ))}
      </div>
    </div>
  );
}