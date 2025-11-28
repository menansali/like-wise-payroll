import { NextResponse } from 'next/server';

// Mock payroll run history for demo purposes
const mockPayrollRuns = [
  {
    id: 'PR-2025-11',
    period: 'Nov 1–30, 2025',
    status: 'in_progress',
    totalWorkers: 105,
    totalAmount: 752000,
    currency: 'USD',
    countries: 4,
    createdAt: '2025-11-01T10:00:00Z',
    executedAt: null,
  },
  {
    id: 'PR-2025-10',
    period: 'Oct 1–31, 2025',
    status: 'completed',
    totalWorkers: 102,
    totalAmount: 738000,
    currency: 'USD',
    countries: 4,
    createdAt: '2025-10-01T10:00:00Z',
    executedAt: '2025-10-28T14:30:00Z',
  },
  {
    id: 'PR-2025-09',
    period: 'Sep 1–30, 2025',
    status: 'completed',
    totalWorkers: 98,
    totalAmount: 712000,
    currency: 'USD',
    countries: 4,
    createdAt: '2025-09-01T10:00:00Z',
    executedAt: '2025-09-27T15:45:00Z',
  },
  {
    id: 'PR-2025-08',
    period: 'Aug 1–31, 2025',
    status: 'completed',
    totalWorkers: 95,
    totalAmount: 695000,
    currency: 'USD',
    countries: 3,
    createdAt: '2025-08-01T10:00:00Z',
    executedAt: '2025-08-29T11:20:00Z',
  },
];

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return NextResponse.json({
    runs: mockPayrollRuns,
    summary: {
      totalRuns: mockPayrollRuns.length,
      completedRuns: mockPayrollRuns.filter((r) => r.status === 'completed').length,
      totalPaid: mockPayrollRuns
        .filter((r) => r.status === 'completed')
        .reduce((sum, r) => sum + r.totalAmount, 0),
    },
  });
}
