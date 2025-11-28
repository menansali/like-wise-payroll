'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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
  isHydrated: boolean;
  derived: {
    workerCount: number;
    countryCount: number;
  };
};

const DEFAULT_PERIOD = 'Nov 1–30, 2025';
const STORAGE_KEY = 'wiseworkhub_payrun';

const PayrunContext = createContext<PayrunContextValue | undefined>(undefined);

// Helper to safely access localStorage
function getStoredData() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveToStorage(data: {
  rows: PayrollRow[];
  validationResult: ValidationResult | null;
  executionResult: ExecutionResult | null;
}) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

function clearStorage() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore errors
  }
}

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
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = getStoredData();
    if (stored) {
      setRows(stored.rows || []);
      setValidation(stored.validationResult || null);
      setExecutionResult(stored.executionResult || null);
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      saveToStorage({ rows, validationResult, executionResult });
    }
  }, [rows, validationResult, executionResult, isHydrated]);

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
    clearStorage();
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
    isHydrated,
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

