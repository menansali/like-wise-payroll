type Props = {
  baseLabel: string;
  baseValue: string;
  baseCurrency: string;
  targetLabel: string;
  targetValue: string;
  targetCurrency: string;
  fees: Array<{ label: string; value: string }>;
  totalFees: string;
  status: string;
  paymentMethod: string;
};

export default function TransferCard({
  baseLabel,
  baseValue,
  baseCurrency,
  targetLabel,
  targetValue,
  targetCurrency,
  fees,
  totalFees,
  status,
  paymentMethod,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="grid gap-4 md:grid-cols-2">
          <LabeledField label={baseLabel}>
            <CurrencyField value={baseValue} currency={baseCurrency} />
          </LabeledField>
          <LabeledField label={targetLabel}>
            <CurrencyField value={targetValue} currency={targetCurrency} />
          </LabeledField>
        </div>
      </div>
      <div className="px-6 py-4">
        <ul className="space-y-2 text-sm text-slate-600">
          {fees.map((fee) => (
            <li key={fee.label} className="flex justify-between">
              <span>{fee.label}</span>
              <span>{fee.value}</span>
            </li>
          ))}
        </ul>
        <div className="my-4 h-px bg-slate-100" />
        <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
          <span>Total included fees (0.30%)</span>
          <span>{totalFees}</span>
        </div>
      </div>
      <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-600">
        <p>{status}</p>
        <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
          Paying with
        </p>
        <p className="font-semibold text-slate-900">{paymentMethod}</p>
      </div>
      <div className="border-t border-slate-100 px-6 py-4">
        <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          Send money
        </button>
      </div>
    </div>
  );
}

function LabeledField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-600">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

function CurrencyField({ value, currency }: { value: string; currency: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900">
      <span>{value}</span>
      <span className="text-sm text-slate-500">{currency}</span>
    </div>
  );
}

