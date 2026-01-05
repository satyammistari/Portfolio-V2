"use client";

import { PixelCat } from "@/components/pixel-cat";

interface GitHubHeatmapProps {
  contributions?: number;
  totalContributions?: number;
}

export function GitHubHeatmap({ 
  contributions = 1947,
  totalContributions = 1947 
}: GitHubHeatmapProps) {
  // Generate a year's worth of contribution data
  const weeks = 53;
  const daysPerWeek = 7;
  const squares: { intensity: number }[] = [];

  // Generate random contribution data (in a real app, this would come from GitHub API)
  for (let i = 0; i < weeks * daysPerWeek; i++) {
    squares.push({
      intensity: Math.floor(Math.random() * 4), // 0-3 intensity levels
    });
  }

  const getColor = (intensity: number) => {
    const colors = [
      "#161b22", // No contributions
      "#0e4429", // Low
      "#006d32", // Medium
      "#26a641", // High
      "#39d353", // Very high
    ];
    return colors[intensity] || colors[0];
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="bg-[#0c0c0c] rounded-lg p-6 border border-white/10 relative">
      {/* Pixel Cat on top-right */}
      <div className="absolute -top-3 -right-3 z-10">
        <PixelCat />
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Featured</p>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">GitHub Activity</h3>
        </div>
        
        {/* Stats Bar */}
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>Total contributions</span>
          <div className="flex items-center space-x-2">
            <span>Yesterday worked</span>
            <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      
        <div className="overflow-x-auto">
        <div className="flex items-start space-x-1">
          {/* Month labels */}
          <div className="flex flex-col justify-start pt-3 space-y-1">
            {months.map((month, i) => (
              <div key={month} className="h-3 text-xs text-white/40" style={{ height: '12px' }}>
                {i % 2 === 0 && month}
              </div>
            ))}
          </div>
          
          {/* Contribution grid */}
          <div className="flex space-x-1">
            {Array.from({ length: weeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                  const squareIndex = weekIndex * daysPerWeek + dayIndex;
                  const square = squares[squareIndex] || { intensity: 0 };
                  return (
                    <div
                      key={dayIndex}
                      className="w-3 h-3 rounded-sm"
                      style={{
                        backgroundColor: getColor(square.intensity),
                      }}
                      title={`${square.intensity} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
        <div className="flex items-center justify-between mt-4 text-xs text-white/40">
          <span>Learn how we count contributions</span>
          <div className="flex items-center space-x-2">
            <span>Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: getColor(level) }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

