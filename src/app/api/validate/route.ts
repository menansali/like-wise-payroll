import { NextResponse } from 'next/server';
import { validateRows } from '@/lib/validation';
import type { PayrollRow } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json()) as { rows?: PayrollRow[] };

  if (!body.rows) {
    return NextResponse.json(
      { message: 'Rows payload is required' },
      { status: 400 },
    );
  }

  const result = validateRows(body.rows);
  return NextResponse.json(result);
}

