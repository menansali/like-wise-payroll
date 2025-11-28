import { NextResponse } from 'next/server';
import type { PayrollRow, ExecutionResult } from '@/lib/types';

type ExecuteRequest = {
  rows: PayrollRow[];
  fxOption?: string;
};

// Simulated execution with realistic delays and responses
export async function POST(request: Request) {
  const body = (await request.json()) as ExecuteRequest;

  if (!body.rows || body.rows.length === 0) {
    return NextResponse.json(
      { message: 'No payroll rows provided' },
      { status: 400 },
    );
  }

  // Simulate processing delay (300-800ms)
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500));

  const totalRows = body.rows.length;

  // Simulate realistic success rate (95-100%)
  const successRate = 0.95 + Math.random() * 0.05;
  const successCount = Math.round(totalRows * successRate);
  const failedCount = totalRows - successCount;

  // Generate detailed execution results
  const executionDetails = body.rows.map((row, index) => ({
    employeeId: row.employeeId,
    name: row.name,
    amount: row.amount,
    currency: row.currency,
    status: index < successCount ? 'completed' : 'pending_review',
    transactionId: `TXN-${Date.now()}-${index.toString().padStart(4, '0')}`,
    estimatedArrival: getEstimatedArrival(row.currency),
  }));

  const result: ExecutionResult & { details?: typeof executionDetails; fxOption?: string } = {
    successCount,
    failedCount,
    details: executionDetails,
    fxOption: body.fxOption || 'convert-now',
  };

  return NextResponse.json(result);
}

function getEstimatedArrival(currency: string): string {
  const arrivals: Record<string, string> = {
    USD: 'Today by 5pm EST',
    EUR: 'Tomorrow by 12pm CET',
    GBP: 'Today by 6pm GMT',
    INR: '2-3 business days',
    BRL: 'Tomorrow by 3pm BRT',
    SGD: 'Today by 8pm SGT',
  };
  return arrivals[currency] || '2-3 business days';
}
