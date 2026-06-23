import { Badge } from '@/components/ui/badge';
import { stockStatus } from '@/lib/utils';

export function StockBadge({ stock }: { stock: number }) {
  const { label, color } = stockStatus(stock);
  return (
    <Badge
      variant={
        color === 'destructive'
          ? 'destructive'
          : color === 'warning'
          ? 'outline'
          : 'secondary'
      }
      className={
        color === 'warning'
          ? 'border-primary text-primary'
          : color === 'success'
          ? 'bg-secondary/10 text-secondary border-secondary'
          : ''
      }
    >
      {label}
    </Badge>
  );
}
