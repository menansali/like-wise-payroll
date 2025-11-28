'use client';

import clsx from 'clsx';
import { useState } from 'react';
import type { CategoryFilter } from '@/lib/types';

type Props = {
  filters: CategoryFilter[];
};

export default function CategoryChips({ filters }: Props) {
  const [active, setActive] = useState(filters[0]?.id ?? '');

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => setActive(filter.id)}
          className={clsx(
            'rounded-full border px-4 py-1 text-sm font-semibold transition',
            active === filter.id
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

