'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLockRateNow: () => void;
  amount: number;
  savingsPercent: number;
};

export default function SavingsPopup({
  isOpen,
  onClose,
  onLockRateNow,
  amount,
  savingsPercent,
}: Props) {
  const savingsAmount = (amount * savingsPercent) / 100;

  // Auto-close after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Potential Savings</h2>
            <p className="mt-1 text-sm text-slate-500">
              By converting USD → INR now
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Savings Content */}
        <div className="space-y-6">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-sm text-emerald-900">You could save</p>
            <p className="mt-2 text-4xl font-bold text-emerald-600">
              £{savingsAmount.toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="mt-1 text-sm text-emerald-700">
              {savingsPercent}% on {amount.toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} GBP
            </p>
          </div>

          <div className="space-y-3 text-sm text-slate-600">
            <p>
              Lock today&apos;s rate to maximize savings on your next payroll run.
            </p>
            <p className="font-semibold text-slate-900">
              This is based on current market rates and FX trends.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="button"
              className="rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-emerald-950 hover:bg-emerald-500"
              onClick={onLockRateNow}
            >
              Lock Rate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

