'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
  disabled,
}: QuantitySelectorProps) {
  const btnClass = cn(
    'flex items-center justify-center rounded-md border border-border bg-surface transition-colors hover:bg-background disabled:opacity-40',
    size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
  );
  const valClass = cn(
    'select-none text-center font-medium tabular-nums',
    size === 'sm' ? 'w-8 text-sm' : 'w-10 text-base'
  );

  return (
    <div className="flex items-center gap-1">
      <button
        className={btnClass}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        aria-label="পরিমাণ কমান"
      >
        <Minus size={size === 'sm' ? 12 : 14} />
      </button>
      <span className={valClass}>{value}</span>
      <button
        className={btnClass}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        aria-label="পরিমাণ বাড়ান"
      >
        <Plus size={size === 'sm' ? 12 : 14} />
      </button>
    </div>
  );
}
