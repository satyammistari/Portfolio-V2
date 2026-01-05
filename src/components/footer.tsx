"use client";

import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { useEffect, useState } from "react";
import { VisitorCounter } from "@/components/visitor-counter";
import { QUOTES } from "@/lib/constants";

export function Footer() {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    // Get day of year to select quote
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const quoteIndex = dayOfYear % QUOTES.length;
    setQuote(QUOTES[quoteIndex]);
  }, []);

  return (
    <footer className="w-full py-12">
      <div className="max-w-[1000px] mx-auto px-6 space-y-8">
        {/* Quote Section */}
        <div className="bg-[#0c0c0c] dark:bg-[#0c0c0c] light:bg-white rounded-lg p-8 md:p-12 border border-white/10 dark:border-white/10 light:border-zinc-200 relative overflow-hidden light:shadow-lg">
          <div className="absolute top-0 left-0 text-9xl md:text-[12rem] font-serif text-white/5 dark:text-white/5 light:text-zinc-200 leading-none">
            "
          </div>
          <blockquote className="relative z-10 text-xl md:text-2xl font-medium text-white/90 dark:text-white/90 light:text-zinc-900 italic max-w-3xl pl-8">
            {quote.text}
          </blockquote>
          <p className="relative z-10 text-sm md:text-base text-white/60 dark:text-white/60 light:text-zinc-600 mt-4 pl-8">
            — {quote.author}
          </p>
        </div>

        {/* Visitor Counter */}
        <VisitorCounter />

        {/* Social Links & Copyright */}
        <div className="flex flex-col items-center space-y-4 pt-8 border-t border-white/10">
          <div className="flex items-center space-x-4">
            {Object.entries(DATA.contact.social).map(([key, social]) => {
              if (!social.navbar) return null;
              const Icon = social.icon;
              return (
                <Link
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glassmorphism border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
          <div className="text-center text-sm text-white/40">
            <p>
              Design & Developed by <span className="font-semibold text-white/60">Satyam</span>
            </p>
            <p className="mt-1">© {new Date().getFullYear()}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

