'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import NotificationBanner from '@/components/NotificationBanner';
import { usePayrun } from '@/context/PayrunContext';

export default function PayrollLandingPage() {
  const { payrollPeriod, derived, rows } = usePayrun();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Current run
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            {payrollPeriod}
          </h1>
          <p className="text-sm text-slate-500">
            Review the scope of the current cycle before uploading the payroll
            file.
          </p>
        </div>

        <NotificationBanner message="Payroll due in 7 days for your team" />

        <div className="grid gap-4 md:grid-cols-3">
          <Stat label="Workers in scope" value={derived.workerCount || '—'} />
          <Stat label="Countries covered" value={derived.countryCount || '—'} />
          <Stat label="Last upload" value={rows.length ? 'Moments ago' : 'None'} />
        </div>

        <Card title="Steps">
          <ol className="list-decimal space-y-3 pl-4 text-sm text-slate-600">
            <li>Export payroll data from your HRIS</li>
            <li>Upload the CSV for validation</li>
            <li>Review warnings and summary before execution</li>
          </ol>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/payroll/upload"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Upload payroll CSV
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

