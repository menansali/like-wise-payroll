import type {
  CategoryFilter,
  CurrencyNeed,
  DashboardEmployeeRow,
  PayrollRunRow,
  SmartBudgetOverview,
  SmartBudgetScheduleRow,
} from '@/lib/types';

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

export const currencyNeeds: CurrencyNeed[] = [
  {
    id: 'ars',
    country: 'Argentina',
    flag: '🇦🇷',
    currencyLabel: 'ARS required',
    requiredAmount: 2351140.08,
    bufferAmount: 1400,
    message: 'Open · includes buffer',
    status: 'open',
  },
  {
    id: 'gbp',
    country: 'United Kingdom',
    flag: '🇬🇧',
    currencyLabel: 'GBP required',
    requiredAmount: 5000,
    bufferAmount: 0,
    message: 'You need 0.00',
    status: 'surplus',
  },
  {
    id: 'kes',
    country: 'Kenya',
    flag: '🇰🇪',
    currencyLabel: 'KES required',
    requiredAmount: 1000,
    bufferAmount: 4000,
    message: 'Running low · lock rate',
    status: 'running-low',
  },
  {
    id: 'krw',
    country: 'South Korea',
    flag: '🇰🇷',
    currencyLabel: 'KRW required',
    requiredAmount: 0,
    bufferAmount: 4000,
    message: 'Plan conversion',
    status: 'open',
  },
];

export const dashboardEmployees: DashboardEmployeeRow[] = [
  {
    id: 'emp-1',
    name: 'Sarah Davies',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    paymentCurrency: 'GBP',
    amountLocal: '£2,700.00',
    amountSource: '₹90,000.37',
    note: 'On vacation · Paid leave',
    tag: 'Sent · 2 Sept',
  },
  {
    id: 'emp-2',
    name: 'Amina Wanjiru',
    country: 'Kenya',
    countryFlag: '🇰🇪',
    paymentCurrency: 'KES',
    amountLocal: '85,000.00 KSh',
    amountSource: '$620.44',
    note: 'Attention needed · Salary review',
    tag: 'Nairobi, Kenya',
  },
  {
    id: 'emp-3',
    name: 'Fredrick Rodriguez',
    country: 'Argentina',
    countryFlag: '🇦🇷',
    paymentCurrency: 'ARS',
    amountLocal: '5,038,314.00 ARS',
    amountSource: '£8,100.00',
    note: 'Buffer includes FX safety net',
  },
  {
    id: 'emp-4',
    name: 'Nicole Anders',
    country: 'Hong Kong',
    countryFlag: '🇭🇰',
    paymentCurrency: 'HKD',
    amountLocal: '27,020.19 HKD',
    amountSource: '€3,120.10',
    note: 'Paid leave · 14 days used',
    tag: 'Sent · 2 Jun',
  },
];

export const payrollFilters: CategoryFilter[] = [
  { id: 'next-quarter', label: 'Next quarter' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'completed', label: 'Completed' },
];

export const payrollRunRows: PayrollRunRow[] = [
  {
    id: 'run-1',
    employee: 'Sarah Davies',
    country: 'United Kingdom',
    contractType: 'Full time',
    paymentCurrency: 'GBP',
    paymentDate: '02 Sep 2025',
    amountLocal: '£2,700.00',
    amountSource: '₹90,000.37',
    note: 'On vacation · Paid leave',
  },
  {
    id: 'run-2',
    employee: 'Amina Wanjiru',
    country: 'Kenya',
    contractType: 'Contractor',
    paymentCurrency: 'KES',
    paymentDate: '02 Sep 2025',
    amountLocal: '449,310.00 KSh',
    amountSource: '$3,280.11',
    note: 'Attention needed · Salary review',
  },
  {
    id: 'run-3',
    employee: 'Luis Andrade',
    country: 'Brazil',
    contractType: 'Full time',
    paymentCurrency: 'BRL',
    paymentDate: '05 Sep 2025',
    amountLocal: 'R$18,500.00',
    amountSource: '£2,250.40',
    note: 'Documents pending',
  },
  {
    id: 'run-4',
    employee: 'Mei Tan',
    country: 'Singapore',
    contractType: 'Contractor',
    paymentCurrency: 'SGD',
    paymentDate: '08 Sep 2025',
    amountLocal: 'S$7,800.00',
    amountSource: '$5,620.10',
    note: 'New hire orientation',
  },
];

export const smartBudgetOverview: SmartBudgetOverview = {
  headline: 'Smart Budget',
  description:
    'Spread funds across regions, lock FX when needed, and keep a safety buffer per currency.',
  cards: [
    {
      id: 'budget-total',
      label: '£29,000 across 3 corridors',
      amount: 'Includes buffer',
      subtext: 'HKD · KES · ARS',
      icons: ['🇭🇰', '🇰🇪', '🇦🇷'],
    },
    {
      id: 'budget-alert',
      label: 'Convert ahead of runway',
      amount: '3 currency conversions included',
      subtext: 'Lock spreads before payroll cut-off',
    },
  ],
};

export const smartBudgetSchedule: SmartBudgetScheduleRow[] = [
  {
    id: 'schedule-hkd',
    currency: 'Hong Kong Dollar',
    country: 'Hong Kong',
    flag: '🇭🇰',
    change1m: '+0.2',
    change3m: '-0.4',
    change6m: '+0.1',
    employees: 2,
    payout: '27,020.19 HKD',
    actionNotes: 'Lock rate / schedule payout',
  },
  {
    id: 'schedule-kes',
    currency: 'Kenyan Shilling',
    country: 'Kenya',
    flag: '🇰🇪',
    change1m: '+0.1',
    change3m: '+0.3',
    change6m: '+0.5',
    employees: 1,
    payout: '449,310.00 KSh',
    actionNotes: 'Schedule conversion',
  },
  {
    id: 'schedule-ars',
    currency: 'Argentine Peso',
    country: 'Argentina',
    flag: '🇦🇷',
    change1m: '+0.8',
    change3m: '+1.2',
    change6m: '+1.7',
    employees: 1,
    payout: '5,038,314.00 ARS',
    actionNotes: 'Monitor FX volatility',
  },
];

