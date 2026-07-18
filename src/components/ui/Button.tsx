"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
      outline: "border border-border bg-transparent hover:bg-card text-foreground",
      ghost: "bg-transparent hover:bg-card text-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
      danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
    };

    const sizes = {
      default: "h-11 px-4 py-2",
      sm: "h-9 px-3 rounded-md text-sm",
      lg: "h-14 px-8 rounded-xl text-lg font-medium",
      icon: "h-11 w-11 flex items-center justify-center",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && children}
        
        {/* Ripple Effect Base (simplified via framer-motion tap above, but we can keep it clean) */}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
