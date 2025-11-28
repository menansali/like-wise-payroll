import type { PayrollRow, ValidationIssue, ValidationResult } from '@/lib/types';

const LARGE_PAYMENT_THRESHOLD = 10_000;

export function validateRows(rows: PayrollRow[]): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const valid: PayrollRow[] = [];

  const seenEmployees = new Set<string>();
  const duplicateEmployees = new Set<string>();

  rows.forEach((row) => {
    if (seenEmployees.has(row.employeeId)) {
      duplicateEmployees.add(row.employeeId);
    } else {
      seenEmployees.add(row.employeeId);
    }
  });

  rows.forEach((row) => {
    const issues: string[] = [];

    if (!row.employeeId || !row.name) {
      issues.push('Missing employee details');
    }

    if (!row.country || !row.currency) {
      issues.push('Missing country/currency');
    }

    if (!row.bankAccount || row.bankAccount.length < 10) {
      issues.push('Invalid IBAN / bank account');
    }

    if (!Number.isFinite(row.amount) || row.amount <= 0) {
      issues.push('Amount must be greater than zero');
    }

    if (duplicateEmployees.has(row.employeeId)) {
      issues.push('Duplicate employee record');
    }

    if (issues.length > 0) {
      errors.push({
        ...row,
        message: issues.join(', '),
      });
      return;
    }

    if (row.amount > LARGE_PAYMENT_THRESHOLD) {
      warnings.push({
        ...row,
        message: 'Unusually large payment',
      });
      return;
    }

    valid.push(row);
  });

  return { errors, warnings, valid };
}

