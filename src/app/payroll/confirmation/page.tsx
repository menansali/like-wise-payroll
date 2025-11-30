'use client';

import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { usePayrun } from '@/context/PayrunContext';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { FxPlanDetails } from '@/lib/types';

export default function ConfirmationPage() {
  const router = useRouter();
  const { executionResult, fxPlanDetails, reset } = usePayrun();

  const goToDashboard = () => {
    reset();
    router.push('/dashboard');
  };

  if (!executionResult) {
    return (
      <Layout>
        <div className="space-y-6">
          <SectionHeader
            subtitle="Run complete"
            title="Payroll execution results"
            description="Nothing to confirm yet."
          />
          <Button onClick={() => router.push('/payroll')}>
            Start a payroll run
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <SectionHeader
          subtitle="Run complete"
          title="Payroll execution results"
          description="Summary of the simulated payout. Replace this screen with real Wise API results later."
        />

        <Card variant="elevated">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <StatCard
                label="Successful payments"
                value={executionResult.successCount}
                icon={<CheckCircle className="h-6 w-6 text-emerald-600" />}
                className="border-emerald-200 bg-emerald-50"
              />
              <StatCard
                label="Flagged for follow-up"
                value={executionResult.failedCount}
                icon={<AlertCircle className="h-6 w-6 text-amber-600" />}
                className="border-amber-200 bg-amber-50"
              />
            </div>
            {executionResult.fxDecision && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  FX decision
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {friendlyFxDecision(executionResult.fxDecision)}
                </p>
                {fxPlanDetails && (
                  <div className="mt-4 space-y-2 rounded-lg bg-white p-4">
                    {renderFxPlanDetails(fxPlanDetails)}
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        <Button onClick={goToDashboard} size="lg">
          Back to dashboard
        </Button>
      </div>
    </Layout>
  );
}

function friendlyFxDecision(id: string): string {
  switch (id) {
    case 'convert-now':
      return 'Convert now – funds were converted immediately before payouts.';
    case 'schedule-payday':
      return 'Schedule conversion – FX will be executed automatically on payroll cut-off.';
    case 'lock-rate':
      return 'Lock rate – today\'s FX rate is held while approvals complete.';
    default:
      return id;
  }
}

function renderFxPlanDetails(details: FxPlanDetails) {
  switch (details.type) {
    case 'convert_now':
      return (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">Conversion Details</p>
          <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <span className="text-xs text-slate-500">Rate:</span>
              <p className="font-semibold text-slate-900">{details.rate.toFixed(6)}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Converted Amount:</span>
              <p className="font-semibold text-slate-900">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2,
                }).format(details.convertedAmount)}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Fee:</span>
              <p className="font-semibold text-slate-900">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2,
                }).format(details.fee)}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Converted At:</span>
              <p className="font-semibold text-slate-900">
                {new Date(details.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );

    case 'schedule':
      return (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">Scheduled Conversion</p>
          <div className="text-sm text-slate-600">
            <p>
              <span className="text-xs text-slate-500">Payday:</span>{' '}
              <span className="font-semibold text-slate-900">{details.payday}</span>
            </p>
            <p className="mt-1">
              <span className="text-xs text-slate-500">Strategy:</span>{' '}
              <span className="font-semibold text-slate-900">{details.strategy}</span>
            </p>
            <p className="mt-1">
              <span className="text-xs text-slate-500">Scheduled At:</span>{' '}
              <span className="font-semibold text-slate-900">
                {new Date(details.scheduledAt).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      );

    case 'rate_lock':
      const now = Date.now();
      const isExpired = now >= details.expiresAt;
      return (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">Rate Lock Details</p>
          <div className="text-sm text-slate-600">
            <p>
              <span className="text-xs text-slate-500">Locked Rate:</span>{' '}
              <span className="font-semibold text-slate-900">
                {details.lockedRate.toFixed(6)}
              </span>
            </p>
            <p className="mt-1">
              <span className="text-xs text-slate-500">Locked At:</span>{' '}
              <span className="font-semibold text-slate-900">
                {new Date(details.lockedAt).toLocaleString()}
              </span>
            </p>
            <p className="mt-1">
              <span className="text-xs text-slate-500">Expires At:</span>{' '}
              <span className={`font-semibold ${isExpired ? 'text-rose-600' : 'text-slate-900'}`}>
                {new Date(details.expiresAt).toLocaleString()}
                {isExpired && ' (Expired)'}
              </span>
            </p>
            {!isExpired && (
              <p className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                Rate lock is active
              </p>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}

