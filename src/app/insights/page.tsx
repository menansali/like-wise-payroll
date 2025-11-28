import Layout from '@/components/Layout';
import Card from '@/components/Card';

export default function InsightsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Home</p>
          <h1 className="text-2xl font-semibold text-slate-900">Insights</h1>
          <p className="text-sm text-slate-500">
            Analytics for payroll, FX, and workforce trends powered by Wise flows.
          </p>
        </div>
        <Card title="Analytics">
          <p className="text-sm text-slate-600">
            Use this space to surface KPIs like total funds moved, FX savings, and cycle health once data is wired in.
          </p>
        </Card>
      </div>
    </Layout>
  );
}


