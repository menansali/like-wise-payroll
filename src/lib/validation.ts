import type { PayrollRow, ValidationIssue, ValidationResult } from '@/lib/types';

const LARGE_PAYMENT_THRESHOLD = 10_000;
const MINIMUM_PAYMENT = 1;

// Supported currencies and their expected IBAN prefixes
const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'BRL', 'SGD', 'JPY', 'CAD', 'AUD', 'CHF', 'MXN', 'PLN'];

const COUNTRY_CURRENCY_MAP: Record<string, string[]> = {
  'United States': ['USD'],
  'Germany': ['EUR'],
  'France': ['EUR'],
  'Spain': ['EUR'],
  'Italy': ['EUR'],
  'Netherlands': ['EUR'],
  'United Kingdom': ['GBP'],
  'India': ['INR'],
  'Brazil': ['BRL'],
  'Singapore': ['SGD'],
  'Japan': ['JPY'],
  'Canada': ['CAD'],
  'Australia': ['AUD'],
  'Switzerland': ['CHF'],
  'Mexico': ['MXN'],
  'Poland': ['PLN', 'EUR'],
};

const IBAN_PREFIXES: Record<string, string> = {
  'Germany': 'DE',
  'France': 'FR',
  'Spain': 'ES',
  'Italy': 'IT',
  'Netherlands': 'NL',
  'United Kingdom': 'GB',
  'India': 'IN',
  'Brazil': 'BR',
  'Singapore': 'SG',
  'Poland': 'PL',
  'Switzerland': 'CH',
};

// Validate IBAN format (basic check)
function isValidIBAN(iban: string, country: string): boolean {
  if (!iban || iban.length < 10) return false;

  const expectedPrefix = IBAN_PREFIXES[country];
  if (expectedPrefix && !iban.toUpperCase().startsWith(expectedPrefix)) {
    return false;
  }

  // Basic IBAN length validation by country
  const ibanLengths: Record<string, number> = {
    DE: 22, FR: 27, ES: 24, IT: 27, NL: 18, GB: 22, PL: 28, CH: 21,
  };

  const prefix = iban.substring(0, 2).toUpperCase();
  const expectedLength = ibanLengths[prefix];
  if (expectedLength && iban.length !== expectedLength) {
    return false;
  }

  return true;
}

// Check if currency matches country
function isCurrencyValidForCountry(currency: string, country: string): boolean {
  const validCurrencies = COUNTRY_CURRENCY_MAP[country];
  if (!validCurrencies) return true; // Unknown country, allow any currency
  return validCurrencies.includes(currency);
}

export function validateRows(rows: PayrollRow[]): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const valid: PayrollRow[] = [];

  const seenEmployees = new Set<string>();
  const duplicateEmployees = new Set<string>();

  // First pass: detect duplicates
  rows.forEach((row) => {
    if (seenEmployees.has(row.employeeId)) {
      duplicateEmployees.add(row.employeeId);
    } else {
      seenEmployees.add(row.employeeId);
    }
  });

  // Second pass: validate each row
  rows.forEach((row) => {
    const errorIssues: string[] = [];
    const warningIssues: string[] = [];

    // Required field checks (errors)
    if (!row.employeeId || !row.name) {
      errorIssues.push('Missing employee details');
    }

    if (!row.country || !row.currency) {
      errorIssues.push('Missing country/currency');
    }

    if (!row.bankAccount || row.bankAccount.length < 10) {
      errorIssues.push('Invalid IBAN / bank account');
    }

    if (!Number.isFinite(row.amount) || row.amount <= 0) {
      errorIssues.push('Amount must be greater than zero');
    }

    if (row.amount < MINIMUM_PAYMENT) {
      errorIssues.push(`Amount below minimum (${MINIMUM_PAYMENT})`);
    }

    if (duplicateEmployees.has(row.employeeId)) {
      errorIssues.push('Duplicate employee record');
    }

    // Currency validation (error)
    if (row.currency && !SUPPORTED_CURRENCIES.includes(row.currency)) {
      errorIssues.push(`Unsupported currency: ${row.currency}`);
    }

    // IBAN validation for supported countries (warning if mismatch)
    if (row.bankAccount && row.country && IBAN_PREFIXES[row.country]) {
      if (!isValidIBAN(row.bankAccount, row.country)) {
        warningIssues.push('Bank account format may be incorrect for country');
      }
    }

    // Currency-country mismatch (warning)
    if (row.currency && row.country && !isCurrencyValidForCountry(row.currency, row.country)) {
      warningIssues.push(`Currency ${row.currency} unusual for ${row.country}`);
    }

    // Large payment warning
    if (row.amount > LARGE_PAYMENT_THRESHOLD) {
      warningIssues.push('Unusually large payment - requires review');
    }

    // Round number warning (potential error in data)
    if (row.amount > 100 && row.amount % 1000 === 0) {
      warningIssues.push('Round number payment - please verify');
    }

    // If there are errors, add to errors list
    if (errorIssues.length > 0) {
      errors.push({
        ...row,
        message: errorIssues.join(', '),
      });
      return;
    }

    // If there are warnings but no errors, add to warnings list
    if (warningIssues.length > 0) {
      warnings.push({
        ...row,
        message: warningIssues.join(', '),
      });
      return;
    }

    // No issues, add to valid list
    valid.push(row);
  });

  return { errors, warnings, valid };
}

// Export validation stats for API response
export function getValidationStats(result: ValidationResult) {
  return {
    totalRows: result.errors.length + result.warnings.length + result.valid.length,
    errorCount: result.errors.length,
    warningCount: result.warnings.length,
    validCount: result.valid.length,
    errorRate: result.errors.length / (result.errors.length + result.warnings.length + result.valid.length) * 100,
    canProceed: result.errors.length === 0,
  };
}

