import type { PayrollRow } from '@/lib/types';

// Sample data pools for generating random payroll entries
const FIRST_NAMES = [
  'Alicia', 'Jonas', 'Luis', 'Sophia', 'Mei', 'Marcus', 'Yuki', 'Anna',
  'Carlos', 'Emma', 'Raj', 'Marie', 'David', 'Sarah', 'James', 'Yuki',
  'Michael', 'Priya', 'Hans', 'Linda', 'Chen', 'Oliver', 'Isabella', 'Mohamed',
  'Grace', 'Thomas', 'Rina', 'Pierre', 'Nina', 'Ahmed',
];

const LAST_NAMES = [
  'Patel', 'Müller', 'Andrade', 'Reed', 'Tan', 'Johnson', 'Tanaka', 'Kowalski',
  'Silva', 'Wilson', 'Sharma', 'Dubois', 'Smith', 'Davies', 'Brown', 'Wang',
  'Garcia', 'Lee', 'Schmidt', 'Anderson', 'Kim', 'Taylor', 'Martinez', 'Ali',
  'Fernandez', 'Thompson', 'Sato', 'Lopez', 'Hansen', 'Okafor',
];

const COUNTRIES = [
  'India', 'Germany', 'Brazil', 'United Kingdom', 'Singapore', 'United States',
  'Japan', 'Poland', 'France', 'Canada', 'Australia', 'South Korea', 'Mexico',
  'Netherlands', 'Spain', 'Italy', 'Argentina', 'Kenya', 'Hong Kong',
];

const CURRENCY_MAP: Record<string, string[]> = {
  'India': ['INR'],
  'Germany': ['EUR'],
  'Brazil': ['BRL'],
  'United Kingdom': ['GBP'],
  'Singapore': ['SGD'],
  'United States': ['USD'],
  'Japan': ['JPY'],
  'Poland': ['PLN', 'EUR'],
  'France': ['EUR'],
  'Canada': ['CAD'],
  'Australia': ['AUD'],
  'South Korea': ['KRW'],
  'Mexico': ['MXN'],
  'Netherlands': ['EUR'],
  'Spain': ['EUR'],
  'Italy': ['EUR'],
  'Argentina': ['ARS'],
  'Kenya': ['KES'],
  'Hong Kong': ['HKD'],
};

const IBAN_PREFIXES: Record<string, string> = {
  'India': 'IN',
  'Germany': 'DE',
  'Brazil': 'BR',
  'United Kingdom': 'GB',
  'Singapore': 'SG',
  'United States': 'US',
  'Japan': 'JP',
  'Poland': 'PL',
  'France': 'FR',
  'Canada': 'CA',
  'Australia': 'AU',
  'South Korea': 'KR',
  'Mexico': 'MX',
  'Netherlands': 'NL',
  'Spain': 'ES',
  'Italy': 'IT',
  'Argentina': 'AR',
  'Kenya': 'KE',
  'Hong Kong': 'HK',
};

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBankAccount(country: string): string {
  const prefix = IBAN_PREFIXES[country] || 'XX';
  const length = randomInt(16, 22);
  const numbers = Array.from({ length: length - 2 }, () =>
    randomInt(0, 9).toString(),
  ).join('');
  return `${prefix}${numbers}`;
}

function generateAmount(currency: string): number {
  // Generate realistic amounts based on currency
  const ranges: Record<string, { min: number; max: number }> = {
    USD: { min: 3000, max: 12000 },
    EUR: { min: 2500, max: 10000 },
    GBP: { min: 2000, max: 8000 },
    INR: { min: 50000, max: 200000 },
    BRL: { min: 10000, max: 50000 },
    SGD: { min: 4000, max: 15000 },
    JPY: { min: 400000, max: 1500000 },
    PLN: { min: 8000, max: 30000 },
    CAD: { min: 3500, max: 12000 },
    AUD: { min: 4000, max: 14000 },
    KRW: { min: 3000000, max: 15000000 },
    MXN: { min: 50000, max: 200000 },
    ARS: { min: 500000, max: 3000000 },
    KES: { min: 300000, max: 1200000 },
    HKD: { min: 20000, max: 80000 },
  };

  const range = ranges[currency] || { min: 1000, max: 10000 };
  return randomInt(range.min, range.max);
}

/**
 * Generate random demo payroll data
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

