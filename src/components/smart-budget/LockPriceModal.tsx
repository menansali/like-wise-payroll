'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCurrencyRate, formatExchangeRate, currencyNameToCode } from '@/lib/currencyRates';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  country?: string;
  onLock: (data: { exchangeRate: string; amount: string }) => void;
};

export default function LockPriceModal({
  isOpen,
  onClose,
  currency,
  onLock,
}: Props) {
  const [exchangeRate, setExchangeRate] = useState('');
  const [lockAmount, setLockAmount] = useState('');

  // Pre-fill exchange rate when modal opens with currency data
  useEffect(() => {
    if (!isOpen || !currency) return;
    
    const currentRate = getCurrencyRate(currency);
    if (currentRate !== null) {
      setExchangeRate(formatExchangeRate(currentRate, currency));
    }
    // Reset lock amount when modal opens
    setLockAmount('');
  }, [isOpen, currency]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exchangeRate && lockAmount) {
      onLock({ exchangeRate, amount: lockAmount });
      setExchangeRate('');
      setLockAmount('');
      onClose();
    }
  };

  const handleClose = () => {
    setLockAmount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Lock Price</h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <label className="text-sm text-slate-600">
                Goal currency exchange rate
              </label>
              <input
                type="text"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                placeholder="0.0000"
                className="rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base focus:border-emerald-600 focus:outline-none"
                required
              />
              <p className="text-xs text-slate-500">
                Current exchange rate: 1 GBP = {exchangeRate || 'N/A'}{' '}
                {currencyNameToCode[currency] || currency} (pre-filled from current market rate)
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm text-slate-600">Lock-in amount</label>
              <input
                type="text"
                value={lockAmount}
                onChange={(e) => setLockAmount(e.target.value)}
                placeholder="0.00"
                className="rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base focus:border-emerald-600 focus:outline-none"
                required
              />
              <p className="text-xs text-slate-500">
                Amount to lock at the specified exchange rate
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200" />

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-emerald-950 hover:bg-emerald-500"
            >
              Lock Price
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

