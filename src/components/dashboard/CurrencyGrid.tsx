import Card from '@/components/Card';
import Badge from '@/components/ui/Badge';
import type { CurrencyNeed } from '@/lib/types';

type Props = {
  currencies: CurrencyNeed[];
};

export default function CurrencyGrid({ currencies }: Props) {
  const getStatusBadge = (status: CurrencyNeed['status']) => {
    switch (status) {
      case 'running-low':
        return <Badge variant="warning" size="sm">Running low</Badge>;
      case 'surplus':
        return <Badge variant="success" size="sm">Covered</Badge>;
      default:
        return <Badge variant="default" size="sm">Open</Badge>;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {currencies.map((item) => (
        <Card key={item.id} className="h-full transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
              <span className="text-xl">{item.flag}</span>
              {item.country}
            </span>
            {getStatusBadge(item.status)}
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {item.currencyLabel}
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {formatNumber(item.requiredAmount)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                You need
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {formatNumber(item.bufferAmount)}
              </p>
            </div>
          </div>
          {item.message && (
            <p className="mt-4 text-sm text-slate-600">{item.message}</p>
          )}
        </Card>
      ))}
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(value);
}

