import React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps {
  children: React.ReactNode;
  variant?: "default" | "badge" | "status";
  className?: string;
}

export default function Chip({ children, variant = "default", className }: ChipProps) {
  const variants = {
    default:
      "bg-obsidianBurgundy/90 border border-darkCream/25 text-cream hover:border-cream transition-colors",
    badge:
      "bg-darkBurgundy/60 border border-darkCream/30 backdrop-blur text-ivoryCream",
    status:
      "bg-darkBurgundy/60 border border-darkCream/30 backdrop-blur text-ivoryCream flex items-center space-x-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-opera font-semibold tracking-wider",
        variants[variant],
        className
      )}
    >
      {variant === "status" && (
        <span className="w-2 h-2 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]" />
      )}
      {children}
    </span>
  );
}
