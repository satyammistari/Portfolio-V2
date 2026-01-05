"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface PolaroidCardProps {
  src: string;
  alt: string;
  caption: string;
  rotation?: number;
  delay?: number;
  onHover?: (isHovering: boolean) => void;
}

export function PolaroidCard({
  src,
  alt,
  caption,
  rotation = 0,
  delay = 0,
  onHover,
}: PolaroidCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      transition={{ 
        delay, 
        duration: 0.8, 
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      className="polaroid-card relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "#F9F9F9",
        padding: "12px",
        paddingBottom: "60px",
        borderRadius: "2px",
        width: "300px",
        height: "360px",
      }}
    >
      {/* Layered Shadow Effect */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[2px]"
        style={{
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)"
        }}
      />

      {/* Photo with Vintage Filter */}
      <div className="relative w-full h-[276px] bg-zinc-100 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{
            filter: "sepia(10%) contrast(105%)",
          }}
          priority
        />
      </div>

      {/* Handwritten Caption */}
      <div className="mt-3 text-center absolute bottom-2 left-0 right-0 px-4">
        <p
          className="text-zinc-800 text-lg"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {caption}
        </p>
      </div>

      {/* Tape effect */}
      <div 
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 rotate-2 rounded-sm" 
        style={{ 
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
          background: "repeating-linear-gradient(90deg, rgba(255,248,220,0.6) 0px, rgba(255,248,220,0.6) 2px, rgba(255,248,220,0.8) 2px, rgba(255,248,220,0.8) 4px)"
        }}
      />
    </motion.div>
  );
}
