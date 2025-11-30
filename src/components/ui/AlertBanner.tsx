'use client';

import clsx from 'clsx';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

type AlertVariant = 'success' | 'warning' | 'error' | 'info';

type AlertBannerProps = {
  message: string;
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

export default function AlertBanner({
  message,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  className,
}: AlertBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const variantStyles = {
    success: {
      container: 'border-emerald-300 bg-emerald-50 text-emerald-900',
      icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
    },
    warning: {
      container: 'border-amber-200 bg-amber-50 text-amber-900',
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
    },
    error: {
      container: 'border-rose-200 bg-rose-50 text-rose-900',
      icon: <AlertCircle className="h-5 w-5 text-rose-600" />,
    },
    info: {
      container: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      icon: <Info className="h-5 w-5 text-emerald-600" />,
    },
  };

  const style = variantStyles[variant];

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={clsx(
        'rounded-2xl border p-4 shadow-sm',
        style.container,
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{style.icon}</div>
        <div className="flex-1">
          {title && (
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide">
              {title}
            </p>
          )}
          <p className="text-sm font-medium">{message}</p>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 rounded-lg p-1 hover:bg-black/5"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

