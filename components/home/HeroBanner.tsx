'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    id: 1,
    titleBn: 'সুন্দরবনের বিশুদ্ধ মধু',
    subtitleBn: 'প্রকৃতির সেরা উপহার — সরাসরি মৌচাক থেকে আপনার দরজায়',
    ctaLabel: 'এখনই কিনুন',
    ctaHref: '/shop/honey',
    bg: 'from-amber-900/80 via-amber-800/60 to-transparent',
    image: '/images/hero-honey.jpg',
  },
  {
    id: 2,
    titleBn: 'প্রিমিয়াম বাদাম ও ড্রাই ফ্রুটস',
    subtitleBn: 'কাজু, আখরোট, পেস্তা ও আরো — সেরা মানের নিশ্চয়তায়',
    ctaLabel: 'বাদাম দেখুন',
    ctaHref: '/shop/nuts',
    bg: 'from-green-900/80 via-green-800/60 to-transparent',
    image: '/images/hero-nuts.jpg',
  },
  {
    id: 3,
    titleBn: 'আজওয়া থেকে মেডজুল খেজুর',
    subtitleBn: 'বিশ্বের সেরা খেজুরের সংগ্রহ — রমজান ও সারা বছরের জন্য',
    ctaLabel: 'খেজুর দেখুন',
    ctaHref: '/shop/dates',
    bg: 'from-orange-900/80 via-orange-800/60 to-transparent',
    image: '/images/hero-dates.jpg',
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, [isPaused]);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <div
      className="relative h-[280px] overflow-hidden sm:h-[360px] md:h-[480px] lg:h-[560px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          {/* Background image */}
          <Image
            src={slide.image}
            alt={slide.titleBn}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className={cn('absolute inset-0 bg-gradient-to-r', slide.bg)} />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4">
              <div className="max-w-md">
                <h1
                  className={cn(
                    'font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl',
                    i === current && 'animate-slide-up'
                  )}
                >
                  {slide.titleBn}
                </h1>
                <p
                  className={cn(
                    'mt-2 text-sm text-white/85 sm:text-base md:text-lg md:mt-3',
                    i === current && 'animate-fade-in'
                  )}
                >
                  {slide.subtitleBn}
                </p>
                <div className="mt-4 flex gap-3 md:mt-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 shadow-honey text-sm md:text-base"
                  >
                    <Link href={slide.ctaHref}>{slide.ctaLabel}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/60 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 text-sm md:text-base"
                  >
                    <Link href="/shop">সব পণ্য</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows — hidden on small mobile */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/40 sm:flex"
        aria-label="আগে"
      >
        <ChevronLeft size={18} className="text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/40 sm:flex"
        aria-label="পরে"
      >
        <ChevronRight size={18} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'h-1.5 rounded-full transition-all',
              i === current ? 'w-6 bg-primary' : 'w-1.5 bg-white/60'
            )}
            aria-label={`স্লাইড ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
