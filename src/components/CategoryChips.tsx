'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';
import type { CategoryFilter } from '@/lib/types';

type Props = {
  filters: CategoryFilter[];
  onChange?: (filterId: string) => void;
  defaultFilter?: string;
};

export default function CategoryChips({ filters, onChange, defaultFilter }: Props) {
  const [active, setActive] = useState(defaultFilter ?? filters[0]?.id ?? '');

  useEffect(() => {
    if (defaultFilter !== undefined) {
      setActive(defaultFilter);
    }
  }, [defaultFilter]);

  const handleClick = (filterId: string) => {
    setActive(filterId);
    onChange?.(filterId);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => handleClick(filter.id)}
          className={clsx(
            'rounded-full border px-4 py-1 text-sm font-semibold transition',
            active === filter.id
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700',
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

