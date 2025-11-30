'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Badge from '@/components/ui/Badge';
import { workforceSnapshot as defaultSnapshot } from '@/lib/mockData';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

type WorkforceData = typeof defaultSnapshot;

export default function WorkforceSnapshot() {
  const [data, setData] = useState<WorkforceData>(defaultSnapshot);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const result = await response.json();
          setData(result.workforce);
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
      <Card title="Workforce Snapshot" variant="elevated">
        <div className="animate-pulse space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="h-24 rounded-2xl bg-slate-100" />
            <div className="h-24 rounded-2xl bg-slate-100" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-slate-100" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Workforce Snapshot" variant="elevated">
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              New joiners this month
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              +{data.newJoiners}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Offboarded
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {data.offboarded}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Totals by country</h3>
          <div className="space-y-3">
            {data.countries.map((country) => (
              <div
                key={country.country}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <p className="font-bold text-slate-900">{country.country}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {country.employees} employees · {country.contractors}{' '}
                    contractors
                  </p>
                </div>
                <p className="text-lg font-bold text-slate-900">
                  {formatter.format(country.cost)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Classification mix</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success" size="md">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Employees {data.classification.employees}
            </Badge>
            <Badge variant="default" size="md">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-500" />
              Contractors {data.classification.contractors}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

