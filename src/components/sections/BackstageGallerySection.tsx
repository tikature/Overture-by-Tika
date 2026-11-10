"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useI18n } from "@/components/providers/I18nProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import Chip from "@/components/ui/Chip";
import BackstageGalleryModal from "./BackstageGalleryModal";
import galleryData from "@/data/gallery.generated.json";

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

export default function BackstageGallerySection() {
  const { t, locale } = useI18n();
  const allAlbums = useMemo(() => {
    const albums = (galleryData.albums ?? []) as Album[];
    return albums.map((a, i) => ({ ...a, slug: a.slug || a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + i }));
  }, []);
  const [active, setActive] = useState<{ albumSlug: string; photoIndex: number } | null>(null);

  const isDev = process.env.NODE_ENV === "development";

  const sortedAlbums = useMemo(() => {
    return [...allAlbums].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [allAlbums]);

  const featuredCount = sortedAlbums.filter(a => a.featured).length;
  if (featuredCount > 1) {
    console.warn(`[Gallery] ${featuredCount} albums have featured: true; only the first will be treated as featured.`);
  }

  const getCategoryLabel = (cat: Album["category"]) => t(CategoryKeys[cat]) || cat;

  const handleOpenModal = (albumSlug: string) => {
    setActive({ albumSlug, photoIndex: 0 });
  };

  const handleCloseModal = () => {
    setActive(null);
  };

  const hasAlbums = allAlbums.length > 0;

  const titleObj = t("gallery.title") as { before: string; accent: string } | string;
  const titleBefore = typeof titleObj === "object" ? titleObj.before : "Backstage ";
  const titleAccent = typeof titleObj === "object" ? titleObj.accent : "Gallery";

  return (
    <>
      <section id="gallery" className="relative scroll-mt-28 py-24 border-t border-border/20 bg-surface-strong/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("gallery.eyebrow")}
            title={
              <>
                {titleBefore}
                <span className="font-display font-medium not-italic text-fg">{titleAccent}</span>
              </>
            }
            className="mb-12"
          >
            {t("gallery.subtitle")}
          </SectionHeading>

          {!hasAlbums && isDev && (
            <div className="border-2 border-dashed border-cream rounded-lg p-8 text-center text-fg-muted/70">
              {t("gallery.emptyDev")}
            </div>
          )}

          {hasAlbums && (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr" role="list">
              {sortedAlbums.map((album) => {
                const isFeatured = album.featured === true;
                const cover = album.photos[0];
                const photoCount = album.photos.length;

                return (
                  <li
                    key={album.slug}
                    className={`
                      group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/20 bg-card-surface/85 backdrop-blur text-left
                      transition duration-300 hover:-translate-y-1 hover:border-fg/50
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-fg
                      ${isFeatured ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
                    `}
                  >
                    <button
                      type="button"
                      onClick={() => handleOpenModal(album.slug)}
                      className="flex-1 flex flex-col w-full focus:outline-none"
                      aria-label={`${album.title}, ${getCategoryLabel(album.category)}, ${photoCount} ${t("gallery.photos")}`}
                    >
                      {/* Cover */}
                      <div
                        className={`
                          relative w-full overflow-hidden flex-1
                          ${isFeatured ? "lg:aspect-auto lg:flex-1 lg:min-h-0" : "aspect-[4/3]"}
                        `}
                        style={{ backgroundColor: album.frameBg === "black" ? "#000" : "#fff" }}
                      >
                        <Image
                          src={cover.thumb}
                          alt={cover.alt || album.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-contain transition-opacity duration-300"
                          priority={isFeatured}
                        />
                      </div>

                      {/* Body */}
                      <div className="p-5 flex flex-col flex-shrink-0">
                        <Chip variant="badge" className="text-[10px] tracking-[0.2em] mb-3 w-fit">
                          {getCategoryLabel(album.category)}
                        </Chip>
                        <h3 className="font-display text-lg font-extrabold text-fg mb-2 line-clamp-2">
                          {locale === "id" && album.title_id ? album.title_id : album.title}
                        </h3>
                        <p className="text-sm text-fg-muted/85 line-clamp-2 flex-1 mb-4">
                          {locale === "id" && album.summary_id ? album.summary_id : album.summary}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-opera uppercase tracking-wider">
                          <span className="text-fg-subtle/70">{normalizePeriod(album.period)}</span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-strong/60 border border-border/30 text-fg-muted/70">
                            {photoCount} {t("gallery.photos")}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {active && createPortal(
        <BackstageGalleryModal
          key={active.albumSlug}
          isOpen={true}
          onClose={handleCloseModal}
          albums={sortedAlbums}
          activeAlbumSlug={active.albumSlug}
        />,
        document.body
      )}
    </>
  );
}