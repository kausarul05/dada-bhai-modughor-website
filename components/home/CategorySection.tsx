import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/shared/SectionHeader';

const CATEGORIES = [
  {
    slug: 'honey', nameBn: 'মধু', emoji: '🍯',
    desc: 'সুন্দরবন, সরিষা ফুল',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80',
    overlay: 'from-amber-950/60 via-amber-900/40 to-transparent',
  },
  {
    slug: 'nuts', nameBn: 'বাদাম', emoji: '🥜',
    desc: 'কাজু, আখরোট, পেস্তা',
    image: 'https://images.unsplash.com/photo-1604680696395-5b1bcda8df86?w=500&q=80',
    overlay: 'from-orange-950/65 via-orange-900/40 to-transparent',
  },
  {
    slug: 'dates', nameBn: 'খেজুর', emoji: '🌴',
    desc: 'আজওয়া, মেডজুল',
    image: 'https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?w=500&q=80',
    overlay: 'from-yellow-950/65 via-yellow-900/40 to-transparent',
  },
  {
    slug: 'ghee', nameBn: 'ঘি', emoji: '🧈',
    desc: 'দেশি গাভীর খাঁটি ঘি',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&q=80',
    overlay: 'from-amber-950/65 via-amber-800/40 to-transparent',
  },
  {
    slug: 'dry-fruits', nameBn: 'ড্রাই ফ্রুটস', emoji: '🍇',
    desc: 'কিশমিশ, আলু বোখারা',
    image: 'https://images.unsplash.com/photo-1593560369855-8f9fbdf37a6e?w=500&q=80',
    overlay: 'from-purple-950/65 via-purple-900/40 to-transparent',
  },
  {
    slug: 'organic', nameBn: 'অর্গানিক', emoji: '🌿',
    desc: 'মশলা ও তেল',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80',
    overlay: 'from-green-950/65 via-green-900/40 to-transparent',
  },
];

export function CategorySection() {
  return (
    <section className="py-10 md:py-16 bg-page">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="পণ্যের ক্যাটাগরি"
          subtitle="পছন্দের ক্যাটাগরি থেকে বেছে নিন"
          ctaLabel="সব পণ্য →"
          ctaHref="/shop"
        />
        <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6 md:gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={cat.image}
                alt={cat.nameBn}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width:768px) 33vw, 17vw"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.overlay}`} />

              {/* Hover ring */}
              <div className="absolute inset-0 rounded-2xl ring-0 ring-[#C8860A] transition-all duration-300 group-hover:ring-2" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 px-2 text-center">
                <span className="text-2xl mb-1 drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                  {cat.emoji}
                </span>
                <span className="font-display text-[13px] font-bold text-white drop-shadow-sm leading-tight">
                  {cat.nameBn}
                </span>
                <span className="hidden md:block text-[10px] text-white/70 mt-0.5 leading-tight">
                  {cat.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}