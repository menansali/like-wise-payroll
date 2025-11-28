import Card from '@/components/Card';
import type { PaymentSummary } from '@/lib/types';

type Props = {
  summary: PaymentSummary;
};

export default function PaymentSummaryCard({ summary }: Props) {

  return (
    <Card title="Payment Summary">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryStat label="Workers in run" value={summary.totalWorkers} />
          <SummaryStat
            label={`Total in ${summary.baseCurrency}`}
            value={formatCurrency(
              summary.totalBaseAmount,
              summary.baseCurrency,
            )}
          />
          <SummaryStat
            label="Wise fee (est.)"
            value={formatCurrency(summary.wiseFee, summary.baseCurrency)}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">
            FX breakdown
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {summary.totalsByCurrency.map((item) => (
              <div
                key={item.currency}
                className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800">
                    {item.currency}
                  </p>
                  <p className="text-slate-600">
                    {formatCurrency(item.amount, item.currency)}
                  </p>
                </div>
                <p className="text-xs text-slate-500">
                  {formatCurrency(item.amountInBase, summary.baseCurrency)} base
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">
            Settlement estimates
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {summary.settlement.map((item) => (
              <div
                key={item.currency}
                className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-sm"
              >
                <p className="font-semibold text-slate-800">{item.currency}</p>
                <p className="text-slate-500">{item.eta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function SummaryStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

