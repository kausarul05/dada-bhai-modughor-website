'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart, User, Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from './SearchBar';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { ROUTES } from '@/constants/routes';
import { CONFIG } from '@/constants/config';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: ROUTES.HOME, label: 'হোম' },
  { href: ROUTES.SHOP, label: 'শপ' },
  { href: '/shop/honey', label: 'মধু' },
  { href: '/shop/nuts', label: 'বাদাম' },
  { href: '/shop/dates', label: 'খেজুর' },
  { href: ROUTES.ABOUT, label: 'আমাদের সম্পর্কে' },
  { href: ROUTES.CONTACT, label: 'যোগাযোগ' },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const cartCount = totalItems();
  const wishlistCount = wishlistItems.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur-sm shadow-sm">
      {/* Top bar */}
      <div className="hidden border-b border-border/50 bg-primary/5 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-muted-foreground">
          <span>🍯 প্রাকৃতিক ও অর্গানিক পণ্যের বিশ্বস্ত স্টোর</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${CONFIG.PHONE}`} className="flex items-center gap-1 hover:text-primary">
              <Phone size={11} /> {CONFIG.PHONE}
            </a>
            <span>বিনামূল্যে ডেলিভারি ৳{CONFIG.FREE_SHIPPING_THRESHOLD}+ অর্ডারে</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="shrink-0">
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold text-primary leading-none">
                দাদা ভাই
              </span>
              <span className="font-display text-xs font-medium text-secondary">
                মধু ঘর
              </span>
            </div>
          </Link>

          {/* Search — desktop */}
          <SearchBar className="hidden flex-1 max-w-lg md:block" />

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1 md:gap-2">
            {/* Wishlist */}
            <Link href={ROUTES.WISHLIST} className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Heart size={20} className="text-foreground" />
              {wishlistCount > 0 && (
                <Badge className="absolute -right-0.5 -top-0.5 h-4 w-4 justify-center rounded-full p-0 text-[10px] bg-red-500">
                  {wishlistCount}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openDrawer}
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="কার্ট খুলুন"
            >
              <ShoppingCart size={20} className="text-foreground" />
              {cartCount > 0 && (
                <Badge className="absolute -right-0.5 -top-0.5 h-4 w-4 justify-center rounded-full p-0 text-[10px] bg-primary">
                  {cartCount}
                </Badge>
              )}
            </button>

            {/* Account */}
            <Link href={ROUTES.ACCOUNT} className="p-2 rounded-full hover:bg-muted transition-colors">
              <User size={20} className="text-foreground" />
            </Link>
          </div>
        </div>

        {/* Search — mobile */}
        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 pb-2 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-primary',
                pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
