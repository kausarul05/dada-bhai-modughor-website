import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductActions } from '@/components/product/ProductActions';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { formatPrice, discountPercent, effectivePrice } from '@/lib/utils';
import { Shield, Truck, RotateCcw, Award, Star, Package, CheckCircle } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>  
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params  
  const product = await prisma.product.findUnique({
    where: { slug },
  });
  if (!product || !product.isActive) return { title: 'পণ্য পাওয়া যায়নি' };
  return {
    title: product.nameBn,
    description: product.description.slice(0, 160),
    openGraph: { images: [{ url: product.thumbnailImage }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
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

  if (!product || !product.isActive) notFound();

  const price      = effectivePrice(product as any);
  const hasDiscount = !!product.discountPrice;
  const pct        = hasDiscount ? discountPercent(Number(product.price), Number(product.discountPrice)) : 0;

  // Rating breakdown (mock for now)
  const ratingBars = [5,4,3,2,1].map(r => ({
    star: r,
    count: product.reviews.filter(rv => rv.rating === r).length,
    pct: product.reviewCount > 0
      ? Math.round((product.reviews.filter(rv => rv.rating === r).length / product.reviewCount) * 100)
      : 0,
  }));

  return (
    <div className="min-h-screen bg-[#F2E8D5]">
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">

        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'শপ', href: '/shop' },
          { label: product.category.nameBn, href: `/shop?category=${product.category.slug}` },
          { label: product.nameBn },
        ]} />

        {/* Main product section */}
        <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-10">

          {/* ── Left: Gallery ── */}
          <ProductGallery
            images={product.images}
            thumbnail={product.thumbnailImage}
            name={product.nameBn}
          />

          {/* ── Right: Info ── */}
          <div className="flex flex-col gap-4">

            {/* Category + badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#C8860A]/40 bg-[#C8860A]/10 px-3 py-0.5 text-xs font-medium text-[#C8860A]">
                {product.category.nameBn}
              </span>
              {product.isBestSeller && (
                <span className="rounded-full px-3 py-0.5 text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
                  🏆 বেস্ট সেলার
                </span>
              )}
              {product.isFeatured && (
                <span className="rounded-full bg-[#2D6A4F] px-3 py-0.5 text-xs font-medium text-white">
                  ⭐ ফিচার্ড
                </span>
              )}
            </div>

            {/* Product name */}
            <h1 className="font-display text-2xl font-bold leading-snug text-[#1C1008] md:text-3xl">
              {product.nameBn}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-2.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15}
                    className={i < Math.round(product.rating)
                      ? 'fill-[#C8860A] text-[#C8860A]'
                      : 'fill-[#D9CEBC] text-[#D9CEBC]'} />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#1C1008]">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-[#7A6748]">
                ({product.reviewCount}টি রিভিউ)
              </span>
              {product.stock > 0 && (
                <span className="ml-auto text-xs font-medium text-[#2D6A4F] flex items-center gap-1">
                  <CheckCircle size={12} /> স্টকে আছে
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] px-4 py-3">
              <span className="font-display text-3xl font-bold text-[#C8860A]">
                {formatPrice(price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-[#7A6748] line-through">
                    {formatPrice(Number(product.price))}
                  </span>
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    -{pct}%
                  </span>
                </>
              )}
              <span className="ml-auto text-sm text-[#7A6748]">/{product.unit}</span>
            </div>

            {/* Stock warning */}
            {product.stock > 0 && product.stock <= 10 && (
              <div className="flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-3 py-2">
                <Package size={14} className="text-orange-500 shrink-0" />
                <span className="text-xs font-medium text-orange-700">
                  স্টকে মাত্র {product.stock}টি বাকি আছে — দ্রুত অর্ডার করুন!
                </span>
              </div>
            )}
            {product.stock === 0 && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2">
                <Package size={14} className="text-red-500 shrink-0" />
                <span className="text-xs font-medium text-red-700">এই পণ্যটি বর্তমানে স্টকে নেই</span>
              </div>
            )}

            {/* Short description */}
            <p className="text-sm leading-relaxed text-[#7A6748]">
              {product.descriptionBn || product.description}
            </p>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map(tag => (
                  <span key={tag}
                    className="rounded-full border border-[#D9CEBC] bg-[#EAE0CB] px-2.5 py-0.5 text-xs text-[#7A6748]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* SKU & Weight */}
            <div className="flex flex-wrap gap-4 text-xs text-[#7A6748]">
              <span>SKU: <strong>{product.sku}</strong></span>
              {product.weight && <span>ওজন: <strong>{product.weight}g</strong></span>}
            </div>

            {/* Add to cart / Buy now */}
            <ProductActions product={product as any} />

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-3">
              {[
                { icon: Shield,    text: '১০০% বিশুদ্ধ ও অর্গানিক' },
                { icon: Truck,     text: 'দ্রুত ডেলিভারি সারা বাংলাদেশ' },
                { icon: RotateCcw, text: '৭ দিনের রিটার্ন গ্যারান্টি' },
                { icon: Award,     text: 'মান নিয়ন্ত্রিত পণ্য' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-[#7A6748]">
                  <Icon size={13} className="text-[#C8860A] shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Reviews section ── */}
        <div className="mt-10 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-5 md:p-6">
          <h2 className="font-display text-xl font-bold text-[#1C1008] mb-5">
            গ্রাহক রিভিউ
          </h2>

          {product.reviewCount === 0 ? (
            <div className="py-8 text-center text-sm text-[#7A6748]">
              এখনো কোনো রিভিউ নেই। প্রথম রিভিউ দিন!
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-[200px_1fr]">
              {/* Summary */}
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-[#D9CEBC] bg-[#EAE0CB] p-4 text-center">
                <span className="font-display text-5xl font-bold text-[#C8860A]">
                  {product.rating.toFixed(1)}
                </span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16}
                      className={i < Math.round(product.rating) ? 'fill-[#C8860A] text-[#C8860A]' : 'fill-[#D9CEBC] text-[#D9CEBC]'} />
                  ))}
                </div>
                <span className="text-xs text-[#7A6748]">{product.reviewCount}টি রিভিউ</span>
                {/* Rating bars */}
                <div className="mt-3 w-full flex flex-col gap-1.5">
                  {ratingBars.map(({ star, count, pct: p }) => (
                    <div key={star} className="flex items-center gap-1.5 text-[10px] text-[#7A6748]">
                      <span className="w-3 text-right">{star}</span>
                      <Star size={8} className="fill-[#C8860A] text-[#C8860A]" />
                      <div className="flex-1 h-1.5 rounded-full bg-[#D9CEBC] overflow-hidden">
                        <div className="h-full rounded-full bg-[#C8860A]" style={{ width: `${p}%` }} />
                      </div>
                      <span className="w-4">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review list */}
              <div className="flex flex-col gap-4">
                {product.reviews.map(review => (
                  <div key={review.id} className="rounded-xl border border-[#D9CEBC] bg-[#FAF4E8] p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-semibold text-[#1C1008]">
                          {review.user.name || 'ক্রেতা'}
                        </p>
                        {review.isVerified && (
                          <p className="text-xs text-[#2D6A4F] font-medium">✓ যাচাইকৃত ক্রয়</p>
                        )}
                      </div>
                      <div className="flex shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12}
                            className={i < review.rating ? 'fill-[#C8860A] text-[#C8860A]' : 'fill-[#D9CEBC] text-[#D9CEBC]'} />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-[#7A6748] leading-relaxed">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Related products ── */}
        <RelatedProducts categoryId={product.categoryId} excludeId={product.id} />
      </div>
    </div>
  );
}