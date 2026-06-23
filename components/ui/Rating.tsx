import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  onChange?: (value: number) => void;
  showCount?: boolean;
  count?: number;
}

const sizeMap = { sm: 12, md: 16, lg: 20 };

export function Rating({
  value,
  max = 5,
  size = 'sm',
  readonly = true,
  onChange,
  showCount,
  count,
}: RatingProps) {
  const px = sizeMap[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            width={px}
            height={px}
            className={cn(
              'transition-colors',
              i < Math.round(value)
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted-foreground',
              !readonly && 'cursor-pointer hover:fill-primary hover:text-primary'
            )}
            onClick={() => !readonly && onChange?.(i + 1)}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-muted-foreground">({count ?? 0})</span>
      )}
    </div>
  );
}
