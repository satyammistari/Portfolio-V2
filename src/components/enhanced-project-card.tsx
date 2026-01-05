"use client";

import { Icons } from "@/components/icons";
import { TechBadge } from "@/components/tech-badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EnhancedProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  href?: string;
  image?: string;
  video?: string;
  status?: "operational" | "development";
  links?: {
    type: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export function EnhancedProjectCard({
  title,
  description,
  technologies,
  href,
  image,
  video,
  status = "operational",
  links,
}: EnhancedProjectCardProps) {
  return (
    <div className="bg-[#0c0c0c] dark:bg-[#0c0c0c] light:bg-white rounded-lg border border-white/10 dark:border-white/10 light:border-zinc-200 overflow-hidden hover:bg-[#111111] dark:hover:bg-[#111111] light:hover:shadow-lg transition-all group h-full flex flex-col">
      {/* Gradient Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-500/20 dark:to-blue-500/20 light:from-purple-500/10 light:to-blue-500/10 overflow-hidden group/image">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500"
          />
        ) : image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover/image:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-20">🚀</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white dark:text-white light:text-zinc-900 group-hover:text-white/90 dark:group-hover:text-white/90 light:group-hover:text-zinc-700 transition-colors">
            {title}
          </h3>
          <div className="flex items-center space-x-2">
            {links?.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 dark:text-white/60 light:text-zinc-500 hover:text-white dark:hover:text-white light:hover:text-zinc-900 transition-colors"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-sm text-white/60 dark:text-white/60 light:text-zinc-600 mb-4 line-clamp-2 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <p className="text-xs text-white/50 dark:text-white/50 light:text-zinc-500 mb-2">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 6).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>

        {/* Status & View Details */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 dark:border-white/10 light:border-zinc-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-400 dark:text-green-400 light:text-green-600" />
            <span className="text-xs text-white/60 dark:text-white/60 light:text-zinc-500">
              All Systems Operational
            </span>
          </div>
          {href && (
            <Link
              href={href}
              className="flex items-center space-x-1 text-sm text-white/60 dark:text-white/60 light:text-zinc-600 hover:text-white dark:hover:text-white light:hover:text-zinc-900 transition-colors group/link"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

