'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import type { FxPlan } from '@/lib/types';
import { usePayrun } from '@/context/PayrunContext';

type Props = {
  plan?: FxPlan;
};

export default function FxOptions({ plan }: Props) {
  const { fxChoice, setFxChoice } = usePayrun();
  const [selected, setSelected] = useState<string | null>(fxChoice);

  useEffect(() => {
    setSelected(fxChoice);
  }, [fxChoice]);

  if (!plan) {
    return null;
  }

  return (
    <Card
      title="FX planner"
      actions={
        <span className="text-xs uppercase tracking-wide text-slate-500">
          Payday {plan.payrollDate}
        </span>
      }
    >
      <p className="text-sm text-slate-500">
        Funds required in {plan.targetCurrency}:{' '}
        <span className="font-semibold text-slate-900">
          {formatCurrency(plan.amountInTarget, plan.targetCurrency)}
        </span>{' '}
        ({formatCurrency(plan.amountInBase, plan.baseCurrency)} base at rate{' '}
        {plan.indicativeRate.toFixed(4)})
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {plan.options.map((option) => {
          const isActive = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setSelected(option.id);
                setFxChoice(option.id);
              }}
              className={`rounded-xl border p-4 text-left transition ${
                isActive
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{option.label}</p>
                {option.recommended && (
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Recommended
                  </span>
                )}
              </div>
              <p
                className={`mt-1 text-sm ${
                  isActive ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                {option.description}
              </p>
              <p
                className={`mt-3 text-xs ${
                  isActive ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {option.details}
              </p>
              <span
                className={`mt-4 inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'bg-white text-slate-900'
                }`}
              >
                {isActive ? 'Selected' : option.actionLabel}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-500">
        NOTE: updated to match FigJam LikeWise flow. Replace these options with
        live Wise treasury decisions later.
      </p>
    </Card>
  );
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

