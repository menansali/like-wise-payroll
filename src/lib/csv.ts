import type { PayrollRow } from '@/lib/types';

const HEADERS = [
  'employeeId',
  'name',
  'country',
  'currency',
  'amount',
  'bankAccount',
] as const;

export function parseCsv(text: string): PayrollRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  const headerLine = lines[0].split(',').map((item) => item.trim());
  const headerIndexes = headerLine.reduce<Record<string, number>>(
    (acc, header, index) => {
      acc[header] = index;
      return acc;
    },
    {},
  );
  const isHeaderValid = HEADERS.every((header) => header in headerIndexes);

  const rows = lines.slice(isHeaderValid ? 1 : 0);

  return rows.map((line) => {
    const values = line.split(',').map((value) => value.trim());
    const record: Record<string, string> = {};

    HEADERS.forEach((header, index) => {
      const sourceIndex = isHeaderValid
        ? headerIndexes[header as string]
        : index;
      record[header] = values[sourceIndex] ?? '';
    });

    return {
      employeeId: record.employeeId,
      name: record.name,
      country: record.country,
      currency: record.currency,
      amount: Number(record.amount),
      bankAccount: record.bankAccount,
    };
  });
}

