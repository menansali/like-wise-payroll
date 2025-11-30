'use client';

import { useState } from 'react';
import { usePayrun } from '@/context/PayrunContext';
import { parseCsv } from '@/lib/csv';
import { generateDemoPayrollRows } from '@/lib/generateDemoPayroll';
import type { PayrollRow, ValidationResult } from '@/lib/types';
import UploadZone from '@/components/ui/UploadZone';
import Button from '@/components/ui/Button';
import AlertBanner from '@/components/ui/AlertBanner';
import CardShell from '@/components/ui/CardShell';

type Props = {
  onComplete?: () => void;
};

export default function PayrollUploadForm({ onComplete }: Props) {
  const { setValidationResult } = usePayrun();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isDemoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const runValidation = async (rows: PayrollRow[]) => {
    const response = await fetch('/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rows }),
    });

    if (!response.ok) {
      throw new Error('Validation request failed');
    }

    const result = (await response.json()) as ValidationResult;
    setValidationResult(rows, result);
    onComplete?.();
  };

  const handleFileSelect = async (file: File | null) => {
    setSelectedFile(file);
    setError(null);

    if (!file) return;

    setSubmitting(true);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      await runValidation(rows);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : 'Unable to process file',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoUpload = async () => {
    setError(null);
    setDemoLoading(true);
    setSelectedFile(null);

    try {
      const rowCount = Math.floor(Math.random() * 8) + 8;
      const rows = generateDemoPayrollRows(rowCount);
      await runValidation(rows);
    } catch (demoError) {
      setError(
        demoError instanceof Error ? demoError.message : 'Unable to generate demo file',
      );
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <CardShell>
      <UploadZone
        accept=".csv"
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        isLoading={isSubmitting}
        label="Upload payroll CSV"
        description="Columns: employeeId, name, country, currency, amount, bankAccount"
      />

      <div className="mt-6 flex items-center gap-3">
        <Button
          variant="secondary"
          onClick={handleDemoUpload}
          isLoading={isDemoLoading}
          disabled={isSubmitting}
        >
          Use demo file
        </Button>
      </div>

      {error && (
        <div className="mt-6">
          <AlertBanner message={error} variant="error" />
        </div>
      )}
    </CardShell>
  );
}

