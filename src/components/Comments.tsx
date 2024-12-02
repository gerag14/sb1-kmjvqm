import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useWishStore } from '../store/wishStore';
import { Comment } from '../types';

interface CommentsProps {
  wishId: string;
  onUserClick: (userId: string) => void;
}

export function Comments({ wishId, onUserClick }: CommentsProps) {
  const [newComment, setNewComment] = useState('');
  const { currentUser, addComment, comments } = useWishStore();
  
  const wishComments = comments.filter(comment => comment.wishId === wishId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newComment.trim()) return;

    addComment({
      id: crypto.randomUUID(),
      wishId,
      userId: currentUser.id,
      content: newComment.trim(),
      timestamp: new Date()
    });

    setNewComment('');
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={20} className="text-gray-500" />
        <h3 className="font-semibold">Comentarios ({wishComments.length})</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Añade un comentario..."
          className="flex-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </form>

      <div className="space-y-4">
        {wishComments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onUserClick(comment.user.id)}
            />
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="font-medium cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => onUserClick(comment.user.id)}
                >
                  {comment.user.name}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}