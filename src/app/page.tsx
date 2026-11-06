import AmbientStage from "@/components/layout/AmbientStage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechTicker from "@/components/sections/TechTicker";
import ProductionsGrid from "@/components/sections/ProductionsGrid";
import RepertoireSection from "@/components/sections/RepertoireSection";
import LaurelsGrid from "@/components/sections/LaurelsGrid";
import ContactSection from "@/components/sections/ContactSection";
import BlogSection from "@/components/sections/BlogSection";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import { getProjects } from "@/lib/projects-source";
import fs from "fs";
import path from "path";

export default async function HomePage() {
  const mergedProjects = await getProjects();
  const productionsCount = mergedProjects.filter((p) => p.featured).length;

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
        <HeroSection />

        {/* Technical Ensemble */}
        <TechTicker />

        {/* About / The Stage */}
        <AboutSection productionsCount={productionsCount} />

        {/* Productions */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
          <div className="max-w-7xl mx-auto">
            <ProductionsGrid projects={projectsWithMeta} />
          </div>
        </section>

        {/* Repertoire */}
        <RepertoireSection />

        {/* Laurels */}
        <LaurelsGrid />

        {/* Program Notes Blog */}
        <BlogSection />

        {/* Reviews */}
        {false && (
          <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
            <div className="max-w-7xl mx-auto">
              <p className="text-center text-softCream">Reviews placeholder (hidden when empty)</p>
            </div>
          </section>
        )}

        {/* Contact */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}