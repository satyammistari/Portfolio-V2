"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { PixelCat } from "@/components/pixel-cat";

interface GitHubHeatmapProps {
  username?: string;
}

export function GitHubHeatmap({ username = "satyammistari" }: GitHubHeatmapProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-48 bg-[#0c0c0c] dark:bg-[#0c0c0c] light:bg-white rounded-lg border border-white/10 dark:border-white/10 light:border-zinc-200 animate-pulse" />
    );
  }

  return (
    <div className="bg-[#0c0c0c] dark:bg-[#0c0c0c] light:bg-white rounded-lg p-6 border border-white/10 dark:border-white/10 light:border-zinc-200 relative light:shadow-lg">
      {/* Pixel Cat on top-right */}
      <div className="absolute -top-3 -right-3 z-10">
        <PixelCat />
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-zinc-400 uppercase tracking-widest mb-1">Featured</p>
          <h3 className="text-4xl md:text-5xl font-bold text-white dark:text-white light:text-zinc-900 tracking-tighter">GitHub Activity</h3>
        </div>
        
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <img 
              src={`https://ghchart.rshah.org/${theme === 'dark' ? '' : '2d3748/'}${username}`}
              alt="GitHub Contribution Chart"
              className="w-full"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
