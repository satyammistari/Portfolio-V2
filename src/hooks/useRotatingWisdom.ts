"use client";

import { useState, useEffect } from "react";

export interface WisdomQuote {
  text: string;
  id: number;
}

export function useRotatingWisdom(quotes: WisdomQuote[]) {
  const [currentQuote, setCurrentQuote] = useState<WisdomQuote | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateQuote = () => {
      const now = new Date();
      const currentHour = now.getUTCHours();
      const index = Math.floor(currentHour / 2) % quotes.length;
      setCurrentQuote(quotes[index]);
    };

    // Initial update
    updateQuote();

    // Calculate milliseconds until next 2-hour window
    const now = new Date();
    const currentMinute = now.getUTCMinutes();
    const currentSecond = now.getUTCSeconds();
    const currentMs = now.getUTCMilliseconds();
    
    const msUntilNextEvenHour = (
      (120 - ((now.getUTCHours() % 2) * 60 + currentMinute)) * 60 * 1000 -
      currentSecond * 1000 -
      currentMs
    );

    // Update at the next 2-hour boundary
    const timeout = setTimeout(() => {
      updateQuote();
      // Then update every 2 hours
      const interval = setInterval(updateQuote, 2 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilNextEvenHour);

    return () => clearTimeout(timeout);
  }, [quotes, isClient]);

  return currentQuote;
}
