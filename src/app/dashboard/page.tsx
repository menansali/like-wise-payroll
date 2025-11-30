'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import NotificationBanner from '@/components/NotificationBanner';
import PayrollCycleHealth from '@/components/PayrollCycleHealth';
import WorkforceSnapshot from '@/components/WorkforceSnapshot';
import DashboardTopline from '@/components/DashboardTopline';
import DashboardShortcuts from '@/components/DashboardShortcuts';
import CurrencyGrid from '@/components/dashboard/CurrencyGrid';
import EmployeeListSection from '@/components/dashboard/EmployeeListSection';
import CategoryChips from '@/components/CategoryChips';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import {
  currencyNeeds,
  dashboardEmployees,
  payrollFilters,
} from '@/lib/mockData';
import type { CurrencyNeed } from '@/lib/types';

export default function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState(payrollFilters[0]?.id ?? '');

  const filteredCurrencies = useMemo(() => {
    if (!selectedFilter || selectedFilter === 'all') {
      return currencyNeeds;
    }
    
    // Mock filtering logic - filter by status or other criteria
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
          subtitle="Welcome back"
          title="Workforce overview"
          actions={
            <Link href="/payroll">
              <Button>Start payroll run</Button>
            </Link>
          }
        />

        <NotificationBanner
          message="Payroll due in 7 days for your team"
          variant="info"
        />
        <DashboardTopline />
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Upcoming payrolls
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 lg:text-3xl">
                Currency coverage
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

        <div className="grid gap-6 lg:grid-cols-2">
          <WorkforceSnapshot />
          <PayrollCycleHealth />
        </div>

        <EmployeeListSection rows={dashboardEmployees} />

        <DashboardShortcuts />
      </div>
    </Layout>
  );
}

