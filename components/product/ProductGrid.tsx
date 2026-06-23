import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { Package } from 'lucide-react';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  layout?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
}

const colMap = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

function ProductSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  loading,
  skeletonCount = 8,
  layout = 'grid',
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

  if (layout === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} layout="list" />
        ))}
      </div>
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
