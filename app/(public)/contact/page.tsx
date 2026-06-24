'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, CircleFadingPlus } from 'lucide-react';
import { CONFIG } from '@/constants/config';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error('নাম, ফোন নম্বর ও বার্তা আবশ্যক');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
    toast.success('আপনার বার্তা পাঠানো হয়েছে! শীঘ্রই যোগাযোগ করা হবে 🎉');
  }

  const CONTACT_INFO = [
    { icon: Phone,   label: 'ফোন নম্বর',    value: CONFIG.PHONE,   href: `tel:${CONFIG.PHONE}` },
    { icon: Mail,    label: 'ইমেইল',         value: CONFIG.EMAIL,   href: `mailto:${CONFIG.EMAIL}` },
    { icon: MapPin,  label: 'ঠিকানা',        value: CONFIG.ADDRESS, href: null },
    { icon: Clock,   label: 'সার্ভিস সময়', value: 'সকাল ৯টা — রাত ১০টা (প্রতিদিন)', href: null },
  ];

  return (
    <div className="min-h-screen bg-[#F2E8D5]">

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(180px,25vw,300px)' }}>
        <Image
          src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1400&q=80"
          alt="যোগাযোগ করুন"
          fill className="object-cover" priority
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right,rgba(12,6,0,0.85),rgba(12,6,0,0.4) 60%,transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-12"
          style={{ background: 'linear-gradient(to top,#F2E8D5,transparent)' }} />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <p className="text-sm font-semibold text-[#C8860A] mb-1">আমাদের সাথে থাকুন</p>
            <h1 className="font-display text-3xl font-bold text-white md:text-4xl">যোগাযোগ করুন</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-[1fr_380px]">

          {/* ── Left: Form ── */}
          <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-5 shadow-card md:p-6">
            <h2 className="font-display text-xl font-bold text-[#1C1008] mb-1">বার্তা পাঠান</h2>
            <p className="text-sm text-[#7A6748] mb-5">আমরা সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দিই</p>

            {sent ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#1C1008]">বার্তা পাঠানো হয়েছে!</h3>
                  <p className="text-sm text-[#7A6748] mt-1">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</p>
                </div>
                <button
                  onClick={() => { setSent(false); setForm({ name:'',phone:'',email:'',subject:'',message:'' }); }}
                  className="text-sm text-[#C8860A] hover:underline">
                  আবার বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1C1008]">
                      নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="আপনার নাম"
                      className="w-full rounded-xl border border-[#D9CEBC] bg-[#EAE0CB] px-4 py-2.5 text-sm placeholder:text-[#7A6748] focus:border-[#C8860A] focus:outline-none focus:ring-2 focus:ring-[#C8860A]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1C1008]">
                      ফোন নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="01XXXXXXXXX"
                      className="w-full rounded-xl border border-[#D9CEBC] bg-[#EAE0CB] px-4 py-2.5 text-sm placeholder:text-[#7A6748] focus:border-[#C8860A] focus:outline-none focus:ring-2 focus:ring-[#C8860A]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1008]">ইমেইল</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="example@email.com"
                    className="w-full rounded-xl border border-[#D9CEBC] bg-[#EAE0CB] px-4 py-2.5 text-sm placeholder:text-[#7A6748] focus:border-[#C8860A] focus:outline-none focus:ring-2 focus:ring-[#C8860A]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1008]">বিষয়</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full rounded-xl border border-[#D9CEBC] bg-[#EAE0CB] px-4 py-2.5 text-sm text-[#1C1008] focus:border-[#C8860A] focus:outline-none focus:ring-2 focus:ring-[#C8860A]/20">
                    <option value="">বিষয় বেছে নিন</option>
                    <option value="order">অর্ডার সম্পর্কিত</option>
                    <option value="product">পণ্য সম্পর্কিত</option>
                    <option value="delivery">ডেলিভারি সম্পর্কিত</option>
                    <option value="return">রিটার্ন ও রিফান্ড</option>
                    <option value="wholesale">পাইকারি অর্ডার</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#1C1008]">
                    বার্তা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="আপনার বার্তা লিখুন..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-[#D9CEBC] bg-[#EAE0CB] px-4 py-2.5 text-sm placeholder:text-[#7A6748] focus:border-[#C8860A] focus:outline-none focus:ring-2 focus:ring-[#C8860A]/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-honey transition-all hover:-translate-y-0.5 disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg,#F4B942,#C8860A)' }}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      পাঠানো হচ্ছে...
                    </span>
                  ) : (
                    <>
                      <Send size={15} /> বার্তা পাঠান
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right: Contact Info ── */}
          <div className="flex flex-col gap-4">

            {/* Info cards */}
            <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-5 shadow-card">
              <h3 className="font-display text-base font-bold text-[#1C1008] mb-4">যোগাযোগের তথ্য</h3>
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: 'rgba(200,134,10,0.12)' }}>
                      <Icon size={16} className="text-[#C8860A]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#7A6748]">{label}</p>
                      {href ? (
                        <a href={href}
                          className="text-sm font-medium text-[#1C1008] hover:text-[#C8860A] transition-colors break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[#1C1008]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-5 shadow-card">
              <h3 className="font-display text-base font-bold text-[#1C1008] mb-4">সোশ্যাল মিডিয়া</h3>
              <div className="flex flex-col gap-2">
                {[
                  { icon: CircleFadingPlus ,label: 'Facebook',  color: '#1877F2', href: CONFIG.SOCIAL.FACEBOOK,  desc: 'আমাদের পেজ লাইক করুন' },
                  { icon: CircleFadingPlus ,       label: 'Instagram', color: '#E4405F', href: CONFIG.SOCIAL.INSTAGRAM, desc: 'ছবি ও আপডেট দেখুন' },
                  { icon: MessageCircle,  label: 'WhatsApp',  color: '#25D366', href: CONFIG.SOCIAL.WHATSAPP,  desc: 'সরাসরি মেসেজ করুন' },
                ].map(({ icon: Icon, label, color, href, desc }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[#D9CEBC] p-3 hover:bg-[#EAE0CB] transition-colors">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: color + '20' }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1008]">{label}</p>
                      <p className="text-xs text-[#7A6748]">{desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp */}
            <a href={CONFIG.SOCIAL.WHATSAPP} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-white shadow-honey transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}>
              <MessageCircle size={18} />
              WhatsApp এ সরাসরি কথা বলুন
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}