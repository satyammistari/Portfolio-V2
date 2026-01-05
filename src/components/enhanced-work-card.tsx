"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Globe, ChevronDown, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface EnhancedWorkCardProps {
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
}

export function EnhancedWorkCard({
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
}: EnhancedWorkCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#0c0c0c] rounded-lg border border-white/10 p-4 hover:bg-[#111111] transition-all">
      <div className="flex items-start space-x-4">
        <Avatar className="size-12 border border-white/10">
          <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
          <AvatarFallback className="bg-white/5 text-white/60">
            {altText[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-base font-semibold text-white">{company}</h3>
                <div className="flex items-center space-x-1">
                  {website && (
                    <Link
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                    </Link>
                  )}
                  {github && (
                    <Link
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      <Icons.github className="w-4 h-4" />
                    </Link>
                  )}
                  {linkedin && (
                    <Link
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      <Icons.linkedin className="w-4 h-4" />
                    </Link>
                  )}
                  {description && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-white/40 hover:text-white/80 transition-colors"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-white/80 font-medium">{title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-white/60 mb-2">
            <span>{period}</span>
            <span>•</span>
            <span>{location}</span>
          </div>

          {description && (
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-white/60 mt-2 leading-relaxed">{description}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

