'use client';

import Card from '@/components/Card';
import type { EmployeeRecord } from '@/lib/types';
import { useState } from 'react';
import UpdateSalaryModal from './UpdateSalaryModal';

type Props = {
  employee: EmployeeRecord;
};

export default function EmployeeDetailClient({ employee }: Props) {
  const [status, setStatus] = useState(employee.status);
  const [salary, setSalary] = useState(employee.payroll.salary);
  const [banner, setBanner] = useState<string | null>(null);
  const [salaryModalOpen, setSalaryModalOpen] = useState(false);

  const handleUpdateSalary = (newSalary: string) => {
    setSalary(newSalary);
    setBanner('Salary updated successfully! This would be saved in production.');
    setTimeout(() => setBanner(null), 3000);
  };

  const touchSchedule = () => {
    setBanner('Schedule updated. In production this would resync with your HRIS and Wise.');
    setTimeout(() => setBanner(null), 3000);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
            {employee.avatarInitials}
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">
              {employee.country}
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              {employee.name}
            </h1>
            <p className="text-sm text-slate-600">{employee.role}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSalaryModalOpen(true)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Update salary
          </button>
          <button
            type="button"
            onClick={touchSchedule}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Update schedule
          </button>
        </div>
      </header>

      {banner && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {banner}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Employee details">
          <DetailGrid
            items={[
              { label: 'Status', value: status },
              { label: 'Start date', value: employee.startDate },
              { label: 'Country', value: employee.country },
              { label: 'Next payroll', value: employee.nextPayrollDate },
            ]}
          />
        </Card>
        <Card title="Payroll details">
          <DetailGrid
            items={[
              { label: 'Salary', value: salary },
              { label: 'Equivalent', value: employee.payroll.salaryInSource },
              { label: 'Payment currency', value: employee.payroll.paymentCurrency },
              { label: 'Payout method', value: employee.payroll.payoutMethod },
            ]}
          />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Compliance & documents">
          <DetailGrid
            items={[
              { label: 'Tax ID', value: employee.compliance.taxId },
              { label: 'Country', value: employee.compliance.country },
              { label: 'Contract', value: employee.compliance.contractFile },
            ]}
          />
        </Card>
        <Card title="Leave & availability">
          <p className="text-sm text-slate-600">{employee.leave.summary}</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">Note</p>
          <p className="text-sm text-slate-600">{employee.leave.note}</p>
        </Card>
      </div>

      <Card title="Transactions">
        <div className="divide-y divide-slate-100">
          {employee.transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">{txn.description}</p>
                <p className="text-xs text-slate-500">{txn.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">{txn.amountLocal}</p>
                <p className="text-xs text-slate-500">{txn.amountSource}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <UpdateSalaryModal
        isOpen={salaryModalOpen}
        onClose={() => setSalaryModalOpen(false)}
        currentSalary={salary}
        currency={employee.payroll.paymentCurrency}
        onUpdate={handleUpdateSalary}
      />
    </div>
  );
}

function DetailGrid({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <dl className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs uppercase tracking-wide text-slate-500">
            {item.label}
          </dt>
          <dd className="font-semibold text-slate-900">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}


