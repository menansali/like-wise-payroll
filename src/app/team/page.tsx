import Link from 'next/link';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { listEmployees } from '@/lib/employees';

export default function TeamPage() {
  const employees = listEmployees();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Home</p>
          <h1 className="text-2xl font-semibold text-slate-900">Team</h1>
          <p className="text-sm text-slate-500">
            Select a teammate to review payroll, compliance, and transaction history.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {employees.map((employee) => (
            <Card
              key={employee.id}
              title={employee.name}
              actions={
                <Link
                  href={`/team/${employee.id}`}
                  className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                >
                  Open
                </Link>
              }
            >
              <p className="text-sm text-slate-500">{employee.role}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
                Next payroll
              </p>
              <p className="text-base font-semibold text-slate-900">
                {employee.nextPayrollDate}
              </p>
            </Card>
          ))}
        </div>

        <Link
          href="/team/new"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          + Add team member
        </Link>
      </div>
    </Layout>
  );
}


