'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-10 backdrop-blur">
        <p className="text-sm uppercase tracking-wide text-slate-200">
          Wise
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          Welcome back. Enter the admin console.
        </h1>
        <p className="mt-1 text-sm text-slate-200">
          New to Wise?{' '}
          <button className="font-semibold underline-offset-4 hover:underline">
            Request access
          </button>
        </p>

        <div className="mt-6 rounded-2xl border border-rose-500/40 bg-rose-500/20 px-4 py-3 text-sm text-rose-100">
          Sandbox notice: all logins route to the demo dashboard, no credentials needed.
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            router.push('/dashboard');
          }}
        >
          <label className="block text-sm font-semibold text-slate-200">
            Your email address
            <input
              type="email"
              placeholder="alex.morgan@wise.com"
              className="mt-2 w-full rounded-2xl border border-white/30 bg-white/10 px-3 py-2 text-base text-white placeholder:text-slate-400"
              required
            />
          </label>
          <label className="block text-sm font-semibold text-slate-200">
            Your password
            <div className="mt-2 flex items-center rounded-2xl border border-white/30 bg-white/10 px-3">
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border-0 bg-transparent py-2 text-base text-white placeholder:text-slate-400 focus:outline-none"
                required
              />
              <button
                type="button"
                className="text-xs font-semibold text-slate-300 hover:text-white"
              >
                Show
              </button>
            </div>
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-white px-4 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Log in
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-between text-sm text-slate-200">
          <Link href="#" className="underline-offset-4 hover:underline">
            Trouble logging in?
          </Link>
          <span>or log in with</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {['Google', 'Facebook', 'Apple'].map((provider) => (
            <button
              key={provider}
              type="button"
              className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              onClick={() => router.push('/dashboard')}
            >
              {provider}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="mt-4 w-full rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
          onClick={() => router.push('/dashboard')}
        >
          Log in with a passkey
        </button>
      </div>
    </div>
  );
}
