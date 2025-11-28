'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentSalary: string;
  currency: string;
  onUpdate: (newSalary: string) => void;
};

export default function UpdateSalaryModal({
  isOpen,
  onClose,
  currentSalary,
  currency,
  onUpdate,
}: Props) {
  // Parse current salary (e.g., "900.00 GBP / month" -> "900.00")
  const extractAmount = (salary: string): string => {
    const match = salary.match(/([\d,]+\.?\d*)/);
    return match ? match[1].replace(/,/g, '') : '';
  };

  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('month'); // month, year, etc.

  useEffect(() => {
    if (isOpen) {
      setAmount(extractAmount(currentSalary));
      // Extract period from current salary
      const hasMonth = currentSalary.toLowerCase().includes('month');
      setPeriod(hasMonth ? 'month' : 'year');
    }
  }, [isOpen, currentSalary]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && parseFloat(amount) > 0) {
      const formattedAmount = parseFloat(amount).toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      onUpdate(`${formattedAmount} ${currency} / ${period}`);
      onClose();
      setAmount('');
    }
  };

  const handleClose = () => {
    setAmount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Update Salary</h2>
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
              <label className="text-sm text-slate-600">Amount</label>
              <div className="relative">
                {amount && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-semibold text-slate-700">
                    {currency}
                  </span>
                )}
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d.]/g, '');
                    setAmount(value);
                  }}
                  placeholder="0.00"
                  className={`rounded-lg border-2 border-slate-300 bg-white py-3 text-base focus:border-emerald-600 focus:outline-none ${
                    amount ? 'pl-16 pr-4' : 'px-4'
                  }`}
                  required
                />
              </div>
              <p className="text-xs text-slate-500">Current: {currentSalary}</p>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm text-slate-600">Period</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base focus:border-emerald-600 focus:outline-none"
              >
                <option value="month">Per Month</option>
                <option value="year">Per Year</option>
              </select>
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
              Update Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

