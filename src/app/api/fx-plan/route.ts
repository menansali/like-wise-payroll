import { NextResponse } from 'next/server';
import type { FxPlanDetails } from '@/lib/types';

type FxPlanRequest = {
  action: 'convert_now' | 'schedule' | 'lock_rate';
  plan: {
    baseCurrency: string;
    targetCurrency: string;
    amountInBase: number;
    amountInTarget: number;
    indicativeRate: number;
    payrollDate: string;
  };
};

// Mock rate generation with slight variation
function getMockRate(baseRate: number): number {
  const variation = (Math.random() - 0.5) * 0.002; // ±0.1% variation
  return baseRate * (1 + variation);
}

// Calculate Wise fee (0.35% - 0.75% depending on currency)
function calculateWiseFee(amount: number, currency: string): number {
  const feeRates: Record<string, number> = {
    USD: 0.0035,
    EUR: 0.0040,
    GBP: 0.0035,
    INR: 0.0065,
    BRL: 0.0075,
    SGD: 0.0045,
    HKD: 0.0040,
    KES: 0.0060,
    ARS: 0.0075,
  };
  return amount * (feeRates[currency] || 0.005);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FxPlanRequest;

    if (!body.action || !body.plan) {
      return NextResponse.json(
        { error: 'Missing action or plan data' },
        { status: 400 },
      );
    }

    // Simulate API delay (800-1200ms)
    const delay = 800 + Math.random() * 400;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const { action, plan } = body;
    const timestamp = Date.now();
    let result: FxPlanDetails;

    switch (action) {
      case 'convert_now': {
        const lockedRate = getMockRate(plan.indicativeRate);
        const convertedAmount = plan.amountInBase * lockedRate;
        const fee = calculateWiseFee(plan.amountInBase, plan.baseCurrency);

        result = {
          type: 'convert_now',
          rate: parseFloat(lockedRate.toFixed(6)),
          timestamp,
          convertedAmount: parseFloat(convertedAmount.toFixed(2)),
          fee: parseFloat(fee.toFixed(2)),
        };
        break;
      }

      case 'schedule': {
        result = {
          type: 'schedule',
          payday: plan.payrollDate,
          strategy: 'auto-convert',
          scheduledAt: timestamp,
        };
        break;
      }

      case 'lock_rate': {
        const lockedRate = getMockRate(plan.indicativeRate);
        const expiresAt = timestamp + 24 * 60 * 60 * 1000; // 24 hours from now

        result = {
          type: 'rate_lock',
          expiresAt,
          lockedRate: parseFloat(lockedRate.toFixed(6)),
          lockedAt: timestamp,
        };
        break;
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 },
        );
    }

    return NextResponse.json({
      success: true,
      plan: result,
      message: getSuccessMessage(action),
    });
  } catch (error) {
    console.error('FX Plan API error:', error);
    return NextResponse.json(
      { error: 'Failed to process FX plan' },
      { status: 500 },
    );
  }
}

function getSuccessMessage(action: string): string {
  switch (action) {
    case 'convert_now':
      return 'Rate locked and conversion initiated';
    case 'schedule':
      return 'Conversion scheduled for payday';
    case 'lock_rate':
      return 'Rate locked for 24 hours';
    default:
      return 'FX plan updated';
  }
}

