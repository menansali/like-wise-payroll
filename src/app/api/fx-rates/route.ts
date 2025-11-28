import { NextResponse } from 'next/server';

// Base rates (mid-market rates as of simulation)
const BASE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 1.08,
  GBP: 1.27,
  INR: 0.012,
  BRL: 0.19,
  SGD: 0.74,
  JPY: 0.0067,
  CAD: 0.74,
  AUD: 0.65,
  CHF: 1.13,
  MXN: 0.058,
  PLN: 0.25,
};

// Simulate realistic rate fluctuations (±0.5%)
function getFluctuatedRate(baseRate: number): number {
  const fluctuation = (Math.random() - 0.5) * 0.01; // ±0.5%
  return baseRate * (1 + fluctuation);
}

// Calculate Wise fee (typically 0.35% - 0.75%)
function getWiseFee(amount: number, currency: string): number {
  const feeRates: Record<string, number> = {
    USD: 0.0035,
    EUR: 0.0040,
    GBP: 0.0035,
    INR: 0.0065,
    BRL: 0.0075,
    SGD: 0.0045,
  };
  return amount * (feeRates[currency] || 0.005);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from') || 'USD';
  const to = searchParams.get('to');
  const amount = parseFloat(searchParams.get('amount') || '1000');

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100));

  const timestamp = new Date().toISOString();

  // If specific conversion requested
  if (to && from !== to) {
    const fromRate = BASE_RATES[from] || 1;
    const toRate = BASE_RATES[to] || 1;
    const rate = getFluctuatedRate(toRate / fromRate);
    const convertedAmount = amount * rate;
    const fee = getWiseFee(amount, from);

    return NextResponse.json({
      from,
      to,
      amount,
      rate: parseFloat(rate.toFixed(6)),
      convertedAmount: parseFloat(convertedAmount.toFixed(2)),
      fee: parseFloat(fee.toFixed(2)),
      totalCost: parseFloat((amount + fee).toFixed(2)),
      timestamp,
      validFor: '30 seconds',
    });
  }

  // Return all rates
  const rates = Object.entries(BASE_RATES).reduce(
    (acc, [currency, baseRate]) => {
      acc[currency] = {
        rate: parseFloat(getFluctuatedRate(baseRate).toFixed(6)),
        change24h: parseFloat(((Math.random() - 0.5) * 2).toFixed(2)), // ±1% daily change
      };
      return acc;
    },
    {} as Record<string, { rate: number; change24h: number }>,
  );

  return NextResponse.json({
    base: 'USD',
    rates,
    timestamp,
    nextUpdate: '30 seconds',
  });
}
