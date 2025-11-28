'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import PaymentSummaryCard from '@/components/PaymentSummaryCard';
import FxOptions from '@/components/FxOptions';
import { usePayrun } from '@/context/PayrunContext';
import { buildPaymentSummary } from '@/lib/summary';

export default function PaymentSummaryPage() {
  const router = useRouter();
  const { validationResult, setExecutionResult } = usePayrun();
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedFxOption, setSelectedFxOption] = useState('convert-now');
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

  const executePayroll = async () => {
    setIsExecuting(true);
    try {
      const allRows = [...approvedRows, ...warningRows];
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: allRows, fxOption: selectedFxOption }),
      });

      if (!response.ok) {
        throw new Error('Execution failed');
      }

      const result = await response.json();
      setExecutionResult({
        successCount: result.successCount,
        failedCount: result.failedCount,
      });
      router.push('/payroll/confirmation');
    } catch (error) {
      console.error('Payroll execution error:', error);
      // Fallback to local execution for demo
      setExecutionResult({
        successCount: approvedRows.length,
        failedCount: warningRows.length,
      });
      router.push('/payroll/confirmation');
    } finally {
      setIsExecuting(false);
    }
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
        <FxOptions plan={summary.fxPlan} onSelect={setSelectedFxOption} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={executePayroll}
            disabled={isExecuting}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isExecuting ? 'Processing…' : 'Execute payroll'}
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

