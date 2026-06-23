import { Shield, Truck, RotateCcw, Award, Leaf, Phone } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

const FEATURES = [
  {
    icon: Leaf,
    title: '১০০% প্রাকৃতিক',
    desc: 'কোনো কৃত্রিম রঙ, সংরক্ষক বা রাসায়নিক পদার্থ নেই। সরাসরি প্রকৃতি থেকে সংগ্রহ করা।',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Shield,
    title: 'মান নিয়ন্ত্রিত',
    desc: 'প্রতিটি পণ্য কঠোর মান নিয়ন্ত্রণ প্রক্রিয়ার মধ্য দিয়ে যায়। বিশুদ্ধতার নিশ্চয়তা।',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Truck,
    title: 'দ্রুত ডেলিভারি',
    desc: 'ঢাকায় ২৪ ঘণ্টা, সারা বাংলাদেশে ৩-৫ দিনে ডেলিভারি। ৳১০০০+ অর্ডারে বিনামূল্যে।',
    color: 'text-primary',
    bg: 'bg-amber-50',
  },
  {
    icon: RotateCcw,
    title: '৭ দিনের গ্যারান্টি',
    desc: 'পণ্যে কোনো সমস্যা হলে ৭ দিনের মধ্যে রিটার্ন বা রিফান্ডের ব্যবস্থা।',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: Award,
    title: 'বিশ্বস্ত ব্র্যান্ড',
    desc: '১০০০+ সন্তুষ্ট গ্রাহক। বিশ্বাসযোগ্যতা ও স্বচ্ছতার সাথে ব্যবসা পরিচালনা।',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  {
    icon: Phone,
    title: 'সার্বক্ষণিক সাপোর্ট',
    desc: 'সকাল ৯টা থেকে রাত ১০টা পর্যন্ত ফোন, WhatsApp ও Facebook-এ সাপোর্ট।',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-muted/30 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="কেন আমাদের বেছে নেবেন?"
          subtitle="আমরা শুধু পণ্য বিক্রি করি না, আমরা বিশ্বাস বিক্রি করি"
          center
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:shadow-md md:p-6"
            >
              <div
                className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg} transition-transform group-hover:scale-110 md:h-14 md:w-14`}
              >
                <Icon size={22} className={color} />
              </div>
              <h3 className="font-display mb-1.5 text-sm font-semibold text-foreground md:text-base">
                {title}
              </h3>
              <p className="hidden text-xs leading-relaxed text-muted-foreground md:block md:text-sm">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
