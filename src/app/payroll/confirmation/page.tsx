'use client';

import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { usePayrun } from '@/context/PayrunContext';

export default function ConfirmationPage() {
  const router = useRouter();
  const { executionResult, reset } = usePayrun();

  const goToDashboard = () => {
    reset();
    router.push('/dashboard');
  };

  if (!executionResult) {
    return (
      <Layout>
        <div className="space-y-4 text-sm text-slate-600">
          <p>Nothing to confirm yet.</p>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            onClick={() => router.push('/payroll')}
          >
            Start a payroll run
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Run complete
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Payroll execution results
          </h1>
          <p className="text-sm text-slate-500">
            Summary of the simulated payout. Replace this screen with real Wise
            API results later.
          </p>
        </div>

        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <ResultStat
              label="Successful payments"
              value={executionResult.successCount}
            />
            <ResultStat
              label="Flagged for follow-up"
              value={executionResult.failedCount}
            />
          </div>
          {executionResult.fxDecision && (
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                FX decision
              </p>
              <p className="mt-1 font-semibold">
                {friendlyFxDecision(executionResult.fxDecision)}
              </p>

            </div>
          )}
        </Card>

        <button
          type="button"
          onClick={goToDashboard}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Back to dashboard
        </button>
      </div>
    </Layout>
  );
}

function ResultStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function friendlyFxDecision(id: string): string {
  switch (id) {
    case 'convert-now':
      return 'Convert now – funds were converted immediately before payouts.';
    case 'schedule-payday':
      return 'Schedule conversion – FX will be executed automatically on payroll cut-off.';
    case 'lock-rate':
      return 'Lock rate – today’s FX rate is held while approvals complete.';
    default:
      return id;
  }
}

