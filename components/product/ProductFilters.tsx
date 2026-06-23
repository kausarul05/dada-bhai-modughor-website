'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Slider } from '@/components/ui/slider';
// import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Rating } from '@/components/ui/Rating';
import { SlidersHorizontal, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { Category } from '@/types/product';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const isMobile = useIsMobile();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(params.get('minPrice') || 0),
    Number(params.get('maxPrice') || 5000),
  ]);
  const [minRating, setMinRating] = useState(Number(params.get('rating') || 0));
  const [inStock, setInStock] = useState(params.get('inStock') === 'true');

  const applyFilters = useCallback(() => {
    const p = new URLSearchParams(params.toString());
    p.set('minPrice', String(priceRange[0]));
    p.set('maxPrice', String(priceRange[1]));
    if (minRating) p.set('rating', String(minRating));
    else p.delete('rating');
    if (inStock) p.set('inStock', 'true');
    else p.delete('inStock');
    p.set('page', '1');
    router.push(`/shop?${p.toString()}`);
  }, [priceRange, minRating, inStock, params, router]);

  const clearFilters = () => {
    router.push('/shop');
  };

  const FiltersContent = (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">ক্যাটাগরি</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                {/* <Checkbox
                  checked={params.get('category') === cat.slug}
                  onCheckedChange={() => {
                    const p = new URLSearchParams(params.toString());
                    if (params.get('category') === cat.slug) p.delete('category');
                    else p.set('category', cat.slug);
                    p.set('page', '1');
                    router.push(`/shop?${p.toString()}`);
                  }}
                /> */}
                <span className="text-sm">{cat.nameBn}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({cat._count?.products ?? 0})
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">মূল্য পরিসর</h3>
        <Slider
          min={0}
          max={5000}
          step={50}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>৳{priceRange[0]}</span>
          <span>৳{priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">ন্যূনতম রেটিং</h3>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2">
              {/* <Checkbox
                checked={minRating === r}
                onCheckedChange={() => setMinRating(minRating === r ? 0 : r)}
              /> */}
              <Rating value={r} size="sm" readonly />
              <span className="text-xs text-muted-foreground">ও তার বেশি</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* In Stock */}
      <div className="flex items-center gap-2">
        {/* <Checkbox
          id="inStock"
          checked={inStock}
          onCheckedChange={(c) => setInStock(!!c)}
        /> */}
        <Label htmlFor="inStock" className="cursor-pointer text-sm">
          শুধু স্টকে আছে এমন পণ্য
        </Label>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button className="flex-1" onClick={applyFilters}>
          ফিল্টার করুন
        </Button>
        <Button variant="outline" onClick={clearFilters}>
          <X size={14} />
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5">
            <SlidersHorizontal size={14} />
            ফিল্টার
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>ফিল্টার করুন</SheetTitle>
          </SheetHeader>
          <div className="mt-6">{FiltersContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-60 shrink-0 rounded-xl border border-border bg-surface p-4 shadow-sm">
      <h2 className="mb-4 font-semibold text-foreground">ফিল্টার</h2>
      {FiltersContent}
    </div>
  );
}
