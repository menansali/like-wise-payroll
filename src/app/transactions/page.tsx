import Layout from '@/components/Layout';
import Card from '@/components/Card';

export default function TransactionsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Home</p>
          <h1 className="text-2xl font-semibold text-slate-900">Transactions</h1>
          <p className="text-sm text-slate-500">
            Timeline of Wise payments and FX conversions. Replace with real transaction feeds later.
          </p>
        </div>
        <Card title="Recent activity">
          <p className="text-sm text-slate-600">
            This table will list the most recent payroll and treasury movements once connected to live data.
          </p>
        </Card>
      </div>
    </Layout>
  );
}


