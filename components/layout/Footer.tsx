import Link from 'next/link';
import {  MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { CONFIG } from '@/constants/config';
import { ROUTES } from '@/constants/routes';

const QUICK_LINKS = [
  { href: ROUTES.SHOP, label: 'সব পণ্য' },
  { href: '/shop/honey', label: 'মধু' },
  { href: '/shop/nuts', label: 'বাদাম ও ড্রাই ফ্রুটস' },
  { href: '/shop/dates', label: 'খেজুর' },
  { href: '/shop/ghee', label: 'ঘি' },
  { href: ROUTES.ABOUT, label: 'আমাদের সম্পর্কে' },
];

const POLICY_LINKS = [
  { href: '/privacy-policy', label: 'প্রাইভেসি পলিসি' },
  { href: '/terms', label: 'শর্ত ও নিয়ম' },
  { href: '/shipping-policy', label: 'শিপিং পলিসি' },
  { href: '/return-policy', label: 'রিটার্ন পলিসি' },
  { href: ROUTES.FAQ, label: 'সাধারণ প্রশ্ন' },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-[#1A0F00] text-white mb-16 md:mb-0">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <p className="font-display text-2xl font-bold text-primary">দাদা ভাই</p>
              <p className="font-display text-sm text-primary/80">মধু ঘর</p>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              প্রাকৃতিক ও অর্গানিক পণ্যের বিশ্বস্ত অনলাইন স্টোর। সুন্দরবনের বিশুদ্ধ মধু থেকে শুরু করে সেরা মানের বাদাম ও খেজুর — সবই এক জায়গায়।
            </p>
            {/* Social */}
            <div className="mt-4 flex gap-3">
              <a href={CONFIG.SOCIAL.FACEBOOK} target="_blank" rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary">
                {/* <Facebook size={15} /> */}
              </a>
              <a href={CONFIG.SOCIAL.INSTAGRAM} target="_blank" rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary">
                {/* <Instagram size={15} /> */}
              </a>
              <a href={CONFIG.SOCIAL.WHATSAPP} target="_blank" rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary">
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">পণ্য সমূহ</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">তথ্য</h3>
            <ul className="space-y-2">
              {POLICY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">যোগাযোগ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Phone size={14} className="mt-0.5 shrink-0 text-primary" />
                <a href={`tel:${CONFIG.PHONE}`} className="hover:text-primary">{CONFIG.PHONE}</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Mail size={14} className="mt-0.5 shrink-0 text-primary" />
                <a href={`mailto:${CONFIG.EMAIL}`} className="hover:text-primary">{CONFIG.EMAIL}</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                <span>{CONFIG.ADDRESS}</span>
              </li>
            </ul>
            {/* Payment badges */}
            <div className="mt-4">
              <p className="mb-2 text-xs text-white/40">পেমেন্ট পদ্ধতি</p>
              <div className="flex flex-wrap gap-2">
                {['bKash', 'Nagad', 'Cash on Delivery'].map((m) => (
                  <span key={m} className="rounded border border-white/20 px-2 py-0.5 text-xs text-white/60">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {CONFIG.APP_NAME} — সর্বস্বত্ব সংরক্ষিত
        </div>
      </div>
    </footer>
  );
}
