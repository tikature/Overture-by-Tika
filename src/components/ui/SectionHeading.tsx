import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, children, className }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-wider text-darkCream font-opera font-bold mb-2">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream font-display">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-base text-softCream max-w-xl mx-auto">
          {children}
        </p>
      )}
    </div>
  );
}
