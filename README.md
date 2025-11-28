# Wise WorkHub

Wise WorkHub is a minimal admin dashboard that simulates global payroll orchestration. It is built with Next.js App Router, TypeScript, and Tailwind CSS so you can quickly plug in real data sources or redesign the UI from Figma later on.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to use the fake login screen and follow the flow:

- `/` – Landing/Login (click **Enter dashboard**)
- `/dashboard` – Workforce snapshot + payroll health
- `/payroll` – Current payroll run overview
- `/payroll/upload` – CSV upload, validation, and results
- `/payroll/summary` – Payment summary (FX, fees, settlement)
- `/payroll/confirmation` – Confirmation after executing payroll

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
