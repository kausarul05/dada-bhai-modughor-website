import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeader } from '@/components/shared/SectionHeader';

const FAQS = [
  {
    q: 'আপনাদের মধু কি আসলেই খাঁটি?',
    a: 'হ্যাঁ, আমাদের সমস্ত মধু ১০০% বিশুদ্ধ ও প্রাকৃতিক। আমরা সরাসরি সুন্দরবনের মৌয়ালদের কাছ থেকে মধু সংগ্রহ করি এবং কোনো রাসায়নিক পদার্থ বা সংরক্ষক মেশানো হয় না।',
  },
  {
    q: 'অর্ডার করলে কত দিনে ডেলিভারি পাব?',
    a: 'ঢাকার মধ্যে সাধারণত ২৪ ঘণ্টার মধ্যে এবং সারা বাংলাদেশে ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি দেওয়া হয়। ৳১০০০ বা তার বেশি অর্ডারে ডেলিভারি বিনামূল্যে।',
  },
  {
    q: 'পেমেন্ট কীভাবে করব?',
    a: 'আমরা বিকাশ, নগদ, ক্যাশ অন ডেলিভারি এবং ক্রেডিট/ডেবিট কার্ড গ্রহণ করি। ক্যাশ অন ডেলিভারিতে পণ্য হাতে পেয়ে টাকা দিতে পারবেন।',
  },
  {
    q: 'পণ্যে সমস্যা হলে কী করব?',
    a: 'পণ্য পাওয়ার ৭ দিনের মধ্যে আমাদের সাথে যোগাযোগ করুন। ত্রুটিপূর্ণ বা ক্ষতিগ্রস্ত পণ্য বদলে দেওয়া বা সম্পূর্ণ রিফান্ড দেওয়া হবে।',
  },
  {
    q: 'মধু জমে গেলে কি নষ্ট হয়?',
    a: 'না, মধু জমে যাওয়া স্বাভাবিক এবং এটি বিশুদ্ধতার লক্ষণ। হালকা গরম পানিতে বোতল রাখলে মধু আবার তরল হয়ে যাবে। মাইক্রোওয়েভ ব্যবহার করবেন না।',
  },
  {
    q: 'পাইকারি অর্ডার করা যাবে?',
    a: 'হ্যাঁ, পাইকারি অর্ডারের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন। ১০ কেজির বেশি অর্ডারে বিশেষ ছাড় পাবেন।',
  },
];

export function FAQSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader
          title="সাধারণ প্রশ্ন"
          subtitle="আপনার মনে যা আসছে, এখানে উত্তর পাবেন"
          center
          ctaLabel="আরো প্রশ্ন?"
          ctaHref="/faq"
        />

        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border bg-white px-4 shadow-sm"
            >
              <AccordionTrigger className="font-display text-left text-sm font-medium hover:no-underline md:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
