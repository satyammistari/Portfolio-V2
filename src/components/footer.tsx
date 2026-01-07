"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { useRotatingWisdom } from "@/hooks/useRotatingWisdom";
import { wisdomQuotes } from "@/data/wisdom";
import { useEffect, useState } from "react";

export function Footer() {
  const currentQuote = useRotatingWisdom(wisdomQuotes);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // Increment visitor count on first mount (only once per session)
    const sessionKey = "visitor_incremented";
    const hasVisited = sessionStorage.getItem(sessionKey);

    if (!hasVisited && !hasIncremented) {
      fetch("/api/visitors", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          setVisitorCount(data.count);
          sessionStorage.setItem(sessionKey, "true");
          setHasIncremented(true);
        })
        .catch(() => setVisitorCount(0));
    } else {
      // Just fetch the current count
      fetch("/api/visitors")
        .then((res) => res.json())
        .then((data) => setVisitorCount(data.count))
        .catch(() => setVisitorCount(0));
    }
  }, [hasIncremented]);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-16 border-t border-white/10 py-8"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <div className="mx-auto max-w-[800px] px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Rotating Wisdom Quote */}
          <div className="min-h-[48px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {currentQuote && (
                <motion.p
                  key={currentQuote.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm text-zinc-500 dark:text-zinc-500 text-center max-w-[700px] leading-relaxed"
                >
                  {currentQuote.text}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Visitor Counter Pill */}
          {visitorCount !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] dark:bg-[#111111] border border-zinc-800 dark:border-zinc-800"
            >
              <Eye className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs text-zinc-400 font-medium">
                {visitorCount.toLocaleString()} visitors
              </span>
            </motion.div>
          )}

          {/* Copyright */}
          <p className="text-xs text-white/40 dark:text-zinc-600">
            © {new Date().getFullYear()} Satyam Mistari. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

