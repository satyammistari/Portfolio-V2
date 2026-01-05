"use client";

import { useEffect, useState } from "react";

interface RepoStats {
  name: string;
  stars: number;
  forks: number;
  description: string;
  url: string;
  language: string;
}

interface OpenSourceStatsProps {
  repos: string[];
}

export function OpenSourceStats({ repos }: OpenSourceStatsProps) {
  const [repoStats, setRepoStats] = useState<RepoStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const response = await fetch(`/api/repos?repos=${repos.join(',')}`);
        const data = await response.json();
        setRepoStats(data.repos || []);
      } catch (error) {
        console.error('Error fetching repo stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (repos.length > 0) {
      fetchRepoStats();
    }
  }, [repos]);

  if (loading) {
    return (
      <div className="grid gap-4">
        {repos.map((repo) => (
          <div
            key={repo}
            className="bg-[#0c0c0c] dark:bg-[#0c0c0c] light:bg-white border border-white/10 dark:border-white/10 light:border-zinc-200 rounded-lg p-4 animate-pulse"
          >
            <div className="h-4 bg-white/10 dark:bg-white/10 light:bg-zinc-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-white/10 dark:bg-white/10 light:bg-zinc-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {repoStats.map((repo) => (
        <a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0c0c0c] dark:bg-[#0c0c0c] light:bg-white border border-white/10 dark:border-white/10 light:border-zinc-200 rounded-lg p-4 hover:border-white/20 dark:hover:border-white/20 light:hover:border-zinc-300 transition-all light:shadow-md hover:light:shadow-lg group"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-lg font-semibold text-white dark:text-white light:text-zinc-900 group-hover:text-blue-400 dark:group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors">
                {repo.name}
              </h4>
              {repo.description && (
                <p className="text-sm text-white/60 dark:text-white/60 light:text-zinc-600 mt-1">
                  {repo.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-white/50 dark:text-white/50 light:text-zinc-500">
            {repo.language && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{repo.stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">{repo.forks.toLocaleString()}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
