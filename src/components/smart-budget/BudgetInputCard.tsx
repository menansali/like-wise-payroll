'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (amount: string) => void;
};

export default function BudgetInputCard({ onSubmit }: Props) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      onSubmit(amount);
      setAmount('');
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-950/12 bg-emerald-950/2 p-4">
      <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-slate-600">Enter Holding Currency Amount</span>
            <div className="relative">
              {amount && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-semibold text-slate-700">
                  £
                </span>
              )}
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder=""
                className={`rounded-lg border-2 border-slate-400 bg-white py-3 text-base focus:border-emerald-600 focus:outline-none ${
                  amount ? 'pl-8 pr-4' : 'px-4'
                }`}
              />
            </div>
          </label>
          <p className="text-sm text-slate-500">Explore your possible savings</p>
        </div>

        <button
          type="submit"
          className="w-fit rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-emerald-950 hover:bg-emerald-500"
        >
          Budget
        </button>
      </form>
    </div>
  );
}

