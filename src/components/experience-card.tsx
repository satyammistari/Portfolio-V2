"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TechStackItem {
  name: string;
  logo: string;
}

interface ExperienceCardProps {
  logoUrl: string;
  altText: string;
  company: string;
  title: string;
  period: string;
  location: string;
  description?: string;
  href?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  technologies?: string[];
  techStack?: TechStackItem[];
  isCurrent?: boolean;
}

export function ExperienceCard({
  logoUrl,
  altText,
  company,
  title,
  period,
  location,
  description,
  href,
  website,
  github,
  linkedin,
  technologies,
  techStack,
  isCurrent = false,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <Avatar className="size-10 border border-white/10 flex-shrink-0">
            <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
            <AvatarFallback className="bg-white/5 text-white/60">
              {altText[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-1">
              <span className="text-sm text-white/60 blur-sm">{company}</span>
              <div className="flex items-center space-x-1">
                {website && (
                  <Link
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </Link>
                )}
                {!website && href && (
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </Link>
                )}
                {github && (
                  <Link
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <Icons.github className="w-3.5 h-3.5" />
                  </Link>
                )}
                {linkedin && (
                  <Link
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <Icons.linkedin className="w-3.5 h-3.5" />
                  </Link>
                )}
                {href && (
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <Icons.x className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
            <h3 className="text-base font-bold text-white">{title}</h3>
          </div>
        </div>

        <div className="text-right text-sm text-white/60 space-y-0.5 flex-shrink-0">
          <div>{period}</div>
          <div>{location}</div>
        </div>
      </div>

      {/* Tech Stack with Logos */}
      {techStack && techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={20}
                  height={20}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xs text-white/80 font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Technologies & Tools (fallback for text-only) */}
      {!techStack && technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="bg-[#161616] border border-white/10 rounded-md px-3 py-1 text-xs text-white/90"
            >
              {tech}
            </div>
          ))}
        </div>
      )}

      {/* Description/Bullet Points */}
      {description && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-white/60 hover:text-white/80 transition-colors"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
            <span className="text-sm">View details</span>
          </button>
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="text-sm text-zinc-400 leading-relaxed space-y-2 pl-4">
                {description.split(". ").filter(p => p.trim()).map((point, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="mr-2 text-white/60">•</span>
                    <span>{point.trim().replace(/\.$/, "")}.</span>
                  </div>
                ))}
              </div>
            </motion.div>
        </>
      )}
    </div>
  );
}

