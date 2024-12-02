import React from 'react';
import { Users, Gift, Heart } from 'lucide-react';
import { useWishStore } from '../store/wishStore';
import { formatCurrency } from '../lib/utils';
import { WishCard } from './WishCard';

interface UserProfileProps {
  userId: string;
  onClose: () => void;
}

export function UserProfile({ userId, onClose }: UserProfileProps) {
  const { users, currentUser, followUser, unfollowUser } = useWishStore();
  const user = users.find(u => u.id === userId);
  
  if (!user) return null;

  const totalDonated = user.donations.reduce((sum, d) => sum + d.amount, 0);
  const isFollowing = currentUser?.following.includes(userId);
  const isCurrentUser = currentUser?.id === userId;

  const handleFollowToggle = () => {
    if (!currentUser) return;
    if (isFollowing) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                {user.bio && <p className="text-gray-600">{user.bio}</p>}
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Gift size={16} />
                    <span>{formatCurrency(totalDonated)} donados</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{user.followers.length} seguidores</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{user.following.length} siguiendo</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {!isCurrentUser && (
                <button
                  onClick={handleFollowToggle}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Heart size={18} className={isFollowing ? 'fill-current' : ''} />
                  <span>{isFollowing ? 'Siguiendo' : 'Seguir'}</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-4">Lista de Deseos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.wishlist.map(wish => (
                  <WishCard key={wish.id} wish={wish} />
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">Donaciones Realizadas</h3>
              <div className="space-y-4">
                {user.donations.map(donation => {
                  const wish = users
                    .flatMap(u => u.wishlist)
                    .find(w => w.id === donation.wishId);
                  const wishOwner = users.find(u => 
                    u.wishlist.some(w => w.id === donation.wishId)
                  );
                  
                  if (!wish || !wishOwner) return null;

                  return (
                    <div key={donation.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={wish.imageUrl}
                        alt={wish.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <img
                            src={wishOwner.avatar}
                            alt={wishOwner.name}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-sm text-gray-600">
                            Donación para {wishOwner.name}
                          </span>
                        </div>
                        <p className="font-medium">{wish.title}</p>
                        <p className="text-sm text-blue-600">
                          {formatCurrency(donation.amount)} donados
                        </p>
                        {donation.comment && (
                          <p className="text-sm text-gray-600 mt-2">
                            "{donation.comment}"
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}