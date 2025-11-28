import Card from '@/components/Card';
import { payrollCycleHealth } from '@/lib/mockData';

export default function PayrollCycleHealth() {
  return (
    <Card title="Payroll Cycle Health">
      <div className="space-y-6">
        <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
          <p className="text-xs uppercase tracking-wide text-amber-700">
            Next deadline
          </p>
          <p className="text-lg font-semibold text-amber-900">
            {payrollCycleHealth.nextDeadline.region}
          </p>
          <p className="text-sm text-amber-800">
            Cut-off on {payrollCycleHealth.nextDeadline.date}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">% payroll completed</p>
            <p className="text-2xl font-semibold text-slate-900">
              {payrollCycleHealth.completion}%
            </p>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-slate-900"
                style={{ width: `${payrollCycleHealth.completion}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Pending approvals</p>
            <p className="text-2xl font-semibold text-slate-900">
              {payrollCycleHealth.pendingApprovals}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">
            Routing delays
          </p>
          <div className="space-y-2 text-sm text-slate-600">
            {payrollCycleHealth.routingIssues.map((issue) => (
              <div
                key={issue.region}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
              >
                <p className="font-medium text-slate-800">
                  {issue.region} · {issue.note}
                </p>
                <span className="text-xs font-semibold text-slate-500">
                  {issue.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">
            At-risk payments
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            {payrollCycleHealth.atRisk.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-rose-900"
              >
                <span>{item.name}</span>
                <span className="font-semibold">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

