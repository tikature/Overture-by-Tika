import AmbientStage from "@/components/layout/AmbientStage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechTicker from "@/components/sections/TechTicker";
import ProductionsGrid from "@/components/sections/ProductionsGrid";
import RepertoireSection from "@/components/sections/RepertoireSection";
import LaurelsGrid from "@/components/sections/LaurelsGrid";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SpotlightSection from "@/components/sections/SpotlightSection";
import RehearsalLogSection from "@/components/sections/RehearsalLogSection";
import BackstageGallerySection from "@/components/sections/BackstageGallerySection";
import { getProjects } from "@/lib/projects-source";
import { certificates } from "@/data/certificates";
import { siteConfig } from "@/data/site";
import fs from "fs";
import path from "path";

async function fetchPublicRepos(): Promise<number> {
  try {
    const username = siteConfig.github.replace("https://github.com/", "");
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN || ""}`,
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.public_repos ?? 0;
  } catch {
    return 0;
  }
}

export default async function HomePage() {
  const mergedProjects = await getProjects();
  const productionsCount = mergedProjects.filter((p) => p.featured).length;
  const certificatesCount = certificates.length;
  const publicRepos = await fetchPublicRepos();

  // Load manifest for thumbnails and embeddable flags
  let manifest: Record<string, { image: boolean; embeddable: boolean; updatedAt: string }> = {};
  const manifestPath = path.join(process.cwd(), "public/images/projects/manifest.json");
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    } catch {
      manifest = {};
    }
  }

  const projectsWithMeta = mergedProjects.map((p) => {
    const info = manifest[p.slug];
    return {
      ...p,
      thumbnail: p.thumbnail,
      embeddable: info?.embeddable ?? p.embeddable ?? false,
    };
  });

  return (
    <>
      <AmbientStage />
      <Navbar />
      <main className="relative z-10 pt-28" id="main-content">
        {/* Hero / Overture */}
        <HeroSection
          publicRepos={publicRepos}
          certificatesCount={certificatesCount}
          availability={siteConfig.availability}
        />

{/* Technical Ensemble */}
        <TechTicker />

        {/* Productions */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
          <div className="max-w-7xl mx-auto">
            <ProductionsGrid projects={projectsWithMeta} />
          </div>
        </section>

        {/* Spotlight */}
        <SpotlightSection />

        {/* About / The Stage */}
        <AboutSection productionsCount={productionsCount} />

        {/* Repertoire + Experience */}
        <RepertoireSection />

{/* The Rehearsal Log */}
         <RehearsalLogSection />

         {/* Backstage Gallery */}
         <BackstageGallerySection />

         {/* Laurels */}
         <LaurelsGrid />

        {/* Contact */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}