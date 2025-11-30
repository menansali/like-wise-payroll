'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

export type NavLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type SideNavProps = {
  links: NavLink[];
};

export default function SideNav({ links }: SideNavProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 border-r border-slate-200 bg-white/90 px-4 py-8 lg:flex lg:flex-col">
      <div className="mb-8">
        <Image
          src="/wise_logo.svg"
          alt="Wise"
          width={120}
          height={32}
          priority
        />
      </div>
      <nav className="space-y-1 text-sm font-medium">
        {links.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'flex items-center gap-3 rounded-xl px-3 py-2 transition',
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
              )}
            >
              {link.icon && <span className="text-base">{link.icon}</span>}
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

