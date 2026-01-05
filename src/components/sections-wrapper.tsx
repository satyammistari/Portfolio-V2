"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionsWrapperProps {
  children: ReactNode;
  className?: string;
}

export function SectionsWrapper({ children, className = "" }: SectionsWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}




