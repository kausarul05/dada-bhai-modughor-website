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
import { useState } from 'react';

const CATEGORIES = [
  { href: '/shop?category=honey',      label: 'মধু',         emoji: '🍯' },
  { href: '/shop?category=nuts',       label: 'বাদাম',       emoji: '🥜' },
  { href: '/shop?category=dates',      label: 'খেজুর',       emoji: '🌴' },
  { href: '/shop?category=ghee',       label: 'ঘি',          emoji: '🧈' },
  { href: '/shop?category=dry-fruits', label: 'ড্রাই ফ্রুটস', emoji: '🍇' },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const cartCount = totalItems();
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Top strip */}
        <div className="hidden md:block bg-[#160900] text-white/65 text-xs py-1.5">
          <div className="mx-auto max-w-7xl px-4 flex justify-between items-center">
            <span>🍯 ১০০% বিশুদ্ধ ও প্রাকৃতিক — সরাসরি উৎস থেকে আপনার দরজায়</span>
            <div className="flex items-center gap-5">
              <a href={`tel:${CONFIG.PHONE}`} className="flex items-center gap-1 hover:text-[#C8860A] transition-colors">
                <Phone size={11} /> {CONFIG.PHONE}
              </a>
              <span className="text-[#C8860A] font-medium">
                ৳১০০০+ অর্ডারে ফ্রি ডেলিভারি
              </span>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="bg-[#FAF4E8]/96 backdrop-blur-md border-b border-[#D9CEBC]" style={{ boxShadow: '0 1px 8px rgba(28,16,8,0.07)' }}>
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

              {/* Desktop nav links */}
              <nav className="hidden md:flex items-center gap-0.5 ml-3">
                <Link href="/"
                  className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === '/' ? 'bg-[#C8860A]/10 text-[#C8860A]' : 'text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A]')}>
                  হোম
                </Link>

                {/* Products dropdown */}
                <div className="relative"
                  onMouseEnter={() => setCatOpen(true)}
                  onMouseLeave={() => setCatOpen(false)}>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A] transition-colors">
                    পণ্য সমূহ
                    <ChevronDown size={13} className={cn('transition-transform duration-200', catOpen && 'rotate-180')} />
                  </button>

                  {catOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-48 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] shadow-card-hover py-2 animate-fade-in">
                      {CATEGORIES.map(c => (
                        <Link key={c.href} href={c.href}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A] transition-colors"
                          onClick={() => setCatOpen(false)}>
                          <span>{c.emoji}</span>
                          <span>{c.label}</span>
                        </Link>
                      ))}
                      <div className="mx-3 my-1.5 border-t border-[#D9CEBC]" />
                      <Link href="/shop"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#C8860A] hover:bg-[#C8860A]/10 rounded-lg mx-1"
                        onClick={() => setCatOpen(false)}>
                        সব পণ্য দেখুন →
                      </Link>
                    </div>
                  )}
                </div>

                <Link href="/about"
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A] transition-colors">
                  সম্পর্কে
                </Link>
                <Link href="/contact"
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#1C1008] hover:bg-[#EAE0CB] hover:text-[#C8860A] transition-colors">
                  যোগাযোগ
                </Link>
              </nav>

              {/* Search */}
              <div className="flex-1 hidden md:block max-w-sm ml-auto">
                <SearchBar />
              </div>

              {/* Action icons */}
              <div className="flex items-center gap-0.5 ml-2">
                {/* Wishlist */}
                <Link href={ROUTES.WISHLIST}
                  className="relative p-2.5 rounded-xl hover:bg-[#EAE0CB] transition-colors">
                  <Heart size={20} className="text-[#1C1008]" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <button onClick={openDrawer}
                  className="relative p-2.5 rounded-xl hover:bg-[#EAE0CB] transition-colors">
                  <ShoppingCart size={20} className="text-[#1C1008]" />
                  {cartCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C8860A] text-[10px] font-bold text-white">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>

                {/* Account */}
                <Link href={ROUTES.ACCOUNT}
                  className="p-2.5 rounded-xl hover:bg-[#EAE0CB] transition-colors">
                  <User size={20} className="text-[#1C1008]" />
                </Link>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
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
        </div>

        {/* Mobile menu drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-[#FAF4E8] border-b border-[#D9CEBC] shadow-lg animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              <Link href="/" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#EAE0CB]" onClick={() => setMobileOpen(false)}>🏠 হোম</Link>
              <Link href="/shop" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#EAE0CB]" onClick={() => setMobileOpen(false)}>🛍️ সব পণ্য</Link>
              <div className="border-t border-[#D9CEBC] my-2" />
              <p className="px-3 text-xs text-[#7A6748] font-medium mb-1">ক্যাটাগরি</p>
              {CATEGORIES.map(c => (
                <Link key={c.href} href={c.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[#EAE0CB]"
                  onClick={() => setMobileOpen(false)}>
                  {c.emoji} {c.label}
                </Link>
              ))}
              <div className="border-t border-[#D9CEBC] my-2" />
              <Link href="/about" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm hover:bg-[#EAE0CB]" onClick={() => setMobileOpen(false)}>ℹ️ আমাদের সম্পর্কে</Link>
              <Link href="/contact" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm hover:bg-[#EAE0CB]" onClick={() => setMobileOpen(false)}>📞 যোগাযোগ</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}