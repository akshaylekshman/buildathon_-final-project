"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export function GlassCard({ children, className, interactive = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -5, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)" } : {}}
      className={cn(
        "glass-panel rounded-2xl p-6 transition-all duration-300",
        interactive && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
