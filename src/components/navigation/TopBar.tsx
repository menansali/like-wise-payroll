'use client';

import { Bell } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Wise
        </p>
        <p className="text-lg font-semibold text-slate-900">Business Admin</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          type='button'
          className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
            KR
          </span>
          Kunnar Raghav
        </div>
      </div>
    </header>
  );
}

