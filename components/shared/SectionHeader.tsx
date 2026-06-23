import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  center,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-8 flex items-end justify-between gap-4',
        center && 'flex-col items-center text-center',
        className
      )}
    >
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm text-muted-foreground md:text-base">{subtitle}</p>
        )}
      </div>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          {ctaLabel} →
        </Link>
      )}
    </div>
  );
}
