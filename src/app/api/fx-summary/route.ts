import { NextResponse } from 'next/server';
import { fetchFxRates, getFallbackFxRates } from '@/lib/fx';
import { buildPaymentSummary } from '@/lib/summary';
import type { PayrollRow } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json()) as { rows?: PayrollRow[] };

  if (!body.rows) {
    return NextResponse.json(
      { message: 'Rows payload is required' },
      { status: 400 },
    );
  }

  let rates = getFallbackFxRates();

  try {
    // Try external FX API first; silently fall back to demo rates if anything goes wrong.
    rates = await fetchFxRates();
  } catch {
    rates = getFallbackFxRates();
  }

  const summary = buildPaymentSummary(body.rows, rates);
  return NextResponse.json(summary);
}


