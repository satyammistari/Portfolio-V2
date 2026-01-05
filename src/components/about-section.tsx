"use client";

import { TechBadge } from "@/components/tech-badge";
import { DATA } from "@/data/resume";
import { motion } from "framer-motion";
import { FlipCard } from "@/components/flip-card";
import { CodingStatus } from "@/components/coding-status";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <p className="text-sm text-white/60 uppercase tracking-wider">About</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Me</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Avatar with Flip Effect */}
          <div className="flex justify-center md:justify-start">
            <div className="bg-yellow-400 rounded-2xl border border-white/10 overflow-hidden">
              <FlipCard
                frontImage="/me.png"
                backImage="/goku.gif"
                alt="Satyam"
                size={192}
              />
            </div>
          </div>

          {/* Right: Bio & Skills */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{DATA.name}</h3>
              <p className="text-white/70 leading-relaxed text-base">
                I&apos;m a Machine Learning Engineer and Open Source Contributor. I love building products to solve real-world problems. Specialized in building high-accuracy MVPs.
              </p>
            </div>

            {/* Skills Row with Official Logos */}
            <div>
              <p className="text-xs text-zinc-500 mb-3 uppercase tracking-widest">Skills</p>
              <div className="flex flex-wrap gap-3 items-center">
                <TechBadge name="Python" />
                <TechBadge name="TensorFlow" />
                <TechBadge name="HuggingFace" />
                <TechBadge name="PyTorch" />
                <TechBadge name="Sklearn" />
                <TechBadge name="React" />
                <TechBadge name="Bun" />
                <TechBadge name="JavaScript" />
                <TechBadge name="TypeScript" />
                <TechBadge name="Next.js" />
                <TechBadge name="Node.js" />
                <TechBadge name="MongoDB" />
                <TechBadge name="PostgreSQL" />
                <TechBadge name="Prisma" />
              </div>
            </div>

            {/* Coding Status */}
            <div className="pt-2">
              <CodingStatus />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

