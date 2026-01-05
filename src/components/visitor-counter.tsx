"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndIncrementCount = async () => {
      try {
        // Increment the count
        const incrementResponse = await fetch('/api/visitors', {
          method: 'POST',
        });
        const incrementData = await incrementResponse.json();

        // Fetch the current count
        const fetchResponse = await fetch('/api/visitors');
        const fetchData = await fetchResponse.json();

        setCount(fetchData.count || incrementData.count);
      } catch (error) {
        console.error('Error with visitor counter:', error);
        setCount(25784); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchAndIncrementCount();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-[#0c0c0c] dark:bg-[#0c0c0c] rounded-full px-6 py-3 border border-white/10 dark:border-white/10 flex items-center space-x-3">
        <Eye className="w-4 h-4 text-white/60 dark:text-white/60" />
        <span className="text-sm text-white/80 dark:text-white/80">
          You are the{" "}
          <span className="font-bold text-white dark:text-white">
            {loading ? "..." : (count || 25784).toLocaleString()}
          </span>
          th visitor.
        </span>
      </div>
    </div>
  );
}
