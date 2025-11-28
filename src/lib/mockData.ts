export const workforceSnapshot = {
  countries: [
    { country: 'United States', employees: 42, contractors: 8, cost: 420000 },
    { country: 'Germany', employees: 18, contractors: 4, cost: 158000 },
    { country: 'India', employees: 24, contractors: 15, cost: 98000 },
    { country: 'Brazil', employees: 12, contractors: 6, cost: 76000 },
  ],
  newJoiners: 6,
  offboarded: 2,
  classification: {
    employees: 72,
    contractors: 33,
  },
  currencyMix: [
    { label: 'USD', value: 0.54 },
    { label: 'EUR', value: 0.22 },
    { label: 'INR', value: 0.16 },
    { label: 'BRL', value: 0.08 },
  ],
};

export const payrollCycleHealth = {
  nextDeadline: {
    region: 'EMEA',
    date: 'Dec 5, 2025',
  },
  completion: 62,
  pendingApprovals: 11,
  routingIssues: [
    { region: 'APAC', count: 2, note: 'Bank cut-off overlap' },
    { region: 'LATAM', count: 1, note: 'FX corridor delay' },
  ],
  atRisk: [
    { name: 'AML review', count: 3 },
    { name: 'Missing docs', count: 2 },
  ],
};

export const settlementTimes: Record<string, string> = {
  USD: 'Same-day via ACH',
  EUR: 'Next business day via SEPA',
  GBP: 'Same-day via Faster Payments',
  INR: 'T+2 via local rails',
  BRL: 'T+1 via TED',
};

export const dashboardTopline = {
  cycleLabel: 'Payroll cycle (Nov)',
  cycleCountdown: '7 days until cut-off',
  totalFunds: 640000,
  currency: 'USD',
  smartAlert: {
    title: 'Smart alert',
    message:
      'Convert USD → INR today to save ~2% versus your last transaction.',
    savingsPercent: 2,
  },
};

export const dashboardShortcuts = [
  {
    title: 'Workforce by country',
    description: 'Track worker mix, headcount growth, and tax IDs in one view.',
    href: '/dashboard?section=workforce',
    tag: 'In preview',
  },
  {
    title: 'Documents & compliance',
    description: 'Review contracts, visas, and AML flags before payroll.',
    href: '/dashboard?section=compliance',
  },
  {
    title: 'FX planner',
    description: 'Plan conversions ahead of payday to lower FX risk.',
    href: '/payroll/summary',
  },
  {
    title: 'Payroll partners',
    description: 'Invite local partners or Wise specialists to collaborate.',
    href: '/dashboard?section=partners',
  },
];

