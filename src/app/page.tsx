import AmbientStage from "@/components/layout/AmbientStage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechTicker from "@/components/sections/TechTicker";
import ProductionsGrid from "@/components/sections/ProductionsGrid";
import RepertoireSection from "@/components/sections/RepertoireSection";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import LaurelsGrid from "@/components/sections/LaurelsGrid";
import ContactSection from "@/components/sections/ContactSection";
import BlogSection from "@/components/sections/BlogSection";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";

export default function HomePage() {
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
        <AboutSection />

        {/* Productions */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
          <div className="max-w-7xl mx-auto">
            <ProductionsGrid />
          </div>
        </section>

        {/* Repertoire */}
        <RepertoireSection />

        {/* Experience */}
        <ExperienceTimeline />

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