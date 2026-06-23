import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf, Heart, Star } from 'lucide-react';

export function BrandStory() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src="/images/brand-story.jpg"
                alt="দাদা ভাই মধু ঘরের গল্প"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 right-4 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                <p className="font-display text-2xl font-bold text-primary">১০+</p>
                <p className="text-xs text-muted-foreground">বছরের অভিজ্ঞতা</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -left-3 -top-3 h-20 w-20 rounded-full bg-primary/10" />
            <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full bg-secondary/10" />
          </div>

          {/* Text side */}
          <div>
            <p className="mb-2 text-sm font-medium text-primary">আমাদের গল্প</p>
            <h2 className="font-display mb-4 text-2xl font-bold leading-snug text-foreground md:text-3xl">
              প্রকৃতির সাথে আমাদের যাত্রা শুরু হয়েছিল একটি স্বপ্ন নিয়ে
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              দাদা ভাই মধু ঘরের যাত্রা শুরু হয়েছিল সুন্দরবনের গভীরে, যেখানে মৌয়ালরা জীবনের ঝুঁকি নিয়ে সংগ্রহ করেন বিশুদ্ধ মধু। আমাদের লক্ষ্য ছিল এই অমূল্য প্রাকৃতিক সম্পদ সরাসরি আপনার কাছে পৌঁছে দেওয়া।
            </p>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              বর্তমানে আমরা মধু থেকে শুরু করে বাদাম, খেজুর, ঘি সহ বিভিন্ন প্রাকৃতিক ও অর্গানিক পণ্য নিয়ে কাজ করছি। আমাদের প্রতিটি পণ্য বিশ্বাস, মান ও স্বচ্ছতার প্রতিশ্রুতি নিয়ে আসে।
            </p>

            {/* Values */}
            <div className="mb-6 flex flex-col gap-3">
              {[
                { icon: Leaf, text: 'সম্পূর্ণ প্রাকৃতিক ও কেমিক্যালমুক্ত পণ্য' },
                { icon: Heart, text: 'মৌয়ালদের ন্যায্য মূল্য ও সম্মান নিশ্চিত' },
                { icon: Star, text: 'প্রতিটি পণ্যে সর্বোচ্চ মান নিয়ন্ত্রণ' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <span className="text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>

            <Button asChild className="gap-2">
              <Link href="/about">আরো জানুন →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
