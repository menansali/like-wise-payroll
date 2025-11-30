import Card from '@/components/Card';
import DataTable from '@/components/ui/DataTable';
import type { PayrollRunRow } from '@/lib/types';

type Props = {
  rows: PayrollRunRow[];
};

export default function PayrollRunTable({ rows }: Props) {
  const columns = [
    {
      key: 'employee',
      label: 'Employee',
      render: (row: PayrollRunRow) => (
        <div>
          <div className="font-semibold text-slate-900">{row.employee}</div>
          <p className="text-xs text-slate-500">{row.country}</p>
        </div>
      ),
    },
    {
      key: 'contractType',
      label: 'Contract',
      render: (row: PayrollRunRow) => (
        <span className="text-slate-600">{row.contractType}</span>
      ),
    },
    {
      key: 'paymentCurrency',
      label: 'Currency',
      render: (row: PayrollRunRow) => (
        <span className="text-slate-600">{row.paymentCurrency}</span>
      ),
    },
    {
      key: 'paymentDate',
      label: 'Date',
      render: (row: PayrollRunRow) => (
        <span className="text-slate-600">{row.paymentDate}</span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (row: PayrollRunRow) => (
        <div>
          <div className="font-semibold text-slate-900">{row.amountLocal}</div>
          <div className="text-xs text-slate-500">{row.amountSource}</div>
        </div>
      ),
    },
    {
      key: 'note',
      label: 'Notes',
      render: (row: PayrollRunRow) => (
        <span className="text-slate-600">{row.note}</span>
      ),
    },
  ];

  return (
    <Card title="Current run – Employees" variant="elevated">
      <DataTable
        columns={columns}
        data={rows}
        keyExtractor={(row) => row.id}
        zebra={true}
      />
    </Card>
  );
}

