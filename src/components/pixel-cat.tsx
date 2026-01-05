"use client";

import { motion } from "framer-motion";

interface PixelCatProps {
  className?: string;
}

export function PixelCat({ className = "" }: PixelCatProps) {
  return (
    <motion.div
      className={`block ${className}`}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-8 h-8 relative">
        {/* Simple pixel art cat - you can replace this with an actual pixel art image */}
        <svg
          viewBox="0 0 32 32"
          className="w-full h-full"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cat body */}
          <rect x="8" y="12" width="16" height="12" />
          {/* Cat head */}
          <rect x="10" y="8" width="12" height="8" />
          {/* Ears */}
          <polygon points="10,8 12,4 14,8" />
          <polygon points="18,8 20,4 22,8" />
          {/* Eyes */}
          <rect x="12" y="10" width="2" height="2" fill="#000" />
          <rect x="18" y="10" width="2" height="2" fill="#000" />
          {/* Nose */}
          <polygon points="15,12 14,14 16,14" fill="#000" />
          {/* Tail */}
          <rect x="22" y="18" width="4" height="2" />
          <rect x="24" y="20" width="2" height="4" />
        </svg>
      </div>
    </motion.div>
  );
}

