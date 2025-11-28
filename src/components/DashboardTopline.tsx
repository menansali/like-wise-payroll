import Card from '@/components/Card';
import { dashboardTopline } from '@/lib/mockData';
import type { DashboardTopline as DashboardToplineType } from '@/lib/types';

const data: DashboardToplineType = dashboardTopline;

export default function DashboardTopline() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {data.cycleLabel}
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          {data.cycleCountdown}
        </p>
        <p className="text-sm text-slate-500">
          Includes onboarding and approval buffers.
        </p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Funds needed this month
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          {formatCurrency(data.totalFunds, data.currency)}
        </p>
        <p className="text-sm text-slate-500">
          Includes 12 countries / 3 currencies.
        </p>
      </Card>
      <Card variant="dark">
        <p className="text-xs uppercase tracking-wide text-slate-200">
          {data.smartAlert.title}
        </p>
        <p className="mt-2 text-lg font-semibold text-white">
          {data.smartAlert.message}
        </p>
        <p className="text-sm text-slate-200">
          Save approximately {data.smartAlert.savingsPercent}% vs. last FX trade.
        </p>
      </Card>
    </div>
  );
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

