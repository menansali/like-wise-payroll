import { NextResponse } from 'next/server';

// Mock worker database
const mockWorkers = [
  {
    id: 'E-1001',
    name: 'Alicia Patel',
    email: 'alicia.patel@company.com',
    country: 'India',
    currency: 'INR',
    type: 'employee',
    department: 'Engineering',
    startDate: '2023-03-15',
    bankAccount: 'IN65HDFC00012345678901',
    bankName: 'HDFC Bank',
    status: 'active',
    lastPayment: { date: '2025-10-31', amount: 120000, status: 'completed' },
  },
  {
    id: 'E-1002',
    name: 'Jonas Müller',
    email: 'jonas.muller@company.com',
    country: 'Germany',
    currency: 'EUR',
    type: 'employee',
    department: 'Product',
    startDate: '2022-08-01',
    bankAccount: 'DE75512108001245126199',
    bankName: 'Deutsche Bank',
    status: 'active',
    lastPayment: { date: '2025-10-31', amount: 5400, status: 'completed' },
  },
  {
    id: 'E-1003',
    name: 'Luis Andrade',
    email: 'luis.andrade@company.com',
    country: 'Brazil',
    currency: 'BRL',
    type: 'contractor',
    department: 'Design',
    startDate: '2024-01-10',
    bankAccount: 'BR1500000000000001093C01',
    bankName: 'Banco do Brasil',
    status: 'active',
    lastPayment: { date: '2025-10-31', amount: 18500, status: 'completed' },
  },
  {
    id: 'E-1004',
    name: 'Sophia Reed',
    email: 'sophia.reed@company.com',
    country: 'United Kingdom',
    currency: 'GBP',
    type: 'employee',
    department: 'Marketing',
    startDate: '2021-11-20',
    bankAccount: 'GB29NWBK60161331926819',
    bankName: 'NatWest',
    status: 'active',
    lastPayment: { date: '2025-10-31', amount: 3200, status: 'completed' },
  },
  {
    id: 'E-1005',
    name: 'Mei Tan',
    email: 'mei.tan@company.com',
    country: 'Singapore',
    currency: 'SGD',
    type: 'employee',
    department: 'Finance',
    startDate: '2023-06-05',
    bankAccount: 'SG580039123456789012',
    bankName: 'DBS Bank',
    status: 'active',
    lastPayment: { date: '2025-10-31', amount: 7800, status: 'completed' },
  },
  {
    id: 'E-1006',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@company.com',
    country: 'United States',
    currency: 'USD',
    type: 'employee',
    department: 'Sales',
    startDate: '2020-02-14',
    bankAccount: '021000021123456789',
    bankName: 'Chase Bank',
    status: 'active',
    lastPayment: { date: '2025-10-31', amount: 8500, status: 'completed' },
  },
  {
    id: 'E-1007',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@company.com',
    country: 'Japan',
    currency: 'JPY',
    type: 'contractor',
    department: 'Engineering',
    startDate: '2024-04-01',
    bankAccount: 'JP0987654321098765432',
    bankName: 'Mizuho Bank',
    status: 'active',
    lastPayment: { date: '2025-10-31', amount: 850000, status: 'completed' },
  },
  {
    id: 'E-1008',
    name: 'Anna Kowalski',
    email: 'anna.kowalski@company.com',
    country: 'Poland',
    currency: 'PLN',
    type: 'employee',
    department: 'Support',
    startDate: '2023-09-18',
    bankAccount: 'PL61109010140000071219812874',
    bankName: 'mBank',
    status: 'active',
    lastPayment: { date: '2025-10-31', amount: 12000, status: 'completed' },
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const country = searchParams.get('country');
  const type = searchParams.get('type');

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Get specific worker
  if (id) {
    const worker = mockWorkers.find((w) => w.id === id);
    if (!worker) {
      return NextResponse.json({ message: 'Worker not found' }, { status: 404 });
    }
    return NextResponse.json(worker);
  }

  // Filter workers
  let filteredWorkers = [...mockWorkers];

  if (country) {
    filteredWorkers = filteredWorkers.filter(
      (w) => w.country.toLowerCase() === country.toLowerCase(),
    );
  }

  if (type) {
    filteredWorkers = filteredWorkers.filter(
      (w) => w.type.toLowerCase() === type.toLowerCase(),
    );
  }

  // Summary stats
  const summary = {
    total: filteredWorkers.length,
    employees: filteredWorkers.filter((w) => w.type === 'employee').length,
    contractors: filteredWorkers.filter((w) => w.type === 'contractor').length,
    countries: [...new Set(filteredWorkers.map((w) => w.country))].length,
    currencies: [...new Set(filteredWorkers.map((w) => w.currency))],
  };

  return NextResponse.json({
    workers: filteredWorkers,
    summary,
  });
}
