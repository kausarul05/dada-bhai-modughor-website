import Link from 'next/link';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';

// Static category data — replace with DB fetch if needed
const CATEGORIES = [
  {
    slug: 'honey',
    nameBn: 'মধু',
    emoji: '🍯',
    desc: 'সুন্দরবন, সরিষা ফুল',
    color: 'from-amber-50 to-amber-100',
    border: 'border-amber-200',
    textColor: 'text-amber-800',
    image: '/images/cat-honey.jpg',
  },
  {
    slug: 'nuts',
    nameBn: 'বাদাম',
    emoji: '🥜',
    desc: 'কাজু, আখরোট, পেস্তা',
    color: 'from-orange-50 to-orange-100',
    border: 'border-orange-200',
    textColor: 'text-orange-800',
    image: '/images/cat-nuts.jpg',
  },
  {
    slug: 'dates',
    nameBn: 'খেজুর',
    emoji: '🌴',
    desc: 'আজওয়া, মেডজুল, মরিয়ম',
    color: 'from-yellow-50 to-yellow-100',
    border: 'border-yellow-200',
    textColor: 'text-yellow-800',
    image: '/images/cat-dates.jpg',
  },
  {
    slug: 'ghee',
    nameBn: 'ঘি',
    emoji: '🧈',
    desc: 'দেশি গাভীর খাঁটি ঘি',
    color: 'from-yellow-50 to-amber-50',
    border: 'border-yellow-300',
    textColor: 'text-yellow-900',
    image: '/images/cat-ghee.jpg',
  },
  {
    slug: 'dry-fruits',
    nameBn: 'ড্রাই ফ্রুটস',
    emoji: '🍇',
    desc: 'কিশমিশ, আলু বোখারা',
    color: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    textColor: 'text-purple-800',
    image: '/images/cat-dry-fruits.jpg',
  },
  {
    slug: 'organic',
    nameBn: 'অর্গানিক',
    emoji: '🌿',
    desc: 'প্রাকৃতিক মশলা ও তেল',
    color: 'from-green-50 to-green-100',
    border: 'border-green-200',
    textColor: 'text-green-800',
    image: '/images/cat-organic.jpg',
  },
];

export function CategorySection() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="পণ্যের ক্যাটাগরি"
          subtitle="আপনার পছন্দের ক্যাটাগরি থেকে বেছে নিন"
          ctaLabel="সব পণ্য দেখুন"
          ctaHref="/shop"
        />

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className={cn(
                'group flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all hover:-translate-y-1 hover:shadow-md md:p-4',
                `bg-gradient-to-b ${cat.color} ${cat.border}`
              )}
            >
              <span className="text-3xl transition-transform group-hover:scale-110 md:text-4xl">
                {cat.emoji}
              </span>
              <span className={cn('font-display text-sm font-semibold', cat.textColor)}>
                {cat.nameBn}
              </span>
              <span className="hidden text-center text-xs text-muted-foreground md:block">
                {cat.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
