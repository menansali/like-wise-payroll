import Card from '@/components/Card';
import type { CurrencyNeed } from '@/lib/types';

type Props = {
  currencies: CurrencyNeed[];
};

export default function CurrencyGrid({ currencies }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {currencies.map((item) => (
        <Card key={item.id} className="h-full">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="text-lg">{item.flag}</span>
              {item.country}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-semibold"
              data-status={item.status}
            >
              {item.status === 'running-low' ? 'Running low' : item.status === 'surplus' ? 'Covered' : 'Open'}
            </span>
          </div>
          <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">
            {item.currencyLabel}
          </p>
          <p className="text-2xl font-semibold text-slate-900">
            {formatNumber(item.requiredAmount)}
          </p>
          <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">
            You need
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {formatNumber(item.bufferAmount)}
          </p>
          {item.message && (
            <p className="mt-2 text-sm text-slate-500">{item.message}</p>
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

