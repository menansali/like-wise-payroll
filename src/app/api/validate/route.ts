import { NextResponse } from 'next/server';
import { validateRows, getValidationStats } from '@/lib/validation';
import type { PayrollRow } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json()) as { rows?: PayrollRow[] };

  if (!body.rows) {
    return NextResponse.json(
      { message: 'Rows payload is required' },
      { status: 400 },
    );
  }

  if (body.rows.length === 0) {
    return NextResponse.json(
      { message: 'No rows to validate' },
      { status: 400 },
    );
  }

  // Simulate processing delay based on row count
  const delay = Math.min(50 + body.rows.length * 10, 500);
  await new Promise((resolve) => setTimeout(resolve, delay));

  const result = validateRows(body.rows);
  const stats = getValidationStats(result);

  return NextResponse.json({
    ...result,
    stats,
    processedAt: new Date().toISOString(),
  });
}

