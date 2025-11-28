 'use client';

import Layout from '@/components/Layout';
import OverviewCards from '@/components/smart-budget/OverviewCards';
import ScheduleTable from '@/components/smart-budget/ScheduleTable';
import TransferCard from '@/components/smart-budget/TransferCard';
import {
  smartBudgetOverview,
  smartBudgetSchedule,
} from '@/lib/mockData';
import { useState } from 'react';

export default function SmartBudgetPage() {
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [banner, setBanner] = useState<string | null>(null);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!budgetName || !budgetAmount) {
      setBanner('Add a budget name and amount to simulate creating a new Smart Budget.');
      return;
    }
    setBanner(
      `Created "${budgetName}" for £${budgetAmount}. In production this would be saved and used to drive FX recommendations.`,
    );
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            FX planner
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Smart budget</h1>
          <p className="text-sm text-slate-500">
            Plan currency conversions ahead of payroll, monitor savings, and keep buffers per corridor.
          </p>
        </div>

        <OverviewCards overview={smartBudgetOverview} />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Create a budget
            </h2>
            <p className="text-sm text-slate-600">
              Forecast how much you need per country, then lock FX when the rate hits your target.
            </p>
            {banner && (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                {banner}
              </div>
            )}
            <form className="mt-4 space-y-4" onSubmit={handleCreate}>
              <label className="block text-sm font-medium text-slate-700">
                Budget name
                <input
                  type="text"
                  placeholder="Q1 LATAM payroll"
                  value={budgetName}
                  onChange={(event) => setBudgetName(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Amount (base currency)
                <input
                  type="number"
                  placeholder="29000"
                  value={budgetAmount}
                  onChange={(event) => setBudgetAmount(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Create budget
              </button>
            </form>
          </div>
          <TransferCard
            baseLabel="You send exactly"
            baseValue="30,000"
            baseCurrency="USD"
            targetLabel="Recipient gets"
            targetValue="25,846.83"
            targetCurrency="EUR"
            fees={[
              { label: 'Wire transfer fee', value: '6.11 USD' },
              { label: 'Our fee', value: '87.64 USD' },
              { label: 'Volume discount', value: '-4.98 USD' },
            ]}
            totalFees="88.77 USD"
            status="Should arrive by Monday, December 1"
            paymentMethod="Wire transfer · business account"
          />
        </div>

        <ScheduleTable rows={smartBudgetSchedule} />
      </div>
    </Layout>
  );
}

