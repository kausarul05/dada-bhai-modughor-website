import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductActions } from '@/components/product/ProductActions';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { Rating } from '@/components/ui/Rating';
import { StockBadge } from '@/components/ui/StockBadge';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { formatPrice, discountPercent, effectivePrice } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Truck, RotateCcw, Award } from 'lucide-react';
import { CONFIG } from '@/constants/config';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug, isActive: true },
  });
  if (!product) return { title: 'পণ্য পাওয়া যায়নি' };
  return {
    title: product.nameBn,
    description: product.description.slice(0, 160),
    openGraph: { images: [{ url: product.thumbnailImage }] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug, isActive: true },
    include: {
      category: true,
      reviews: {
        where: { isApproved: true },
        include: { user: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!product) notFound();

  const price = effectivePrice(product as any);
  const hasDiscount = !!product.discountPrice;
  const pct = hasDiscount
    ? discountPercent(Number(product.price), Number(product.discountPrice))
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumb
        items={[
          { label: 'শপ', href: '/shop' },
          { label: product.category.nameBn, href: `/shop/${product.category.slug}` },
          { label: product.nameBn },
        ]}
      />

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        {/* Gallery */}
        <ProductGallery images={product.images} thumbnail={product.thumbnailImage} name={product.nameBn} />

        {/* Info */}
        <div className="flex flex-col gap-4">
          {/* Category + badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs border-primary text-primary">
              {product.category.nameBn}
            </Badge>
            {product.isBestSeller && (
              <Badge className="bg-primary text-white text-xs">বেস্ট সেলার</Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-secondary text-white text-xs">ফিচার্ড</Badge>
            )}
          </div>

          {/* Name */}
          <h1 className="font-display text-2xl font-bold leading-snug text-foreground md:text-3xl">
            {product.nameBn}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Rating value={product.rating} size="md" readonly />
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.reviewCount}টি রিভিউ)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(Number(product.price))}
                </span>
                <Badge className="bg-red-500 text-white">-{pct}%</Badge>
              </>
            )}
            <span className="text-sm text-muted-foreground">/{product.unit}</span>
          </div>

          {/* Stock */}
          <StockBadge stock={product.stock} />

          {/* Weight/SKU */}
          {product.weight && (
            <p className="text-sm text-muted-foreground">
              ওজন: <strong>{product.weight}g</strong> | SKU: <strong>{product.sku}</strong>
            </p>
          )}

          {/* Add to cart / Buy now */}
          <ProductActions product={product as any} />

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/30 p-3">
            {[
              { icon: Shield, text: '১০০% বিশুদ্ধ ও অর্গানিক' },
              { icon: Truck, text: 'দ্রুত ডেলিভারি সারা বাংলাদেশে' },
              { icon: RotateCcw, text: '৭ দিনের রিটার্ন গ্যারান্টি' },
              { icon: Award, text: 'মান নিয়ন্ত্রিত পণ্য' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon size={14} className="text-primary shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Description, Reviews */}
      <div className="mt-10">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">বিস্তারিত</TabsTrigger>
            <TabsTrigger value="reviews">
              রিভিউ ({product.reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4 prose prose-sm max-w-none">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.descriptionBn || product.description}
            </p>
            {product.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            {product.reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">এখনো কোনো রিভিউ নেই।</p>
            ) : (
              <div className="flex flex-col gap-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{review.user.name || 'ক্রেতা'}</p>
                        {review.isVerified && (
                          <span className="text-xs text-secondary">✓ যাচাইকৃত ক্রয়</span>
                        )}
                      </div>
                      <Rating value={review.rating} size="sm" readonly />
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <RelatedProducts
        categoryId={product.categoryId}
        excludeId={product.id}
      />
    </div>
  );
}
