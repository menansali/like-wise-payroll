import Layout from '@/components/Layout';
import Card from '@/components/Card';

export default function RecipientsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Home</p>
          <h1 className="text-2xl font-semibold text-slate-900">Recipients</h1>
          <p className="text-sm text-slate-500">
            Directory of payees that can be reused across payroll and one-off payments.
          </p>
        </div>
        <Card title="Recipient directory">
          <p className="text-sm text-slate-600">
            In the production app this table would show saved recipient profiles with their bank details and preferred currencies.
          </p>
        </Card>
      </div>
    </Layout>
  );
}


