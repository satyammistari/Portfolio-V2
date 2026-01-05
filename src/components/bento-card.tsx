"use client";

import { PixelCat } from "@/components/pixel-cat";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface BentoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  showCat?: boolean;
}

export function BentoCard({ icon, title, description, href, showCat = false }: BentoCardProps) {
  const content = (
    <div className="bg-[#111111] rounded-lg p-6 border border-white/10 hover:bg-[#161616] transition-all group cursor-pointer h-full relative">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
          </div>
        </div>
        {href && (
          <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors flex-shrink-0" />
        )}
      </div>
      {showCat && (
        <div className="absolute -top-2 -right-2">
          <PixelCat />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block relative">
        {content}
      </Link>
    );
  }

  return <div className="relative">{content}</div>;
}

