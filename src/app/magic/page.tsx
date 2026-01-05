"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { MagicPagePet } from "@/components/magic-page-pet";
import { PolaroidCard } from "@/components/polaroid-card";
import loveWallData from "@/data/love-wall.json";

export default function MagicWallPage() {
  const [mounted, setMounted] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate random rotations for each card (between -4deg and 4deg)
  const rotations = mounted 
    ? loveWallData.map(() => Math.random() * 8 - 4) 
    : loveWallData.map(() => 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f5f0e8 0%, #e8dcc8 50%, #d4c4a8 100%)",
      }}
    >
      {/* Page Pet */}
      <MagicPagePet isOnPolaroid={hoveredCardId !== null} />

      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(255, 223, 186, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(245, 222, 179, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(255, 223, 186, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-800/60 hover:text-amber-800 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-light">home</span>
        </Link>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span className="text-amber-800/60 text-sm tracking-widest uppercase">Wall of Love</span>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-amber-900" style={{ fontFamily: "'Caveat', cursive" }}>
              The People Who Made Me
            </h1>
          </motion.div>

          {/* Polaroid Cards Grid - Scrapbook Style */}
          <div className="flex flex-wrap justify-center items-center gap-6 max-w-6xl relative">
            {loveWallData.map((photo, index) => (
              <div
                key={photo.id}
                style={{
                  marginTop: index % 2 === 0 ? "0px" : "20px",
                  marginLeft: index === 1 ? "-40px" : "0px",
                  marginRight: index === 1 ? "-40px" : "0px",
                  zIndex: hoveredCardId === photo.id ? 20 : 10 - index,
                }}
              >
                <PolaroidCard
                  src={photo.src}
                  alt={photo.alt}
                  caption={photo.caption}
                  rotation={rotations[index]}
                  delay={0.5 + index * 0.2}
                  onHover={(isHovering) => setHoveredCardId(isHovering ? photo.id : null)}
                />
              </div>
            ))}
          </div>

          {/* Heartfelt Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-2xl text-center space-y-6 px-6"
          >
            <p className="text-amber-900/90 leading-relaxed font-light text-base md:text-lg">
              Behind every line of code, every model trained, and every bug fixed at 3 AM,
              there&apos;s a family that never asked me to choose between my dreams and their expectations.
            </p>
            <p className="text-amber-900/80 leading-relaxed font-light text-sm md:text-base">
              To <span className="text-amber-800 font-semibold">Mom</span>, who learned what &quot;machine learning&quot; meant just to ask about my day.
              <br />
              To <span className="text-amber-800 font-semibold">Dad</span>, who believed in paths he never walked himself.
              <br />
              To <span className="text-amber-800 font-semibold">everyone</span> who made sacrifices I&apos;ll spend my life trying to repay.
            </p>
            <p className="text-amber-900/70 leading-relaxed font-light text-sm italic">
              This portfolio isn&apos;t just mine—it&apos;s ours.
            </p>
          </motion.div>

          {/* Animated Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12"
          >
            <svg
              width="200"
              height="80"
              viewBox="0 0 200 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 20 50 Q 40 20, 60 40 T 100 50 Q 120 60, 140 40 T 180 50"
                stroke="#8B4513"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.text
                x="60"
                y="70"
                className="text-sm"
                fill="#8B4513"
                opacity="0.6"
                style={{ fontFamily: "'Caveat', cursive" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                With Love, Satyam
              </motion.text>
            </svg>
          </motion.div>

          {/* Bottom spacer */}
          <div className="h-20" />
        </div>
      </div>

      {/* Add handwritten fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
      `}</style>
    </motion.div>
  );
}
