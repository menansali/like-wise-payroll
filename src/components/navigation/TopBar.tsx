'use client';

import NotificationsDropdown from './NotificationsDropdown';

export default function TopBar() {
  return (
    <header className="relative z-50 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Wise
        </p>
        <p className="text-lg font-semibold text-slate-900">Business Admin</p>
      </div>
      <div className="flex items-center gap-4">
        <NotificationsDropdown />
        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 border border-emerald-200">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
            KR
          </span>
          Kunnar Raghav
        </div>
      </div>
    </header>
  );
}

