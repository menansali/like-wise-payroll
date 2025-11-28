'use client';

import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [banner, setBanner] = useState<string | null>(null);

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBanner(
      'Team member captured for this demo. In production this would create a record and route to review.',
    );
    void router.push('/team');
  };

  const handleDraft = () => {
    setBanner('Draft saved locally. Wire this up to your real backend later.');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Onboarding
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Add team member</h1>
          <p className="text-sm text-slate-500">
            Capture the basics so the payroll team can review and add documents later.
          </p>
        </div>
        <Card>
          <ol className="mb-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600">
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
                1
              </span>
              Basics
            </li>
            <li className="flex items-center gap-2 text-slate-400">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs">
                2
              </span>
              Documents
            </li>
            <li className="flex items-center gap-2 text-slate-400">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs">
                3
              </span>
              Review
            </li>
          </ol>
          {banner && (
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              {banner}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleNext}>
            <Field label="Full name">
              <input
                type="text"
                placeholder="Drina Kalbs"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Email address">
              <input
                type="email"
                placeholder="drina.kalbs@afga.com"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </Field>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Work relationship start date">
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  defaultValue="2025-12-12"
                />
              </Field>
              <Field label="Country">
                <select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
                  <option>India</option>
                  <option>United Kingdom</option>
                  <option>Brazil</option>
                </select>
              </Field>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
              >
                Next
              </button>
              <button
                type="button"
                onClick={handleDraft}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Save draft
              </button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}


