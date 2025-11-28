import Layout from '@/components/Layout';
import Card from '@/components/Card';

export default function CardsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Home</p>
          <h1 className="text-2xl font-semibold text-slate-900">Cards</h1>
          <p className="text-sm text-slate-500">
            Overview of Wise business cards for you and your team. Wire this up to real card data later.
          </p>
        </div>
        <Card title="Card overview">
          <p className="text-sm text-slate-600">
            This is a mock view showing where card balances, spend limits, and status would appear.
          </p>
        </Card>
      </div>
    </Layout>
  );
}


