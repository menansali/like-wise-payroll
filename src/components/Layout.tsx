'use client';

import { LayoutDashboard, Users, Wallet, Workflow } from 'lucide-react';
import SideNav, { type NavLink } from '@/components/navigation/SideNav';
import TopBar from '@/components/navigation/TopBar';

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/dashboard', icon: <LayoutDashboard size={16} /> },
  { label: 'Cards', href: '/cards', icon: <Wallet size={16} /> },
  { label: 'Transactions', href: '/transactions', icon: <Workflow size={16} /> },
  { label: 'Payments', href: '/payments', icon: <Workflow size={16} /> },
  { label: 'Payroll', href: '/payroll', icon: <Workflow size={16} /> },
  { label: 'Smart budget', href: '/smart-budget', icon: <Wallet size={16} /> },
  { label: 'Team', href: '/team', icon: <Users size={16} /> },
  { label: 'Recipients', href: '/recipients', icon: <Users size={16} /> },
  { label: 'Insights', href: '/insights', icon: <LayoutDashboard size={16} /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900">
      <div className="flex min-h-screen">
        <SideNav links={NAV_LINKS} />
        <div className="flex flex-1 flex-col">
          <TopBar />
          <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

