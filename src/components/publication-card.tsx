import { Badge } from "@/components/ui/badge";
import { Globe, Bookmark, FileText } from "lucide-react";
import Link from "next/link";

interface PublicationCardProps {
  title: string;
  venue: string;
  year: string;
  status?: string;
  tags: string[];
  paperUrl?: string;
  arxivUrl?: string;
  codeUrl?: string;
}

export function PublicationCard({
  title,
  venue,
  year,
  status = "Published",
  tags,
  paperUrl,
  arxivUrl,
  codeUrl,
}: PublicationCardProps) {
  return (
    <div className="p-5 bg-[#111111] border border-white/10 rounded-lg hover:bg-[#151515] hover:border-white/20 transition-all group">
      <div className="space-y-4">
        {/* Title & Venue */}
        <div>
          <h3 className="text-base font-bold text-white leading-tight mb-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="font-bold text-white/80">{venue}</span>
            <span>•</span>
            <span>{year}</span>
            {status !== "Published" && (
              <>
                <span>•</span>
                <Badge className="px-2 py-0 text-[10px] bg-green-500/10 text-green-500 border-green-500/20">
                  {status}
                </Badge>
              </>
            )}
          </div>
        </div>

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

        {/* Links */}
        <div className="flex items-center gap-3 pt-1">
          {paperUrl && (
            <Link
              href={paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <Globe className="w-4 h-4" />
            </Link>
          )}
          {arxivUrl && (
            <Link
              href={arxivUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <FileText className="w-4 h-4" />
            </Link>
          )}
          {codeUrl && (
            <Link
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
