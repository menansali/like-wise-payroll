import clsx from 'clsx';

type CardProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'dark';
};

export default function Card({
  title,
  children,
  className,
  actions,
  variant = 'default',
}: CardProps) {
  const variantClasses =
    variant === 'dark'
      ? 'border-slate-900 bg-slate-900 text-white'
      : 'border-slate-200 bg-white text-slate-900';

  return (
    <section
      className={clsx('rounded-xl border p-6 shadow-sm', variantClasses, className)}
    >
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-4">
          {title && (
            <h2
              className={clsx('text-base font-semibold', {
                'text-white': variant === 'dark',
              })}
            >
              {title}
            </h2>
          )}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

