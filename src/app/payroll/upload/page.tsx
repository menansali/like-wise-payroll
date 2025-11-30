'use client';

import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import PayrollUploadForm from '@/components/PayrollUploadForm';
import ValidationTable from '@/components/ValidationTable';
import { usePayrun } from '@/context/PayrunContext';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function PayrollUploadPage() {
  const router = useRouter();
  const { validationResult } = usePayrun();
  const errors = validationResult?.errors ?? [];
  const warnings = validationResult?.warnings ?? [];
  const valid = validationResult?.valid ?? [];

  const canContinue = !!validationResult && errors.length === 0;

  return (
    <Layout>
      <div className="space-y-8">
        <SectionHeader
          subtitle="Upload & validate"
          title="Payroll file validation"
          description="Upload the CSV, review errors or warnings, then proceed to payment summary."
        />

        <PayrollUploadForm />

        {validationResult && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="error" size="md">
                {errors.length} {errors.length === 1 ? 'error' : 'errors'}
              </Badge>
              <Badge variant="warning" size="md">
                {warnings.length} {warnings.length === 1 ? 'warning' : 'warnings'}
              </Badge>
              <Badge variant="success" size="md">
                {valid.length} ready
              </Badge>
            </div>

            <div className="space-y-6">
              <ValidationTable rows={errors} type="error" />
              <ValidationTable rows={warnings} type="warning" />
              <ValidationTable rows={valid} type="valid" />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => router.push('/payroll/summary')}
                disabled={!canContinue}
                size="lg"
              >
                Continue to Payment Summary
              </Button>
              {!canContinue && (
                <p className="flex items-center text-sm text-slate-600">
                  Resolve all errors before continuing.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

