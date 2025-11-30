import clsx from 'clsx';

type StatCardProps = {
  label: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
};

export default function StatCard({
  label,
  value,
  description,
  trend,
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900 lg:text-4xl">
            {value}
          </p>
          {description && (
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          )}
          {trend && (
            <div className="mt-3 flex items-center gap-1">
              <span
                className={clsx(
                  'text-sm font-semibold',
                  trend.isPositive ? 'text-emerald-600' : 'text-rose-600',
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

