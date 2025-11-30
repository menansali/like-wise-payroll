'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Badge from '@/components/ui/Badge';
import { payrollCycleHealth as defaultData } from '@/lib/mockData';

type CycleHealthData = typeof defaultData;

export default function PayrollCycleHealth() {
  const [data, setData] = useState<CycleHealthData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const result = await response.json();
          setData(result.cycleHealth);
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
      <Card title="Payroll Cycle Health" variant="elevated">
        <div className="animate-pulse space-y-6">
          <div className="h-28 rounded-2xl bg-amber-50" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="h-28 rounded-2xl bg-slate-100" />
            <div className="h-28 rounded-2xl bg-slate-100" />
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-slate-100" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Payroll Cycle Health" variant="elevated">
      <div className="space-y-8">
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            Next deadline
          </p>
          <p className="mt-2 text-xl font-bold text-amber-900">
            {data.nextDeadline.region}
          </p>
          <p className="mt-1 text-sm font-medium text-amber-800">
            Cut-off on {data.nextDeadline.date}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              % payroll completed
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {data.completion}%
            </p>
            <div className="mt-4 h-3 rounded-full bg-emerald-100">
              <div
                className="h-3 rounded-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${data.completion}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Pending approvals
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {data.pendingApprovals}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Routing delays</h3>
          <div className="space-y-3">
            {data.routingIssues.map((issue) => (
              <div
                key={issue.region}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="font-semibold text-slate-900">
                  {issue.region} · {issue.note}
                </p>
                <Badge variant="warning" size="sm">{issue.count}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">At-risk payments</h3>
          <div className="space-y-3">
            {data.atRisk.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-4 shadow-sm"
              >
                <span className="font-semibold text-rose-900">{item.name}</span>
                <Badge variant="error" size="sm">{item.count}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

