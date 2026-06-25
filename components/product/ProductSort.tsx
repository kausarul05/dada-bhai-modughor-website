'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'newest',      label: 'নতুন আগে' },
  { value: 'price_asc',   label: 'কম দামে আগে' },
  { value: 'price_desc',  label: 'বেশি দামে আগে' },
  { value: 'rating',      label: 'রেটিং অনুযায়ী' },
  { value: 'best_seller', label: 'বেস্ট সেলার' },
];

export function ProductSort() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get('sort') || 'newest';

  function handleChange(value: string) {
    const p = new URLSearchParams(params.toString());
    p.set('sort', value);
    p.set('page', '1');
    router.push(`/shop?${p.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={14} className="text-[#7A6748] shrink-0" />
      <select
        value={current}
        onChange={e => handleChange(e.target.value)}
        className="rounded-xl border border-[#D9CEBC] bg-[#FAF4E8] px-3 py-2 text-sm text-[#1C1008] focus:border-[#C8860A] focus:outline-none focus:ring-2 focus:ring-[#C8860A]/20 cursor-pointer">
        {SORT_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}