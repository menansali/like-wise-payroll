import Layout from '@/components/Layout';
import Card from '@/components/Card';

export default function PaymentsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Home</p>
          <h1 className="text-2xl font-semibold text-slate-900">Payments</h1>
          <p className="text-sm text-slate-500">
            Central place to start new Wise payouts outside of payroll runs.
          </p>
        </div>
        <Card title="Quick actions">
          <p className="text-sm text-slate-600">
            Use this area to trigger ad-hoc payments, templates, or batch uploads in a future iteration.
          </p>
        </Card>
      </div>
    </Layout>
  );
}


