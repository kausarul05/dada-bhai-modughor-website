import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Heart, Star, Shield, Users, Award, Truck, Phone, Mail, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F2E8D5]">

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(220px,35vw,400px)' }}>
        <Image
          src="https://images.unsplash.com/photo-1471943311424-646960669fbc?w=1400&q=80"
          alt="আমাদের সম্পর্কে"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(12,6,0,0.85) 0%, rgba(12,6,0,0.5) 60%, transparent 100%)'
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to top, #F2E8D5, transparent)' }} />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <p className="text-sm font-semibold text-[#C8860A] mb-2">আমাদের সম্পর্কে</p>
            <h1 className="font-display text-3xl font-bold text-white md:text-5xl">
              দাদা ভাই মধু ঘর
            </h1>
            <p className="mt-2 text-white/75 text-sm md:text-base max-w-md">
              প্রাকৃতিক ও অর্গানিক পণ্যের বিশ্বস্ত অনলাইন স্টোর
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">

        {/* Story */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-14 items-center mb-16">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-lg" style={{ aspectRatio: '4/3' }}>
              <Image
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80"
                alt="আমাদের মধু"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-2 md:-right-5 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-3 shadow-card text-center">
              <p className="font-display text-2xl font-bold text-[#C8860A]">১০+</p>
              <p className="text-xs text-[#7A6748]">বছরের অভিজ্ঞতা</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#C8860A] mb-2">আমাদের গল্প</p>
            <h2 className="font-display text-2xl font-bold text-[#1C1008] md:text-3xl mb-4 leading-snug">
              প্রকৃতির সাথে আমাদের যাত্রা শুরু হয়েছিল একটি স্বপ্ন নিয়ে
            </h2>
            <p className="text-sm leading-relaxed text-[#7A6748] mb-3 md:text-base">
              দাদা ভাই মধু ঘরের যাত্রা শুরু হয়েছিল সুন্দরবনের গভীরে, যেখানে মৌয়ালরা জীবনের ঝুঁকি নিয়ে সংগ্রহ করেন বিশুদ্ধ মধু। আমাদের লক্ষ্য ছিল এই অমূল্য প্রাকৃতিক সম্পদ সরাসরি আপনার কাছে পৌঁছে দেওয়া — কোনো মিশ্রণ ছাড়া, কোনো কেমিক্যাল ছাড়া।
            </p>
            <p className="text-sm leading-relaxed text-[#7A6748] mb-6 md:text-base">
              বর্তমানে আমরা মধু থেকে শুরু করে বাদাম, খেজুর, ঘি সহ বিভিন্ন প্রাকৃতিক ও অর্গানিক পণ্য নিয়ে কাজ করছি। প্রতিটি পণ্য বিশ্বাস, মান ও স্বচ্ছতার প্রতিশ্রুতি নিয়ে আসে।
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: Leaf,  text: 'সম্পূর্ণ প্রাকৃতিক ও কেমিক্যালমুক্ত পণ্য' },
                { icon: Heart, text: 'মৌয়ালদের ন্যায্য মূল্য ও সম্মান নিশ্চিত' },
                { icon: Star,  text: 'প্রতিটি পণ্যে সর্বোচ্চ মান নিয়ন্ত্রণ' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'rgba(200,134,10,0.12)' }}>
                    <Icon size={14} className="text-[#C8860A]" />
                  </div>
                  <span className="text-sm text-[#7A6748]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-16">
          {[
            { value: '১০০০+', label: 'সন্তুষ্ট গ্রাহক' },
            { value: '৫০+',   label: 'ধরনের পণ্য' },
            { value: '৪.৮★',  label: 'গড় রেটিং' },
            { value: '৯৮%',   label: 'রিঅর্ডার রেট' },
          ].map(s => (
            <div key={s.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] py-5 px-3 text-center shadow-card">
              <span className="font-display text-2xl font-bold text-[#C8860A] md:text-3xl">{s.value}</span>
              <span className="text-xs text-[#7A6748] md:text-sm">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-[#1C1008] md:text-3xl">আমাদের মূল্যবোধ</h2>
            <p className="mt-2 text-sm text-[#7A6748]">যে নীতিগুলো আমাদের পরিচালিত করে</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {[
              { icon: Leaf,     title: '১০০% প্রাকৃতিক',    desc: 'কোনো কৃত্রিম রঙ বা সংরক্ষক নেই',        bg: '#ECFDF5', color: '#2D6A4F' },
              { icon: Shield,   title: 'মান নিয়ন্ত্রণ',     desc: 'প্রতিটি পণ্য কঠোরভাবে পরীক্ষিত',       bg: '#EFF6FF', color: '#1D4ED8' },
              { icon: Users,    title: 'কমিউনিটি',           desc: 'মৌয়ালদের জীবিকা উন্নয়নে প্রতিশ্রুতিবদ্ধ', bg: '#FDF4FF', color: '#7C3AED' },
              { icon: Heart,    title: 'বিশ্বাসযোগ্যতা',    desc: 'স্বচ্ছতা ও সততার সাথে ব্যবসা',         bg: '#FFF1F2', color: '#E11D48' },
              { icon: Award,    title: 'সেরা মান',           desc: 'বিশ্বের সেরা উৎস থেকে সংগ্রহ',          bg: '#FEFCE8', color: '#CA8A04' },
              { icon: Truck,    title: 'দ্রুত ডেলিভারি',    desc: 'সময়মতো পৌঁছানোর নিশ্চয়তা',             bg: '#FFF7ED', color: '#EA580C' },
            ].map(({ icon: Icon, title, desc, bg, color }) => (
              <div key={title}
                className="flex flex-col gap-3 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-4 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 md:p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#1C1008] md:text-base">{title}</h3>
                  <p className="mt-1 text-xs text-[#7A6748] leading-relaxed md:text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-[#1C1008] md:text-3xl">আমাদের দল</h2>
            <p className="mt-2 text-sm text-[#7A6748]">যারা আপনার কাছে বিশুদ্ধ পণ্য পৌঁছে দিতে কাজ করে</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { name: 'মোহাম্মদ দাদা ভাই', role: 'প্রতিষ্ঠাতা ও সিইও', emoji: '👨‍💼',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
              { name: 'ফারহানা বেগম', role: 'মান নিয়ন্ত্রণ বিশেষজ্ঞ', emoji: '👩‍🔬',
                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
              { name: 'রাকিব হাসান', role: 'সাপ্লাই চেইন ম্যানেজার', emoji: '👨‍🌾',
                img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
            ].map(member => (
              <div key={member.name}
                className="flex flex-col items-center gap-3 rounded-2xl border border-[#D9CEBC] bg-[#FAF4E8] p-5 text-center shadow-card">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                  <Image src={member.img} alt={member.name} fill className="object-cover" sizes="80px" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-[#1C1008]">{member.name}</p>
                  <p className="text-xs text-[#7A6748] mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-8 text-center text-white"
          style={{ background: 'linear-gradient(135deg,#F4B942 0%,#C8860A 50%,#7A4F06 100%)' }}>
          <h2 className="font-display text-2xl font-bold mb-2">আজই শুরু করুন</h2>
          <p className="text-white/80 text-sm mb-6">প্রাকৃতিক ও বিশুদ্ধ পণ্যের অভিজ্ঞতা নিন</p>
          <Link href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#C8860A] hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg">
            পণ্য দেখুন →
          </Link>
        </div>
      </div>
    </div>
  );
}