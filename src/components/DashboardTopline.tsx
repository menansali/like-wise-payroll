'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { dashboardTopline } from '@/lib/mockData';
import type { DashboardTopline as DashboardToplineType } from '@/lib/types';

export default function DashboardTopline() {
  const [data, setData] = useState<DashboardToplineType>(dashboardTopline);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const result = await response.json();
          setData(result.topline);
        }
      } catch {
        // Use fallback data on error
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <div className="animate-pulse space-y-3">
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="h-8 w-32 rounded bg-slate-200" />
              <div className="h-3 w-40 rounded bg-slate-200" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {data.cycleLabel}
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          {data.cycleCountdown}
        </p>
        <p className="text-sm text-slate-500">
          Includes onboarding and approval buffers.
        </p>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Funds needed this month
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          {formatCurrency(data.totalFunds, data.currency)}
        </p>
        <p className="text-sm text-slate-500">
          Includes 12 countries / 3 currencies.
        </p>
      </Card>
      <section className="rounded-xl border border-emerald-600 bg-emerald-600 p-6 text-emerald-50 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-emerald-100">
          {data.smartAlert.title}
        </p>
        <p className="mt-2 text-lg font-semibold text-white">
          {data.smartAlert.message}
        </p>
        <p className="text-sm text-emerald-100">
          Save approximately {data.smartAlert.savingsPercent}% vs. last FX trade.
        </p>
      </section>
    </div>
  );
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

