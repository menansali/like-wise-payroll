import type { SmartBudgetScheduleRow } from '@/lib/types';
import { CalendarDays, Lock } from 'lucide-react';

type Props = {
  rows: SmartBudgetScheduleRow[];
  onLockClick?: (row: SmartBudgetScheduleRow) => void;
};

function getChangeColor(change: string): string {
  const value = parseFloat(change);
  if (value > 0) return 'text-emerald-600';
  if (value < 0) return 'text-rose-600';
  return 'text-slate-600';
}

export default function ScheduleTable({ rows, onLockClick }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Schedule</h2>
        <button className="relative rounded-full px-6 py-3 text-sm font-semibold text-emerald-950 hover:underline">
          See All
          <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-emerald-950" />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[300px_176px_120px_1fr_120px] gap-0">
          {/* Header */}
          <div className="border-b border-slate-200 p-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Currency
            </p>
          </div>
          <div className="border-b border-l border-slate-200 p-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Change in £
            </p>
          </div>
          <div className="border-b border-l border-slate-200 p-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              No. of Employees
            </p>
          </div>
          <div className="border-b border-l border-slate-200 p-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Pay Out
            </p>
          </div>
          <div className="border-b border-l border-slate-200 p-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 text-center">
              Action
            </p>
          </div>

          {/* Rows */}
          {rows.map((row) => (
            <div
              key={row.id}
              className="contents [&>div]:border-b [&>div:last-child]:border-b-0"
            >
              {/* Currency */}
              <div className="border-b border-slate-200 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">
                    {row.flag}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-slate-900">
                      {row.currency}
                    </p>
                    <p className="text-sm text-slate-600">{row.country}</p>
                  </div>
                </div>
              </div>

              {/* Change in £ */}
              <div className="border-b border-l border-slate-200 p-4">
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-slate-900">1mo</p>
                    <p className={`text-sm ${getChangeColor(row.change1m)}`}>
                      {row.change1m}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-slate-900">3mos</p>
                    <p className={`text-sm ${getChangeColor(row.change3m)}`}>
                      {row.change3m}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-slate-900">6mos</p>
                    <p className={`text-sm ${getChangeColor(row.change6m)}`}>
                      {row.change6m}
                    </p>
                  </div>
                </div>
              </div>

              {/* No. of Employees */}
              <div className="border-b border-l border-slate-200 p-4">
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-slate-600">{row.employees}</p>
                </div>
              </div>

              {/* Pay Out */}
              <div className="border-b border-l border-slate-200 p-4">
                <div className="flex h-full items-center">
                  <p className="text-base font-semibold text-slate-900">{row.payout}</p>
                </div>
              </div>

              {/* Action */}
              <div className="border-b border-l border-slate-200 p-4">
                <div className="flex h-full items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => onLockClick?.(row)}
                    className="rounded-full bg-emerald-950/8 p-2 hover:bg-emerald-950/12"
                    title="Lock rate"
                  >
                    <Lock className="h-5 w-5 text-slate-700" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-emerald-950/8 p-2 hover:bg-emerald-950/12"
                    title="Schedule payout"
                  >
                    <CalendarDays className="h-5 w-5 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
