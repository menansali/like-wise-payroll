'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import NotificationBanner from '@/components/NotificationBanner';
import CategoryChips from '@/components/CategoryChips';
import CurrencyGrid from '@/components/dashboard/CurrencyGrid';
import PayrollRunTable from '@/components/payroll/PayrollRunTable';
import { currencyNeeds, payrollFilters, payrollRunRows } from '@/lib/mockData';
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

        <section className="rounded-xl border border-emerald-600 bg-emerald-600 p-6 text-emerald-50 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-emerald-100">
            Smart budget
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            Save 2% more. Convert USD → INR now.
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <Stat label="Workers in scope" value={derived.workerCount || '—'} />
          <Stat label="Countries covered" value={derived.countryCount || '—'} />
          <Stat label="Last upload" value={rows.length ? 'Moments ago' : 'None'} />
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Upcoming payrolls
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                Multi-currency coverage
              </h2>
            </div>
            <CategoryChips filters={payrollFilters} />
          </div>
          <CurrencyGrid currencies={currencyNeeds} />
        </div>

        <Card title="Steps">
          <ol className="list-decimal space-y-3 pl-4 text-sm text-slate-600">
            <li>Export payroll data from your HRIS</li>
            <li>Upload the CSV for validation</li>
            <li>Review warnings and summary before execution</li>
          </ol>
        </Card>

        <PayrollRunTable rows={payrollRunRows} />

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

