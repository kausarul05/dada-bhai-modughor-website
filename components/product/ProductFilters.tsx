'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  _count?: { products: number };
}

interface ProductFiltersProps {
  categories: Category[];
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

const PRICE_RANGES = [
  { label: 'সব দাম',          min: 0,    max: 99999 },
  { label: '৳০ — ৳৫০০',       min: 0,    max: 500 },
  { label: '৳৫০০ — ৳১০০০',    min: 500,  max: 1000 },
  { label: '৳১০০০ — ৳২০০০',   min: 1000, max: 2000 },
  { label: '৳২০০০+',          min: 2000, max: 99999 },
];

function FilterSection({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#D9CEBC] pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between text-sm font-semibold text-[#1C1008] mb-3">
        {title}
        <ChevronDown size={13} className={cn('transition-transform text-[#7A6748]', open && 'rotate-180')} />
      </button>
      {open && children}
    </div>
  );
}

// Shared filter UI used by both desktop sidebar and mobile sheet
function FiltersUI({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const params = useSearchParams();

  const currentCategory = params.get('category') || '';
  const currentMinPrice = Number(params.get('minPrice') || 0);
  const currentMaxPrice = Number(params.get('maxPrice') || 99999);
  const currentRating   = Number(params.get('rating') || 0);
  const currentInStock  = params.get('inStock') === 'true';

  function go(updates: Record<string, string | null>) {
    const p = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null) p.delete(k);
      else p.set(k, v);
    });
    p.set('page', '1');
    router.push(`/shop?${p.toString()}`);
    onClose?.();
  }

  function clearAll() {
    const q = params.get('search');
    router.push(q ? `/shop?search=${q}` : '/shop');
    onClose?.();
  }

  const hasFilters = currentCategory || currentMinPrice > 0 || currentMaxPrice < 99999 || currentRating || currentInStock;

  return (
    <div>
      {hasFilters && (
        <button onClick={clearAll}
          className="mb-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-100 transition-colors">
          <X size={12} /> সব ফিল্টার মুছুন
        </button>
      )}

      {/* Categories — fetched via parent */}
      <FilterSection title="ক্যাটাগরি">
        <CategoryList currentCategory={currentCategory} go={go} />
      </FilterSection>

      <FilterSection title="মূল্য পরিসর">
        <div className="flex flex-col gap-0.5">
          {PRICE_RANGES.map(range => {
            const active = currentMinPrice === range.min && currentMaxPrice === range.max;
            return (
              <button key={range.label}
                onClick={() => go(
                  range.min === 0 && range.max === 99999
                    ? { minPrice: null, maxPrice: null }
                    : { minPrice: String(range.min), maxPrice: String(range.max) }
                )}
                className={cn(
                  'rounded-xl px-3 py-2 text-sm transition-colors text-left',
                  active ? 'bg-[#C8860A]/10 text-[#C8860A] font-semibold' : 'hover:bg-[#EAE0CB] text-[#1C1008]'
                )}>
                {range.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="রেটিং">
        <div className="flex flex-col gap-0.5">
          {[0, 4, 3, 2].map(r => (
            <button key={r}
              onClick={() => go({ rating: r === 0 ? null : String(r) })}
              className={cn(
                'flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors text-left',
                currentRating === r ? 'bg-[#C8860A]/10 text-[#C8860A] font-semibold' : 'hover:bg-[#EAE0CB] text-[#1C1008]'
              )}>
              {r === 0 ? 'সব রেটিং' : (
                <span className="flex items-center gap-1.5">
                  <span className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={cn('text-xs', i < r ? 'text-[#C8860A]' : 'text-[#D9CEBC]')}>★</span>
                    ))}
                  </span>
                  ও তার বেশি
                </span>
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="প্রাপ্যতা" defaultOpen={false}>
        <button
          onClick={() => go({ inStock: currentInStock ? null : 'true' })}
          className={cn(
            'flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors w-full text-left',
            currentInStock ? 'bg-[#C8860A]/10 text-[#C8860A] font-semibold' : 'hover:bg-[#EAE0CB] text-[#1C1008]'
          )}>
          <div className={cn(
            'h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors',
            currentInStock ? 'border-[#C8860A] bg-[#C8860A]' : 'border-[#D9CEBC]'
          )}>
            {currentInStock && <span className="text-white text-[10px] font-bold leading-none">✓</span>}
          </div>
          স্টকে আছে এমন পণ্য
        </button>
      </FilterSection>
    </div>
  );
}

// Category list needs categories from parent — pass via context-like trick
let _categories: Category[] = [];

function CategoryList({ currentCategory, go }: {
  currentCategory: string;
  go: (u: Record<string, string | null>) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <button
        onClick={() => go({ category: null })}
        className={cn(
          'flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors text-left',
          !currentCategory ? 'bg-[#C8860A]/10 text-[#C8860A] font-semibold' : 'hover:bg-[#EAE0CB] text-[#1C1008]'
        )}>
        সব পণ্য
      </button>
      {_categories.map(cat => (
        <button key={cat.id}
          onClick={() => go({ category: cat.slug === currentCategory ? null : cat.slug })}
          className={cn(
            'flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors text-left',
            currentCategory === cat.slug
              ? 'bg-[#C8860A]/10 text-[#C8860A] font-semibold'
              : 'hover:bg-[#EAE0CB] text-[#1C1008]'
          )}>
          <span>{cat.nameBn}</span>
          <span className="text-xs text-[#7A6748]">({cat._count?.products ?? 0})</span>
        </button>
      ))}
    </div>
  );
}

export function ProductFilters({ categories, mobileOnly, desktopOnly }: ProductFiltersProps) {
  // Store categories for use in FiltersUI
  _categories = categories;

  const [sheetOpen, setSheetOpen] = useState(false);
  const params = useSearchParams();
  const hasFilters = !!(
    params.get('category') ||
    Number(params.get('minPrice') || 0) > 0 ||
    Number(params.get('maxPrice') || 99999) < 99999 ||
    params.get('rating') ||
    params.get('inStock')
  );

  // Mobile only — just the trigger button + sheet
  if (mobileOnly) {
    return (
      <>
        <button
          onClick={() => setSheetOpen(true)}
          className={cn(
            'flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-colors',
            hasFilters
              ? 'border-[#C8860A] bg-[#C8860A]/10 text-[#C8860A]'
              : 'border-[#D9CEBC] bg-[#FAF4E8] text-[#1C1008] hover:bg-[#EAE0CB]'
          )}>
          <SlidersHorizontal size={14} />
          ফিল্টার
          {hasFilters && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C8860A] text-[10px] font-bold text-white">
              !
            </span>
          )}
        </button>

        {/* Sheet */}
        {sheetOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSheetOpen(false)}
            />
            {/* Panel — slide from right */}
            <div className="relative ml-auto h-full w-[290px] max-w-[90vw] bg-[#FAF4E8] flex flex-col shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#D9CEBC] px-4 py-3 sticky top-0 bg-[#FAF4E8] z-10">
                <h2 className="font-display text-base font-bold text-[#1C1008] flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-[#C8860A]" />
                  ফিল্টার করুন
                </h2>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#EAE0CB] transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-4">
                <FiltersUI onClose={() => setSheetOpen(false)} />
              </div>

              {/* Footer */}
              <div className="border-t border-[#D9CEBC] p-4 bg-[#FAF4E8]">
                <button
                  onClick={() => setSheetOpen(false)}
                  className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-honey"
                  style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
                  ফলাফল দেখুন
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop only — sidebar
  if (desktopOnly) {
    return (
      <div className="hidden md:block w-56 shrink-0">
        <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-4 shadow-card sticky top-24">
          <h2 className="font-display text-sm font-bold text-[#1C1008] mb-4 flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[#C8860A]" />
            ফিল্টার
          </h2>
          <FiltersUI />
        </div>
      </div>
    );
  }

  return null;
}