import Card from '@/components/Card';
import { workforceSnapshot } from '@/lib/mockData';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function WorkforceSnapshot() {
  return (
    <Card title="Workforce Snapshot">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">New joiners this month</p>
            <p className="text-2xl font-semibold text-slate-900">
              +{workforceSnapshot.newJoiners}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Offboarded</p>
            <p className="text-2xl font-semibold text-slate-900">
              {workforceSnapshot.offboarded}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">
            Totals by country
          </p>
          <div className="space-y-3">
            {workforceSnapshot.countries.map((country) => (
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
              Employees {workforceSnapshot.classification.employees}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              Contractors {workforceSnapshot.classification.contractors}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

