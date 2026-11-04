import React from "react";
import { cn } from "@/lib/utils";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  href?: string;
}

type ButtonProps = ButtonBaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-burgundy via-vintageBurgundy to-wineRed text-cream border border-darkCream/40 shadow-[0_0_20px_rgba(128,0,32,0.7)] hover:shadow-[0_0_30px_rgba(220,200,163,0.45)] hover:border-cream hover:-translate-y-0.5",
    secondary:
      "bg-obsidianBurgundy/90 border border-darkCream/30 text-softCream hover:border-cream hover:text-cream",
    ghost:
      "bg-transparent border border-darkCream/30 text-darkCream hover:border-cream hover:text-cream",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const baseClasses = cn(
    "rounded-full font-opera font-bold uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
}
