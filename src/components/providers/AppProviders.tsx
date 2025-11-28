'use client';

import { PayrunProvider } from '@/context/PayrunContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <PayrunProvider>{children}</PayrunProvider>;
}

