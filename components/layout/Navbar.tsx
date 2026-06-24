'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart, User, Phone, ChevronDown, Menu, X } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { ROUTES } from '@/constants/routes';
import { CONFIG } from '@/constants/config';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

const CATEGORIES = [
  { href: '/shop?category=honey',      label: 'মধু',          emoji: '🍯' },
  { href: '/shop?category=nuts',       label: 'বাদাম',        emoji: '🥜' },
  { href: '/shop?category=dates',      label: 'খেজুর',        emoji: '🌴' },
  { href: '/shop?category=ghee',       label: 'ঘি',           emoji: '🧈' },
  { href: '/shop?category=dry-fruits', label: 'ড্রাই ফ্রুটস', emoji: '🍇' },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const cartCount = totalItems();

  const [catOpen, setCatOpen]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">

      {/* Top strip */}
      <div className="hidden md:block bg-[#160900] text-white/65 text-xs py-1.5">
        <div className="mx-auto max-w-7xl px-4 flex justify-between items-center">
          <span>🍯 ১০০% বিশুদ্ধ ও প্রাকৃতিক — সরাসরি উৎস থেকে আপনার দরজায়</span>
          <div className="flex items-center gap-5">
            <a href={`tel:${CONFIG.PHONE}`}
              className="flex items-center gap-1 hover:text-[#C8860A] transition-colors">
              <Phone size={11} /> {CONFIG.PHONE}
            </a>
            <span className="text-[#C8860A] font-medium">৳১০০০+ অর্ডারে ফ্রি ডেলিভারি</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-[#FAF4E8]/96 backdrop-blur-md border-b border-[#D9CEBC]"
        style={{ boxShadow: '0 1px 8px rgba(28,16,8,0.07)' }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-[60px] items-center gap-3">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-honey"
                style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
                🍯
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-[15px] font-bold text-[#1C1008]">দাদা ভাই</span>
                <span className="font-display text-[11px] font-semibold text-[#C8860A]">মধু ঘর</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5 ml-3">
              <Link href="/"
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'bg-[#C8860A]/10 text-[#C8860A]'
                    : 'text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A]'
                )}>
                হোম
              </Link>

              {/* Dropdown */}
              <div ref={catRef} className="relative">
                <button
                  onClick={() => setCatOpen(o => !o)}
                  className={cn(
                    'flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    catOpen
                      ? 'bg-[#C8860A]/10 text-[#C8860A]'
                      : 'text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A]'
                  )}>
                  পণ্য সমূহ
                  <ChevronDown size={13}
                    className={cn('transition-transform duration-200', catOpen && 'rotate-180')} />
                </button>

                {catOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] shadow-lg overflow-hidden z-50"
                    style={{ boxShadow: '0 8px 32px rgba(28,16,8,0.12)' }}>
                    <div className="py-1.5">
                      {CATEGORIES.map(c => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setCatOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A] transition-colors">
                          <span className="text-base">{c.emoji}</span>
                          <span className="font-medium">{c.label}</span>
                        </Link>
                      ))}
                      <div className="mx-3 my-1 border-t border-[#D9CEBC]" />
                      <Link
                        href="/shop"
                        onClick={() => setCatOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#C8860A] hover:bg-[#C8860A]/10 transition-colors">
                        সব পণ্য দেখুন →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about"
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  pathname === '/about'
                    ? 'bg-[#C8860A]/10 text-[#C8860A]'
                    : 'text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A]'
                )}>
                সম্পর্কে
              </Link>

              <Link href="/contact"
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  pathname === '/contact'
                    ? 'bg-[#C8860A]/10 text-[#C8860A]'
                    : 'text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A]'
                )}>
                যোগাযোগ
              </Link>
            </nav>

            {/* Search */}
            <div className="flex-1 hidden md:block max-w-sm ml-auto">
              <SearchBar />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-0.5 ml-2">
              <Link href={ROUTES.WISHLIST}
                className="relative p-2.5 rounded-xl hover:bg-[#EAE0CB] transition-colors">
                <Heart size={20} className="text-[#1C1008]" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button onClick={openDrawer}
                className="relative p-2.5 rounded-xl hover:bg-[#EAE0CB] transition-colors">
                <ShoppingCart size={20} className="text-[#1C1008]" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C8860A] text-[10px] font-bold text-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              <Link href={ROUTES.ACCOUNT}
                className="p-2.5 rounded-xl hover:bg-[#EAE0CB] transition-colors">
                <User size={20} className="text-[#1C1008]" />
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                className="md:hidden p-2.5 rounded-xl hover:bg-[#EAE0CB] transition-colors ml-1">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="pb-3 md:hidden">
            <SearchBar />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#D9CEBC] bg-[#FAF4E8]"
            style={{ boxShadow: '0 4px 16px rgba(28,16,8,0.1)' }}>
            <div className="px-4 py-3 flex flex-col gap-1">
              <Link href="/"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#EAE0CB] transition-colors"
                onClick={() => setMobileOpen(false)}>
                🏠 হোম
              </Link>

              {/* Mobile categories */}
              <div>
                <button
                  onClick={() => setCatOpen(o => !o)}
                  className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#EAE0CB] transition-colors">
                  <span>🛍️ পণ্য সমূহ</span>
                  <ChevronDown size={14} className={cn('transition-transform', catOpen && 'rotate-180')} />
                </button>
                {catOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-0.5">
                    {CATEGORIES.map(c => (
                      <Link key={c.href} href={c.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#EAE0CB] transition-colors"
                        onClick={() => setMobileOpen(false)}>
                        {c.emoji} {c.label}
                      </Link>
                    ))}
                    <Link href="/shop"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-[#C8860A] hover:bg-[#C8860A]/10 transition-colors"
                      onClick={() => setMobileOpen(false)}>
                      → সব পণ্য দেখুন
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/about"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#EAE0CB] transition-colors"
                onClick={() => setMobileOpen(false)}>
                ℹ️ আমাদের সম্পর্কে
              </Link>
              <Link href="/contact"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#EAE0CB] transition-colors"
                onClick={() => setMobileOpen(false)}>
                📞 যোগাযোগ
              </Link>

              <div className="border-t border-[#D9CEBC] my-1 pt-1">
                <Link href={ROUTES.ACCOUNT}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#EAE0CB] transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  👤 আমার অ্যাকাউন্ট
                </Link>
                <Link href={ROUTES.WISHLIST}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#EAE0CB] transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  ❤️ উইশলিস্ট
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}