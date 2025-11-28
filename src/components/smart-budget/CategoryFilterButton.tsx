'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Props = {
  label: string;
  options?: string[];
  onChange?: (selected: string) => void;
};

export default function CategoryFilterButton({ label, options = [], onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-400 bg-white px-2 py-1 text-base hover:bg-slate-50"
      >
        <span className="rounded-full bg-emerald-200 px-1 py-1">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
        </span>
        <span className="text-slate-900">{selected}</span>
        <ChevronDown className="h-4 w-4 text-slate-600" />
      </button>
      {isOpen && options.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-[5]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full z-10 mt-2 rounded-lg border border-slate-200 bg-white shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

