"use client";

import React from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  label: string;
}

export default function CountUp({ end, duration = 2, suffix = "", label }: CountUpProps) {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  React.useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return (
    <div ref={ref} className="bg-obsidianBurgundy/80 border border-darkCream/20 p-5 rounded-2xl backdrop-blur-md hover:border-darkCream transition-all group shadow-lg">
      <span className="text-3xl sm:text-4xl font-extrabold text-cream font-display group-hover:text-ivoryCream transition-colors">
        {count}{suffix}
      </span>
      <p className="text-xs uppercase tracking-wider text-warmCream/70 mt-1 font-opera font-semibold">
        {label}
      </p>
    </div>
  );
}
