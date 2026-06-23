import { prisma } from '@/lib/prisma';
import { ProductGrid } from './ProductGrid';
import { SectionHeader } from '@/components/shared/SectionHeader';

interface RelatedProductsProps {
  categoryId: string;
  excludeId: string;
}

export async function RelatedProducts({ categoryId, excludeId }: RelatedProductsProps) {
  const products = await prisma.product.findMany({
    where: {
      categoryId,
      isActive: true,
      NOT: { id: excludeId },
    },
    include: { category: true },
    take: 4,
    orderBy: { rating: 'desc' },
  });

  if (products.length === 0) return null;

  return (
    <div className="mt-12">
      <SectionHeader title="সম্পর্কিত পণ্য" ctaLabel="সব দেখুন" ctaHref="/shop" />
      <ProductGrid products={products as any} columns={4} />
    </div>
  );
}
