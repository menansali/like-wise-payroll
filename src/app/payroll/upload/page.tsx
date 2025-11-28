'use client';

import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import PayrollUploadForm from '@/components/PayrollUploadForm';
import ValidationTable from '@/components/ValidationTable';
import { usePayrun } from '@/context/PayrunContext';

export default function PayrollUploadPage() {
  const router = useRouter();
  const { validationResult } = usePayrun();
  const errors = validationResult?.errors ?? [];
  const warnings = validationResult?.warnings ?? [];
  const valid = validationResult?.valid ?? [];

  const canContinue = !!validationResult && errors.length === 0;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Upload & validate
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Payroll file validation
          </h1>
          <p className="text-sm text-slate-500">
            Upload the CSV, review errors or warnings, then proceed to payment
            summary.
          </p>
        </div>

        <PayrollUploadForm />

        {validationResult && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-700">
                {errors.length} errors
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                {warnings.length} warnings
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                {valid.length} ready
              </span>
            </div>

            <div className="space-y-4">
              <ValidationTable rows={errors} type="error" />
              <ValidationTable rows={warnings} type="warning" />
              <ValidationTable rows={valid} type="valid" />
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!canContinue}
              onClick={() => router.push('/payroll/summary')}
            >
              Continue to Payment Summary
            </button>
            {!canContinue && (
              <p className="text-xs text-slate-500">
                Resolve all errors before continuing.
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

