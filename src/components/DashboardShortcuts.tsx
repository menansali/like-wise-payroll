import Link from 'next/link';
import Card from '@/components/Card';
import Badge from '@/components/ui/Badge';
import { dashboardShortcuts } from '@/lib/mockData';
import type { DashboardShortcut } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export default function DashboardShortcuts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {dashboardShortcuts.map((shortcut: DashboardShortcut) => (
        <Card
          key={shortcut.title}
          variant="elevated"
          className="group transition-all hover:shadow-lg"
          title={
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">{shortcut.title}</span>
              {shortcut.tag && <Badge variant="default" size="sm">{shortcut.tag}</Badge>}
            </div>
          }
          actions={
            <Link
              href={shortcut.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
            >
              Open
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        >
          <p className="text-base text-slate-600">{shortcut.description}</p>
        </Card>
      ))}
    </div>
  );
}

