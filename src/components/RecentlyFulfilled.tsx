import React from 'react';
import { PartyPopper } from 'lucide-react';
import { useWishStore } from '../store/wishStore';
import { formatCurrency } from '../lib/utils';

interface RecentlyFulfilledProps {
  showExtended?: boolean;
}

export function RecentlyFulfilled({ showExtended = false }: RecentlyFulfilledProps) {
  const { users } = useWishStore();
  
  const fulfilledWishes = users
    .flatMap(user => user.wishlist
      .filter(wish => wish.progress >= wish.price)
      .map(wish => ({
        ...wish,
        owner: user,
        donors: users
          .flatMap(u => u.donations)
          .filter(d => d.wishId === wish.id)
          .map(d => users.find(u => u.id === d.donorId)!)
      })))
    .sort((a, b) => b.progress - a.progress)
    .slice(0, showExtended ? 10 : 5);

  return (
    <div className={`${!showExtended && 'bg-white rounded-lg shadow-md p-6'}`}>
      <div className="flex items-center gap-2 mb-4">
        <PartyPopper className="text-green-500" size={24} />
        <h2 className="text-xl font-semibold">Deseos Cumplidos</h2>
      </div>
      <div className="space-y-4">
        {fulfilledWishes.map((wish) => (
          <div key={wish.id} className="flex items-center gap-4">
            <img
              src={wish.imageUrl}
              alt={wish.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={wish.owner.avatar}
                  alt={wish.owner.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">{wish.owner.name}</span>
              </div>
              <p className="font-medium">{wish.title}</p>
              <p className="text-sm text-green-600">¡{formatCurrency(wish.price)} conseguidos!</p>
              {showExtended && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Donantes:</p>
                  <div className="flex -space-x-2 mt-1">
                    {wish.donors.map((donor) => (
                      <img
                        key={donor.id}
                        src={donor.avatar}
                        alt={donor.name}
                        title={donor.name}
                        className="w-6 h-6 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}