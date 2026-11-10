"use client";

import React from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { aboutData } from "@/data/about";
import SectionHeading from "@/components/ui/SectionHeading";

interface AboutSectionProps {
  productionsCount: number;
}

export default function AboutSection({ productionsCount }: AboutSectionProps) {
  const { t } = useI18n();
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stats = aboutData.stats.map((s, i) => {
    let value = s.value;
    let suffix = s.suffix;
    if (i === 1) {
      value = productionsCount;
      suffix = "";
    }
    return {
      ...s,
      value,
      suffix,
      label: t(`about.stats.${["years", "productions", "ovations", "readiness"][i]}`) || s.label,
    };
  });

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative proscenium-arch">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow={aboutData.eyebrow}
          title={
            <>
              {aboutData.title.before}
              <span className="italic text-cream font-serif">{aboutData.title.accent}</span>
            </>
          }
        >
          {aboutData.lead}
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stats left */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4 min-w-0">
            {stats.map((stat, idx) => (
              <StatCard key={idx} stat={stat} prefersReducedMotion={prefersReducedMotion} />
            ))}
          </div>

          {/* Arch SVG */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative my-8 lg:my-0 min-w-0">
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-burgundy/20 blur-[100px] pointer-events-none" />
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center min-w-0">
              <svg
                className="w-full h-auto max-w-full filter drop-shadow-[0_0_35px_rgba(128,0,32,0.4)]"
                fill="none"
                viewBox="0 0 500 420"
                xmlns="http://www.w3.org/2000/svg"
                style={{ colorScheme: "dark" }}
              >
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="archDrapeBurgundy"
                    x1="250"
                    x2="250"
                    y1="40"
                    y2="360"
                  >
                    <stop stopColor="var(--color-vintage-burgundy)" />
                    <stop offset="0.5" stopColor="var(--color-burgundy)" />
                    <stop offset="1" stopColor="var(--color-dark-burgundy)" />
                  </linearGradient>
                  <linearGradient id="creamTrimGrad" x1="0" x2="1" y1="0" y2="0">
                    <stop stopColor="var(--color-dark-cream)" />
                    <stop offset="0.5" stopColor="var(--color-cream)" />
                    <stop offset="1" stopColor="var(--color-dark-cream)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 40 380 L 40 220 A 210 210 0 0 1 460 220 L 460 380"
                  fill="none"
                  stroke="url(#creamTrimGrad)"
                  strokeWidth="6"
                />
                <path
                  d="M 60 380 L 60 220 A 190 190 0 0 1 440 220 L 440 380"
                  fill="none"
                  stroke="var(--color-oxblood)"
                  strokeWidth="3"
                />
                <polygon
                  fill="var(--color-cream)"
                  points="250,8 270,35 230,35"
                  stroke="var(--color-dark-cream)"
                  strokeWidth="1.5"
                />
                <circle cx="250" cy="22" fill="var(--color-burgundy)" r="5" />
                <path
                  d="M 60 160 Q 150 140 250 180 Q 350 140 440 160 L 440 360 C 370 300 330 240 310 180 C 270 230 230 230 190 180 C 170 240 130 300 60 360 Z"
                  fill="url(#archDrapeBurgundy)"
                  stroke="var(--color-dark-cream)"
                  strokeWidth="1.5"
                />
                <line stroke="var(--color-dark-cream)" strokeWidth="1.5" x1="250" x2="250" y1="60" y2="130" />
                <ellipse cx="250" cy="132" fill="var(--color-cream)" rx="36" ry="7" />
                <ellipse cx="250" cy="150" fill="var(--color-dark-cream)" rx="22" ry="5" />
                <polygon fill="var(--color-cream)" points="250,156 246,175 254,175" />
                <polygon fill="var(--color-cream)" points="230,138 227,152 233,152" />
                <polygon fill="var(--color-cream)" points="270,138 267,152 273,152" />
                <circle cx="250" cy="124" fill="var(--color-cream)" r="3.5" />
                <circle cx="235" cy="126" fill="var(--color-ivory-cream)" r="3" />
                <circle cx="265" cy="126" fill="var(--color-ivory-cream)" r="3" />
                <rect
                  fill="var(--color-obsidian-burgundy)"
                  height="24"
                  rx="4"
                  stroke="var(--color-dark-cream)"
                  strokeWidth="2"
                  width="440"
                  x="30"
                  y="380"
                />
                <line stroke="var(--color-cream)" strokeWidth="1.5" x1="40" x2="460" y1="384" y2="384" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-dark-cream font-opera font-bold mt-2">
              {aboutData.archCaption}
            </p>
          </div>

          {/* Principles right */}
          <div className="lg:col-span-3 flex flex-col space-y-5 min-w-0">
            {aboutData.principles.map((principle, idx) => (
              <div
                key={idx}
                className="bg-obsidian-burgundy/80 border border-dark-cream/20 p-6 rounded-2xl backdrop-blur-md hover:border-dark-cream transition-all shadow-lg min-w-0"
              >
                <h3 className="text-cream font-bold text-base mb-2 font-opera flex items-center">
                  <svg aria-hidden="true" className="w-4 h-4 mr-2 text-wine-red" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    {idx === 0 ? (
                      <>
                        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594-1.594l-1.051-5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594z"></path>
                        <path d="M20 2v4"></path>
                        <path d="M22 4h-4"></path>
                        <circle cx="4" cy="20" r="2"></circle>
                      </>
                    ) : (
                      <>
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                      </>
                    )}
                  </svg>
                  {principle.title}
                </h3>
                <p className="text-soft-cream/80 text-xs sm:text-sm leading-relaxed font-body min-w-0">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  prefersReducedMotion,
}: {
  stat: { value: number; suffix: string; label: string };
  prefersReducedMotion: boolean;
}) {
  const [count, setCount] = React.useState(() => (prefersReducedMotion ? stat.value : 0));
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
    if (!hasStarted || prefersReducedMotion) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 1500, 1);

      setCount(Math.floor(progress * stat.value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, stat.value, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className="bg-obsidian-burgundy/80 border border-dark-cream/20 p-5 rounded-2xl backdrop-blur-md hover:border-dark-cream transition-all group shadow-lg min-w-0"
    >
      <span className="text-3xl sm:text-4xl font-extrabold text-cream font-display group-hover:text-ivory-cream transition-colors">
        {count}{stat.suffix}
      </span>
      <p className="text-xs uppercase tracking-wider text-warm-cream/70 mt-1 font-opera font-semibold min-w-0">
        {stat.label}
      </p>
    </div>
  );
}