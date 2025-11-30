'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Badge from '@/components/ui/Badge';
import AlertBanner from '@/components/ui/AlertBanner';
import type { FxPlan, FxPlanDetails } from '@/lib/types';
import { usePayrun } from '@/context/PayrunContext';
import { Check, Clock, Lock } from 'lucide-react';

type Props = {
  plan?: FxPlan;
  onSelect?: (optionId: string) => void;
};

export default function FxOptions({ plan, onSelect }: Props) {
  const { fxChoice, setFxChoice, fxPlanDetails, setFxPlanDetails } = usePayrun();
  const [selected, setSelected] = useState<string | null>(fxChoice);
  const [loadingOption, setLoadingOption] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSelected(fxChoice);
  }, [fxChoice]);

  // Map option IDs to API action names
  const getActionName = (optionId: string): 'convert_now' | 'schedule' | 'lock_rate' => {
    switch (optionId) {
      case 'convert-now':
        return 'convert_now';
      case 'schedule-payday':
        return 'schedule';
      case 'lock-rate':
        return 'lock_rate';
      default:
        return 'convert_now';
    }
  };

  const handleSelect = async (optionId: string) => {
    if (!plan || loadingOption) return;

    setLoadingOption(optionId);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const action = getActionName(optionId);
      const response = await fetch('/api/fx-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          plan: {
            baseCurrency: plan.baseCurrency,
            targetCurrency: plan.targetCurrency,
            amountInBase: plan.amountInBase,
            amountInTarget: plan.amountInTarget,
            indicativeRate: plan.indicativeRate,
            payrollDate: plan.payrollDate,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process FX plan');
      }

      const result = await response.json();
      const planDetails = result.plan as FxPlanDetails;

      setFxPlanDetails(planDetails);
      setSelected(optionId);
      setFxChoice(optionId);
      setSuccessMessage(result.message);
      onSelect?.(optionId);

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error('FX plan error:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to process FX plan',
      );
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setLoadingOption(null);
    }
  };

  const getPlanStatus = (optionId: string) => {
    if (!fxPlanDetails) return null;

    if (optionId === 'convert-now' && fxPlanDetails.type === 'convert_now') {
      return { type: 'locked', message: 'Rate locked' };
    }
    if (optionId === 'schedule-payday' && fxPlanDetails.type === 'schedule') {
      return { type: 'scheduled', message: 'Scheduled for payday' };
    }
    if (optionId === 'lock-rate' && fxPlanDetails.type === 'rate_lock') {
      const now = Date.now();
      const expiresAt = fxPlanDetails.expiresAt;
      if (now < expiresAt) {
        const hoursLeft = Math.floor((expiresAt - now) / (1000 * 60 * 60));
        const minutesLeft = Math.floor(
          ((expiresAt - now) % (1000 * 60 * 60)) / (1000 * 60),
        );
        return {
          type: 'locked',
          message: `Locked for ${hoursLeft}h ${minutesLeft}m`,
        };
      }
    }
    return null;
  };

  if (!plan) {
    return null;
  }

  return (
    <Card
      title="FX planner"
      variant="elevated"
      actions={
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Payday {plan.payrollDate}
        </span>
      }
    >
      <div className="space-y-6">
        {successMessage && (
          <AlertBanner message={successMessage} variant="success" />
        )}
        {errorMessage && (
          <AlertBanner message={errorMessage} variant="error" />
        )}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            Funds required in <span className="font-bold text-slate-900">{plan.targetCurrency}</span>:{' '}
            <span className="font-bold text-slate-900">
              {formatCurrency(plan.amountInTarget, plan.targetCurrency)}
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {formatCurrency(plan.amountInBase, plan.baseCurrency)} base at rate{' '}
            <span className="font-semibold">{plan.indicativeRate.toFixed(4)}</span>
          </p>
          {fxPlanDetails?.type === 'convert_now' && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-2">
              <Lock className="h-4 w-4 text-emerald-600" />
              <p className="text-xs font-semibold text-emerald-700">
                Rate locked at {fxPlanDetails.rate.toFixed(4)}
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plan.options.map((option) => {
            const isActive = selected === option.id;
            const isLoading = loadingOption === option.id;
            const isDisabled = loadingOption !== null && !isLoading;
            const status = getPlanStatus(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                disabled={isDisabled || isLoading}
                className={`group relative rounded-2xl border-2 p-6 text-left transition-all ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm',
                  isDisabled && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isLoading && (
                  <div className="absolute right-4 top-4">
                    <svg
                      className="h-5 w-5 animate-spin text-emerald-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                )}
                {isActive && !isLoading && (
                  <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-base font-bold ${isActive ? 'text-emerald-900' : 'text-slate-900'}`}>
                    {option.label}
                  </p>
                  <div className="flex items-center gap-2">
                    {status && (
                      <Badge variant="success" size="sm" className="flex items-center gap-1">
                        {status.type === 'locked' && <Lock className="h-3 w-3" />}
                        {status.type === 'scheduled' && <Clock className="h-3 w-3" />}
                        {status.message}
                      </Badge>
                    )}
                    {option.recommended && !isActive && !status && (
                      <Badge variant="success" size="sm">Recommended</Badge>
                    )}
                  </div>
                </div>
                <p className={`mt-3 text-sm ${isActive ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {option.description}
                </p>
                <p className={`mt-4 text-xs ${isActive ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {option.details}
                </p>
                {fxPlanDetails?.type === 'convert_now' && option.id === 'convert-now' && (
                  <div className="mt-4 rounded-lg bg-emerald-100 px-3 py-2">
                    <p className="text-xs font-semibold text-emerald-700">
                      Converted: {formatCurrency(fxPlanDetails.convertedAmount, plan.targetCurrency)}
                    </p>
                    <p className="text-xs text-emerald-600">
                      Fee: {formatCurrency(fxPlanDetails.fee, plan.baseCurrency)}
                    </p>
                  </div>
                )}
                {fxPlanDetails?.type === 'rate_lock' && option.id === 'lock-rate' && (
                  <div className="mt-4 rounded-lg bg-emerald-100 px-3 py-2">
                    <p className="text-xs font-semibold text-emerald-700">
                      Locked rate: {fxPlanDetails.lockedRate.toFixed(4)}
                    </p>
                    <p className="text-xs text-emerald-600">
                      Expires: {new Date(fxPlanDetails.expiresAt).toLocaleString()}
                    </p>
                  </div>
                )}
                <div className="mt-6">
                  <span
                    className={`inline-flex rounded-xl px-4 py-2 text-xs font-semibold ${
                      isActive
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isLoading
                      ? 'Processing...'
                      : isActive
                        ? 'Selected'
                        : option.actionLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-500">
          NOTE: updated to match FigJam LikeWise flow. Replace these options with
          live Wise treasury decisions later.
        </p>
      </div>
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
