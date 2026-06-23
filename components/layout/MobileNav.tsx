'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { ROUTES } from '@/constants/routes';

const TABS = [
  { href: ROUTES.HOME, icon: Home, label: 'হোম' },
  { href: ROUTES.SEARCH, icon: Search, label: 'সার্চ' },
  { href: ROUTES.CART, icon: ShoppingCart, label: 'কার্ট', isCart: true },
  { href: ROUTES.WISHLIST, icon: Heart, label: 'পছন্দ' },
  { href: ROUTES.ACCOUNT, icon: User, label: 'অ্যাকাউন্ট' },
];

export function MobileNav() {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCartStore();
  const cartCount = totalItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/95 backdrop-blur-sm md:hidden">
      <div className="flex items-center">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          if (tab.isCart) {
            return (
              <button
                key={tab.href}
                onClick={openDrawer}
                className="flex flex-1 flex-col items-center gap-0.5 py-2 relative"
              >
                <div className="relative">
                  <tab.icon
                    size={22}
                    className={active ? 'text-primary' : 'text-muted-foreground'}
                  />
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] font-bold text-white">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
                <span className={cn('text-[10px]', active ? 'text-primary font-semibold' : 'text-muted-foreground')}>
                  {tab.label}
                </span>
              </button>
            );
          }
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-1 flex-col items-center gap-0.5 py-2"
            >
              <tab.icon
                size={22}
                className={active ? 'text-primary' : 'text-muted-foreground'}
              />
              <span className={cn('text-[10px]', active ? 'text-primary font-semibold' : 'text-muted-foreground')}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area bottom for iOS */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}
