'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // TODO: connect to email service
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section className="gradient-honey py-12 md:py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <Mail size={24} className="text-white" />
          </div>
        </div>
        <h2 className="font-display mb-2 text-2xl font-bold text-white md:text-3xl">
          অফার মিস করবেন না!
        </h2>
        <p className="mb-6 text-sm text-white/80 md:text-base">
          নিউজলেটারে সাবস্ক্রাইব করুন। নতুন পণ্য, বিশেষ ছাড় ও স্বাস্থ্য টিপস সরাসরি ইমেইলে পাবেন।
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-white/20 px-6 py-4">
            <CheckCircle size={20} className="text-white" />
            <p className="font-medium text-white">সাবস্ক্রাইব সফল হয়েছে! ধন্যবাদ 🎉</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              required
              className="flex-1 rounded-full border-0 bg-white/20 px-4 py-3 text-sm text-white placeholder:text-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <Button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-white/90 disabled:opacity-70"
            >
              {loading ? '...' : 'সাবস্ক্রাইব'}
            </Button>
          </form>
        )}

        <p className="mt-3 text-xs text-white/60">
          আমরা আপনার ইমেইল কখনো তৃতীয় পক্ষের সাথে শেয়ার করি না।
        </p>
      </div>
    </section>
  );
}
