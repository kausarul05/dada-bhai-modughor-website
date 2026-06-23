import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategorySection } from '@/components/home/CategorySection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { BrandStory } from '@/components/home/BrandStory';
import { FAQSection } from '@/components/home/FAQSection';
import { Newsletter } from '@/components/home/Newsletter';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CONFIG } from '@/constants/config';

export const metadata: Metadata = {
  title: `${CONFIG.APP_NAME} | প্রাকৃতিক ও অর্গানিক পণ্যের বিশ্বস্ত স্টোর`,
  description: CONFIG.APP_DESCRIPTION,
};

// Revalidate every 5 minutes for product data
export const revalidate = 300;

export default async function HomePage() {
  const [featuredProducts, bestSellers] = await Promise.all([
    prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.findMany({
      where: { isBestSeller: true, isActive: true },
      include: { category: true },
      take: 8,
      orderBy: { rating: 'desc' },
    }),
  ]);

  return (
    <>
      {/* Hero */}
      <HeroBanner />

      {/* Categories */}
      <CategorySection />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="ফিচার্ড পণ্য"
              subtitle="আমাদের সেরা বাছাই করা পণ্য সমূহ"
              ctaLabel="সব দেখুন"
              ctaHref="/shop?isFeatured=true"
            />
            <ProductGrid products={featuredProducts as any} columns={4} />
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader
              title="বেস্ট সেলার"
              subtitle="সবচেয়ে বেশি বিক্রিত ও জনপ্রিয় পণ্য"
              ctaLabel="সব দেখুন"
              ctaHref="/shop?sort=best_seller"
            />
            <ProductGrid products={bestSellers as any} columns={4} />
          </div>
        </section>
      )}

      {/* Brand Story */}
      <BrandStory />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* FAQ */}
      <FAQSection />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
