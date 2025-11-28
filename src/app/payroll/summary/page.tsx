'use client';

import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import PaymentSummaryCard from '@/components/PaymentSummaryCard';
import FxOptions from '@/components/FxOptions';
import { usePayrun } from '@/context/PayrunContext';
import { buildPaymentSummary } from '@/lib/summary';

export default function PaymentSummaryPage() {
  const router = useRouter();
  const { validationResult, setExecutionResult } = usePayrun();
  const approvedRows = validationResult?.valid ?? [];
  const warningRows = validationResult?.warnings ?? [];
  const summary = buildPaymentSummary([...approvedRows, ...warningRows]);

  if (!validationResult) {
    return (
      <Layout>
        <div className="space-y-4 text-sm text-slate-600">
          <p>No validation data available.</p>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            onClick={() => router.push('/payroll/upload')}
          >
            Upload a payroll file
          </button>
        </div>
      </Layout>
    );
  }

  const executePayroll = () => {
    setExecutionResult({
      successCount: approvedRows.length,
      failedCount: warningRows.length,
    });
    router.push('/payroll/confirmation');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Review payouts
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Payment summary
          </h1>
          <p className="text-sm text-slate-500">
            FX totals, estimated fees, and settlement times derived from the last
            validated file. Choose how to fund this payroll before executing.
          </p>
        </div>

        <PaymentSummaryCard summary={summary} />
        <FxOptions plan={summary.fxPlan} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={executePayroll}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Execute payroll
          </button>
          <button
            type="button"
            onClick={() => router.push('/payroll/upload')}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            Back to validation
          </button>
        </div>
      </div>
    </Layout>
  );
}

