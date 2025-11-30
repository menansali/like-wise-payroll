export type PayrollRow = {
  employeeId: string;
  name: string;
  country: string;
  currency: string;
  amount: number;
  bankAccount: string;
};

export type ValidationIssue = PayrollRow & {
  message: string;
};

export type ValidationResult = {
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  valid: PayrollRow[];
};

export type PaymentSummary = {
  totalWorkers: number;
  totalsByCurrency: Array<{
    currency: string;
    amount: number;
    amountInBase: number;
  }>;
  totalsByCountry: Array<{
    country: string;
    workers: number;
    amount: number;
  }>;
  baseCurrency: string;
  totalBaseAmount: number;
  wiseFee: number;
  settlement: Array<{
    currency: string;
    eta: string;
  }>;
  fxPlan?: FxPlan;
};

export type ExecutionResult = {
  successCount: number;
  failedCount: number;
  fxDecision?: string;
  fxPlanDetails?: FxPlanDetails;
};

export type DashboardTopline = {
  cycleLabel: string;
  cycleCountdown: string;
  totalFunds: number;
  currency: string;
  smartAlert: {
    title: string;
    message: string;
    savingsPercent: number;
  };
};

export type DashboardShortcut = {
  title: string;
  description: string;
  href: string;
  tag?: string;
};

export type FxOption = {
  id: string;
  label: string;
  description: string;
  actionLabel: string;
  details: string;
  recommended?: boolean;
};

export type FxPlan = {
  payrollDate: string;
  baseCurrency: string;
  targetCurrency: string;
  amountInBase: number;
  amountInTarget: number;
  indicativeRate: number;
  options: FxOption[];
};

export type FxPlanDetails = 
  | {
      type: 'convert_now';
      rate: number;
      timestamp: number;
      convertedAmount: number;
      fee: number;
    }
  | {
      type: 'schedule';
      payday: string;
      strategy: 'auto-convert';
      scheduledAt: number;
    }
  | {
      type: 'rate_lock';
      expiresAt: number;
      lockedRate: number;
      lockedAt: number;
    };

export type CurrencyNeed = {
  id: string;
  country: string;
  flag: string;
  currencyLabel: string;
  requiredAmount: number;
  bufferAmount: number;
  message?: string;
  status: 'open' | 'running-low' | 'surplus';
};

export type DashboardEmployeeRow = {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  paymentCurrency: string;
  amountLocal: string;
  amountSource: string;
  note: string;
  tag?: string;
};

export type PayrollRunRow = {
  id: string;
  employee: string;
  country: string;
  contractType: string;
  paymentCurrency: string;
  paymentDate: string;
  amountLocal: string;
  amountSource: string;
  note: string;
};

export type EmployeeDocument = {
  label: string;
  value: string;
};

export type EmployeeRecord = {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  country: string;
  status: string;
  startDate: string;
  nextPayrollDate: string;
  payroll: {
    salary: string;
    salaryInSource: string;
    paymentCurrency: string;
    payoutMethod: string;
  };
  compliance: {
    taxId: string;
    country: string;
    contractFile: string;
  };
  leave: {
    summary: string;
    note: string;
  };
  transactions: Array<{
    id: string;
    description: string;
    date: string;
    amountLocal: string;
    amountSource: string;
  }>;
};

export type SmartBudgetOverview = {
  headline: string;
  description: string;
  cards: Array<{
    id: string;
    label: string;
    amount: string;
    subtext: string;
    icons?: string[];
  }>;
};

export type SmartBudgetScheduleRow = {
  id: string;
  currency: string;
  country: string;
  flag: string;
  change1m: string;
  change3m: string;
  change6m: string;
  employees: number;
  payout: string;
  actionNotes: string;
};

export type CategoryFilter = {
  id: string;
  label: string;
};

