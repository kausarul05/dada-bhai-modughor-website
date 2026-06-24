'use client';

import Link from 'next/link';
import {
  User, Package, Heart, MapPin, LogOut,
  ChevronRight, Phone, Mail, ShieldCheck,
  Clock, Star,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

// Temporary mock — Phase 3 এ real auth দিয়ে replace হবে
const MOCK_USER = {
  name: 'কাউসার ইসলাম',
  email: 'kausar@example.com',
  phone: '01700-000000',
  joinDate: 'জানুয়ারি ২০২৫',
  totalOrders: 12,
  totalSpent: 18500,
};

const MENU_ITEMS = [
  {
    group: 'অর্ডার',
    items: [
      { icon: Package,  label: 'আমার অর্ডার',    href: '/account/orders',  badge: '২টি চলছে' },
      { icon: Clock,    label: 'অর্ডার ট্র্যাক',  href: '/account/orders',  badge: null },
    ],
  },
  {
    group: 'পছন্দ',
    items: [
      { icon: Heart,    label: 'উইশলিস্ট',       href: ROUTES.WISHLIST,   badge: null },
      { icon: Star,     label: 'আমার রিভিউ',     href: '/account/reviews', badge: null },
    ],
  },
  {
    group: 'অ্যাকাউন্ট',
    items: [
      { icon: User,     label: 'প্রোফাইল এডিট',  href: '/account/profile', badge: null },
      { icon: MapPin,   label: 'ঠিকানা সমূহ',    href: '/account/address', badge: null },
      { icon: ShieldCheck, label: 'নিরাপত্তা',   href: '/account/security',badge: null },
    ],
  },
];

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#F2E8D5]">
      <div className="mx-auto max-w-2xl px-4 py-6">

        {/* Profile card */}
        <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-5 mb-4 shadow-card">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-honey"
              style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
              {MOCK_USER.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-lg font-bold text-[#1C1008]">
                {MOCK_USER.name}
              </h2>
              <div className="flex flex-col gap-0.5 mt-1">
                <span className="flex items-center gap-1.5 text-xs text-[#7A6748]">
                  <Mail size={11} /> {MOCK_USER.email}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#7A6748]">
                  <Phone size={11} /> {MOCK_USER.phone}
                </span>
              </div>
            </div>
            <Link href="/account/profile"
              className="shrink-0 rounded-xl border border-[#D9CEBC] px-3 py-1.5 text-xs font-medium text-[#7A6748] hover:bg-[#EAE0CB] transition-colors">
              এডিট
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 divide-x divide-[#D9CEBC] rounded-xl bg-[#EAE0CB] p-1">
            {[
              { label: 'মোট অর্ডার', value: MOCK_USER.totalOrders },
              { label: 'মোট খরচ', value: `৳${MOCK_USER.totalSpent.toLocaleString('bn-BD')}` },
              { label: 'যোগদান', value: MOCK_USER.joinDate },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-0.5 px-2 py-2">
                <span className="font-display text-sm font-bold text-[#C8860A]">{s.value}</span>
                <span className="text-[10px] text-[#7A6748]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href="/account/orders"
            className="flex items-center gap-3 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-4 hover:shadow-card-hover transition-all hover:-translate-y-0.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAE0CB]">
              <Package size={18} className="text-[#C8860A]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1C1008]">অর্ডার সমূহ</p>
              <p className="text-xs text-[#7A6748]">২টি চলছে</p>
            </div>
          </Link>
          <Link href={ROUTES.WISHLIST}
            className="flex items-center gap-3 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-4 hover:shadow-card-hover transition-all hover:-translate-y-0.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAE0CB]">
              <Heart size={18} className="text-red-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1C1008]">উইশলিস্ট</p>
              <p className="text-xs text-[#7A6748]">সেভ করা পণ্য</p>
            </div>
          </Link>
        </div>

        {/* Menu groups */}
        {MENU_ITEMS.map(group => (
          <div key={group.group} className="mb-3">
            <p className="px-1 pb-1.5 text-xs font-semibold text-[#7A6748] uppercase tracking-wide">
              {group.group}
            </p>
            <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] divide-y divide-[#EAE0CB] overflow-hidden">
              {group.items.map(item => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#EAE0CB] transition-colors">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE0CB]">
                    <item.icon size={15} className="text-[#C8860A]" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-[#1C1008]">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-[#C8860A] px-2 py-0.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={15} className="text-[#D9CEBC]" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={() => alert('Phase 3 এ auth যোগ হবে')}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-100 transition-colors">
          <LogOut size={16} />
          লগআউট
        </button>

        {/* Version note */}
        <p className="mt-6 text-center text-xs text-[#7A6748]">
          দাদা ভাই মধু ঘর v1.0 · Login/Auth Phase 3 এ যোগ হবে
        </p>
      </div>
    </div>
  );
}