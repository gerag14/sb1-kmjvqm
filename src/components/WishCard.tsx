import React, { useState } from 'react';
import { Gift, MessageSquare } from 'lucide-react';
import { Wish } from '../types';
import { formatCurrency } from '../lib/utils';
import { useWishStore } from '../store/wishStore';
import { DonationForm } from './DonationForm';
import { Comments } from './Comments';
import { CATEGORIES } from '../data/mockData';

interface WishCardProps {
  wish: Wish;
  onUserClick: (userId: string) => void;
}

export function WishCard({ wish, onUserClick }: WishCardProps) {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { users, comments } = useWishStore();
  const progress = (wish.progress / wish.price) * 100;
  const owner = users.find(user => user.id === wish.userId);
  const wishComments = comments.filter(comment => comment.wishId === wish.id);
  const category = CATEGORIES.find(c => c.value === wish.category);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={wish.imageUrl}
            alt={wish.title}
            className="w-full h-48 object-cover"
          />
          {category && (
            <span className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </span>
          )}
        </div>
        <div className="p-4">
          <div 
            className="flex items-center gap-2 mb-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => owner && onUserClick(owner.id)}
          >
            <img
              src={owner?.avatar}
              alt={owner?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{owner?.name}</span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">{wish.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{wish.description}</p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progreso</span>
              <span>{formatCurrency(wish.progress)} / {formatCurrency(wish.price)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowDonationForm(true)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Gift size={18} />
              <span>Donar</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              <span>{wishComments.length}</span>
            </button>
          </div>

          {showComments && (
            <Comments wishId={wish.id} onUserClick={onUserClick} />
          )}
        </div>
      </div>

      {showDonationForm && (
        <DonationForm
          wishId={wish.id}
          onClose={() => setShowDonationForm(false)}
        />
      )}
    </>
  );
}