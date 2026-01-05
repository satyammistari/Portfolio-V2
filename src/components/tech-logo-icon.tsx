"use client";

import Image from "next/image";

interface TechLogoIconProps {
  name: string;
  logo: string;
}

export function TechLogoIcon({ name, logo }: TechLogoIconProps) {
  return (
    <div className="group relative">
      <div className="bg-[#161616] dark:bg-[#161616] light:bg-zinc-100 border border-white/10 dark:border-white/10 light:border-zinc-300 rounded-lg p-2.5 hover:border-dashed hover:bg-[#1a1a1a] dark:hover:bg-[#1a1a1a] light:hover:bg-zinc-200 transition-all">
        <Image
          src={logo}
          alt={name}
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
      {/* Tooltip on hover */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {name}
      </div>
    </div>
  );
}
