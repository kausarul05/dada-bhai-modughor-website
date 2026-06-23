'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Rating } from '@/components/ui/Rating';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';

const REVIEWS = [
  {
    id: 1,
    name: 'রাহেলা বেগম',
    location: 'ঢাকা',
    rating: 5,
    comment:
      'সুন্দরবনের মধু সত্যিই অসাধারণ! আমি অনেক জায়গা থেকে মধু কিনেছি, কিন্তু এত ভালো মানের মধু আর কোথাও পাইনি। গন্ধ ও স্বাদ দুটোই অতুলনীয়।',
    isVerified: true,
    date: 'নভেম্বর ২০২৪',
  },
  {
    id: 2,
    name: 'মোহাম্মদ সাকিব',
    location: 'চট্টগ্রাম',
    rating: 5,
    comment:
      'কাজু বাদাম এবং আজওয়া খেজুর নিয়েছিলাম। প্যাকেজিং খুব সুন্দর, পণ্যের মান চমৎকার। দাম একটু বেশি মনে হলেও মানের কথা ভাবলে একদম উচিত।',
    isVerified: true,
    date: 'অক্টোবর ২০২৪',
  },
  {
    id: 3,
    name: 'ফারহানা আক্তার',
    location: 'সিলেট',
    rating: 5,
    comment:
      'দাদা ভাই মধু ঘরের পণ্য নিয়ে আমি খুবই সন্তুষ্ট। ডেলিভারি দ্রুত ছিল এবং পণ্য একদম তাজা পেয়েছি। অবশ্যই আবার অর্ডার করব।',
    isVerified: true,
    date: 'ডিসেম্বর ২০২৪',
  },
  {
    id: 4,
    name: 'আব্দুল করিম',
    location: 'রাজশাহী',
    rating: 4,
    comment:
      'সরিষা ফুলের মধু খুব ভালো লেগেছে। রঙ ও ঘনত্ব দেখেই বোঝা যাচ্ছে খাঁটি মধু। পরিবারের সবাই পছন্দ করেছে।',
    isVerified: true,
    date: 'জানুয়ারি ২০২৫',
  },
];

export function CustomerReviews() {
  const [current, setCurrent] = useState(0);
  const visible = 1; // on mobile show 1, desktop shows more via CSS

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="গ্রাহকরা কী বলছেন"
          subtitle="আমাদের বিশ্বস্ত গ্রাহকদের অভিজ্ঞতা"
          center
        />

        {/* Stats row */}
        <div className="mb-10 flex justify-center gap-8 md:gap-16">
          {[
            { value: '১০০০+', label: 'সন্তুষ্ট গ্রাহক' },
            { value: '৪.৮', label: 'গড় রেটিং' },
            { value: '৯৮%', label: 'রিঅর্ডার রেট' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-2xl font-bold text-primary md:text-3xl">{value}</p>
              <p className="text-xs text-muted-foreground md:text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Desktop: 2 col grid */}
        <div className="hidden gap-4 md:grid md:grid-cols-2">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <ReviewCard review={REVIEWS[current]} />
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === current ? 'w-5 bg-primary' : 'w-1.5 bg-border'
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % REVIEWS.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div className="relative rounded-2xl border border-border bg-white p-5 shadow-sm md:p-6">
      <Quote
        size={32}
        className="absolute right-4 top-4 text-primary/10"
        fill="currentColor"
      />
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{review.name}</p>
          <p className="text-xs text-muted-foreground">
            {review.location} · {review.date}
          </p>
        </div>
        <Rating value={review.rating} size="sm" readonly />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
      {review.isVerified && (
        <p className="mt-3 text-xs text-secondary">✓ যাচাইকৃত ক্রয়</p>
      )}
    </div>
  );
}
