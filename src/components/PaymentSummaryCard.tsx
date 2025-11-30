import Card from '@/components/Card';
import StatCard from '@/components/ui/StatCard';
import type { PaymentSummary } from '@/lib/types';

type Props = {
  summary: PaymentSummary;
};

export default function PaymentSummaryCard({ summary }: Props) {
  return (
    <Card title="Payment Summary" variant="elevated">
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <StatCard
            label="Workers in run"
            value={summary.totalWorkers}
            className="border-slate-200"
          />
          <StatCard
            label={`Total in ${summary.baseCurrency}`}
            value={formatCurrency(summary.totalBaseAmount, summary.baseCurrency)}
            className="border-slate-200"
          />
          <StatCard
            label="Wise fee (est.)"
            value={formatCurrency(summary.wiseFee, summary.baseCurrency)}
            className="border-slate-200"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">FX breakdown</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {summary.totalsByCurrency.map((item) => (
              <div
                key={item.currency}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-slate-900">
                    {item.currency}
                  </p>
                  <p className="text-lg font-semibold text-slate-700">
                    {formatCurrency(item.amount, item.currency)}
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {formatCurrency(item.amountInBase, summary.baseCurrency)} base
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Settlement estimates</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {summary.settlement.map((item) => (
              <div
                key={item.currency}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-base font-bold text-slate-900">{item.currency}</p>
                <p className="mt-1 text-sm text-slate-600">{item.eta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

