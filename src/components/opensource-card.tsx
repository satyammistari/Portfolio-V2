import { Badge } from "@/components/ui/badge";
import { Star, GitFork, ExternalLink } from "lucide-react";
import Link from "next/link";

interface OpenSourceCardProps {
  platform: string;
  title: string;
  description: string;
  stats?: {
    stars?: number;
    repos?: number;
    contributions?: number;
  };
  tags: string[];
  url: string;
}

export function OpenSourceCard({
  platform,
  title,
  description,
  stats,
  tags,
  url,
}: OpenSourceCardProps) {
  return (
    <div className="p-5 bg-white/[0.02] border border-white/10 rounded-lg hover:bg-white/[0.04] hover:border-white/20 transition-all group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-xs text-white/60 mb-1">{platform}</div>
            <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              {description}
            </p>
          </div>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/80 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats */}
        {stats && (
          <div className="flex items-center gap-4 text-xs text-white/60">
            {stats.stars !== undefined && (
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5" />
                <span className="font-semibold">{stats.stars.toLocaleString()}</span>
              </div>
            )}
            {stats.repos !== undefined && (
              <div className="flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5" />
                <span className="font-semibold">{stats.repos} repos</span>
              </div>
            )}
            {stats.contributions !== undefined && (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold">{stats.contributions}+ contributions</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="px-2 py-0.5 text-[10px] bg-white/5 border-white/10 text-white/70"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
