'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
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
      <Card title="Workforce Snapshot">
        <div className="animate-pulse space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-20 rounded-lg bg-slate-100" />
            <div className="h-20 rounded-lg bg-slate-100" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-lg bg-slate-100" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Workforce Snapshot">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">New joiners this month</p>
            <p className="text-2xl font-semibold text-slate-900">
              +{data.newJoiners}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Offboarded</p>
            <p className="text-2xl font-semibold text-slate-900">
              {data.offboarded}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">
            Totals by country
          </p>
          <div className="space-y-3">
            {data.countries.map((country) => (
              <div
                key={country.country}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
              >
                <div>
                  <p className="font-medium text-slate-800">{country.country}</p>
                  <p className="text-xs text-slate-500">
                    {country.employees} employees · {country.contractors}{' '}
                    contractors
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {formatter.format(country.cost)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">
            Classification mix
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Employees {data.classification.employees}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              Contractors {data.classification.contractors}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

