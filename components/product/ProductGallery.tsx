'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  thumbnail: string;
  name: string;
}

export function ProductGallery({ images, thumbnail, name }: ProductGalleryProps) {
  const allImages = images.length > 0 ? images : [thumbnail];
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActive(i => (i + 1) % allImages.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#EAE0CB] border border-[#D9CEBC]"
        style={{ aspectRatio: '1/1' }}>
        <Image
          src={allImages[active]}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width:768px) 100vw, 50vw"
          priority
        />

        {/* Arrows — only if multiple images */}
        {allImages.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur-sm hover:bg-white transition-all">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur-sm hover:bg-white transition-all">
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {allImages.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={cn('rounded-full transition-all', i === active ? 'w-5 h-1.5 bg-[#C8860A]' : 'w-1.5 h-1.5 bg-white/70')} />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {allImages.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={cn(
                'relative shrink-0 overflow-hidden rounded-xl border-2 transition-all',
                'h-16 w-16',
                i === active ? 'border-[#C8860A] ring-1 ring-[#C8860A]' : 'border-[#D9CEBC] hover:border-[#C8860A]/50'
              )}>
              <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}