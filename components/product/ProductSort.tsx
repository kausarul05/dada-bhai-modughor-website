'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ProductSort } from '@/types/product';

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'newest', label: 'নতুন আগে' },
  { value: 'price_asc', label: 'কম দামে আগে' },
  { value: 'price_desc', label: 'বেশি দামে আগে' },
  { value: 'rating', label: 'রেটিং অনুযায়ী' },
  { value: 'best_seller', label: 'বেস্ট সেলার' },
];

export function ProductSort() {
  const router = useRouter();
  const params = useSearchParams();
  const current = (params.get('sort') as ProductSort) || 'newest';

  function handleChange(value: ProductSort) {
    const p = new URLSearchParams(params.toString());
    p.set('sort', value);
    p.set('page', '1');
    router.push(`/shop?${p.toString()}`);
  }

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-[160px] text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
