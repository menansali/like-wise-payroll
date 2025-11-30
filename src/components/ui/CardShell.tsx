import clsx from 'clsx';

type CardShellProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
};

export default function CardShell({
  title,
  children,
  className,
  actions,
  variant = 'default',
  padding = 'md',
}: CardShellProps) {
  const variantClasses = {
    default: 'border border-slate-200 bg-white shadow-sm',
    elevated: 'border border-slate-200 bg-white shadow-md',
    outlined: 'border-2 border-slate-200 bg-white',
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <section
      className={clsx(
        'rounded-2xl',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
    >
      {(title || actions) && (
        <div className="mb-6 flex items-center justify-between gap-4">
          {title && (
            <h2 className="text-xl font-bold text-slate-900 lg:text-2xl">
              {title}
            </h2>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

