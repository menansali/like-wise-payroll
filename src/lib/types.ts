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

