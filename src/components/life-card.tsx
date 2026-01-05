import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";

interface LifeCardProps {
  title: string;
  author?: string;
  director?: string;
  year: string;
  category?: string;
  genre?: string;
  rating: number;
  coverImage?: string;
  posterImage?: string;
  description: string;
  keyTakeaways?: string[];
  themes?: string[];
  link?: string;
  imdbLink?: string;
  className?: string;
  type: "book" | "movie";
}

export function LifeCard({
  title,
  author,
  director,
  year,
  category,
  genre,
  rating,
  coverImage,
  posterImage,
  description,
  keyTakeaways,
  themes,
  link,
  imdbLink,
  className,
  type,
}: LifeCardProps) {
  const imageUrl = type === "book" ? coverImage : posterImage;
  const externalLink = type === "book" ? link : imdbLink;
  const creator = type === "book" ? author : director;
  const tag = type === "book" ? category : genre;

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border border-white/10 bg-[#0c0c0c] hover:bg-[#111111] hover:border-white/20 transition-all duration-300 ease-out h-full group",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-20">
              {type === "book" ? "📚" : "🎬"}
            </span>
          </div>
        )}
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-white">{rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <CardHeader className="px-4 pb-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-bold text-white leading-tight group-hover:text-white/90 transition-colors">
              {title}
            </CardTitle>
            {externalLink && (
              <Link
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            {creator && <span className="font-medium">{creator}</span>}
            <span>•</span>
            <span>{year}</span>
          </div>
          {tag && (
            <Badge
              className="px-2 py-0.5 text-[10px] bg-white/5 border-white/10 text-white/70"
              variant="outline"
            >
              {tag}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-4 flex-1">
        <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="px-4 pb-4">
        {keyTakeaways && keyTakeaways.length > 0 && (
          <div className="w-full space-y-2">
            <p className="text-[10px] text-white/50 uppercase tracking-wider">
              Key Takeaways
            </p>
            <div className="space-y-1">
              {keyTakeaways.slice(0, 3).map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-white/40 text-xs mt-0.5">•</span>
                  <span className="text-xs text-white/60 leading-tight">
                    {takeaway}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {themes && themes.length > 0 && (
          <div className="w-full space-y-2">
            <p className="text-[10px] text-white/50 uppercase tracking-wider">
              Themes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {themes.map((theme, idx) => (
                <Badge
                  key={idx}
                  className="px-2 py-0.5 text-[10px] bg-white/5 border-white/10 text-white/70"
                  variant="outline"
                >
                  {theme}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
