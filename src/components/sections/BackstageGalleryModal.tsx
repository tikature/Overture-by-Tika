"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers/I18nProvider";
import Chip from "@/components/ui/Chip";

interface Album {
  title: string;
  title_id?: string;
  slug?: string;
  category: "project" | "teaching" | "event" | "organization" | "internship" | "experience";
  period: string;
  summary: string;
  summary_id?: string;
  description: string;
  description_id?: string;
  role: string;
  role_id?: string;
  tags?: string[];
  link?: { label: string; href: string };
  frameBg: "black" | "white";
  featured?: boolean;
  photos: {
    src: string;
    thumb: string;
    width: number;
    height: number;
    alt: string;
    caption?: string;
  }[];
}

interface BackstageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  albums: Album[];
  activeAlbumSlug: string;
}

const CategoryKeys = {
  project: "gallery.category.project",
  teaching: "gallery.category.teaching",
  event: "gallery.category.event",
  organization: "gallery.category.organization",
  internship: "gallery.category.internship",
  experience: "gallery.category.experience",
} as const satisfies Record<Album["category"], string>;

function normalizePeriod(period: string): string {
  return period.replace(/\s*-\s*/g, " – ").replace(/\s*–\s*/g, " – ");
}

export default function BackstageGalleryModal({ isOpen, onClose, albums, activeAlbumSlug }: BackstageGalleryModalProps) {
  const { t, locale } = useI18n();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousPhotoRef = useRef<HTMLButtonElement>(null);
  const nextPhotoRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const currentAlbum = albums.find(a => a.slug === activeAlbumSlug) || albums[0];
  const currentPhoto = currentAlbum?.photos[photoIndex];

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goToPrevPhoto = useCallback(() => {
    if (currentAlbum && photoIndex > 0) {
      if (!prefersReducedMotion) setIsAnimating(true);
      setPhotoIndex(p => p - 1);
      if (!prefersReducedMotion) setTimeout(() => setIsAnimating(false), 200);
    }
  }, [photoIndex, currentAlbum, prefersReducedMotion]);

  const goToNextPhoto = useCallback(() => {
    if (currentAlbum && photoIndex < currentAlbum.photos.length - 1) {
      if (!prefersReducedMotion) setIsAnimating(true);
      setPhotoIndex(p => p + 1);
      if (!prefersReducedMotion) setTimeout(() => setIsAnimating(false), 200);
    }
  }, [photoIndex, currentAlbum, prefersReducedMotion]);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.body.dataset.modalOpen = "true";
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
      delete document.body.dataset.modalOpen;
      lastFocusedRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.modalOpen;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goToPrevPhoto();
      else if (e.key === "ArrowRight") goToNextPhoto();
      else if (e.key === "Tab") trapFocus(e);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToPrevPhoto, goToNextPhoto, trapFocus]);

  useEffect(() => {
    if (currentAlbum && photoIndex > 0) {
      const img = document.createElement("img");
      img.src = currentAlbum.photos[photoIndex - 1].src;
    }
    if (currentAlbum && photoIndex < currentAlbum.photos.length - 1) {
      const img = document.createElement("img");
      img.src = currentAlbum.photos[photoIndex + 1].src;
    }
  }, [photoIndex, currentAlbum]);

  if (!isOpen || !currentAlbum) return null;

  const categoryLabel = t(CategoryKeys[currentAlbum.category]) || currentAlbum.category;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-modal-backdrop/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
      ref={dialogRef}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-obsidian-burgundy border border-dark-cream rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col",
          isMobile ? "h-[92dvh] w-full max-w-full" : "w-[min(1100px,94vw)] h-[min(86dvh,760px)]"
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button - always visible top right */}
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 z-30 w-11 h-11 rounded-full bg-dark-burgundy/80 border border-dark-cream text-cream hover:border-cream hover:text-cream flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
          onClick={onClose}
          aria-label={t("gallery.close")}
        >
          <X className="w-5 h-5" />
        </button>

        {isMobile ? (
          // Mobile: stacked layout
          <div className="flex flex-col h-full overflow-hidden">
            {/* Photo frame - top */}
            <div className="relative w-full h-[45dvh] flex-shrink-0 flex items-center justify-center overflow-hidden p-4" style={{ backgroundColor: currentAlbum.frameBg === "black" ? "#000" : "#fff" }}>
              {currentAlbum.photos.length > 1 && (
                <>
                  <button
                    ref={previousPhotoRef}
                    className={cn(
                      "absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-dark-burgundy/80 border border-dark-cream text-cream hover:border-cream hover:text-cream transition-colors",
                      prefersReducedMotion ? "transition-none" : "transition-opacity duration-300"
                    )}
                    onClick={goToPrevPhoto}
                    aria-label={t("gallery.prev")}
                    disabled={photoIndex === 0 || isAnimating}
                    style={{ width: "44px", height: "44px" }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    ref={nextPhotoRef}
                    className={cn(
                      "absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-dark-burgundy/80 border border-dark-cream text-cream hover:border-cream hover:text-cream transition-colors",
                      prefersReducedMotion ? "transition-none" : "transition-opacity duration-300"
                    )}
                    onClick={goToNextPhoto}
                    aria-label={t("gallery.next")}
                    disabled={photoIndex === currentAlbum.photos.length - 1 || isAnimating}
                    style={{ width: "44px", height: "44px" }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              <div
                className={cn(
                  "relative w-full h-full flex items-center justify-center overflow-hidden",
                  prefersReducedMotion ? "" : "transition-opacity duration-200",
                  isAnimating ? "opacity-50" : "opacity-100"
                )}
                aria-live="polite"
              >
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={false}
                />
              </div>

              {/* Counter */}
              {currentAlbum.photos.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                  <span className="text-[11px] font-opera uppercase tracking-wider text-cream bg-dark-burgundy/80 px-3 py-1 rounded-full border border-dark-cream">
                    {t("gallery.counter", { current: String(photoIndex + 1), total: String(currentAlbum.photos.length) })}
                  </span>
                </div>
              )}
            </div>

            {/* Details - scrollable below */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              <Chip variant="badge" className="text-[10px] tracking-[0.2em] w-fit">
                {categoryLabel}
              </Chip>

              <h2 id="gallery-modal-title" className="font-display text-2xl font-extrabold text-cream leading-[1.2]">
                {locale === "id" && currentAlbum.title_id ? currentAlbum.title_id : currentAlbum.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-[11px] font-opera uppercase tracking-wider text-warm-cream">
                <span>{normalizePeriod(currentAlbum.period)}</span>
                <span className="text-cream">{currentAlbum.role}</span>
              </div>

              <p className="text-base text-soft-cream leading-relaxed">
                {locale === "id" && currentAlbum.summary_id ? currentAlbum.summary_id : currentAlbum.summary}
              </p>

              <p className="text-sm text-soft-cream/85 leading-relaxed">
                {locale === "id" && currentAlbum.description_id ? currentAlbum.description_id : currentAlbum.description}
              </p>

              {currentPhoto.caption && (
                <p className="text-sm text-warm-cream italic border-t border-dark-cream/30 pt-3">
                  <span className="text-[10px] font-opera uppercase tracking-wider text-warm-cream/50 block mb-1">{t("gallery.caption") || "Caption"}</span>
                  {currentPhoto.caption}
                </p>
              )}

              {currentAlbum.tags && currentAlbum.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentAlbum.tags.map((tag, i) => (
                    <Chip key={i} variant="badge" className="text-[10px]">
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}

              {currentAlbum.link && (
                <a
                  href={currentAlbum.link.href}
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 text-sm font-opera font-bold uppercase tracking-widest text-deep-abyss bg-gradient-to-r from-cream via-ivory-cream to-warm-cream border border-dark-cream/40 rounded-full hover:border-cream hover:-translate-y-0.5 transition-all w-fit"
                >
                  {currentAlbum.link.label}
                </a>
              )}
            </div>
          </div>
        ) : (
          // Desktop: side-by-side layout
          <div className="flex flex-row h-full overflow-hidden">
            {/* Left: Photo frame */}
            <div className="relative w-[62%] flex items-center justify-center overflow-hidden h-full p-4" style={{ backgroundColor: currentAlbum.frameBg === "black" ? "#000" : "#fff" }}>
              {currentAlbum.photos.length > 1 && (
                <>
                  <button
                    ref={previousPhotoRef}
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-dark-burgundy/80 border border-dark-cream text-cream hover:border-cream hover:text-cream hover:bg-dark-burgundy transition-all duration-300",
                      prefersReducedMotion ? "transition-none" : ""
                    )}
                    onClick={goToPrevPhoto}
                    aria-label={t("gallery.prev")}
                    disabled={photoIndex === 0 || isAnimating}
                    style={{ width: "48px", height: "48px" }}
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    ref={nextPhotoRef}
                    className={cn(
                      "absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-dark-burgundy/80 border border-dark-cream text-cream hover:border-cream hover:text-cream hover:bg-dark-burgundy transition-all duration-300",
                      prefersReducedMotion ? "transition-none" : ""
                    )}
                    onClick={goToNextPhoto}
                    aria-label={t("gallery.next")}
                    disabled={photoIndex === currentAlbum.photos.length - 1 || isAnimating}
                    style={{ width: "48px", height: "48px" }}
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}

              <div
                className={cn(
                  "relative w-full h-full flex items-center justify-center overflow-hidden",
                  prefersReducedMotion ? "" : "transition-opacity duration-200",
                  isAnimating ? "opacity-50" : "opacity-100"
                )}
                aria-live="polite"
              >
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  sizes="62vw"
                  className="object-contain"
                  priority={false}
                />
              </div>

              {/* Counter */}
              {currentAlbum.photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <span className="text-[11px] font-opera uppercase tracking-wider text-cream bg-dark-burgundy/80 px-3 py-1 rounded-full border border-dark-cream">
                    {t("gallery.counter", { current: String(photoIndex + 1), total: String(currentAlbum.photos.length) })}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="w-[38%] flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-5 pt-12">
                <Chip variant="badge" className="text-[10px] tracking-[0.2em] w-fit">
                  {categoryLabel}
                </Chip>

                <h2 id="gallery-modal-title" className="font-display text-2xl font-extrabold text-cream leading-[1.2]">
                  {locale === "id" && currentAlbum.title_id ? currentAlbum.title_id : currentAlbum.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-opera uppercase tracking-wider text-warm-cream">
                  <span>{normalizePeriod(currentAlbum.period)}</span>
                  <span className="text-cream">{currentAlbum.role}</span>
                </div>

                <p className="text-base text-soft-cream leading-relaxed">
                  {locale === "id" && currentAlbum.summary_id ? currentAlbum.summary_id : currentAlbum.summary}
                </p>

                <p className="text-sm text-soft-cream/85 leading-relaxed">
                  {locale === "id" && currentAlbum.description_id ? currentAlbum.description_id : currentAlbum.description}
                </p>

                {currentPhoto.caption && (
                  <p className="text-sm text-warm-cream italic border-t border-dark-cream/30 pt-3">
                    <span className="text-[10px] font-opera uppercase tracking-wider text-warm-cream/50 block mb-1">{t("gallery.caption") || "Caption"}</span>
                    {currentPhoto.caption}
                  </p>
                )}

                {currentAlbum.tags && currentAlbum.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentAlbum.tags.map((tag, i) => (
                      <Chip key={i} variant="badge" className="text-[10px]">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                )}

                {currentAlbum.link && (
                  <div className="pt-4 border-t border-dark-cream/20">
                    <a
                      href={currentAlbum.link.href}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-opera font-bold uppercase tracking-widest text-deep-abyss bg-gradient-to-r from-cream via-ivory-cream to-warm-cream border border-dark-cream/40 rounded-full hover:border-cream hover:-translate-y-0.5 transition-all w-fit"
                    >
                      {currentAlbum.link.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}