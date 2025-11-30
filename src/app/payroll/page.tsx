'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import NotificationBanner from '@/components/NotificationBanner';
import CategoryChips from '@/components/CategoryChips';
import CurrencyGrid from '@/components/dashboard/CurrencyGrid';
import PayrollRunTable from '@/components/payroll/PayrollRunTable';
import { currencyNeeds, payrollFilters, payrollRunRows } from '@/lib/mockData';
import { usePayrun } from '@/context/PayrunContext';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';
import type { CurrencyNeed } from '@/lib/types';

export default function PayrollLandingPage() {
  const { payrollPeriod, derived, rows } = usePayrun();
  const [selectedFilter, setSelectedFilter] = useState(payrollFilters[0]?.id ?? '');

  const filteredCurrencies = useMemo(() => {
    if (!selectedFilter || selectedFilter === 'all') {
      return currencyNeeds;
    }
    
    // Mock filtering logic - filter by status
    return currencyNeeds.filter((currency) => {
      if (selectedFilter === 'open') {
        return currency.status === 'open';
      }
      if (selectedFilter === 'running-low') {
        return currency.status === 'running-low';
      }
      if (selectedFilter === 'surplus') {
        return currency.status === 'surplus';
      }
      return true;
    });
  }, [selectedFilter]);

  return (
    <Layout>
      <div className="space-y-8">
        <SectionHeader
          subtitle="Current run"
          title={payrollPeriod}
          description="Review the scope of the current cycle before uploading the payroll file."
        />

        <NotificationBanner
          message="Payroll due in 7 days for your team"
          variant="info"
        />

        <Card variant="default" className="!border-emerald-500 !bg-emerald-500 !text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100">
            Smart budget
          </p>
          <p className="mt-3 text-xl font-bold text-white lg:text-2xl">
            Save 2% more. Convert USD → INR now.
          </p>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            label="Workers in scope"
            value={derived.workerCount || '—'}
          />
          <StatCard
            label="Countries covered"
            value={derived.countryCount || '—'}
          />
          <StatCard
            label="Last upload"
            value={rows.length ? 'Moments ago' : 'None'}
          />
        </div>

        <Card variant="elevated" padding="lg">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Upcoming payrolls
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900 lg:text-3xl">
                  Multi-currency coverage
                </h2>
              </div>
              <CategoryChips 
                filters={payrollFilters} 
                onChange={setSelectedFilter}
                defaultFilter={selectedFilter}
              />
            </div>
            <CurrencyGrid currencies={filteredCurrencies} />
          </div>
        </Card>

        <Card title="Steps" variant="elevated">
          <ol className="list-decimal space-y-4 pl-6 text-base text-slate-700">
            <li>Export payroll data from your HRIS</li>
            <li>Upload the CSV for validation</li>
            <li>Review warnings and summary before execution</li>
          </ol>
        </Card>

        <PayrollRunTable rows={payrollRunRows} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/payroll/upload">
            <Button size="lg">Upload payroll CSV</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" size="lg">
              Back to dashboard
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

