"use client";

import { TechBadge } from "@/components/tech-badge";
import { TechLogoIcon } from "@/components/tech-logo-icon";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { motion } from "framer-motion";
import { FileText, Send } from "lucide-react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { SpotifyWidget } from "@/components/spotify-widget";
import { PixelCat } from "@/components/pixel-cat";
import { FlipCard } from "@/components/flip-card";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="hero" className="pt-8 relative">
      {/* Interactive Cat GIF - Fixed Left Side */}
      <motion.div
        className="fixed left-8 top-1/2 -translate-y-1/2 cursor-pointer group z-50"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Link href="/magic" className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-2 group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/delusional-cat.gif"
              alt="Click for magic"
              width={80}
              height={80}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
          <span className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors">
            click for magic ✨
          </span>
        </Link>
      </motion.div>

      <div className="flex flex-col md:flex-row items-start gap-10 py-20">
        {/* Pixel Art Avatar with Flip Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          <div className="bg-yellow-400 rounded-2xl border border-white/10 overflow-hidden">
            <FlipCard
              frontImage="/me.png"
              backImage="/goku.gif"
              alt="Satyam"
              size={192}
            />
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="flex-1 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold tracking-tighter leading-none"
          >
            Hii, I am {DATA.name} — <br />
            <span className="text-[#888888]">ML & Robotics Developer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg text-zinc-400 leading-relaxed"
          >
            {DATA.description}
          </motion.p>

          {/* Tech Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            <TechLogoIcon 
              name="PyTorch" 
              logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" 
            />
            <TechLogoIcon 
              name="TensorFlow" 
              logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" 
            />
            <TechLogoIcon 
              name="Hugging Face" 
              logo="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" 
            />
            <TechLogoIcon 
              name="OpenCV" 
              logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" 
            />
            <TechLogoIcon 
              name="AWS" 
              logo="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" 
            />
            <TechLogoIcon 
              name="Docker" 
              logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              asChild
              variant="outline"
              className="border border-white/10 bg-transparent hover:bg-white/5 text-white"
            >
              <Link href="#work">
                <FileText className="w-4 h-4 mr-2" />
                Resume / CV
              </Link>
            </Button>
            <Button
              asChild
              className="bg-white text-black hover:bg-white/90 border-0"
            >
              <Link href="#contact">
                <Send className="w-4 h-4 mr-2" />
                Get in touch
              </Link>
            </Button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center space-x-4 pt-2"
          >
            {Object.entries(DATA.contact.social).map(([key, social]) => {
              if (!social.navbar) return null;
              const Icon = social.icon;
              return (
                <Link
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Spotify Widget with Pixel Cat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 relative"
      >
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <PixelCat />
        </div>
        <SpotifyWidget 
          song="Gal Sun"
          artist="Sabat Batin, Rockstar"
        />
      </motion.div>
    </section>
  );
}

