'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import BudgetOverviewCard from '@/components/smart-budget/BudgetOverviewCard';
import BudgetInputCard from '@/components/smart-budget/BudgetInputCard';
import ScheduleTable from '@/components/smart-budget/ScheduleTable';
import CategoryFilterButton from '@/components/smart-budget/CategoryFilterButton';
import LockPriceModal from '@/components/smart-budget/LockPriceModal';
import SavingsPopup from '@/components/smart-budget/SavingsPopup';
import { smartBudgetSchedule } from '@/lib/mockData';
import type { SmartBudgetScheduleRow } from '@/lib/types';
import SectionHeader from '@/components/ui/SectionHeader';
import AlertBanner from '@/components/ui/AlertBanner';
import Card from '@/components/Card';

export default function SmartBudgetPage() {
  const [budgetCreated, setBudgetCreated] = useState(false);
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SmartBudgetScheduleRow | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState('Quarter 1');
  const [savingsPopupOpen, setSavingsPopupOpen] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState<number>(0);

  const handleBudgetSubmit = (amount: string) => {
    // Parse amount (remove £ and commas)
    const numericAmount = parseFloat(amount.replace(/[£,\s]/g, ''));
    
    if (!isNaN(numericAmount) && numericAmount > 0) {
      setBudgetAmount(numericAmount);
      setSavingsPopupOpen(true);
    }
    // Budget created - ready for API integration
  };

  const handleLockRateNow = () => {
    setSavingsPopupOpen(false);
    setBudgetCreated(true);
    setTimeout(() => setBudgetCreated(false), 3000);
  };

  const handleLockClick = (row: SmartBudgetScheduleRow) => {
    setSelectedRow(row);
    setLockModalOpen(true);
  };

  const handleLockSubmit = (_data: { exchangeRate: string; amount: string }) => {
    // Simulate locking the price
    // Price locked - ready for API integration
    // In production, this would make an API call to lock the FX rate
    setLockModalOpen(false);
    setSelectedRow(null);
  };

  const handleSchedulePayout = (row: SmartBudgetScheduleRow) => {
    // Mock: Show success message
    setBudgetCreated(true);
    setTimeout(() => setBudgetCreated(false), 3000);
    // In production, this would schedule a payout for the selected currency
  };

  const handleQuarterChange = (quarter: string) => {
    setSelectedQuarter(quarter);
    // Quarter filter changed - ready for API integration
    // In production, this would filter/load data for the selected quarter
    // For demo, we'll just update the state - the schedule table can use this
  };

  return (
    <Layout>
      <div className="space-y-8">
        <SectionHeader
          title="Smart Budget"
          actions={
            <CategoryFilterButton
              label={selectedQuarter}
              options={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
              onChange={handleQuarterChange}
            />
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <BudgetOverviewCard
            amount="£29,000"
            heldSince="19 January"
            currencyCount={3}
            currencies={[
              { flag: '🇭🇰', code: 'HKD' },
              { flag: '🇰🇪', code: 'KES' },
              { flag: '🇦🇷', code: 'ARS' },
            ]}
          />
          <BudgetInputCard onSubmit={handleBudgetSubmit} />
        </div>

        {budgetCreated && (
          <AlertBanner
            message="Budget created successfully! This would be saved in production."
            variant="success"
            title="Success"
          />
        )}

        {!savingsPopupOpen && (
          <Card variant="default" className="!border-emerald-500 !bg-emerald-500 !text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100">
              Converting alert
            </p>
            <p className="mt-3 text-xl font-bold text-white lg:text-2xl">
              Save 2% more. Convert USD → INR now.
            </p>
            <p className="mt-2 text-sm text-emerald-100">
              Lock today&apos;s rate to maximize savings on your next payroll run.
            </p>
          </Card>
        )}

        <ScheduleTable 
          rows={smartBudgetSchedule} 
          onLockClick={handleLockClick}
          onSchedulePayout={handleSchedulePayout}
        />
      </div>

      {selectedRow && (
        <LockPriceModal
          isOpen={lockModalOpen}
          onClose={() => {
            setLockModalOpen(false);
            setSelectedRow(null);
          }}
          currency={selectedRow.currency}
          country={selectedRow.country}
          onLock={handleLockSubmit}
        />
      )}

      <SavingsPopup
        isOpen={savingsPopupOpen}
        onClose={() => setSavingsPopupOpen(false)}
        onLockRateNow={handleLockRateNow}
        amount={budgetAmount}
        savingsPercent={2}
      />
    </Layout>
  );
}
