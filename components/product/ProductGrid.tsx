import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { Package } from 'lucide-react';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  columns?: 2 | 3 | 4;
}

const colMap = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] overflow-hidden">
      <Skeleton className="aspect-square w-full bg-[#EAE0CB]" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4 bg-[#EAE0CB]" />
        <Skeleton className="h-3 w-1/2 bg-[#EAE0CB]" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-5 w-16 bg-[#EAE0CB]" />
          <Skeleton className="h-9 w-9 rounded-xl bg-[#EAE0CB]" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  loading,
  skeletonCount = 8,
  columns = 4,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={`grid gap-3 md:gap-4 ${colMap[columns]}`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        icon={Package}
        title="কোনো পণ্য পাওয়া যায়নি"
        description="অন্য ফিল্টার দিয়ে চেষ্টা করুন"
      />
    );
  }

  return (
    <div className={`grid gap-3 md:gap-4 ${colMap[columns]}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}