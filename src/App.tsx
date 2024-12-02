import React, { useState } from 'react';
import { WishList } from './components/WishList';
import { TopDonors } from './components/TopDonors';
import { RecentlyFulfilled } from './components/RecentlyFulfilled';
import { Gift, Trophy, User } from 'lucide-react';
import { useWishStore } from './store/wishStore';
import { UserProfile } from './components/UserProfile';

export default function App() {
  const [currentView, setCurrentView] = React.useState<'home' | 'achievements'>('home');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { currentUser } = useWishStore();

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <Gift className="text-blue-600" size={24} />
              <h1 className="text-xl font-bold text-gray-900">CumpleDeseos</h1>
            </div>
            <nav className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView('achievements')}
                className={`flex items-center gap-2 ${
                  currentView === 'achievements' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Trophy size={20} />
                <span>Logros y Donantes</span>
              </button>
              <button className="text-gray-600 hover:text-gray-900">Mi Lista de Deseos</button>
              <button className="text-gray-600 hover:text-gray-900">Mis Donaciones</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Crear Deseo
              </button>
              {currentUser && (
                <button
                  onClick={() => setSelectedUserId(currentUser.id)}
                  className="flex items-center gap-2 ml-4"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700">{currentUser.name}</span>
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8">
        {currentView === 'home' ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Cumpliendo Deseos Juntos
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Únete a nuestra comunidad de donantes. Crea tu lista de deseos, ayuda a otros,
                y sé parte de un círculo donde el 5% de cada donación va destinado a ayudar a
                cumplir el deseo de otro donante.
              </p>
            </div>

            <div className="px-4">
              <WishList onUserClick={handleUserClick} />
            </div>
          </>
        ) : (
          <div className="px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Logros y Mejores Donantes</h2>
              <p className="text-gray-600">
                Conoce a nuestros donantes más generosos y los deseos que han ayudado a cumplir.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <TopDonors showExtended onUserClick={handleUserClick} />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <RecentlyFulfilled showExtended onUserClick={handleUserClick} />
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedUserId && (
        <UserProfile
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}