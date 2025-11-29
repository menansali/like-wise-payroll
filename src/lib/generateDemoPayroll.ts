import type { PayrollRow } from '@/lib/types';

// Sample data pools for generating random payroll entries
const FIRST_NAMES = [
  'Alicia', 'Jonas', 'Luis', 'Sophia', 'Mei', 'Marcus', 'Yuki', 'Anna',
  'Carlos', 'Emma', 'Raj', 'Marie', 'David', 'Sarah', 'James',
  'Michael', 'Priya', 'Hans', 'Linda', 'Chen', 'Oliver', 'Isabella', 'Mohamed',
  'Grace', 'Thomas', 'Rina', 'Pierre', 'Nina', 'Ahmed',
];

const LAST_NAMES = [
  'Patel', 'Müller', 'Andrade', 'Reed', 'Tan', 'Johnson', 'Tanaka', 'Kowalski',
  'Silva', 'Wilson', 'Sharma', 'Dubois', 'Smith', 'Davies', 'Brown', 'Wang',
  'Garcia', 'Lee', 'Schmidt', 'Anderson', 'Kim', 'Taylor', 'Martinez', 'Ali',
  'Fernandez', 'Thompson', 'Sato', 'Lopez', 'Hansen', 'Okafor',
];

// Only use countries/currencies that are supported by validation rules
const COUNTRIES = [
  'United States', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands',
  'United Kingdom', 'India', 'Brazil', 'Singapore', 'Japan', 'Canada',
  'Australia', 'Switzerland', 'Mexico', 'Poland',
];

const CURRENCY_MAP: Record<string, string[]> = {
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

// IBAN lengths by country (matching validation.ts requirements)
const IBAN_LENGTHS: Record<string, number> = {
  'Germany': 22,
  'France': 27,
  'Spain': 24,
  'Italy': 27,
  'Netherlands': 18,
  'United Kingdom': 22,
  'Poland': 28,
  'Switzerland': 21,
};

const IBAN_PREFIXES: Record<string, string> = {
  'Germany': 'DE',
  'France': 'FR',
  'Spain': 'ES',
  'Italy': 'IT',
  'Netherlands': 'NL',
  'United Kingdom': 'GB',
  'Poland': 'PL',
  'Switzerland': 'CH',
  // For countries without strict IBAN requirements
  'India': 'IN',
  'Brazil': 'BR',
  'Singapore': 'SG',
  'United States': 'US',
  'Japan': 'JP',
  'Canada': 'CA',
  'Australia': 'AU',
  'Mexico': 'MX',
};

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBankAccount(country: string): string {
  const prefix = IBAN_PREFIXES[country] || 'XX';
  
  // Use proper IBAN length if defined for this country
  const requiredLength = IBAN_LENGTHS[country];
  if (requiredLength) {
    const numbers = Array.from({ length: requiredLength - 2 }, () =>
      randomInt(0, 9).toString(),
    ).join('');
    return `${prefix}${numbers}`;
  }
  
  // For countries without IBAN requirements, generate valid account (min 10 chars)
  const length = randomInt(12, 18);
  const numbers = Array.from({ length: length - 2 }, () =>
    randomInt(0, 9).toString(),
  ).join('');
  return `${prefix}${numbers}`;
}

function generateAmount(currency: string): number {
  // Generate realistic amounts based on currency (avoid round numbers to reduce warnings)
  // Keep amounts under LARGE_PAYMENT_THRESHOLD (10000) to avoid warnings
  const ranges: Record<string, { min: number; max: number }> = {
    USD: { min: 2500, max: 9500 },
    EUR: { min: 2200, max: 9800 },
    GBP: { min: 1800, max: 9200 },
    INR: { min: 45000, max: 98000 },
    BRL: { min: 8500, max: 9800 },
    SGD: { min: 3200, max: 9800 },
    JPY: { min: 350000, max: 980000 },
    PLN: { min: 7200, max: 9800 },
    CAD: { min: 2800, max: 9800 },
    AUD: { min: 3200, max: 9800 },
    CHF: { min: 2800, max: 9800 },
    MXN: { min: 45000, max: 98000 },
  };

  const range = ranges[currency] || { min: 1000, max: 9000 };
  // Generate non-round numbers (add random cents/digits to avoid round number warnings)
  const baseAmount = randomInt(range.min, range.max);
  const variation = randomInt(1, 99); // Add 1-99 to make it non-round
  return Math.round((baseAmount + (variation / 100)) * 100) / 100;
}

/**
 * Generate random demo payroll data with valid data that passes validation
 */
export function generateDemoPayrollRows(count: number = 12): PayrollRow[] {
  const rows: PayrollRow[] = [];
  const usedNames = new Set<string>();
  const usedIds = new Set<string>();

  for (let i = 0; i < count; i++) {
    let firstName = randomChoice(FIRST_NAMES);
    let lastName = randomChoice(LAST_NAMES);
    let fullName = `${firstName} ${lastName}`;

    // Ensure unique names
    let attempts = 0;
    while (usedNames.has(fullName) && attempts < 50) {
      firstName = randomChoice(FIRST_NAMES);
      lastName = randomChoice(LAST_NAMES);
      fullName = `${firstName} ${lastName}`;
      attempts++;
    }
    usedNames.add(fullName);

    // Ensure unique employee IDs
    let employeeId = `E-${randomInt(1001, 9999)}`;
    attempts = 0;
    while (usedIds.has(employeeId) && attempts < 50) {
      employeeId = `E-${randomInt(1001, 9999)}`;
      attempts++;
    }
    usedIds.add(employeeId);

    const country = randomChoice(COUNTRIES);
    const currencies = CURRENCY_MAP[country] || [country.substring(0, 3).toUpperCase()];
    const currency = randomChoice(currencies);
    const amount = generateAmount(currency);
    const bankAccount = generateBankAccount(country);

    rows.push({
      employeeId,
      name: fullName,
      country,
      currency,
      amount,
      bankAccount,
    });
  }

  return rows;
}

/**
 * Convert payroll rows to CSV format
 */
export function payrollRowsToCsv(rows: PayrollRow[]): string {
  const headers = ['employeeId', 'name', 'country', 'currency', 'amount', 'bankAccount'];
  const csvRows = [headers.join(',')];

  for (const row of rows) {
    csvRows.push(
      [
        row.employeeId,
        row.name,
        row.country,
        row.currency,
        row.amount.toString(),
        row.bankAccount,
      ].join(','),
    );
  }

  return csvRows.join('\n');
}
