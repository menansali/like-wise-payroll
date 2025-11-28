import Card from '@/components/Card';
import type { PayrollRow, ValidationIssue } from '@/lib/types';

type Props = {
  rows: PayrollRow[] | ValidationIssue[];
  type: 'error' | 'warning' | 'valid';
};

const typeStyles: Record<Props['type'], { label: string; badge: string }> = {
  error: {
    label: 'Errors',
    badge: 'bg-rose-100 text-rose-700',
  },
  warning: {
    label: 'Warnings',
    badge: 'bg-amber-100 text-amber-800',
  },
  valid: {
    label: 'Ready',
    badge: 'bg-emerald-100 text-emerald-700',
  },
};

export default function ValidationTable({ rows, type }: Props) {
  const info = typeStyles[type];

  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          {info.label}
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${info.badge}`}
          >
            {rows.length}
          </span>
        </span>
      }
    >
      {rows.length === 0 ? (
        <p className="text-sm text-slate-500">No records in this section.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="pb-2">Employee</th>
                <th className="pb-2">Country</th>
                <th className="pb-2">Currency</th>
                <th className="pb-2">Amount / bank</th>
                {type !== 'valid' && <th className="pb-2">Notes</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={`${row.employeeId}-${row.bankAccount}`}>
                  <td className="py-2 font-medium text-slate-800">{row.name}</td>
                  <td className="py-2 text-slate-600">{row.country}</td>
                  <td className="py-2 text-slate-600">{row.currency}</td>
                  <td className="py-2 text-slate-600">
                    <p className="font-semibold text-slate-800">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: row.currency || 'USD',
                        maximumFractionDigits: 2,
                      }).format(Number(row.amount))}
                    </p>
                    <p className="text-xs text-slate-500">{row.bankAccount}</p>
                  </td>
                  {'message' in row && type !== 'valid' && (
                    <td className="py-2 text-rose-600">{row.message}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

