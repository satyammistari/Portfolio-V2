import { Badge } from "@/components/ui/badge";
import { ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";

interface ResearchProjectCardProps {
  title: string;
  description: string;
  novelty?: string;
  metric?: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
}

export function ResearchProjectCard({
  title,
  description,
  novelty,
  metric,
  tags,
  demoUrl,
  codeUrl,
}: ResearchProjectCardProps) {
  return (
    <div className="p-5 bg-[#111111] border border-white/10 rounded-lg hover:bg-[#151515] hover:border-white/20 transition-all group h-full flex flex-col">
      <div className="space-y-4 flex-1">
        {/* Title */}
        <h3 className="text-base font-bold text-white leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/70 leading-relaxed">
          {description}
        </p>

        {/* Novelty */}
        {novelty && (
          <div className="text-xs">
            <span className="font-bold text-white">Novelty: </span>
            <span className="text-white/70">{novelty}</span>
          </div>
        )}

        {/* Metric */}
        {metric && (
          <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-500 font-bold">
            {metric}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="px-2.5 py-1 text-[11px] bg-white/5 border-white/10 text-white/70 font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-2 pt-4 mt-auto">
        {demoUrl && (
          <Link
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Live Demo</span>
          </Link>
        )}
        {codeUrl && (
          <Link
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Code2 className="w-3 h-3" />
            <span>Source</span>
          </Link>
        )}
      </div>
    </div>
  );
}
