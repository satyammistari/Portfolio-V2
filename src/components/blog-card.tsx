"use client";

import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  image?: string;
  tags?: string[];
  slug: string;
  readTime?: number;
}

export function BlogCard({ title, description, date, image, tags, slug, readTime }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="bg-[#0c0c0c] rounded-lg border border-white/10 overflow-hidden hover:border-white/30 transition-all group h-full flex flex-col"
    >
      {/* Featured Image with Hover Zoom */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500/10 to-blue-500/10 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-20">📝</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-white/90 transition-colors" style={{ fontFamily: "var(--font-geist-mono)" }}>
          {title}
        </h3>
        <p className="text-xs text-white/60 mb-4 line-clamp-3 flex-1 leading-relaxed" style={{ fontFamily: "var(--font-geist-mono)" }}>
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-2 py-0.5 bg-white/5 border-white/10 text-white/70 uppercase"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer with Date, Read Time & CTA */}
        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-center gap-3 text-white/50">
            <span className="text-[10px]" style={{ fontFamily: "var(--font-geist-mono)" }}>{date}</span>
            {readTime && (
              <>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px]" style={{ fontFamily: "var(--font-geist-mono)" }}>{readTime} min read</span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-center gap-1 text-white/70 group-hover:text-white transition-colors">
            <span className="text-xs font-medium" style={{ fontFamily: "var(--font-geist-mono)" }}>Read More</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}




