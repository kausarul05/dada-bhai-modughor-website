'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  thumbnail: string;
  name: string;
}

export function ProductGallery({ images, thumbnail, name }: ProductGalleryProps) {
  const allImages = images.length > 0 ? images : [thumbnail];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src={allImages[active]}
          alt={name}
          fill
          className="object-cover transition-opacity duration-200"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                i === active
                  ? 'border-primary ring-1 ring-primary'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <Image
                src={img}
                alt={`${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
