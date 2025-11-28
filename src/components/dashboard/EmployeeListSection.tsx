import Link from 'next/link';
import Card from '@/components/Card';
import type { DashboardEmployeeRow } from '@/lib/types';

type Props = {
  rows: DashboardEmployeeRow[];
};

export default function EmployeeListSection({ rows }: Props) {
  return (
    <Card
      title="Employee list"
      actions={
        <Link href="/payroll" className="text-sm font-semibold text-slate-900">
          View all
        </Link>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="pb-2">Employee</th>
              <th className="pb-2">Payment currency</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="py-3">
                  <div className="font-semibold text-slate-900">
                    {row.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    <span className="mr-1">{row.countryFlag}</span>
                    {row.tag ?? row.country}
                  </div>
                </td>
                <td className="py-3 text-slate-600">{row.paymentCurrency}</td>
                <td className="py-3 font-semibold text-slate-900">
                  <div>{row.amountLocal}</div>
                  <div className="text-xs font-normal text-slate-500">
                    {row.amountSource}
                  </div>
                </td>
                <td className="py-3 text-sm text-slate-600">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

