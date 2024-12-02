import React from 'react';
import { Award } from 'lucide-react';
import { useWishStore } from '../store/wishStore';
import { formatCurrency } from '../lib/utils';

interface TopDonorsProps {
  showExtended?: boolean;
  onUserClick: (userId: string) => void;
}

export function TopDonors({ showExtended = false, onUserClick }: TopDonorsProps) {
  const { users } = useWishStore();

  const donorStats = users.map(user => ({
    ...user,
    totalDonated: user.donations.reduce((sum, donation) => sum + donation.amount, 0),
    wishesHelped: new Set(user.donations.map(d => d.wishId)).size
  }))
  .sort((a, b) => b.totalDonated - a.totalDonated)
  .slice(0, showExtended ? 10 : 5);

  return (
    <div className={`${!showExtended && 'bg-white rounded-lg shadow-md p-6'}`}>
      <div className="flex items-center gap-2 mb-4">
        <Award className="text-yellow-500" size={24} />
        <h2 className="text-xl font-semibold">Mejores Donantes</h2>
      </div>
      <div className="space-y-4">
        {donorStats.map((user, index) => (
          <div 
            key={user.id} 
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            onClick={() => onUserClick(user.id)}
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {index < 3 && (
                <span className={`absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${
                  index === 0 ? 'bg-yellow-400' :
                  index === 1 ? 'bg-gray-300' :
                  'bg-amber-600'
                } text-white`}>
                  {index + 1}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{user.name}</p>
              <div className="text-sm text-gray-600">
                <p>{formatCurrency(user.totalDonated)} donados</p>
                {showExtended && (
                  <p>{user.wishesHelped} {user.wishesHelped === 1 ? 'deseo ayudado' : 'deseos ayudados'}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}