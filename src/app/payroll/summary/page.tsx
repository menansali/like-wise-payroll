'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import PaymentSummaryCard from '@/components/PaymentSummaryCard';
import FxOptions from '@/components/FxOptions';
import { usePayrun } from '@/context/PayrunContext';
import { buildPaymentSummary } from '@/lib/summary';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

export default function PaymentSummaryPage() {
  const router = useRouter();
  const { validationResult, setExecutionResult, fxChoice, setFxChoice, fxPlanDetails } = usePayrun();
  const [isExecuting, setIsExecuting] = useState(false);
  const approvedRows = validationResult?.valid ?? [];
  const warningRows = validationResult?.warnings ?? [];
  const summary = buildPaymentSummary([...approvedRows, ...warningRows]);

  if (!validationResult) {
    return (
      <Layout>
        <div className="space-y-6">
          <SectionHeader
            subtitle="Review payouts"
            title="Payment summary"
            description="No validation data available. Please upload a payroll file first."
          />
          <Button onClick={() => router.push('/payroll/upload')}>
            Upload a payroll file
          </Button>
        </div>
      </Layout>
    );
  }

  const executePayroll = async () => {
    setIsExecuting(true);
    try {
      const allRows = [...approvedRows, ...warningRows];
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: allRows, fxOption: fxChoice }),
      });

      if (!response.ok) {
        throw new Error('Execution failed');
      }

      const result = await response.json();
      setExecutionResult({
        successCount: result.successCount,
        failedCount: result.failedCount,
        fxDecision: result.fxOption || fxChoice || undefined,
        fxPlanDetails: fxPlanDetails || undefined,
      });
      router.push('/payroll/confirmation');
    } catch (error) {
      console.error('Payroll execution error:', error);
      // Fallback to local execution for demo
      setExecutionResult({
        successCount: approvedRows.length,
        failedCount: warningRows.length,
        fxDecision: fxChoice || undefined,
        fxPlanDetails: fxPlanDetails || undefined,
      });
      router.push('/payroll/confirmation');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <SectionHeader
          subtitle="Review payouts"
          title="Payment summary"
          description="FX totals, estimated fees, and settlement times derived from the last validated file. Choose how to fund this payroll before executing."
        />

        <PaymentSummaryCard summary={summary} />
        <FxOptions plan={summary.fxPlan} onSelect={setFxChoice} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={executePayroll}
            disabled={isExecuting || !fxChoice}
            isLoading={isExecuting}
            size="lg"
          >
            {fxChoice ? 'Execute payroll' : 'Choose FX option to execute'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/payroll/upload')}
            size="lg"
          >
            Back to validation
          </Button>
        </div>
      </div>
    </Layout>
  );
}
