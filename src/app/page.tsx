'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 text-white">
      <div className="w-full max-w-xl rounded-3xl bg-white/10 p-10 backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Wise WorkHub
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Orchestrate global payroll with confidence
        </h1>
        <p className="mt-3 text-sm text-slate-200">
          This is a sandbox login. Use the button below to enter the admin
          dashboard and manage your current payroll run.
        </p>

        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
          onClick={() => router.push('/dashboard')}
        >
          Enter dashboard
        </button>

        <p className="mt-6 text-xs text-slate-300">
          Need to jump straight into payroll?{' '}
          <Link
            href="/payroll"
            className="font-semibold text-white underline-offset-4 hover:underline"
          >
            Start a run
          </Link>
        </p>
      </div>
    </div>
  );
}
