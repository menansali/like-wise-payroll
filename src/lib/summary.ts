import { settlementTimes } from '@/lib/mockData';
import type { FxOption, FxPlan, PaymentSummary, PayrollRow } from '@/lib/types';

const FX_TO_USD: Record<string, number> = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  INR: 0.012,
  BRL: 0.19,
  SGD: 0.74,
};

const BASE_CURRENCY = 'USD';

export function buildPaymentSummary(rows: PayrollRow[]): PaymentSummary {
  const totalsByCurrency = rows.reduce<Record<string, number>>(
    (acc, row) => ({
      ...acc,
      [row.currency]: (acc[row.currency] ?? 0) + row.amount,
    }),
    {},
  );

  const totalsByCountry = rows.reduce<Record<string, { amount: number; workers: number }>>(
    (acc, row) => {
      if (!acc[row.country]) {
        acc[row.country] = { amount: 0, workers: 0 };
      }
      acc[row.country].amount += row.amount;
      acc[row.country].workers += 1;
      return acc;
    },
    {},
  );

  const totalsByCurrencyArray = Object.entries(totalsByCurrency).map(
    ([currency, amount]) => ({
      currency,
      amount,
      amountInBase: amount * (FX_TO_USD[currency] ?? 1),
    }),
  );

  const totalBaseAmount = totalsByCurrencyArray.reduce(
    (sum, item) => sum + item.amountInBase,
    0,
  );

  const wiseFee = totalBaseAmount * 0.005;

  const settlement = totalsByCurrencyArray.map((item) => ({
    currency: item.currency,
    eta: settlementTimes[item.currency] ?? 'Within 2 business days',
  }));

  const fxPlan = buildFxPlan(totalsByCurrencyArray);

  return {
    totalWorkers: rows.length,
    totalsByCurrency: totalsByCurrencyArray,
    totalsByCountry: Object.entries(totalsByCountry).map(
      ([country, stats]) => ({
        country,
        amount: stats.amount,
        workers: stats.workers,
      }),
    ),
    baseCurrency: BASE_CURRENCY,
    totalBaseAmount,
    wiseFee,
    settlement,
    fxPlan,
  };
}

function buildFxPlan(
  totalsByCurrency: Array<{ currency: string; amount: number; amountInBase: number }>,
): FxPlan | undefined {
  const target = totalsByCurrency.find((item) => item.currency !== BASE_CURRENCY);

  if (!target) {
    return undefined;
  }

  const indicativeRate =
    target.amount > 0 ? target.amountInBase / target.amount : FX_TO_USD[target.currency] ?? 1;

  const options: FxOption[] = [
    {
      id: 'convert-now',
      label: 'Convert now',
      description: 'Settle instantly and remove currency risk.',
      actionLabel: 'Convert',
      details: 'Locks funding today at current mid-market rate.',
      recommended: true,
    },
    {
      id: 'schedule-payday',
      label: 'Schedule for payday',
      description: 'Auto-convert on payroll cut-off.',
      actionLabel: 'Schedule',
      details: 'Wise will notify you if the market moves ±1% beforehand.',
    },
    {
      id: 'lock-rate',
      label: 'Lock rate for 24h',
      description: 'Hold today’s rate while you finalize validations.',
      actionLabel: 'Lock',
      details: 'Ideal when approvals finish within 24 hours.',
    },
  ];

  return {
    payrollDate: 'Nov 30, 2025',
    baseCurrency: BASE_CURRENCY,
    targetCurrency: target.currency,
    amountInBase: target.amountInBase,
    amountInTarget: target.amount,
    indicativeRate,
    options,
  };
}

