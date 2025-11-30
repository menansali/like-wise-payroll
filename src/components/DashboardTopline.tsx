'use client';

import { useEffect, useState } from 'react';
import StatCard from '@/components/ui/StatCard';
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
      <div className="grid gap-6 lg:grid-cols-3">
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
    <div className="grid gap-6 lg:grid-cols-3">
      <StatCard
        label={data.cycleLabel}
        value={data.cycleCountdown}
        description="Includes onboarding and approval buffers."
      />
      <StatCard
        label="Funds needed this month"
        value={formatCurrency(data.totalFunds, data.currency)}
        description="Includes 12 countries / 3 currencies."
      />
      <Card variant="default" className="!border-emerald-500 !bg-emerald-500 !text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100">
          {data.smartAlert.title}
        </p>
        <p className="mt-3 text-xl font-bold text-white lg:text-2xl">
          {data.smartAlert.message}
        </p>
        <p className="mt-2 text-sm text-emerald-100">
          Save approximately {data.smartAlert.savingsPercent}% vs. last FX trade.
        </p>
      </Card>
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

