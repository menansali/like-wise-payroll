import Card from '@/components/Card';
import type { PayrollRunRow } from '@/lib/types';

type Props = {
  rows: PayrollRunRow[];
};

export default function PayrollRunTable({ rows }: Props) {
  return (
    <Card title="Current run – Employees">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="pb-2">Employee</th>
              <th className="pb-2">Contract</th>
              <th className="pb-2">Currency</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="py-3">
                  <div className="font-semibold text-slate-900">
                    {row.employee}
                  </div>
                  <p className="text-xs text-slate-500">{row.country}</p>
                </td>
                <td className="py-3 text-slate-600">{row.contractType}</td>
                <td className="py-3 text-slate-600">{row.paymentCurrency}</td>
                <td className="py-3 text-slate-600">{row.paymentDate}</td>
                <td className="py-3 font-semibold text-slate-900">
                  <div>{row.amountLocal}</div>
                  <div className="text-xs font-normal text-slate-500">
                    {row.amountSource}
                  </div>
                </td>
                <td className="py-3 text-slate-600">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

