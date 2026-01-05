"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleSearch = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Search functionality can be added here
      }
    };

    document.addEventListener("keydown", handleSearch);
    return () => {
      document.removeEventListener("keydown", handleSearch);
    };
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40} 
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-white hidden sm:block">
              Satyam
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/#work"
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Work
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors ${
                pathname === "/blog" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Blogs
            </Link>
            <Link
              href="/#projects"
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Projects
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              className="glassmorphism border border-white/10 text-white/70 hover:text-white hover:bg-white/5 hidden sm:flex items-center space-x-2"
              onClick={() => {
                // Search functionality
              }}
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Search</span>
              <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/50">
                <span className="text-xs">Ctrl</span>K
              </kbd>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

