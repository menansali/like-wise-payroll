import Link from 'next/link';
import Layout from '@/components/Layout';
import NotificationBanner from '@/components/NotificationBanner';
import PayrollCycleHealth from '@/components/PayrollCycleHealth';
import WorkforceSnapshot from '@/components/WorkforceSnapshot';
import DashboardTopline from '@/components/DashboardTopline';
import DashboardShortcuts from '@/components/DashboardShortcuts';

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

        <div className="grid gap-6 lg:grid-cols-2">
          <WorkforceSnapshot />
          <PayrollCycleHealth />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-700">
            Explore deeper workflows
          </p>
          <p className="text-xs text-slate-500">
            These links mirror the FigJam LikeWise navigation.
          </p>
          <div className="mt-3">
            <DashboardShortcuts />
          </div>
        </div>
      </div>
    </Layout>
  );
}

