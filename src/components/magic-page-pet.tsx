"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface MagicPagePetProps {
  isOnPolaroid?: boolean;
}

export function MagicPagePet({ isOnPolaroid = false }: MagicPagePetProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: isOnPolaroid ? 0 : 20,
        y: isOnPolaroid ? -10 : 0,
      }}
      transition={{
        duration: 0.5,
        type: "spring",
      }}
      style={{
        bottom: isOnPolaroid ? "auto" : "20px",
        right: isOnPolaroid ? "auto" : "20px",
        top: isOnPolaroid ? "50%" : "auto",
        left: isOnPolaroid ? "50%" : "auto",
        transform: isOnPolaroid ? "translate(200px, -200px)" : "none",
      }}
    >
      {isOnPolaroid ? (
        // Sitting cat on Polaroid
        <div className="w-16 h-16">
          <svg
            viewBox="0 0 32 32"
            className="w-full h-full"
            fill="#8B4513"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sitting cat */}
            <rect x="10" y="16" width="12" height="10" rx="2" />
            <rect x="12" y="10" width="8" height="10" rx="2" />
            <polygon points="12,10 14,6 16,10" />
            <polygon points="16,10 18,6 20,10" />
            <circle cx="14" cy="13" r="1" fill="#000" />
            <circle cx="18" cy="13" r="1" fill="#000" />
            <path d="M 14 15 Q 16 16 18 15" stroke="#000" strokeWidth="0.5" fill="none" />
            {/* Curled tail */}
            <path d="M 20 20 Q 25 18 24 24" stroke="#8B4513" strokeWidth="2" fill="none" />
          </svg>
        </div>
      ) : (
        // Sleeping cat at bottom
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20"
        >
          <svg
            viewBox="0 0 32 32"
            className="w-full h-full"
            fill="#CD853F"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sleeping cat */}
            <ellipse cx="16" cy="20" rx="10" ry="6" />
            <circle cx="16" cy="16" r="7" />
            <polygon points="10,14 11,10 13,14" />
            <polygon points="19,14 21,10 22,14" />
            {/* Closed eyes */}
            <path d="M 12 15 Q 13 16 14 15" stroke="#000" strokeWidth="0.8" fill="none" />
            <path d="M 18 15 Q 19 16 20 15" stroke="#000" strokeWidth="0.8" fill="none" />
            {/* Z's for sleeping */}
            <text x="22" y="10" fontSize="4" fill="#CD853F" opacity="0.6">Z</text>
            <text x="24" y="7" fontSize="3" fill="#CD853F" opacity="0.4">z</text>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
