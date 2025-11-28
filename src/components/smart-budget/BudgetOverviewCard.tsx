import { Wallet } from 'lucide-react';

type Props = {
  amount: string;
  heldSince: string;
  currencyCount: number;
  currencies: Array<{ flag: string; code: string }>;
};

export default function BudgetOverviewCard({
  amount,
  heldSince,
  currencyCount,
  currencies,
}: Props) {
  return (
    <div className="rounded-2xl border border-emerald-950/10 bg-emerald-950/8 p-4">
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          <div className="rounded-full bg-emerald-950/8 p-3">
            <Wallet className="h-6 w-6 text-slate-700" />
          </div>
          <div className="flex flex-col gap-1 text-right">
            <p className="text-xs text-slate-500">Amount held since, {heldSince}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold text-slate-900">{amount}</p>
            <div className="flex -space-x-2">
              {currencies.map((currency, index) => (
                <div
                  key={currency.code}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-sm"
                  style={{ zIndex: currencies.length - index }}
                >
                  {currency.flag}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-600">
            {currencyCount} currency conversions included
          </p>
        </div>
      </div>
    </div>
  );
}

