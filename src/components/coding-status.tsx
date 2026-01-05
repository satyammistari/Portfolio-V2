"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code2, Clock } from "lucide-react";

interface WakaTimeStats {
  currentTask: string;
  editor: string;
  language: string;
  project: string;
  sessionDuration: string;
  isActive: boolean;
}

export function CodingStatus() {
  const [stats, setStats] = useState<WakaTimeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWakaTimeStats = async () => {
      try {
        const response = await fetch('/api/wakatime');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching WakaTime stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWakaTimeStats();
    const interval = setInterval(fetchWakaTimeStats, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div 
        className="bg-[#0a0a0a] border border-green-500/20 rounded-lg p-4 font-mono"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <div className="flex items-center gap-2 text-xs text-green-500/60">
          <div className="w-2 h-2 rounded-full bg-green-500/40 animate-pulse" />
          <span>INITIALIZING SYSTEM...</span>
        </div>
      </div>
    );
  }

  const isActive = stats?.isActive ?? false;
  const currentTask = stats?.currentTask || "Idle";
  const editor = stats?.editor || "VS Code";
  const language = stats?.language || "TypeScript";
  const project = stats?.project || "portfolio-main";
  const sessionDuration = stats?.sessionDuration || "0m";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTask}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#0a0a0a] border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-all duration-300"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {/* Header with Status Indicator */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-green-500" />
            <span className="text-[10px] text-green-500 uppercase tracking-wider font-medium">
              System Log
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full ${
                isActive 
                  ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' 
                  : 'bg-zinc-600'
              }`}
            />
            <span className="text-[9px] text-zinc-500 uppercase">
              {isActive ? 'ACTIVE' : 'IDLE'}
            </span>
          </div>
        </div>

        {/* Log Entries */}
        <div className="space-y-2">
          {/* Current Task */}
          <div className="flex items-start gap-3">
            <Code2 className="w-3 h-3 text-green-500/60 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">
                Current Task
              </div>
              <div className="text-xs text-green-400 truncate font-medium">
                {currentTask}
              </div>
            </div>
          </div>

          {/* Grid: Editor, Language, Project */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-green-500/10">
            {/* Editor */}
            <div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1">
                Editor
              </div>
              <div className="text-[10px] text-zinc-400 truncate">
                {editor}
              </div>
            </div>

            {/* Language */}
            <div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1">
                Language
              </div>
              <div className="text-[10px] text-zinc-400 truncate">
                {language}
              </div>
            </div>

            {/* Project */}
            <div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1">
                Project
              </div>
              <div className="text-[10px] text-zinc-400 truncate">
                {project}
              </div>
            </div>
          </div>

          {/* Session Duration */}
          <div className="flex items-center gap-2 pt-2 border-t border-green-500/10">
            <Clock className="w-3 h-3 text-green-500/60" />
            <div className="text-[9px] text-zinc-600 uppercase tracking-wider">
              Session Duration:
            </div>
            <div className="text-[10px] text-green-400 font-medium">
              {sessionDuration}
            </div>
          </div>
        </div>

        {/* Footer Timestamp */}
        <div className="mt-3 pt-2 border-t border-green-500/10">
          <div className="text-[8px] text-zinc-700 uppercase tracking-wider">
            LAST UPDATE: {new Date().toLocaleTimeString('en-US', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
