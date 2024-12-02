import React, { useState } from 'react';
import { useWishStore } from '../store/wishStore';
import { formatCurrency } from '../lib/utils';

interface DonationFormProps {
  wishId: string;
  onClose: () => void;
}

export function DonationForm({ wishId, onClose }: DonationFormProps) {
  const [amount, setAmount] = useState(100);
  const { currentUser, makeDonation, redistributeDonation } = useWishStore();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const redistributionAmount = amount * 0.05; // 5% for redistribution
    
    makeDonation({
      id: crypto.randomUUID(),
      amount: amount - redistributionAmount,
      wishId,
      donorId: currentUser.id,
      timestamp: new Date(),
    });

    redistributeDonation(redistributionAmount);
    onClose();
  };

  const predefinedAmounts = [50, 100, 200, 500];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Realizar Donación</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Cantidad
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {predefinedAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={`p-2 rounded-md border ${
                    amount === preset
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-blue-600'
                  }`}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
            />
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <p>El 5% ({formatCurrency(amount * 0.05)}) será redistribuido para ayudar a otros donantes.</p>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Donar {formatCurrency(amount)}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}