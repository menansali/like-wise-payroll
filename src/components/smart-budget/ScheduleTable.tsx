import Card from '@/components/Card';
import type { SmartBudgetScheduleRow } from '@/lib/types';
import { CalendarClock, Lock } from 'lucide-react';

type Props = {
  rows: SmartBudgetScheduleRow[];
};

export default function ScheduleTable({ rows }: Props) {
  return (
    <Card title="Schedule">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="pb-2">Currency</th>
              <th className="pb-2 text-right">Change (1m)</th>
              <th className="pb-2 text-right">Change (3m)</th>
              <th className="pb-2 text-right">Change (6m)</th>
              <th className="pb-2 text-right">Employees</th>
              <th className="pb-2 text-right">Pay out</th>
              <th className="pb-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="py-3">
                  <div className="font-semibold text-slate-900">
                    <span className="mr-2 text-lg">{row.flag}</span>
                    {row.currency}
                  </div>
                  <p className="text-xs text-slate-500">{row.country}</p>
                </td>
                <td className="py-3 text-right text-slate-600">{row.change1m}</td>
                <td className="py-3 text-right text-slate-600">{row.change3m}</td>
                <td className="py-3 text-right text-slate-600">{row.change6m}</td>
                <td className="py-3 text-right text-slate-600">{row.employees}</td>
                <td className="py-3 text-right font-semibold text-slate-900">
                  {row.payout}
                </td>
                <td className="py-3 text-right text-slate-600">
                  <div className="flex justify-end gap-2 text-slate-500">
                    <button className="rounded-full border border-slate-200 p-2 hover:bg-slate-100">
                      <Lock className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button className="rounded-full border border-slate-200 p-2 hover:bg-slate-100">
                      <CalendarClock className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">{row.actionNotes}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

