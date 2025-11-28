'use client';

import { useRef, useState } from 'react';
import { usePayrun } from '@/context/PayrunContext';
import { parseCsv } from '@/lib/csv';
import { generateDemoPayrollRows } from '@/lib/generateDemoPayroll';
import type { PayrollRow, ValidationResult } from '@/lib/types';

type Props = {
  onComplete?: () => void;
};

export default function PayrollUploadForm({ onComplete }: Props) {
  const { setValidationResult } = usePayrun();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isDemoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFilePick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setFileName(file?.name ?? null);
    setError(null);
  };

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const file = selectedFile;

    if (!file) {
      setError('Please select a CSV file.');
      handleFilePick();
      return;
    }

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
    setFileName('demo-payroll.csv');

    try {
      // Generate random demo data each time
      const rowCount = Math.floor(Math.random() * 8) + 8; // Random between 8-15 employees
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
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-dashed border-slate-300 bg-white p-6"
    >
      <div>
        <label className="text-sm font-medium text-slate-700">
          Upload payroll CSV
        </label>
        <p className="text-xs text-slate-500">
          Columns: employeeId, name, country, currency, amount, bankAccount
        </p>
      </div>

      <input
        ref={fileInputRef}
        accept=".csv"
        type="file"
        name="payroll-file"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleFilePick}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
        >
          {fileName ? 'Choose another file' : 'Select CSV'}
        </button>
        <button
          type="button"
          onClick={handleDemoUpload}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
          disabled={isDemoLoading}
        >
          {isDemoLoading ? 'Loading…' : 'Use demo file'}
        </button>
        {fileName && (
          <p className="text-sm text-slate-600">
            Selected: <span className="font-medium">{fileName}</span>
          </p>
        )}
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting || !selectedFile}
      >
        {isSubmitting ? 'Validating…' : 'Upload & validate'}
      </button>

    </form>
  );
}

