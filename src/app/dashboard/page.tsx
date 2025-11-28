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
import {
  currencyNeeds,
  dashboardEmployees,
  payrollFilters,
} from '@/lib/mockData';

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">
              Welcome back
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Workforce overview
            </h1>
          </div>
          <Link
            href="/payroll"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Start payroll run
          </Link>
        </div>

        <NotificationBanner message="Payroll due in 7 days for your team" />
        <DashboardTopline />
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Upcoming payrolls
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                Currency coverage
              </h2>
            </div>
            <CategoryChips filters={payrollFilters} />
          </div>
          <div className="mt-4">
            <CurrencyGrid currencies={currencyNeeds} />
          </div>
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

