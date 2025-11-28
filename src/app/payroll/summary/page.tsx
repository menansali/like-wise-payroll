'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import PaymentSummaryCard from '@/components/PaymentSummaryCard';
import FxOptions from '@/components/FxOptions';
import { usePayrun } from '@/context/PayrunContext';
import { buildPaymentSummary } from '@/lib/summary';
import type { PaymentSummary } from '@/lib/types';

export default function PaymentSummaryPage() {
  const router = useRouter();
  const { validationResult, setExecutionResult, fxChoice } = usePayrun();
  const approvedRows = useMemo(
    () => validationResult?.valid ?? [],
    [validationResult?.valid],
  );
  const warningRows = useMemo(
    () => validationResult?.warnings ?? [],
    [validationResult?.warnings],
  );
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    const rowsForSummary = [...approvedRows, ...warningRows];

    if (rowsForSummary.length === 0) {
      setSummary(null);
      return;
    }

    let cancelled = false;

    const loadSummary = async () => {
      setLoadingSummary(true);
      setSummaryError(null);

      try {
        const response = await fetch('/api/fx-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rows: rowsForSummary }),
        });

        if (!response.ok) {
          throw new Error('FX summary API failed');
        }

        const payload = (await response.json()) as PaymentSummary;
        if (!cancelled) {
          setSummary(payload);
        }
      } catch (error) {
        // Fallback: rebuild summary on the client using demo FX rates.
        if (!cancelled) {
          setSummary(buildPaymentSummary(rowsForSummary));
          setSummaryError(
            error instanceof Error ? error.message : 'Falling back to demo FX data.',
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingSummary(false);
        }
      }
    };

    void loadSummary();

    return () => {
      cancelled = true;
    };
  }, [approvedRows, warningRows]);

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
      fxDecision: fxChoice ?? undefined,
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
          {summaryError && (
            <p className="mt-1 text-xs text-amber-700">
              {summaryError} Using fallback FX rates for this demo.
            </p>
          )}
        </div>

        {summary ? (
          <>
            <PaymentSummaryCard summary={summary} />
            <FxOptions plan={summary.fxPlan} />
          </>
        ) : (
          <p className="text-sm text-slate-500">
            {loadingSummary
              ? 'Loading FX summary…'
              : 'No rows available for FX summary.'}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={executePayroll}
            disabled={!fxChoice}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {fxChoice ? 'Execute payroll' : 'Choose FX option to execute'}
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

