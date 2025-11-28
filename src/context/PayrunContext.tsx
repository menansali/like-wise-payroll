'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type {
  ExecutionResult,
  PayrollRow,
  ValidationResult,
} from '@/lib/types';

type PayrunContextValue = {
  payrollPeriod: string;
  rows: PayrollRow[];
  validationResult: ValidationResult | null;
  executionResult: ExecutionResult | null;
  setValidationResult: (rows: PayrollRow[], result: ValidationResult) => void;
  setExecutionResult: (result: ExecutionResult) => void;
  reset: () => void;
  derived: {
    workerCount: number;
    countryCount: number;
  };
};

const DEFAULT_PERIOD = 'Nov 1–30, 2025';

const PayrunContext = createContext<PayrunContextValue | undefined>(undefined);

export function PayrunProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rows, setRows] = useState<PayrollRow[]>([]);
  const [validationResult, setValidation] = useState<ValidationResult | null>(
    null,
  );
  const [executionResult, setExecutionResult] =
    useState<ExecutionResult | null>(null);

  const derived = useMemo(() => {
    const countryCount = new Set(rows.map((row) => row.country)).size;
    return {
      workerCount: rows.length,
      countryCount,
    };
  }, [rows]);

  const reset = () => {
    setRows([]);
    setValidation(null);
    setExecutionResult(null);
  };

  const value: PayrunContextValue = {
    payrollPeriod: DEFAULT_PERIOD,
    rows,
    validationResult,
    executionResult,
    setValidationResult: (nextRows, result) => {
      setRows(nextRows);
      setValidation(result);
      setExecutionResult(null);
    },
    setExecutionResult,
    reset,
    derived,
  };

  return (
    <PayrunContext.Provider value={value}>{children}</PayrunContext.Provider>
  );
}

export function usePayrun() {
  const ctx = useContext(PayrunContext);
  if (!ctx) {
    throw new Error('usePayrun must be used within a PayrunProvider');
  }

  return ctx;
}

