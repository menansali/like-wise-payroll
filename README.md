# Wise - Global Payroll Orchestration Platform

A comprehensive admin dashboard for global payroll orchestration and treasury management. Built with Next.js 16, TypeScript, and Tailwind CSS. Features end-to-end payroll processing, smart FX rate locking, multi-currency support, and team management.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to start the demo (redirects directly to dashboard):

**Main Routes:**
- `/` – Redirects to `/dashboard`
- `/dashboard` – Workforce snapshot, payroll health, smart alerts
- `/payroll` – Current payroll run overview with green alert
- `/payroll/upload` – CSV upload with "Use demo file" option
- `/payroll/summary` – Payment summary with FX planner (3 options)
- `/payroll/confirmation` – Execution confirmation
- `/smart-budget` – Budget planning, FX rate locking, schedule table
- `/team` – Team member management

**Quick Demo Flow:**
1. Root (`/`) → Auto-redirects to Dashboard
2. Dashboard → "Start payroll run" 
3. Upload → "Use demo file"
4. Summary → Select FX option → Execute
5. Confirmation → See results

## Project structure

- `src/components` – Reusable primitives (`Layout`, `Card`, banners) plus dashboard widgets and payroll tables.
- `src/context/PayrunContext.tsx` – In-memory store for the active payroll run, validation output, and confirmation results. No persistence is used.
- `src/lib` – Mock workforce data (`mockData.ts`), CSV parsing (`csv.ts`), validation logic (`validation.ts`), and payment summary helpers (`summary.ts`).
- `src/app/api/validate/route.ts` – Simple endpoint that applies the validation rules.
- `src/app/...` – App Router pages wired to each step of the experience.

Tailwind utility classes keep the styling neutral so you can replace them with design-system tokens later.

## Mock data & validation

- Adjust workforce and payroll health cards in `src/lib/mockData.ts`.
- Change validation thresholds or add new rules in `src/lib/validation.ts`.
- Modify FX rates, fees, or settlement times in `src/lib/summary.ts`.

## Tooling

- ESLint is configured via `eslint.config.mjs`.
- Run `npm run lint` for static analysis.
- Run `npm run format` to apply the Prettier config at `prettier.config.mjs`.
