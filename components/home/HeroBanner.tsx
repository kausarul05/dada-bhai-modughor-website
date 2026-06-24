'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    id: 1,
    badge: '✨ ১০০% বিশুদ্ধ',
    title: 'সুন্দরবনের\nখাঁটি মধু',
    subtitle: 'মৌচাক থেকে সরাসরি আপনার দরজায় — কোনো মিশ্রণ নেই, কোনো কেমিক্যাল নেই',
    cta: 'মধু কিনুন',
    ctaHref: '/shop?category=honey',
    cta2: 'সব পণ্য',
    cta2Href: '/shop',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1600&q=85',
  },
  {
    id: 2,
    badge: '🥜 প্রিমিয়াম কোয়ালিটি',
    title: 'সেরা বাদাম ও\nড্রাই ফ্রুটস',
    subtitle: 'কাজু, আখরোট, পেস্তা, আলমন্ড — বিশ্বের সেরা বাদাম এক জায়গায়',
    cta: 'বাদাম দেখুন',
    ctaHref: '/shop?category=nuts',
    cta2: 'সব পণ্য',
    cta2Href: '/shop',
    image: 'https://images.unsplash.com/photo-1604680696395-5b1bcda8df86?w=1600&q=85',
  },
  {
    id: 3,
    badge: '🌴 সৌদি আরব থেকে',
    title: 'আজওয়া ও\nমেডজুল খেজুর',
    subtitle: 'রমজান ও সারা বছরের জন্য বিশ্বের সেরা মানের খেজুর সরাসরি আপনার কাছে',
    cta: 'খেজুর দেখুন',
    ctaHref: '/shop?category=dates',
    cta2: 'সব পণ্য',
    cta2Href: '/shop',
    image: 'https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?w=1600&q=85',
  },
];

export function HeroBanner() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: 'clamp(260px, 50vw, 560px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            i === cur ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          {/* BG Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />

          {/* Overlay gradient */}
          <div className="gradient-hero-left absolute inset-0" />

          {/* Bottom fade into page bg */}
          <div className="absolute bottom-0 left-0 right-0 h-20"
            style={{ background: 'linear-gradient(to top, #F2E8D5, transparent)' }} />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="max-w-[480px]" key={cur}>
            {/* Badge */}
            <div className="inline-flex items-center rounded-full px-3 py-1 mb-3 text-xs font-semibold text-white animate-fade-in"
              style={{ background: 'rgba(200,134,10,0.85)', backdropFilter: 'blur(4px)' }}>
              {SLIDES[cur].badge}
            </div>

            {/* Title */}
            <h1
              className="font-display font-bold text-white leading-tight whitespace-pre-line animate-slide-up"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)' }}>
              {SLIDES[cur].title}
            </h1>

            {/* Subtitle */}
            <p className="mt-2.5 text-white/80 leading-relaxed animate-fade-in"
              style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}>
              {SLIDES[cur].subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={SLIDES[cur].ctaHref}
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-honey transition-all hover:-translate-y-0.5 hover:shadow-honey-lg"
                style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
                {SLIDES[cur].cta} →
              </Link>
              <Link href={SLIDES[cur].cta2Href}
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-white border border-white/35 transition-all hover:bg-white/15"
                style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.1)' }}>
                {SLIDES[cur].cta2}
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-white/60">
              <span>✓ ১০০০+ সন্তুষ্ট গ্রাহক</span>
              <span>✓ ৭ দিন রিটার্ন</span>
              <span>✓ ফ্রি ডেলিভারি ৳১০০০+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      {['prev','next'].map(dir => (
        <button
          key={dir}
          onClick={() => setCur(c => dir === 'prev' ? (c - 1 + SLIDES.length) % SLIDES.length : (c + 1) % SLIDES.length)}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition-all hover:bg-white/25',
            dir === 'prev' ? 'left-3' : 'right-3'
          )}
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}>
          {dir === 'prev' ? <ChevronLeft size={18} className="text-white" /> : <ChevronRight size={18} className="text-white" />}
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={cn('rounded-full transition-all duration-300',
              i === cur ? 'w-6 h-2 bg-[#C8860A]' : 'w-2 h-2 bg-white/50')} />
        ))}
      </div>
    </div>
  );
}