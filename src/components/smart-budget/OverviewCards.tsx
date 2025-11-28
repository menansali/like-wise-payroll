import Card from '@/components/Card';
import type { SmartBudgetOverview } from '@/lib/types';

type Props = {
  overview: SmartBudgetOverview;
};

export default function OverviewCards({ overview }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {overview.cards.map((card) => (
        <Card key={card.id}>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {card.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {card.amount}
          </p>
          <p className="mt-1 text-sm text-slate-600">{card.subtext}</p>
          {card.icons && (
            <div className="mt-4 flex gap-2 text-2xl">
              {card.icons.map((icon) => (
                <span key={icon}>{icon}</span>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

