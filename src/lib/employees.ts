import type { EmployeeRecord } from '@/lib/types';

const employees: EmployeeRecord[] = [
  {
    id: 'sarah-davies',
    name: 'Sarah Davies',
    role: 'Product Designer',
    avatarInitials: 'SD',
    country: 'South Korea',
    status: 'Active',
    startDate: '12 Jan 2024',
    nextPayrollDate: '30 Nov 2025',
    payroll: {
      salary: '900.00 GBP / month',
      salaryInSource: '~ 9,000.37 HKD',
      paymentCurrency: 'GBP',
      payoutMethod: 'Wise HKD Account ending 2391',
    },
    compliance: {
      taxId: 'XX8391XXX',
      country: 'Hong Kong',
      contractFile: 'Contract letter 2025.pdf',
    },
    leave: {
      summary: '14 Paid Leave Days used this year',
      note: 'Record · Paid leave bank almost full',
    },
    transactions: [
      {
        id: 'txn-1',
        description: 'Payroll · Aug',
        date: '02 Sep 2025',
        amountLocal: '£2,700 GBP',
        amountSource: '90,000.37 INR',
      },
      {
        id: 'txn-2',
        description: 'Payroll · Jul',
        date: '02 Aug 2025',
        amountLocal: '£2,700 GBP',
        amountSource: '90,000.37 INR',
      },
      {
        id: 'txn-3',
        description: 'Payroll · Jun',
        date: '02 Jul 2025',
        amountLocal: '£2,700 GBP',
        amountSource: '90,000.37 INR',
      },
    ],
  },
  {
    id: 'amina-wanjiru',
    name: 'Amina Wanjiru',
    role: 'People Operations',
    avatarInitials: 'AW',
    country: 'Kenya',
    status: 'Active',
    startDate: '03 Mar 2023',
    nextPayrollDate: '30 Nov 2025',
    payroll: {
      salary: '449,310.00 KSh',
      salaryInSource: '$3,280.11',
      paymentCurrency: 'KES',
      payoutMethod: 'Wise KES Account ending 8845',
    },
    compliance: {
      taxId: 'KE-1092992',
      country: 'Kenya',
      contractFile: 'Employment-contract.pdf',
    },
    leave: {
      summary: '7 Paid Leave Days used this year',
      note: 'Record · Pending approval for Dec travel',
    },
    transactions: [
      {
        id: 'txn-4',
        description: 'Payroll · Aug',
        date: '02 Sep 2025',
        amountLocal: '449,310.00 KSh',
        amountSource: '$3,280.11',
      },
      {
        id: 'txn-5',
        description: 'Payroll · Jul',
        date: '02 Aug 2025',
        amountLocal: '449,310.00 KSh',
        amountSource: '$3,280.11',
      },
    ],
  },
];

export function listEmployees(): EmployeeRecord[] {
  return employees;
}

export function getEmployeeById(id: string): EmployeeRecord | undefined {
  return employees.find((emp) => emp.id === id);
}

