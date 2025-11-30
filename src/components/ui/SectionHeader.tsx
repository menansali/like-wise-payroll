import clsx from 'clsx';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  description,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between',
        className,
      )}
    >
      <div className="flex-1 space-y-2">
        {subtitle && (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">{title}</h1>
        {description && (
          <p className="text-base text-slate-600 lg:text-lg">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

