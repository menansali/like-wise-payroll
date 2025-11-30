'use client';

import { useState } from 'react';
import type { SmartBudgetScheduleRow } from '@/lib/types';
import { CalendarDays, Lock } from 'lucide-react';
import Card from '@/components/Card';
import AlertBanner from '@/components/ui/AlertBanner';

type Props = {
  rows: SmartBudgetScheduleRow[];
  onLockClick?: (row: SmartBudgetScheduleRow) => void;
  onSchedulePayout?: (row: SmartBudgetScheduleRow) => void;
};

function getChangeColor(change: string): string {
  const value = parseFloat(change);
  if (value > 0) return 'text-emerald-600 font-semibold';
  if (value < 0) return 'text-rose-600 font-semibold';
  return 'text-slate-600';
}

export default function ScheduleTable({ rows, onLockClick, onSchedulePayout }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [scheduleMessage, setScheduleMessage] = useState<string | null>(null);
  
  const displayedRows = showAll ? rows : rows.slice(0, 5);

  const handleSeeAll = () => {
    setShowAll(!showAll);
  };

  const handleSchedulePayout = (row: SmartBudgetScheduleRow) => {
    if (onSchedulePayout) {
      onSchedulePayout(row);
    } else {
      // Default mock behavior
      setScheduleMessage(
        `Payout scheduled for ${row.currency} (${row.country}). This would create a scheduled transfer in production.`,
      );
      setTimeout(() => setScheduleMessage(null), 5000);
    }
  };

  return (
    <div className="space-y-4">
      {scheduleMessage && (
        <AlertBanner message={scheduleMessage} variant="success" />
      )}
      <Card
        title="Schedule"
        variant="elevated"
        actions={
          <button
            onClick={handleSeeAll}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors underline-offset-4 hover:underline"
          >
            {showAll ? 'Show Less' : 'See All'}
          </button>
        }
      >
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                  Currency
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                  Change in £
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-600">
                  No. of Employees
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                  Pay Out
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedRows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`transition-colors hover:bg-slate-50 ${
                    index % 2 === 1 ? 'bg-slate-50/50' : ''
                  }`}
                >
                  {/* Currency */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                        {row.flag}
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-bold text-slate-900">
                          {row.currency}
                        </p>
                        <p className="text-sm text-slate-600">{row.country}</p>
                      </div>
                    </div>
                  </td>

                  {/* Change in £ */}
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold text-slate-500">1mo</p>
                        <p className={`text-sm ${getChangeColor(row.change1m)}`}>
                          {row.change1m}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold text-slate-500">3mos</p>
                        <p className={`text-sm ${getChangeColor(row.change3m)}`}>
                          {row.change3m}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold text-slate-500">6mos</p>
                        <p className={`text-sm ${getChangeColor(row.change6m)}`}>
                          {row.change6m}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* No. of Employees */}
                  <td className="px-6 py-4 text-center">
                    <p className="text-sm font-semibold text-slate-900">{row.employees}</p>
                  </td>

                  {/* Pay Out */}
                  <td className="px-6 py-4">
                    <p className="text-base font-bold text-slate-900">{row.payout}</p>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => onLockClick?.(row)}
                        className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700 transition-colors hover:bg-emerald-200 border border-emerald-200"
                        title="Lock rate"
                      >
                        <Lock className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSchedulePayout(row)}
                        className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 transition-colors hover:bg-emerald-100 border border-emerald-200"
                        title="Schedule payout"
                      >
                        <CalendarDays className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </Card>
    </div>
  );
}
