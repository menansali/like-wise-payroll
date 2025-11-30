import Card from '@/components/Card';
import Badge from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';
import type { PayrollRow, ValidationIssue } from '@/lib/types';

type Props = {
  rows: PayrollRow[] | ValidationIssue[];
  type: 'error' | 'warning' | 'valid';
};

const typeStyles: Record<Props['type'], { label: string; variant: 'error' | 'warning' | 'success' | 'default' }> = {
  error: {
    label: 'Errors',
    variant: 'error',
  },
  warning: {
    label: 'Warnings',
    variant: 'warning',
  },
  valid: {
    label: 'Ready',
    variant: 'success',
  },
};

export default function ValidationTable({ rows, type }: Props) {
  const info = typeStyles[type];

  if (rows.length === 0) {
    return (
      <Card
        title={
          <span className="flex items-center gap-3">
            {info.label}
            <Badge variant={info.variant}>{rows.length}</Badge>
          </span>
        }
      >
        <p className="text-sm text-slate-500">No records in this section.</p>
      </Card>
    );
  }

  const columns = [
    {
      key: 'employee',
      label: 'Employee',
      render: (row: PayrollRow | ValidationIssue) => (
        <span className="font-semibold text-slate-900">{row.name}</span>
      ),
    },
    {
      key: 'country',
      label: 'Country',
      render: (row: PayrollRow | ValidationIssue) => (
        <span className="text-slate-600">{row.country}</span>
      ),
    },
    {
      key: 'currency',
      label: 'Currency',
      render: (row: PayrollRow | ValidationIssue) => (
        <span className="text-slate-600">{row.currency}</span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount / Bank',
      render: (row: PayrollRow | ValidationIssue) => (
        <div>
          <p className="font-semibold text-slate-900">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: row.currency || 'USD',
              maximumFractionDigits: 2,
            }).format(Number(row.amount))}
          </p>
          <p className="text-xs text-slate-500">{row.bankAccount}</p>
        </div>
      ),
    },
    ...(type !== 'valid'
      ? [
          {
            key: 'message',
            label: 'Notes',
            render: (row: PayrollRow | ValidationIssue) => (
              <span className="text-rose-600">
                {'message' in row ? row.message : ''}
              </span>
            ),
          },
        ]
      : []),
  ];

  return (
    <Card
      title={
        <span className="flex items-center gap-3">
          {info.label}
          <Badge variant={info.variant}>{rows.length}</Badge>
        </span>
      }
    >
      <DataTable
        columns={columns}
        data={rows}
        keyExtractor={(row) => `${row.employeeId}-${row.bankAccount}`}
        zebra={true}
      />
    </Card>
  );
}

