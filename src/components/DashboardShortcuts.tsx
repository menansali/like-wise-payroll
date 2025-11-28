import Link from 'next/link';
import Card from '@/components/Card';
import { dashboardShortcuts } from '@/lib/mockData';
import type { DashboardShortcut } from '@/lib/types';

export default function DashboardShortcuts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {dashboardShortcuts.map((shortcut: DashboardShortcut) => (
        <Card
          key={shortcut.title}
          className="flex flex-col justify-between"
          title={
            <div className="flex items-center gap-2">
              <span>{shortcut.title}</span>
              {shortcut.tag && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                  {shortcut.tag}
                </span>
              )}
            </div>
          }
          actions={
            <Link
              href={shortcut.href}
              className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
            >
              Open
            </Link>
          }
        >
          <p className="text-sm text-slate-500">{shortcut.description}</p>
        </Card>
      ))}
    </div>
  );
}

