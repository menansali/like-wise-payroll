import { NextResponse } from 'next/server';
import {
  workforceSnapshot,
  payrollCycleHealth,
  dashboardTopline,
  dashboardShortcuts,
} from '@/lib/mockData';

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  return NextResponse.json({
    topline: dashboardTopline,
    workforce: workforceSnapshot,
    cycleHealth: payrollCycleHealth,
    shortcuts: dashboardShortcuts,
    lastUpdated: new Date().toISOString(),
  });
}
